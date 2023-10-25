<template>
  <v-app class="bg-background">
    <admin-drawer>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-text-field variant="outlined" label="Buscar" />
          </v-col>
          <v-col cols="6" sm="4" md="4" lg="3" @click="$router.push({name: 'Client'})">
            <div class="rounded-card d-flex justify-center align-center flex-column py-5">
              <v-icon class="mb-2 icon-text text-primary" style="font-size: 4rem">mdi-account-circle</v-icon>
              <h4 class="icon-text px-4 text-center d-inline-block text-truncate text-primary">
                {{ "Clientes" }}
              </h4>
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="4" lg="3">
            <div class="rounded-card d-flex justify-center align-center flex-column py-5">
              <v-icon class="mb-2 icon-text text-primary" style="font-size: 4rem">mdi-account-group</v-icon>
              <h4 class="icon-text px-4 text-center d-inline-block text-truncate text-primary">
                {{ "Usuarios" }}
              </h4>
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="4" lg="3" @click="$router.push({name: 'PointOfSale'})">
            <div class="rounded-card d-flex justify-center align-center flex-column py-5">
              <v-icon class="mb-2 icon-text text-primary" style="font-size: 4rem">mdi-point-of-sale</v-icon>
              <h4 class="icon-text px-4 text-center d-inline-block text-truncate text-primary">
                {{ "Punto de venta" }}
              </h4>
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="4" lg="3">
            <div class="rounded-card d-flex justify-center align-center flex-column py-5">
              <v-icon class="mb-2 icon-text text-primary" style="font-size: 4rem">mdi-package-variant-closed</v-icon>
              <h4 class="icon-text px-4 text-center d-inline-block text-truncate text-primary">
                {{ "Almacén" }}
              </h4>
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="4" lg="3">
            <div class="rounded-card d-flex justify-center align-center flex-column py-5">
              <v-icon class="mb-2 icon-text text-primary" style="font-size: 4rem">mdi-store</v-icon>
              <h4 class="icon-text px-4 text-center d-inline-block text-truncate text-primary">
                {{ "Áreas" }}
              </h4>
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="4" lg="3">
            <div class="rounded-card d-flex justify-center align-center flex-column py-5">
              <v-icon class="mb-2 icon-text text-primary" style="font-size: 4rem">mdi-currency-usd</v-icon>
              <h4 class="icon-text px-4 text-center d-inline-block text-truncate text-primary">
                {{ "Gastos" }}
              </h4>
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="4" lg="3">
            <div class="rounded-card d-flex justify-center align-center flex-column py-5">
              <v-icon class="mb-2 icon-text text-primary" style="font-size: 4rem">mdi-bank</v-icon>
              <h4 class="icon-text px-4 text-center d-inline-block text-truncate text-primary">
                {{ "Bancos" }}
              </h4>
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="4" lg="3">
            <div class="rounded-card d-flex justify-center align-center flex-column py-5">
              <v-icon class="mb-2 icon-text text-primary" style="font-size: 4rem">mdi-chart-arc</v-icon>
              <h4 class="icon-text px-4 text-center d-inline-block text-truncate text-primary">
                {{ "Estadísticas de ventas" }}
              </h4>
            </div>
          </v-col>
        </v-row>
      </v-container>
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
  },
  computed: {
    ...mapState({
      token: (state) => state.login.token,
      userId: (state) => state.login.userId,
      user: (state) => state.login.user,
    }),
  },
};
</script>

<style>
.primary {
  color: var(--v-primary);
}


.rounded-card {
  border-radius: 1rem !important;
  background-color: transparent;
  transition: 100ms;
  -webkit-box-shadow: inset 0px 0px 0px 2px #192a67;
  -moz-box-shadow: inset 0px 0px 0px 2px #192a67;
  box-shadow: inset 0px 0px 0px 2px #192a67;
}

.rounded-card:hover {
  background-color: #192a67;
  cursor: pointer;
  border: none;
  transition: 400ms;
}

.rounded-card:hover .icon-text {
  color: #fff !important;
}
</style>
