<template>
  <v-app-bar app class="bg-primary" elevation="0">
    <img src="../assets/img/verduras.png" width="30" height="30" alt="Logo" class="mx-4" />
    <v-toolbar-title><b>Fruteria del puerto</b></v-toolbar-title>
    <template v-slot:append>
      <v-btn shaped class="radius-botton">
        <v-icon>mdi-account</v-icon>
        <v-menu activator="parent">
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <span class="text-black ml-2">Mi perfil</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <span class="text-black ml-2">Cerrar sesión</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </template>
  </v-app-bar>
  <!-- <v-navigation-drawer
        class="bg-white"
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
      <v-list density="compact" nav>
        <v-list-item
          v-for="(item, index) in navigationItems"
          :key="index"
          @click="navigateTo(item.route)"
          :class="{ 'bg-secondary': isCurrentRoute(item.route) }"
        >
          <v-icon v-if="rail" 
                  :title="item.text"    
                  :color="rail ? 'text-primary' 
                  : (isCurrentRoute(item.route) ?
                  'white' : 
                  'text-primary')"
                :class="[rail ? '' : 'mx-2', { 'mr-5': !rail && !isCurrentRoute(item.route) }]"
          >
            {{ item.icon }}
          </v-icon>
          <v-icon v-if="rail == false" 
                  :title="item.text"  
                  :color="rail ? 'text-primary' 
                  : (isCurrentRoute(item.route) ?
                  'white' : 
                  'text-white')" 
                  class="text-white mr-5"
          >
            {{ item.icon }}
          </v-icon>
          <span v-if="!rail" :title="item.text" :class="rail ? 'text-primary' 
                  : (isCurrentRoute(item.route) ?
                  'white' : 
                  'text-white')">{{ item.text }}</span>
        </v-list-item>
        <v-list-item class="text-primary" 
        v-if="rail == false" 
        @click.stop="rail = !rail" 
        title="Contraer">
        <v-icon
             class="text-white mr-5"    
          >
          mdi-arrow-collapse
          </v-icon>
          <span class="text-white">
            Contraer
          </span>
      </v-list-item>
        <v-list-item class="text-white" prepend-icon="mdi-arrow-expand" v-else @click.stop="rail = !rail">
          <v-icon
             class="text-white"    
          >
            mdi-arrow-expand
          </v-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
  <v-main class="bg-background">
    <router-view />
    <slot></slot>
  </v-main>
</template>
  
<script>
import { mapState } from "vuex";
export default {
  beforeCreate(){
    this.$store.dispatch('alerts/closeDialogProgress');   
  },
  name: "AdminDrawer",
  data: () => ({
    items: ['Item 1', 'Item 2', 'Item 3'],
    // rail: true,
    // drawer: true,
    // navigationItems: [
    //   { text: "Inicio", icon: "mdi-home", route: "/" },
    //   { text: "Clientes", icon: "mdi-account", route: "/clientes" },
    //   { text: "Punto de venta", icon: "mdi-point-of-sale", route: "/punto-de-venta" },
    //   { text: "Ventas", icon: "mdi-chart-arc", route: "/ventas" },
    //   { text: "Calculadora rápida", icon: "mdi-calculator", route: "/calculadora" },
    //   { text: "Reportes", icon: "mdi-file", route: "/reportes" },
    // ],
  }),
  methods: {
    //   navigateTo(route) {
    //     this.$router.push(route);
    //     this.drawer = false;
    //     this.currentRoute = route;
    //   },
    //   isCurrentRoute(route) {
    //   return this.currentRoute === route;
    // },
  },
  computed: {
    ...mapState({
      token: (state) => state.login.token,
      userId: (state) => state.login.userId,
    }),
    currentRoute() {
      // return this.$route.path; // Obtiene la ruta actual de Vue Router
    },
  },
};
</script>
  
<style>

</style>
  