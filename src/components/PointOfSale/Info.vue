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
        <v-row>
            <v-col cols="6">
                <product-inventory />
            </v-col>
            <v-col cols="6">
                <product-area />
            </v-col>
            <v-col cols="4" class="py-0">
                <v-select flat label="Clientes" variant="outlined" />
            </v-col>
            <v-col cols="8" class="py-0">
                <product-select />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-data-table 
                         flat 
                         :headers="headers" 
                         :items="pagedSales"
                         item-value="name" 
                         no-data-text="Aún no hay productos"
                         :hide-details="false">
                    <template v-slot:item.qty="{ item }">
                        <v-text-field variant="outlined" prepend-inner-icon="mdi-menu-down" append-inner-icon="mdi-menu-up"
                            v-model.number="item.raw.qty" min="1" @click:prepend-inner="minusQty(item)"
                            @click:append-inner="moreAdd(item)" class="centered-input font-weight-bold" outlined />
                    </template>
                    <template v-slot:item.unit_price="{ item }">
                        {{ '$' + item.raw.price_sale.toFixed(2) }}
                    </template>
                    <template v-slot:item.stock="{ item }">
                        {{ item.raw.inventorydetail.inventory.name }}
                    </template>
                    <template v-slot:item.area="{ item }">
                        {{ item.raw.inventorydetail.inventory.area.name }}
                    </template>
                    <template v-slot:item.subtotal="{ item }">
                        {{ '$' + (item.raw.subtotal / this.with_iva).toFixed(2) }}
                    </template>
                    <template v-slot:item.total="{ item }">
                        {{ '$' + item.raw.total.toFixed(2) }}
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-tooltip text="Eliminar">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" @click="deleteItem(item)" flat :depressed="true" class="rounded-lg"
                                    color="error"><v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                        </v-tooltip>
                    </template>
                </v-data-table>
                <div class="text-center pt-2">
                    <v-pagination
                        elevation="3"
                        v-model="page"
                        :length="pageCount"
                        size="small"
                        color="primary"
                    ></v-pagination>
                </div>
            </v-col>
        </v-row>
        <v-row no-gutters class="py-2">
           
        </v-row>
        <v-row class="mt-2">
            <v-col cols="12" md="7" lg="8">
                <v-row>
                    <v-col cols="6" class="pb-0">
                        <card-grid color="grey" icon="mdi mdi-percent" text="Aplicar descuento" />
                    </v-col>
                    <v-col cols="6" class="pb-0">
                        <card-grid color="fail" icon="mdi-close" text="Cancelar venta" @click="cancelDialog()" />
                    </v-col>
                    <v-col cols="6">
                        <card-grid color="accent" icon="mdi-more" text="Más opciones" />
                    </v-col>
                    <v-col cols="6">
                        <card-grid color="success_card" icon="mdi mdi-cash-register" text="Cobrar venta" />
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="5" lg="4">
                <card-info-sale :products-count="productsCount" :subtotal="subtotal" :iva="iva" :total="total" />
            </v-col>
        </v-row>
        <AlertBottons>
            <v-row class="mx-0">
                <v-col cols="12" md="6" class="text-center" order="2" order-md="1">
                    <v-btn class="rounded-lg" text depressed block color="secondary_dark" @click="closeDialogButtons()"
                        :loading="isLoading">
                        Cerrar
                    </v-btn>
                </v-col>
                <v-col cols="12" md="6" class="text-center" order="1" order-md="2" v-if="cancel == true">
                    <v-btn class="rounded-lg bg-fail" depressed block @click="cancelSale()" :loading="isLoading">
                        Si, cancelar
                    </v-btn>
                </v-col>
                <v-col cols="12" md="6" class="text-center" order="1" order-md="2" v-else>
                    <v-btn class="rounded-lg bg-fail" depressed block @click="removeItem()" :loading="isLoading">
                        Si, eliminar
                    </v-btn>
                </v-col>
            </v-row>
        </AlertBottons>
        <v-notification-dialog>
            <v-row class="mx-0">
                <v-col class="text-center">
                    <v-btn class="rounded-lg" large depressed block color="primary text-white" @click="closeDialog()">
                        Entendido
                    </v-btn>
                </v-col>
            </v-row>
        </v-notification-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { VDataTable } from 'vuetify/labs/VDataTable';
import CardGrid from './CardGrid/CardGrid.vue';
import CardInfoSale from './CardGrid/CardInfoSale.vue';
import ProductSelect from './Selects/ProductSelect.vue';
import ProductArea from './Selects/ProductArea.vue';
import ProductInventory from './Selects/ProductInventory.vue';
import AlertBottons from '../AlertBottons.vue';
import VNotificationDialog from '../VNotificationDialog.vue';

