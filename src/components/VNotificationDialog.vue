<template>
    <v-container fluid>
        <v-dialog
            v-model="showDialog"
            persistent
            max-width="450"
            v-if="showDialog">
            <v-card class="ma-0 notification-card"  style="overflow: hidden !important">
                <v-card-title class="text-center">
                    <v-row>
                        <v-col cols="12" class="text-center mb-2">
                            <v-icon size="84" class=".animated-icon" :color="color">{{ icon }}</v-icon>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-card-title
                    class="text-center"
                    style="font-weight: bold; word-break: break-word"
                    :class="colorClass"
                    v-if="title">
                    <v-row class="mx-0">
                        <v-col cols="12" class="text-center">
                            {{ title }}
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-card-text
                    class="text-center"
                    style="font-size: 18px; word-break: break-word">
                    <span v-html="msg"></span>
                </v-card-text>
                <v-card-actions class="mb-3" v-if="type === 0">
                    <v-row class="mx-0">
                        <v-col class="text-center">
                            <v-btn
                                class="bg-primary rounded-lg white--text"
                                large
                                depressed
                                block
                                @click="closeDialog()">
                                Entendido
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import {mapState} from "vuex";
export default {
    methods: {
        closeDialog() {
            this.$store.dispatch("alerts/closeDialog");
        },
        closeDialogReturn() {
            this.$store.dispatch("alerts/closeDialog");
            this.$router.go(-1);
        },
        closeDialogRoute() {
            this.$store.dispatch("alerts/closeDialog");
            this.$router.push(this.ruta);
        },
    },
    computed: {
        ...mapState({
            showDialog: (state) => state.alerts.showDialog,
            msg: (state) => state.alerts.msg,
            title: (state) => state.alerts.title,
            color: (state) => state.alerts.color,
            icon: (state) => state.alerts.icon,
            textOk: (state) => state.alerts.textOk,
            type: (state) => state.alerts.type,
        }),
        colorClass() {
            return this.color + "--text";
        },
    },
};
</script>

<style scoped>
.notification-card {
  animation: slideIn 0.3s ease-in-out;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animated-icon {
  animation: drawCheck 1s ease-in-out forwards;
  opacity: 0;
}

@keyframes drawCheck {
  0% {
    opacity: 0;
    stroke-dasharray: 0, 100;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    stroke-dasharray: 100, 100;
    transform: scale(1);
  }
}
</style>