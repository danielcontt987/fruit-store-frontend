<template>
    <div>
        <v-dialog v-model="openDialogSaleBox" :width="dialogWidth()" class="mt-0" persistent>
            <v-card class="rounded-lg overflow-hidden">
                <v-card-title class="bg-secondary_dark">
                    <v-row class="mx-3 mt-0 mb-0">
                        <v-col cols="12">
                            <h4 class="text-center p-0">
                                Abrir caja
                            </h4>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-form ref="formCreate">
                        <v-row no-gutters>
                            <v-col cols="12">
                                <v-alert color="primary" icon="mdi-alert" variant="outlined" class="text-center mt-3">
                                    No hay un corte de caja abierto.
                                    <strong>Es necesario abrir uno nuevo</strong>.<br />
                                    1. Selecciona una caja (Si no tienes una da clic en
                                    CREAR CAJA)
                                    <br />
                                    2. Ingresa el monto con el que abre la caja <br />
                                    3. Da clic en ACEPTAR y listo, podrás empezar a vender.
                                </v-alert>
                            </v-col>
                            <v-col cols="12" lg="6" class="pt-5">
                                <v-select v-model="salebox_id" variant="outlined" label="Seleccionar caja"
                                    :items="saleboxes" item-value="id" item-title="name" :rules="boxRules" />
                            </v-col>
                            <v-col cols="12" lg="6" class="text-center pt-4 pb-4">
                                <v-btn class="rounded-lg" flat color="primary" @click="openSalebox">
                                    <v-icon>mdi-plus</v-icon>
                                    Crear caja
                                </v-btn>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <v-text-field variant="outlined" label="Importe" v-model="amount" :rules="accountRules" />
                            </v-col>
                            <v-col cols="12">
                                <v-textarea filled rows="2" v-model="comment" variant="outlined" label="Comentarios" />
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-row class="mx-0">
                        <v-col cols="12" lg="6">
                            <v-btn block depressed class="rounded-lg text-fail" @click="closeDialogCashCut()">
                                Cerrar
                            </v-btn>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <v-btn block depressed class="bg-primary rounded-lg white--text" @click="storeCashCut()">
                                Aceptar
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="openCreateBox" :width="dialogWidthBox()">
            <v-card class="overflow-hidden">
                <v-card-title class="bg-primary">
                    <v-row class="mx-3 mt-0 mb-0">
                        <v-col cols="12">
                            <h4 class="text-center p-0">
                                Crear caja
                            </h4>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="salebox" variant="outlined" label="Nombre de la caja" />
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-row class="mx-0">
                        <v-col cols="12" lg="6">
                            <v-btn block depressed class="rounded-lg text-fail" @click="closeDialogBox">
                                Cerrar
                            </v-btn>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <v-btn block depressed class="bg-primary rounded-lg white--text" @click="storeSalebox">
                                Agregar
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-notification-dialog>
            <v-row class="mx-0">
                <v-col class="text-center">
                    <v-btn class="rounded-lg" large depressed block color="primary text-white" @click="closeDialog()">
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
    </div>
</template>

<script>
import AlertProgress from '@/components/Alert/AlertProgress.vue';
import VNotificationDialog from '@/components/VNotificationDialog.vue';

