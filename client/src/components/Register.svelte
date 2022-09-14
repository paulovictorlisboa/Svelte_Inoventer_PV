<script lang="ts">
    import apiRequest from "../api/requests";
    import { Page, currentPage } from "../stores/pages";



    let user = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }

    let error: string | null = null;

    $: validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email);
    $: validPassw = user.password.length >= 6;


    async function submit() {
        let r = await apiRequest("api/v1/auth/register", "POST", user);
        if( r.ok ) {
            error = null;
            currentPage.set(Page.Login);
        }
        else {
            error = (await r.json()).error;
        }
    }

</script>


<h1>Exemplo de Formulário</h1>

<form id="formulario" on:submit|preventDefault={submit}>
    <legend>Dados Pessoais</legend>

    <div class="form-group">
        <label for="nome">Nome</label>
        <input
            id="nome"
            type="text"
            class="form-control"
            minlength=2
            maxlength=20
            name="nome"
            required
            bind:value={user.firstName}
        />

    </div>

    <div class="form-group">
        <label for="sobrenome">Sobrenome</label>
        <input
            id="sobrenome"
            type="text"
            class="form-control"
            minlength=2
            maxlength=20
            name="sobrenome"
            required
            bind:value={user.lastName}
        />
    </div>

    <div class="form-group">
        <label for="email">E-mail</label>
        <input
            id="email"
            type="email"
            class="form-control"
            placeholder="exemplo@email.com"
            name="email"
            required
            bind:value={user.email}
        />

    </div>

    <div class="form-group">
        <label for="password">Senha</label>
        <input
            id="password"
            type="password"
            class="form-control"
            name="password"
            minlength=6
            maxlength=30
            required
            bind:value={user.password}
        />
    </div>

    
    <button
        disabled={ !(validEmail && validPassw) }
        type="submit"
        class="btn btn-primary"
        >
        Iniciar Sessão
    </button>
    
    {#if error !== null}
        <div>
            <p class="input-unsatisfied">{error}</p>
        </div>
    {/if}

    <div>
        <p class={ validEmail ? "input-satisfied" : "input-unsatisfied" }>Você deve inserir um endereço de e-mail válido</p>
        <p class={ validPassw ? "input-satisfied" : "input-unsatisfied" }>A sua senha deve possuir pelo menos 6 caracteres</p>
    </div>
    
</form>

<style>

    * {
        margin: 0px;
        padding: 0px;
    }

    form#fomulario {
        background-color: #707070;
    }

    button {
        margin: 20px 0 20px 0;
    }

    div {
        padding-bottom: 10px;
    } 
    
    div > p {
        margin: 0;
    }
    .input-satisfied {
        padding-top: 10px;
        background-color: green;
    }
    .input-unsatisfied {
        margin-top: 10px;
        background-color: red;
    }

    .btn {
        font-family: 'Lato', sans-serif;
        color: black;
        font-weight:bolder;
        font-size: 1.0em;
        margin: auto;
        height: 50px;
        width: 130px;    
        background-color: #E2A518;
        border: 1px solid #707070;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.400);
        box-sizing: border-box;
        border-radius: 50px;
        text-align: center;
    }

    .btn:hover {
        border: 2px solid rgba(255, 255, 255, 0.600);
        transform: translate(-3px, -3px);
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.600);
        /* transition: transform 0.5s, border 0.3s; */
    } 
</style>
