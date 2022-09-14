<script lang="ts">
    import App from "../App.svelte";
    import { Page, currentPage } from "../stores/pages";
    let src = '/public/images'
</script>

<section class="imagem" id="cadastro">
    <div class="btn">
         <button class="cadastro" on:click={ () => {currentPage.set(Page.Register)} }>Cadastre-se</button>
     </div>
</section>

<section class="imagem" id="servicos">
    <div class="servico">
        <h2>Serviços de Monitoramento</h2>
        <p>A Tecnologia dos Satélites à serviço da sociedade</p>
    </div>
    <div class="img-servicos">
        <img class="agua" src="images/água.png" alt="água">
        <img class="solo" src="images/solo.png" alt="solo">
        <img class="vegetacao" src="images/Vegetação.png" alt="vegetacao">
    </div>
</section>

<div class="normal" id="acesso">
    <div class="acesso">
        <h2>Acessibilidade</h2>
        <p>Acesse nossos produtos de qualquer dispositivo</p>
    </div>
    <img class="acesso" src="images/Dipositivos.png" alt="dispositivos">
</div>

<section class="normal" id="sensores">
    <div class="sensores">
        <h2>Sensores</h2>
        <p>Diferentes satélites para diferentes estratégias</p>
    </div>
    <div class="img-sensores">
        <img class="modis" src="images/Modis.png" alt="Modis">
        <img class="landsat" src="images/LandSat.png" alt="LandSat">
        <img class="sentinel" src="images/Sentinel.png" alt="Sentinel">
    </div>
</section>

<section class="imagem" id="amostra">
    <button class="amostra">Solicite seu orçamento e sua amostra grátis</button>
</section>

<style> 
    * {
        margin: 0px;
        padding: 0px;
    } 
    
    p {
        font-size: 0.8em;
        color: #E2A518;
        padding: 0.8px;
        font-weight: bolder;    
    }

    h2 {
        font-size: 1em;    
    }

    button {
        font-family: 'Lato', sans-serif;
	    font-weight: bolder;
	    font-size: 1em;
	    background-color: #E2A518;
	    border: 1px solid #707070;
	    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.400);
	    box-sizing: border-box;	
	    text-align: center;
        border-radius: 40px;
    }
    
    section.imagem#cadastro {
        margin: 0px;
        padding: 0px;
    }

    section#cadastro {
        display: flex;
        justify-content: right;
        align-items: center;
        height: 25vh;
        width: 100vw;         
        color: white;
        box-shadow: inset 6px 6px 13px 0px rgba(0, 0, 0, 0.5);
        background-size: cover;    
        background-image: url(../images/BG_2.jpg);
        background-position: left center;
    }

    .cadastro {       
        height: 6vh;
        width: 28vw;
        border-radius: 40px;        
    }

    .btn {
        padding-right: 6vw;
    }

    section.imagem#servicos {
        margin: 0px;
        padding: 0px;
    }

    section#servicos {   
        height: 28vh;
        width: 100vw;
        padding-top: 3vh; 
        background-image: url(../images/SatNasa.png);
        background-position: center;
        background-size: cover;          
        background-color: rgb(51, 51, 51);
        color: white;
        box-shadow: inset 6px 6px 13px 0px rgba(0, 0, 0, 0.5);
        background-size: cover;
        text-align: center; 
        background-position: top left;   
    }

    div.img-servicos > img {
        padding-top: 5px;
        display: inline-block;
        height: 18vh;    
    }

    div.servico {
        text-align: left;
        padding-left: 30px;
        padding-top: 3vh;      
    }

    div.normal {  
        height: 28vh;
        width: 100vw;
        padding-top: 3vh;
        line-height: 0.8em;
        color: white;
        background-color: #4B4B4B;
        text-align: center;
    }

    div.acesso {
        text-align: left;
        padding-left: 30px;    
    }

    div > img.acesso {
        padding-top: 5px;
        height: 18vh;
        text-align: center;    
    }

    section#sensores {
        height: 28vh;
        width: 100vw; 
        background-color: #b9b8b82d;
        padding-top: 3vh;    
        padding-bottom: 20vh;
        color: black;
        text-align: center;
    }

    div.sensores {
        padding-left: 30px;  
        text-align: left; 
    }
    
    div.img-sensores > img {
        padding-top: 5px;
        display: inline-block;
        height: 18vh;    
    }

    section#amostra {
        height: 25vh;
        width: 100vw;
        background-image: url(../images/lagoa_dos_patos.png);
        background-position: left center;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    button.amostra {
        margin-top: 8vh;    
        height: 6vh;
        width: 85vw;
        border-radius: 40px; 
    }    
</style>