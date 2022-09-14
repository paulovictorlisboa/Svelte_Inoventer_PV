<script lang="ts">
    import { userLoggedIn } from "../stores/login";
    import apiRequest from '../api/requests';
    
    let user = {
        email: "",
        password: ""
    }

    let error: string | null = null;

    async function submit() {
        let r = await apiRequest("api/v1/auth/login", 'POST', {email: user.email, password: user.password});

        if( r.ok ) {
            error = null;
            userLoggedIn.set(true);
        }
        else {
            error = (await r.json()).error;
        }
    }

</script>


<form
    on:submit|preventDefault={submit}
    class="center"
>

    <div class="form-group">
        <label for="email">E-mail</label>
        <input
            id="email"
            type="email"
            class="form-control"
            placeholder="exemplo@email.com"
            name="email"
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
            bind:value={user.password}
        />
    </div>

    <button
        type="submit"
        class="btn_login"
    >
        Iniciar Sessão
    </button>

    {#if error !== null}
        <div>
            <p class="input-unsatisfied">{error}</p>
        </div>
    {/if}

</form>

<style>
    * {
        margin: 0px;
        padding: 0px;
        font-size: 1em;
        font-family: 'Lato', sans-serif;        
    }

    div {
        padding-bottom: 10px;
    }

    button {
        margin-top: 20px;
    }

    .input-unsatisfied {
        background-color: red;
    }

    .btn_login {
        font-family: 'Lato', sans-serif;
        font-weight:bolder;
        color: black;
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

    .btn_login:hover {
        border: 2px solid rgba(255, 255, 255, 0.600);
        transform: translate(-3px, -3px);
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.600);
        /* transition: transform 0.5s, border 0.3s; */
    }  

    .form-control:focus {
        border-color:#707070;
        box-shadow: 0 0 0 0.25rem #e2a51889;
    }
</style>