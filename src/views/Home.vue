<template>
  <v-app>
  <v-nav-bar>
    
  </v-nav-bar>
  <v-main>
      <v-row>
        <v-img
          src="../assets/img/background.jpg"
          alt=""
          class="img-responsive"
          >
            <div class="overlay"></div>
        </v-img>
        
        <v-col cols="12">
          <h3 class="mt-6 text-center" v-if="this.$vuetify.display.xs">Frutas de temporada</h3>
          <h1 class="mt-6 text-center" v-else>Frutas de temporada</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
        </v-col>
      </v-row>
      <v-row>
        <div class="whatsapp-button" @click="openWhatsApp()">
          <v-icon>mdi-whatsapp</v-icon>
        </div>
      </v-row>
      <v-row class="mb-10">
        <v-card
          class="mx-auto rounded-lg"
          flat
          max-width="344"
        >
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
              cover
            ></v-img>
            <v-card-title>
              Top western road trips
            </v-card-title>
            <v-card-subtitle>
              1,000 miles of wonder
            </v-card-subtitle>
        </v-card>
      </v-row>
    </v-main>
  <v-footer-fruit/>
  </v-app>
</template>

<script>
import VNavBar from '@/components/VNavBar.vue'
import VFooterFruit from '@/components/VFooter.vue'
import { mapState } from 'vuex';

export default {
  components:{
    VNavBar: VNavBar,
    VFooterFruit: VFooterFruit
  },
  data:() => ({

  }),

  mounted(){
    this.getData();
    console.log(this.$moment(this.date).format('MMMM Do YYYY, h:mm:ss a'));
    
  },

  methods:{
    getData(){
      // this.$store.dispatch('login/list');
    },
    openWhatsApp() {
      window.open('https://wa.me/3111230167', '_blank');
    },
    openFacebook() {
      window.open('https://www.facebook.com/PAGINA_DE_FACEBOOK', '_blank');
    }
  },

  computed:{
    ...mapState({
      // msg: (state) => state.login.msg
    })
  }
}
</script>

<style scoped>
  .whatsapp-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000; /* Asegura que el botón esté por encima de otros elementos */
    border-radius: 50%; /* Hace que el botón sea redondo */
    background-color: #25d366; /* Color de fondo de WhatsApp */
    color: white; /* Color del icono y el texto */
    padding: 12px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombra ligera */
    cursor: pointer;
    text-align: center;
  }

  .whatsapp-button:hover {
    background-color: #128c7e; /* Color de fondo al pasar el ratón */
  }
</style>
