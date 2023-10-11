<template>
    <v-select 
    label="Clientes" 
    variant="outlined" 
    chips
    closable-chips
    color="primary" 
    v-model="client" 
    :items="clients" 
    item-title="name"
    @update:model-value="consultClient" 
    item-value="id"
    prepend-inner-icon="mdi-barcode" 
    :no-data-text="textClient" 
    return-object />
</template>

<script>
import { mapState } from 'vuex';
export default {
    created() {
        this.client = { id: 0, name: "Cliente general" };
    },
    mounted() {
        this.listClient();
    },
    data: () => ({
        textClient: "No hay clientes disponibles",
        client: null,
    }),
    methods:{
        listClient(){
            let user = JSON.parse(this.user);
            let params = {
                user_id: user.id,
                business_id: user.business_id,
                token: this.token,
                server: this.server
            };
            this.$store.dispatch("inputs/listClient", params);
        },
        consultClient() {
            this.$store.dispatch("inputs/setClient", JSON.parse(this.user));
        }
    },
    computed: {
        ...mapState({
            user: (state) => state.login.user,
            token: (state) => state.login.token,
            server: (state) => state.login.server,
            clients: (state) => state.inputs.clients,
        })
    },
}
</script>

<style></style>