<script lang="ts">
    import apiRequest from "../api/requests";
    import { userLoggedIn } from "../stores/login";
    import { Page, currentPage } from '../stores/pages';

    async function logout() {
        let r = await apiRequest("api/v1/auth/logout", "GET");
        if( r.ok ) {
            userLoggedIn.set(false);
        }
    }

    function mudouTamanho() {
            if (window.innerWidth >= 768) {
                itens.style.display = 'block'
            } else {
                itens.style.display = 'none'
            }
    }

    function clickMenu() {
        if(itens.style.display == 'block') {
            itens.style.display= 'none'
        } else {
            itens.style.display = 'block'
        }
    }
</script>

<header class="conta" on:resize={ () => {mudouTamanho}}>
    <img class='logo' src="assets/Logo/INOVENTER_LOGO-P.png" alt="Logo_Inoventer" on:click={ () => {currentPage.set(Page.Main)} }>
    <i id="burguer" class="material-icons" on:click={ () => {clickMenu}}>menu</i>
    <menu id="itens">
        <ul>
            <li><i class="fa fa-sign-in"></i> Login</li>
            <li><i class="fa fa-phone"></i> Telefone</li>
            <li><i class="fa fa-envelope"></i> E-mail</li>
            <li><i class="fa fa-whatsapp"></i> Whatsapp</li>
        </ul>
    </menu>
    <!-- {#if !$userLoggedIn}
        <button type="button" class="cadastro" on:click={ () => {currentPage.set(Page.Register)} }>
            Cadastre-se
        </button>

        <button type="button" class="login" on:click={ () => {currentPage.set(Page.Login)} }>
            Login
        </button>
    {:else}
        <button type="button" class="cadastre-se_header" on:click={ () => {currentPage.set(Page.Main)} }>
            Painel
        </button>

        <button type="button" class="login" on:click={logout}>
            Sair
        </button>
    {/if}       -->
</header>           


<style>
    
    @charset "UTF-8";

    * {
        margin: 0px;
        padding: 0px;
    }

    header {        
        background-color: rgb(148, 148, 148);
        text-align: center;
    }

    i#burguer {
        background-color: rgb(51, 51, 51);
        color: #E2A518;
        display: block;
        text-align: center;
        padding: 10px;
        cursor: pointer;
    }

    i#burguer:hover {
        background-color: #4B4B4B;
    }

    .logo {
        padding: 10px;
        height: 60px;
        align-items: center;
        cursor: pointer;
    }

    menu {
        display: none;
    }

    menu > ul {
        list-style-type: none;
    }

    menu > ul > li {
        display: block;
        padding: 10px;
        text-decoration: none;
        text-align: center;
        background-color: #4B4B4B;
        color: white;
        border-top: 2px solid gray;
    }

    menu > ul > li:hover {
        background-color: gray;
    }



    /* * {
        margin: 0px;
        padding: 0px;
        font-size: 1em;
        font-family: 'Lato', sans-serif;        
    }

    nav {
        height: 12vh;
        width: 100%;
        text-align: center;
        background: rgba(0, 0, 0, 0.5);
    }    

    .logo {
        height: 60px;        
        cursor: pointer;
    } 

    i#burguer {
        background-color: rgb(48, 48, 48);
        color:#E2A518;
        display: block;
        text-align: center;
        padding: 10px;
    }

    i#burguer:hover {
        background-color: #707070;
        color: #E2A518;
        transition: transform 0.5s, border 0.3s;
        cursor: pointer;
    }

    menu {
        display: none;
        font-family: 'Lato', sans-serif;
        font-weight: bolder; 
        font-size: 1.0em;
        margin: auto;
    }
   
    menu > ul {
        list-style-type: none;
        padding: 5px;   
    }

    menu > ul > li > a {
        display: block;
        padding: 10px;
        text-decoration: none;
        font-size: 3.5vw;
        text-align: center;
        background-color: #E2A518;
        color: #35363A;
        border-top: 1px solid #35363A;
        border-radius: 15px;
    }

    menu > ul > li > a:hover {
        border: 2px solid rgba(255, 255, 255, 0.600);
        transform: translate(-3px, -3px);
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.600);
        transition: transform 0.5s, border 0.3s;
    }
    
    button {
        border-radius: 40px;
    }

    button:hover {
        border: 2px solid rgba(255, 255, 255, 0.600);
        transform: translate(-3px, -3px);
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.600);
        transition: transform 0.5s, border 0.3s;
    } */   
</style>
