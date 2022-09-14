<script lang="ts">
    import { onMount } from "svelte";

    import { userLoggedIn } from "./stores/login";
    import { Page, currentPage } from "./stores/pages";
    import apiRequest from "./api/requests";

    import Header from "./components/Header.svelte";
    import LandingPage from "./components/LandingPage.svelte";
    import Footer from "./components/Footer.svelte";

    import Login from "./components/Login.svelte";
    import Register from "./components/Register.svelte";

    import Map from "./components/Map.svelte";


    const pageMap = {
        [Page.Main]: LandingPage,
        [Page.Login]: Login,
        [Page.Register]: Register
    }

    onMount( async () => {
        let r = await apiRequest("/api/v1/auth/isauthenticated", 'get');
        if( r.ok ) {
            userLoggedIn.set(true);
        }
    });

</script>

<header>
    <Header/>    
</header>

<main class="container">
    <svelte:component this={pageMap[$currentPage]}/>
</main>

<footer>
    <Footer/>
</footer>

<style> 

main.container {
    margin: 0px;
    padding: 0px;
}
    
    @media (min-width: 640px) {
	}
</style>