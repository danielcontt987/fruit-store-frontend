<template>
  <v-app class="bg-background">
    <admin-drawer>
        <v-container>
          <v-card class="rounded-lg">
              <v-card-title class="bg-primary">
                      <v-row class="mx-3 mt-0 mb-0">
                        <v-col cols="12" sm="7" md="7" lg="9">
                              <h4>
                                  Clientes
                              </h4>
                        </v-col>
                        <v-col cols="12" sm="5" md="5" lg="3">
                            <v-btn
                                rounded
                                class="rounded-lg text-primary mx-lg-1 text-lg-right text-md-center text-sm-center text-center p-1"
                                depressed
                                block
                                color="white"
                                @click="dialogCard = true">
                                Agregar nuevo cliente
                            </v-btn>
                        </v-col>
                      </v-row>
              </v-card-title>
              <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                        label="Buscar"
                        variant="outlined"
                        class="mt-5"
                        clearable
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Buscar"
                        variant="outlined"
                        class="mt-5"
                        clearable
                        type="date"
                        />
                    </v-col>
                 </v-row>
              </v-card-text>
          </v-card>
        </v-container>
    </admin-drawer>
  </v-app>
</template>

<script>
import AdminDrawer from "@/components/AdminDrawer.vue";


export default {
  name:"Client",
  components:{
    AdminDrawer: AdminDrawer
  },
  mounted(){

  },

  data: () => ({
    currentDate: new Date(),
  })

}
</script>

<style>

</style>