import { mapState } from 'vuex'
export default {
    components: {
        VNotificationDialog,
        AlertProgress,
    },
    mounted() {
        this.openDialogBox();
    },
    data: () => ({
        amount: 0,
        salebox_id: null,
        openDialogSaleBox: false,
        openCreateBox: false,
        salebox: "",
        comment: "",
        boxRules: [
            v => !!v || "Favor seleccionar una caja"
        ],
        accountRules: [
            v => {
                if (!v) return "Favor ingresar la cantidad"; // Comprueba si el campo está vacío

                if (isNaN(v)) return "Debe ser un número"; // Comprueba si el valor no es un número

                if (parseFloat(v) <= 0) return "Debe ser mayor que cero"; // Comprueba si es menor o igual a cero

                // Si pasa todas las validaciones anteriores, la entrada es válida.
                return true;
            }
        ],
    }),
    methods: {
        dialogWidth() {
            if (this.$vuetify.display.xl) {
                return "60vw";
            }
            if (this.$vuetify.display.lg) {
                return "50vw";
            }
            return "70vw";
        },
        dialogWidthBox() {
            if (this.$vuetify.display.xl) {
                return "25vw";
            }
            if (this.$vuetify.display.lg) {
                return "30vw";
            }
            return "70vw";
        },
        openDialogBox() {
            if (typeof this.user === "object") {
                let params = {
                    user_id: this.user.id,
                    business_id: this.user.business_id,
                    server: this.server,
                    token: this.token,
                    salebox_id: this.salebox_id != 0 ? this.salebox_id : 0
                }
                console.log("asq");

                this.$store.dispatch("pointsales/getSaleBox", params).then((res) => {
                    if (res.data.cashcut == null) {
                        this.listSalebox(params);
                    }
                    this.$store.dispatch('cashcuts/getCashCut', params).then((res) => {
                        if(res.data.cashcut === null){
                            this.openDialogSaleBox = true;
                        }else{
                            this.$store.dispatch('cashcuts/setCashCut', res.data.cashcut)
                        }
                    });
                });
            } else {
                let user = JSON.parse(this.user);
                let params = {
                    user_id: user.id,
                    business_id: user.business_id,
                    server: this.server,
                    token: this.token,
                    salebox_id: this.salebox_id != 0 ? this.salebox_id : 0
                }
                this.$store.dispatch('cashcuts/getCashCut', params).then((res) => {
                    if(res.data.cashcut === null){
                        this.listSalebox(params);
                        this.openDialogSaleBox = true;
                    }else{
                        this.listSalebox(params);
                        this.$store.dispatch('cashcuts/setCashCut', res.data.cashcut)
                    }
                });                
            }
        },
        openSalebox() {
            this.openCreateBox = true;
        },
        closeDialogBox() {
            this.openCreateBox = false;
            this.salebox = "";
        },
        storeSalebox() {
            let user = JSON.parse(this.user);
            let params = {
                user_id: user.id,
                token: this.token,
                server: this.server,
                salebox: this.salebox,
            }
            this.$store.dispatch('saleboxes/createSalebox', params).then((res) => {
                this.listSalebox(params);
                this.closeDialogBox();
                this.$store.dispatch("alerts/setDialog", {
                    color: "success",
                    icon: "mdi-check-circle-outline",
                    title: "Nueva caja",
                    msg: "Se ha creado una nueva caja",
                    type: 0,
                });

            }).catch((error) => {
                this.$store.dispatch("alerts/setDialog", {
                    color: "error",
                    icon: "mdi-close-circle-outline",
                    title: "Hubo un error",
                    msg: 'Verifique su conexión su internet ó intente más tarde',
                    type: 0,
                });
            })
        },
        listSalebox(params) {
            this.$store.dispatch('saleboxes/listSalebox', params);
        },
        async storeCashCut() {
            const { valid } = await this.$refs.formCreate.validate();
            if (valid) {
                let user = JSON.parse(this.user);
                let params = {
                    amount: this.amount,
                    salebox_id: this.salebox_id,
                    user_id: user.id,
                    server: this.server,
                    token: this.token,
                    business_id: user.business_id,
                    comment: this.comment,
                }
                this.$store.dispatch("alerts/setProgress", {
                    color: "primary",
                    icon: "mdi-apple-icloud",
                    msg: "Espere un momento",
                });
                this.$store.dispatch('cashcuts/createCashCut', params).then((res) => {
                    this.$store.dispatch("alerts/setDialog", {
                        color: "success",
                        icon: "mdi-check-circle-outline",
                        title: "Nuevo corte",
                        msg: "Se ha creado un nuevo corte ahora ya puedes vender",
                        type: 0,
                    });
                    this.closeDialogCashCut(params);
                    this.$store.dispatch('alerts/closeDialogProgress');
                }).catch((err) => {
                    this.$store.dispatch('alerts/closeDialogProgress');
                    this.$store.dispatch("alerts/setDialog", {
                        color: "error",
                        icon: "mdi-close-circle-outline",
                        title: "Hubo un error",
                        msg: 'Verifique su conexión su internet ó intente más tarde',
                        type: 0,
                    });
                });
            }

        },
        async closeDialogCashCut(params) {
            await this.$store.dispatch('cashcuts/getCashCut', params);
            this.openDialogSaleBox = false;
        },
    },
    computed: {
        ...mapState({
            user: (state) => state.login.user,
            token: (state) => state.login.token,
            server: (state) => state.login.server,
            saleboxes: (state) => state.saleboxes.saleboxes,
            cashcut: (state) => state.cashcuts.cashcut,
        }),
    }
}
</script>

<style scoped>
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

.sk-chase-dot:nth-child(1) {
    animation-delay: -1.1s;
}

.sk-chase-dot:nth-child(2) {
    animation-delay: -1.0s;
}

.sk-chase-dot:nth-child(3) {
    animation-delay: -0.9s;
}

.sk-chase-dot:nth-child(4) {
    animation-delay: -0.8s;
}

.sk-chase-dot:nth-child(5) {
    animation-delay: -0.7s;
}

.sk-chase-dot:nth-child(6) {
    animation-delay: -0.6s;
}

.sk-chase-dot:nth-child(1):before {
    animation-delay: -1.1s;
}

.sk-chase-dot:nth-child(2):before {
    animation-delay: -1.0s;
}

.sk-chase-dot:nth-child(3):before {
    animation-delay: -0.9s;
}

.sk-chase-dot:nth-child(4):before {
    animation-delay: -0.8s;
}

.sk-chase-dot:nth-child(5):before {
    animation-delay: -0.7s;
}

.sk-chase-dot:nth-child(6):before {
    animation-delay: -0.6s;
}

@keyframes sk-chase {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes sk-chase-dot {

    80%,
    100% {
        transform: rotate(360deg);
    }
}

@keyframes sk-chase-dot-before {
    50% {
        transform: scale(0.4);
    }

    100%,
    0% {
        transform: scale(1.0);
    }
}</style>