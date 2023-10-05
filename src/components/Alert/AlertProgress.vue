<template>
    <v-container fluid>
        <v-dialog
            v-model="showDialogProgress"
            persistent
            max-width="450"
            v-if="showDialogProgress"
        >
            <v-card class="ma-0" style="overflow: hidden !important;">
                <v-card-title class="text-center">
                    <v-row>
                        <v-col cols="12" class="text-center mb-2">
                            <v-icon size="84" :color="color">{{ icon }}</v-icon>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <slot></slot>
                </v-card-text>
                <v-card-text class="text-center" style="font-size: 18px; word-break: break-word;">
                    <span v-html="msg"></span>
                </v-card-text> 
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import {mapState} from "vuex";
export default {
    methods: {
    },
    computed: {
        ...mapState({
            showDialogProgress: (state) => state.alerts.showDialogProgress,
            msg:        (state) => state.alerts.msg,
            color:      (state) => state.alerts.color,
            icon:       (state) => state.alerts.icon,
        }),
    }
};
</script>