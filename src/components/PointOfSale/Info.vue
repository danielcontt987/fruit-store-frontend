<template>
    <div class="ml-4 mr-4">
        <v-row>
            <v-col cols="6" class="text-left">
                <h4 class="text-primary_dark">Nombre:</h4>
                <h4 class="text-primary_dark">Caja:</h4>
            </v-col>
            <v-col cols="6" class="text-right">
                <h4 class="text-primary_dark">Última venta:</h4>
                <h4 class="text-primary_dark">Ventas del dia:</h4>
                <h4 class="text-primary_dark">Ventas en espera:</h4>
                <h4 class="text-primary_dark">Monto generado:</h4>
            </v-col>
        </v-row>
        <v-row class="mt-7">
            <v-col cols="6">
                <v-select flat label="Almacén" variant="solo-inverted" />
            </v-col>
            <v-col cols="6">
                <v-select flat label="Área" variant="solo-inverted" />
            </v-col>
            <v-col cols="4">
                <v-select flat label="Clientes" variant="solo-inverted" />
            </v-col>
            <v-col cols="8">
                <v-select flat label="Productos" variant="solo-inverted" />
            </v-col>
        </v-row>
        <v-data-table flat :headers="headers" item-value="name" no-data-text="Aún no hay productos"
            :hide-details="false"></v-data-table>
        <v-row class="mt-2">
            <v-col cols="12" md="7" lg="8">
                <v-row>
                    <v-col cols="6" class="pb-0">
                        <card-grid
                            color="grey"
                            icon="mdi mdi-percent"
                            text="Aplicar descuento"
                         />
                    </v-col>
                    <v-col cols="6" class="pb-0">
                        <card-grid
                            color="fail"
                            icon="mdi-close"
                            text="Cancelar venta"
                            />
                    </v-col>
                    <v-col cols="6">
                        <card-grid
                            color="accent"
                            icon="mdi-more"
                            text="Más opciones"
                            />
                    </v-col>
                    <v-col cols="6">
                        <card-grid
                            color="success_card"
                            icon="mdi mdi-cash-register"
                            text="Cobrar venta"
                            />
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="5" lg="4">
                <card-info-sale/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { VDataTable } from 'vuetify/labs/VDataTable';
import CardGrid from './CardGrid/CardGrid.vue';
import CardInfoSale from './CardGrid/CardInfoSale.vue';

export default {
    components: {
        VDataTable,
        CardGrid,
        CardInfoSale
    },
    data: () => ({
        headers: [
            { title: 'Producto', align: 'center', key: 'product' },
            { title: 'Cantidad', align: 'center', key: 'qty' },
            { title: 'Almacén', align: 'center', key: 'almacen' },
            { title: 'Área', align: 'center', key: 'area' },
            { title: 'Precio unitario', align: 'center', key: 'price' },
            { title: 'Subtotal', align: 'center', key: 'subtotal' },
            { title: 'Total', align: 'center', key: 'total' },
            { title: 'Acciones', align: 'center', key: 'status', sortable: false },
        ],
    })
}
</script>

<style>
.v-data-table-footer {
    display: none;
}

.custom-outlined-button {
    border-width: 2px;
    /* Ajusta el ancho del borde según lo necesites */
}

.v-data-table-header__content span {
    color: black;
    font-weight: 600;
    text-align: center;
    font-size: 14px;
}

.v-data-table {
    border-radius: 4px;
}
</style>