export default {
    mounted() {
    },
    components: {
        //Selects
        ProductSelect,
        ProductArea,
        ProductInventory,
        //Datable
        VDataTable,
        //Cards
        CardGrid,
        CardInfoSale,
        AlertBottons,
        VNotificationDialog
    },
    data: () => ({
        page: 1,
        itemsPerPage: 2,
        itemSelected: null,
        isLoading: false,
        cancel: false,
        headers: [
            { title: 'Producto', align: 'center', key: 'name' },
            { title: 'Cantidad', align: 'center', key: 'qty' },
            { title: 'Almacén', align: 'center', key: 'stock' },
            { title: 'Área', align: 'center', key: 'area' },
            { title: 'Precio unitario', align: 'center', key: 'unit_price' },
            { title: 'Subtotal', align: 'center', key: 'subtotal' },
            { title: 'Total', align: 'center', key: 'total' },
            { title: 'Acciones', align: 'center', key: 'actions', sortable: false },
        ],
    }),

    methods: {
        minusQty(item) {
            item.raw.qty--;
        },
        moreAdd(item) {
            item.raw.qty++;

        },
        deleteItem(item) {
            this.$store.dispatch("alerts/setDialogButtons", {
                color: "error",
                icon: "mdi-close-circle-outline",
                title: `¿Estás seguro de quitar el producto?`,
                msg: `El producto ${item.raw.name} se quitará de la venta`,
            });
            this.itemSelected = item.raw
        },
        removeItem() {
            this.$store.dispatch(
                "pointsales/deleteToSale",
                this.itemSelected
            );
            this.$store.dispatch("alerts/closeDialogButtons");
            this.$store.dispatch("alerts/setDialog", {
                color: "success",
                icon: "mdi-check-circle-outline",
                title: `Se ha quitado el producto de la venta`,
                type: 0,
            });
            this.cancel = false;
        },
        cancelDialog() {
            this.cancel = true;
            if (this.sales.length > 0) {
                this.$store.dispatch("alerts/setDialogButtons", {
                    color: "error",
                    icon: "mdi-close-circle-outline",
                    title: `¿Estás seguro de cancelar la compra?`,
                    msg: `Una vez cancelada la compra, ya no se podrá revertir los cambios.`,
                });
                return;
            }
        },
        cancelSale() {
            this.$store.dispatch("pointsales/clearSale");
            this.closeDialogButtons();
            this.$store.dispatch("alerts/setDialog", {
                color: "success",
                icon: "mdi-check-circle-outline",
                title: "Se ha cancelado la venta",
                type: 0,
            });
        },
        closeDialogButtons() {
            this.$store.dispatch("alerts/closeDialogButtons");
            this.cancel = false;
        },

        updatePage(newPage) {
            // Manejar el cambio de página
            this.page = newPage;
        },

    },

    computed: {
        ...mapState({
            sales: (state) => state.pointsales.sales,
            with_iva: (state) => state.globals.with_iva,
            without_iva: (state) => state.globals.iva,
        }),

        productsCount() {
            if (this.sales.length > 0) {
                let articules = 0;
                this.sales.forEach(element => {
                    articules += element.qty;
                });

                return articules
            }

            return 0
        },

        subtotal() {
            if (this.sales.length === 0) {
                return 0;
            }
            return this.sales.reduce((accumulator, element) => {
                const price = (element.qty * element.price_sale)
                element.subtotal = (element.qty * element.price_sale)
                return accumulator + price;

            }, 0);
        },
        subtotal() {
            if (this.sales.length === 0) {
                return 0;
            }
            return this.sales.reduce((accumulator, element) => {
                const price = (element.qty * element.price_sale)
                element.subtotal = (element.qty * element.price_sale)
                return accumulator + price / this.with_iva;

            }, 0);
        },
        iva() {
            if (this.sales.length === 0) {
                return 0;
            }
            return this.sales.reduce((accumulator, element) => {
                const price = (element.qty * element.price_sale)
                element.subtotal = ((element.qty * element.price_sale))
                return accumulator + (price / this.with_iva) * .16;

            }, 0);
        },
        total() {
            return this.sales.reduce((accumulator, element) => {
                const price = (element.qty * element.price_sale)
                element.total = ((element.qty * element.price_sale))
                return accumulator + price;

            }, 0);
        },
        pagedSales() {
        // Calcular los elementos a mostrar en la página actual
        const startIndex = (this.page - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.sales.slice(startIndex, endIndex);
        },
        pageCount() {
        // Calcular el número total de páginas
        return Math.ceil(this.sales.length / this.itemsPerPage);
        },


    }

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

.v-text-field .v-field__input {
    text-align: center;
}

.v-pagination__prev{
    background-color: white;
    border-radius: 9px;
}
.v-pagination__item{
    background-color: white;
    border-radius: 9px;
}
.v-pagination__next{
    background-color: white;
    border-radius: 9px;
}

span.v-btn__content{
    font-weight: bold;
}

</style>