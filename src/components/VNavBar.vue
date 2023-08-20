<template>
  <v-app-bar app class="bg-primary">
     <img src="../assets/img/verduras.png" width="30" height="30" alt="Logo" class="mx-4"/>
     <v-spacer></v-spacer>
     <v-menu bottom>
          <template v-slot:activator="{on: menu}">
              <v-tooltip bottom>
                  <template v-slot:activator="{on: tooltip}">
                      <v-btn v-on="{...tooltip, ...menu}" class="bg-white" icon>
                          <v-icon>mdi-person</v-icon>
                      </v-btn>
                  </template>
                  <span>Ver perfil</span>
              </v-tooltip>
          </template>
          <v-list shaped>
              <v-list-item>
                  <v-icon>mdi-account</v-icon>
                  <v-list-item-content>
                      <v-list-item-title>
                          <router-link
                             >
                              {{ "Daniel Contreras" }}
                          </router-link>
                      </v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                  <v-list-item-icon>
                      <v-icon>mdi-logout</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                      <v-list-item-title>
                          Cerrar sesión
                      </v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
          </v-list>
     </v-menu>

   </v-app-bar>
   <v-navigation-drawer
      v-if="this.$vuetify.display.xs"
       :class="rail == false ? 'bg-primary' : 'bg-white'"
       v-model="drawer"
       :rail="rail"
       permanent
       @click="rail = false"
       :style="drawerWidthStyle"
     >
     <v-list density="compact" nav v-if="rail == true">
       <v-list-item
         v-for="(item, index) in navigationItems"
         :key="index"
         @click="navigateTo(item.route)"
         :class="{ 'bg-primary': isCurrentRoute(item.route) }"
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
       </v-list-item>
       <v-list-item class="text-primary" prepend-icon="mdi-arrow-collapse" v-if="rail == false" @click.stop="rail = !rail" title="Contraer"></v-list-item>
       <v-list-item prepend-icon="mdi-arrow-expand" v-else @click.stop="rail = !rail"></v-list-item>
     </v-list>
     <v-list v-else>
      <v-container>
          <v-row class="mb-5 mt-2">
            <v-icon class="text-center mx-3" @click.stop="rail = !rail" style="font-size: 30px;">mdi-close</v-icon><span @click.stop="rail = !rail" class="my-1"><b>Cerrar</b></span>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-card flat class="rounded-lg">
                <v-card-text class="d-flex flex-column align-center justify-center text-center" @click="goToClients()" >
                  <v-icon class="text-primary" size="48">mdi-home</v-icon>
                  <h3 class="mt-2 text-secondary_dark">Inicio</h3>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
       </v-container>
       <v-list-item class="text-primary" prepend-icon="mdi-arrow-collapse" v-if="rail == false" @click.stop="rail = !rail" title="Contraer"></v-list-item>
       <v-list-item prepend-icon="mdi-arrow-expand" v-else @click.stop="rail = !rail"></v-list-item>
     </v-list>
   </v-navigation-drawer>
   <slot></slot>
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
      goToClients(){
        this.rail = !this.rail;
        this.$router.push('/clientes')
      }
   },
   computed: {
     ...mapState({
       token: (state) => state.login.token,
     }),
      currentRoute() {
        return this.$route.path; // Obtiene la ruta actual de Vue Router
      },
      drawerWidthStyle() {
        if (this.$vuetify.display.xs) {
          return {  width: this.rail ? '55px' : '100%' }; // Ancho específico para xs
        }
      },
   },
 };
 </script>
 
 <style>
.img-responsive {
  width: 100%;
  height: auto;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #2d2d2d72;
  z-index: 1; /* Colocar el overlay sobre la imagen */
}
 </style>
 