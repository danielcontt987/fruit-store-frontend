<template>
    <v-row>
        <v-col cols="12" md="10">
            <v-btn color="primary" class="rounded-lg" large @click="goTo" flat depressed>
              <v-icon class="px-4">mdi-arrow-left-bold-circle-outline</v-icon>Regresar
            </v-btn>
        </v-col>
    </v-row>
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