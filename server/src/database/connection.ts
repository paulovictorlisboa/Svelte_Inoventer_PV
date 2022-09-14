import pg from 'pg';
import pgformat from 'pg-format';
import env from '../config'

const database = new pg.Client( {
    host: env.DATABASE.HOST,
    port: env.DATABASE.PORT,
    user: env.DATABASE.USER,
    password: env.DATABASE.PASSWORD,
    database: env.DATABASE.DATABASE,
});

export enum Token {
    ACCESS = "AccessToken",
    RESETPASSWORD = "ResetPasswordToken"
}

interface User {
    id: string;
    email: string;
    password: string;
    verified: boolean;
    subscribeduntil: number;
}

export default {
    Client: database,
    Users: {
        Insert: async (email: string, password: string, verified: boolean = false) => {
            // insere o cliente na dabatase
            let q = pgformat(`INSERT INTO users(email, password, verified) VALUES (%L, %L, %L) RETURNING id`, email, password, verified);
            const userid = (await database.query(q)).rows[0].id as number;
            return userid;
        },
        GetById: async (id: string) => {
            let q = pgformat(`SELECT id, email, password, verified, extract(epoch from subscribeduntil) as subscribeduntil FROM users WHERE id = %L LIMIT 1`, id);
            let res = await database.query(q);
            return res.rows.length == 0 ? null : res.rows[0] as User;
        },
        GetByEmail: async (email: string) => {
            let q = pgformat(`SELECT id, email, password, verified, extract(epoch from subscribeduntil) as subscribeduntil FROM users WHERE email = %L LIMIT 1`, email);
            let res = await database.query(q);
            return res.rows.length == 0 ? null : res.rows[0] as User;
        },
        VerifyEmail: async (id: string) => {
            let q = pgformat("UPDATE users SET verified = TRUE WHERE id = %L", id);
            await database.query(q);
        },
        UpdatePassword: async (id: string, password: string) => {
            let q = pgformat("UPDATE users SET password = %L WHERE id = %L", password, id);
            await database.query(q);
        }
    },
    Overlays: {
        GetAll: async () => {
            let q = "SELECT * FROM overlays";
            let r = await database.query(q);
            return r.rows;
        }
    },
    UsersTokens: {
        Insert: async (userid: string, tokentype: Token) => {
            let q = pgformat("INSERT INTO users_tokens(\"user\", token) VALUES (%L, %L) RETURNING id as tkid", userid, tokentype);
            return (await database.query(q)).rows[0].tkid as string;

        },
        Exists: async (tokenid: string) => {
            let q = pgformat("SELECT * FROM users_tokens WHERE id = %L LIMIT 1", tokenid);
            let res = await database.query(q);
            return res.rows.length > 0;
        },
        Delete: async (tokenid: string) => {
            let q = pgformat("DELETE FROM users_tokens WHERE id = %L", tokenid);
            let r = await database.query(q);
        }
    },
}
