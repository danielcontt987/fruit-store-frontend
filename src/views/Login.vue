<template>
    <v-container fluid class="login-container bg-primary">
        <v-row class="fill-height justify-center align-center">
            <v-form lazy-validation ref="form">
                <v-card class="text-center responsive-card" width="40vw" height="20 vw">
                    <v-card-title>
                        <h3 class="text-center">Iniciar sesión</h3>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field color="primary" prepend-inner-icon="mdi-email" label="Correo eléctronico"
                                    v-model="email" :rules="emailRules" variant="outlined" />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field color="primary" label="Contraseña"
                                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showPassword ? 'text' : 'password'" @click:append-inner="toggleShowPassword()"
                                    v-model="password" variant="outlined" />
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-row class="mx-0">
                            <v-col cols="12" lg="6">
                                <v-btn block depressed class="rounded-lg text-fail">
                                    Olvide mi contraseña
                                </v-btn>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <v-btn block depressed @click="loginUser()" class="bg-primary rounded-lg white--text">
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
                    <v-btn class="rounded-lg" large depressed block color="gremti white--text" @click="closeDialog()">
                        Entendido
                    </v-btn>
                </v-col>
            </v-row>
        </v-notification-dialog>
        <alert-progress>
            <div class="sk-chase">
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
            </div>
        </alert-progress>
    </v-container>
</template>

<script>
import VNotificationDialog from '@/components/VNotificationDialog.vue';
import AlertProgress from '@/components/Alert/AlertProgress.vue';

export default {
    components: {
        VNotificationDialog, AlertProgress
    },
    name: "Login",

    data: () => ({
        email: "",
        password: "",
        showPassword: false,
        emailRules: [
            v => !!v || 'Favor de llenar el email',
        ]
    }),
    methods: {
        toggleShowPassword() {
            this.showPassword = !this.showPassword;
        },
        async loginUser() {
            try {
                this.$store.dispatch("alerts/setProgress", {
                    color: "primary",
                    icon: "mdi-apple-icloud",
                    msg: "Espere un momento",
                });

                let params = {
                    email: this.email,
                    password: this.password
                }

                const res = await this.$store.dispatch('login/loginUser', params);

                localStorage.setItem('authToken', res.data.token);
                localStorage.setItem('user', res.data.user);
                await this.$router.push({
                    name: 'Admin'
                });
            } catch (err) {
                this.$store.dispatch('alerts/closeDialogProgress');   
                this.$store.dispatch("alerts/setDialog", {
                color: "fail",
                icon: "mdi-close-circle-outline",
                title: "Hubo un error",
                msg: 'Favor de ingresar un usuario y contraseña valido ó verifique su conexión su internet',
                type: 0,
            });          
            }
        },
        
        closeDialog() {
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

    max-width: 750px;
    /* Ancho máximo permitido */
    margin-top: 15rem;
    /* Centrar horizontalmente */
    margin-bottom: 13.5rem;
    overflow: hidden;
    border-radius: 8px;
}

.sk-chase {
  margin: auto;
  width: 40px;
  height: 40px;
  position: relative;
  animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0; 
  animation: sk-chase-dot 2.0s infinite ease-in-out both; 
}

.sk-chase-dot:before {
  content: '';
  display: block;
  width: 25%;
  height: 25%;
  background-color: #001f4a;
  border-radius: 100%;
  animation: sk-chase-dot-before 2.0s infinite ease-in-out both; 
}

.sk-chase-dot:nth-child(1) { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2) { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3) { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4) { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5) { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6) { animation-delay: -0.6s; }
.sk-chase-dot:nth-child(1):before { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2):before { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3):before { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4):before { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5):before { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6):before { animation-delay: -0.6s; }

@keyframes sk-chase {
  100% { transform: rotate(360deg); } 
}

@keyframes sk-chase-dot {
  80%, 100% { transform: rotate(360deg); } 
}

@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4); 
  } 100%, 0% {
    transform: scale(1.0); 
  } 
}
</style>