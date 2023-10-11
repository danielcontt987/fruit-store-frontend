<template>
  <v-select 
    label="Área" 
    variant="outlined" 
    ariant="outlined" 
    chips
    closable-chips
    color="primary" 
    v-model="area" 
    :items="areas" 
    item-title="name"
    @update:model-value="consultAreas" 
    item-value="id"
    prepend-inner-icon="mdi-barcode" 
    :no-data-text="textArea" 
    return-object
  />
</template>

<script>
import { mapState } from 'vuex';

export default {
  created() {
    this.area = { id: 0, name: "Seleccione un área" };
  },
  mounted() {
    this.listArea();
  },
  data: () => ({
    textArea: "No hay áreas disponibles",
    area: null,
  }),
  methods: {
    listArea() {
      let user = JSON.parse(this.user);
      let params = {
        user_id: user.id,
        business_id: user.business_id,
        token: this.token,
        server: this.server
      };
      this.$store.dispatch("inputs/listArea", params);
    },
    // listStock() {
    //     
    // },
    consultAreas() {
      this.$store.dispatch("inputs/setArea", JSON.parse(JSON.stringify(this.area)));
      if (this.area.id != 0) {
          let params = {
              area_id: this.area.id,
              token: this.token,
              server: this.server
          }
          this.$store.dispatch("inputs/listStock", params);
      }
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.login.user,
      token: (state) => state.login.token,
      server: (state) => state.login.server,
      areas: (state) => state.inputs.areas
    })
  },
};
</script>

<style>
</style>
