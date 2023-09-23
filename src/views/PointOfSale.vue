<template>
    <v-app class="bg-background">
        <admin-drawer>
            <v-container fluid>
                <v-row>
                    <v-col cols="12">
                        <info/>
                    </v-col>
                </v-row>
            </v-container>
        </admin-drawer>
    </v-app>
</template>

<script>
import AdminDrawer from '@/components/AdminDrawer.vue';
import Info from '@/components/PointOfSale/Info.vue';

export default {
    name: "PoinOfSale",

    components:{
        AdminDrawer,
        Info
    }
}
</script>

<style></style>