<template>
    <v-autocomplete
        flat
        label="Productos"
        variant="solo"
        :items="products"
        hide-selected
        item-title="name"
        v-model="product"
        clearable
        item-value="id"
        :no-data-text="textProduct"
        return-object
    >
    </v-autocomplete>
</template>

<script>
import { mapState } from 'vuex';

export default {
    mounted() {
        this.listMethods();
    },
    data: () => ({
        textProduct: "No hay productos",
        product: null,

    }),
    methods: {
        listMethods() {
            this.listProducts();
        },
        listProducts() {
            let params = {
                token: this.token,
                server: this.server
            }
            this.$store.dispatch('pointsales/listProducts', params);
        }
    },
    computed: {
        ...mapState({
            token: (state) => state.login.token,
            products: (state) => state.pointsales.products,
            server: (state) => state.login.server,
        })
    }
}
</script>

<style></style>