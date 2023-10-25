<template>
    <v-container fluid>
        <v-dialog
            v-model="showDialogButton"
            persistent
            max-width="450"
            v-if="showDialogButton"
        >
            <v-card class="ma-0" style="overflow: hidden !important;border-radius: 12px;">
                <v-card-title class="text-center">
                    <v-row>
                        <v-col cols="12" class="text-center mb-2">
                            <v-icon size="84" :color="color">{{ icon }}</v-icon>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-card-title class="text-center" style="font-weight: bold; word-break: break-word;" :class="colorClass"  v-if="title">
                    {{ title }}
                </v-card-title>
                <v-card-text class="text-center" style="font-size: 18px; word-break: break-word;">
                    {{ msg }}
                </v-card-text >
                <v-card-actions class="justify-center">
                    <slot></slot>
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
            this.$store.dispatch("alerts/closeDialogButtons");
        },
    },
    computed: {
        ...mapState({
            showDialogButton: state => state.alerts.showDialogButton,
            msg:        state => state.alerts.msg,
            title:      state => state.alerts.title,
            color:      state => state.alerts.color,
            icon:       state => state.alerts.icon
        }),
        colorClass() {
            return this.color  + '--text';
        }
    }
};
</script>
