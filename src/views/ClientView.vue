<template>
  <v-app class="bg-background">
    <admin-drawer>
      <v-container fluid>
        <v-row>
          <v-col cols="12" lg="2" md="2" sm="2" xs="2" class="ml-3">
            <back-button @backAction="$router.push('/admin')"></back-button>
          </v-col>
          <v-col cols="12">
            <card-client :token="token" :userId="userId" :clients="clients" :listClient="listClient" />
          </v-col>
        </v-row>
      </v-container>
    </admin-drawer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import AdminDrawer from "@/components/AdminDrawer.vue";
import CardClient from "@/components/CardClient.vue";
import BackButton from '@/components/Buttons/BackButton.vue';

export default {
  name: "Client",
  components: {
    AdminDrawer,
    CardClient,
    BackButton,
  },
  mounted() {
    if (this.token == null) {
      this.$router.push({
        name: "Login",
      });
    }

    this.listClient();
  },

  data: () => ({
    currentDate: new Date(),
    search: "",
    date: "",
    date2: "",
    itemsPerPage: 5,

  }),

  methods: {
    listClient() {
      let params = {
        id: this.userId
      }
      this.$store.dispatch('clients/listClient', params, this.token);
    },
  },

  computed: {
    ...mapState({
      token: (state) => state.login.token,
      userId: (state) => state.login.userId,
      clients: (state) => state.clients.clients,
      boldHeaderClass() {
        return 'font-weight-bold';
      },
    }),
  }

}
</script>

<style scoped>
.v-data-table-header__content {
  font-weight: bold;
}
</style>