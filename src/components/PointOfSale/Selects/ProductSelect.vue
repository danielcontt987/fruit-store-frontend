<template>
    <v-autocomplete         
        label="Artículo" 
        variant="outlined" 
        ariant="outlined" 
        chips
        closable-chips
        clearable 
        color="primary" 
        v-model="product" 
        :items="products" 
        item-title="name"
        @update:model-value="addToSalePurchase"
        @keydown.enter="enterProduct"
        item-value="id"
        prepend-inner-icon="mdi-barcode" 
        :no-data-text="textProduct" 
        return-object />
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
        search: ""

    }),
    methods: {
        updateSearch(event) {
            this.search = event.target.value; // Actualizamos 'search' con el valor del campo de entrada
        },
        listProducts() {
            let params = {
                token: this.token,
                server: this.server,
                search: this.productSearch,
            }
            this.$store.dispatch('pointsales/listProducts', params);
        },
        enterProduct(e) {
            if (e.key === "Enter") {
                console.log(this.productSearch);
            }
        },
        consultProducts(){
            
        },
        addToSalePurchase(){
            if (this.product != null) {
                let productToSale = null
                productToSale =  JSON.parse(JSON.stringify(this.product));    
                productToSale.qty = 1;
                productToSale.total = 0;
                productToSale.subtotal = 0;
                this.$store.dispatch("pointsales/addToSalePurchase", productToSale);    
            }
        },
        listMethods() {
            this.listProducts();
        },
    },
    computed: {
        ...mapState({
            token: (state) => state.login.token,
            products: (state) => state.pointsales.products,
            server: (state) => state.login.server,
        }),
    }
}
</script>

<style></style>