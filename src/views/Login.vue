<template>
    <v-container fluid class="login-container bg-primary">
        <v-row class="fill-height justify-center align-center">
            <v-form lazy-validation ref="form">
                <v-card class="text-center mx-auto responsive-card">
                    <v-card-title>
                        <h3 class="text-center">Iniciar sesión</h3>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                        <v-col cols="12">
                            <v-text-field
                            color="primary"
                            prepend-inner-icon="mdi-email"
                            label="Correo eléctronico"
                            v-model="email"
                            :rules="emailRules"
                            variant="outlined"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                color="primary"
                                label="Contraseña"
                                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                @click:append-inner="toggleShowPassword()"
                                v-model="password"
                                variant="outlined"
                            />
                        </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-row class="mx-0">
                            <v-col cols="12" lg="6">
                                <v-btn
                                    block
                                    depressed
                                    class="rounded-lg primary--text"
                                    >
                                    Olvide mi contraseña
                                </v-btn>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <v-btn
                                    block
                                    depressed
                                    @click="loginUser()"
                                    class="bg-primary rounded-lg white--text"
                                    >
                                    Iniciar sesión
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-row>
        <v-notification-dialog>
              <v-row class="mx-0">
                  <v-col class="text-center">
                      <v-btn
                          class="rounded-lg"
                          large
                          depressed
                          block
                          color="gremti white--text"
                          @click="closeDialog()"
                      >
                          Entendido
                      </v-btn>
                  </v-col>
              </v-row>
          </v-notification-dialog>
    </v-container>
</template>

<script>
import VNotificationDialog from '@/components/VNotificationDialog.vue';

export default{
    components:{
        VNotificationDialog: VNotificationDialog
    },
    name: "Login",

    data: () =>({
        email: "",
        password: "",
        showPassword: false,
        emailRules: [
            v => !!v || 'Favor de llenar el email',
        ]
    }),
    methods:{
        toggleShowPassword() {
            this.showPassword = !this.showPassword;
        },
        loginUser(){
            
            let params = {
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('login/loginUser', params)
                .then((res) =>{
                    localStorage.setItem('authToken', res.data.token);
                    this.$router.push({
                        name: 'Admin'
                    });
                }).catch(() => {

            });

        },
        closeDialog(){
            this.$store.dispatch('alerts/closeDialog');
        }
    },
}

</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}
.responsive-card {
  width: 100%; /* Ancho máximo */
  max-width: 750px; /* Ancho máximo permitido */
  margin: 0 auto; /* Centrar horizontalmente */

  /* Agregar clases de Vuetify para diseño responsivo */
  @media only screen and (max-width: $vuetify.breakpoint.smAndDown) {
    max-width: 100%; /* Ancho completo en dispositivos pequeños */
  }
  @media only screen and (min-width: $vuetify.breakpoint.md) and (max-width: $vuetify.breakpoint.lg - 1) {
    max-width: 90%; /* Ancho personalizado en dispositivos medianos */
  }
  /* Agregar más reglas de medios según sea necesario */
}
</style>