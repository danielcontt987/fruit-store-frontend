<template>
            <v-btn color="primary" class="rounded-lg font-weight-normal" width="10px" block @click="goTo" flat depressed>
              <v-icon class="px-4">mdi-arrow-left-bold-circle-outline</v-icon><span style="font-weight: normal;">Regresar</span>
            </v-btn>
</template>

<script>
export default {
    name: "BackButton",
    methods:{
        goTo(){
            this.$emit('backAction');
        }
    }
}
</script>

<style></style>