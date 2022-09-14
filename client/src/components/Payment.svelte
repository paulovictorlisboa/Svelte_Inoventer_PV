<script lang="ts">
    import type { Preference } from "../../../@types/mp-client";

    // class imported at runtime. used for setting up product orders with mercadopago
    // @ts-ignore
    const mercadopago = new MercadoPago(
        "APP_USR-2dfcb8f2-9d21-4247-97a5-8f9c493e1841",
        { locale: 'pt-BR' }
    );

    async function beginPurchase(preferenceId: number) {

        let pref: Preference = {
            id: preferenceId
        }

        mercadopago.checkout({
            preference: pref,
            autoOpen: true
        });
    }

    async function createPreference() {
        const orderData = {
            offer: 1
        }

        let preference = await fetch('payment/createpreference', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData)
        });

        let j = await preference.json();

        beginPurchase(j.id);
    }

</script>

<div class="container">
    <button class="btn btn-primary" on:click={createPreference}>Contratar</button>
</div>

