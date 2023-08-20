<template>
   <v-app-bar app class="bg-primary" elevation="0">
      <img src="../assets/img/verduras.png" width="30" height="30" alt="Logo" class="mx-4"/>
      <v-toolbar-title><b>Fruteria del puerto</b></v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
        class="bg-primary"
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
                  'text-primary')" 
                  class="text-primary mr-5"
          >
            {{ item.icon }}
          </v-icon>
          <span v-if="!rail" :title="item.text" :class="rail ? 'text-primary' 
                  : (isCurrentRoute(item.route) ?
                  'white' : 
                  'text-primary')" class="font-weight-bold">{{ item.text }}</span>
        </v-list-item>
        <v-list-item class="text-primary" prepend-icon="mdi-arrow-collapse" v-if="rail == false" @click.stop="rail = !rail" title="Contraer"></v-list-item>
        <v-list-item prepend-icon="mdi-arrow-expand" v-else @click.stop="rail = !rail"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="bg-background">
      <router-view />
    </v-main>
  </template>
  
  <script>
  import { mapState } from "vuex";
  
  export default {
    name: "AdminDrawer",
    data: () => ({
      rail: true,
      drawer: true,
      navigationItems: [
        { text: "Inicio", icon: "mdi-home", route: "/" },
        { text: "Clientes", icon: "mdi-account", route: "/clientes" },
        { text: "Punto de venta", icon: "mdi-point-of-sale", route: "/punto-de-venta" },
        { text: "Ventas", icon: "mdi-chart-arc", route: "/ventas" },
        { text: "Calculadora rápida", icon: "mdi-calculator", route: "/calculadora" },
        { text: "Reportes", icon: "mdi-file", route: "/reportes" },
      ],
    }),
    methods: {
      navigateTo(route) {
        this.$router.push(route);
        this.drawer = false;
        this.currentRoute = route;
      },
      isCurrentRoute(route) {
      return this.currentRoute === route;
    },
    },
    computed: {
      ...mapState({
        token: (state) => state.login.token,
      }),
      currentRoute() {
      return this.$route.path; // Obtiene la ruta actual de Vue Router
    },
    },
  };
  </script>
  
  <style>
  </style>
  