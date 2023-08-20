<template>
  <v-app class="bg-background">
    <admin-drawer>
      <v-row class="fill-height justify-center align-center">
        <img src="../assets/img/logo.png" width="500" height="500" alt="">
      </v-row>
    </admin-drawer>
  </v-app>
</template>

<script>
import AdminDrawer from "@/components/AdminDrawer"; // Ajusta la ruta a donde tengas el componente AdminDrawer
import { mapState } from 'vuex';
export default {
  name: "Admin",
  components: {
    AdminDrawer,
  },
  mounted() {
    if (this.token == null) {
      this.$router.push({
        name: "Login",
      });
    }
  },
  computed: {
    ...mapState({
      token: (state) => state.login.token,
    }),
  },
};
</script>

<style>
 .primary{
    color: var(--v-primary);
  }
</style>
