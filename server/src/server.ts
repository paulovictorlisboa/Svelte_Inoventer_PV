import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import cookieParser from 'cookie-parser';

import config from './config';
import database from './database/connection'
import logger from './logs/logger';
import error from './logs/error';
import morgan from './logs/morgan';

import authRoute from './routes/auth';

console.log(config);

const app = express();

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// set security HTTP headers
app.use(helmet.contentSecurityPolicy( {
    directives: {
        "script-src": ["'self'", "'unsafe-inline'" ,"*.mercadolibre.com", "*.mercadopago.com", "mercadopago.com.br", "*.mercadopago.com.br", "*.mercadolivre.com", "accounts.google.com", "*.mlstatic.com"],
        "default-src": ["'self'", "'unsafe-inline'" ,"*.mercadolibre.com", "*.mercadopago.com", "mercadopago.com.br", "*.mercadopago.com.br", "*.mercadolivre.com", "accounts.google.com", "*.mlstatic.com"],
        "img-src": ["'self'", "*.mercadolibre.com", "*.mercadopago.com", "mercadopago.com.br", "*.mercadopago.com.br", "*.mercadolivre.com", "accounts.google.com", "*.mlstatic.com"]
} } ));
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy( { policy: 'cross-origin' } ));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// sanitize request data
app.use(xss());

// main page
app.use(express.static('../client/public'));
app.get('/', (req, res) => {
    res.status(200).sendFile('../client/public/index.html')
});

app.use('/api/v1/auth', authRoute);

// error handling
app.use(error.errorConverter);
app.use(error.errorHandler);


async function main() {

    
    await database.Client.connect();
    console.log("[Server]: Connected to database");

    let server = app.listen(config.SERVER.PORT);
    console.log("[Server]: Listening on port", config.SERVER.PORT);

    // let t = await Database.Tokens.Set(1, 'AccessToken')
    // console.log(t);

    let cleanup = async () => {
        if(server) {
            server.close();
            console.log("\n[Server]: Stopped")
    
            await database.Client.end();
            console.log("[Server]: Closed database connection")
        }
    }

    process.on('uncaughtException', (error) => {
        logger.error(error);
        cleanup();
    });
    process.on('unhandledRejection', (error) => {
        logger.error(error);
        cleanup();
    });
    process.on('SIGINT', () => cleanup());
    process.on('SIGTERM', () => cleanup());
}

main()