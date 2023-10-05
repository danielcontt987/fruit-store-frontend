<template>
    <v-app class="bg-background">
        <admin-drawer>
            <v-container fluid>
                <v-row>
                    <v-col cols="12" lg="2" md="2" sm="2" xs="2" class="ml-3">
                        <back-button @backAction="$router.push('/admin')"></back-button>
                    </v-col>
                    <v-col cols="12">
                        <info />
                    </v-col>
                </v-row>
            </v-container>
        </admin-drawer>
    </v-app>
</template>

<script>
import AdminDrawer from '@/components/AdminDrawer.vue';
import Info from '@/components/PointOfSale/Info.vue';
import BackButton from '@/components/Buttons/BackButton.vue';

export default {
    name: "PoinOfSale",

    components: {
        AdminDrawer,
        Info,
        BackButton
    }
}
</script>

<style></style>