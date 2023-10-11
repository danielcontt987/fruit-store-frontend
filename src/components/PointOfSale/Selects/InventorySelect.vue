<template>
    <v-select 
    label="Almacén" 
    variant="outlined" 
    ariant="outlined" 
    chips
    closable-chips
    color="primary" 
    v-model="stock" 
    :items="stocks" 
    item-title="name"
    @update:model-value="consultStock" 
    item-value="id"
    prepend-inner-icon="mdi-barcode" 
    :no-data-text="textStock" 
    return-object />
</template>

<script>
import { mapState } from 'vuex';
export default {
    created() {
        this.stock = { id: 0, name: "Seleccione un almacén" };
    },
    mounted() {
        
    },
    data: () => ({
        textStock: "No hay áreas disponibles",
        stock: null,
    }),
    methods:{
        consultStock() {
            this.$store.dispatch("inputs/setStock", JSON.parse(JSON.stringify(this.stock)));
        }
    },
    computed: {
        ...mapState({
            user: (state) => state.login.user,
            token: (state) => state.login.token,
            server: (state) => state.login.server,
            stocks: (state) => state.inputs.stocks,
            area: (state) => state.inputs.area
        })
    },
}
</script>

<style></style>