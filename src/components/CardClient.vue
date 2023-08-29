<template>
    <v-col cols="12">
        <v-card class="rounded-lg">
        <v-card-title class="bg-secondary_dark">
                <v-row class="mx-3 mt-0 mb-0">
                    <v-col cols="12">
                        <h4 class="text-center">
                            Filtro de clientes
                        </h4>
                    </v-col>
                </v-row>
        </v-card-title>
        <v-card-text>
            <v-row>
            <v-col cols="12" class="mt-3">
                <v-text-field
                    label="Nombre del cliente"
                    variant="outlined"
                    v-model="search"
                />
            </v-col>
            <v-col cols="12" xl="6" lg="6">
                <v-text-field
                    label="Desde"
                    variant="outlined"
                    v-model="date"
                    type="date"
                />
            </v-col>
            <v-col cols="12" xl="6" lg="6">
                <v-text-field
                    label="Hasta"
                    variant="outlined"
                    v-model="date2"
                    type="date"
                    :min="date"
                />
            </v-col>
            <v-col cols="12">
                <v-btn
                    label="Aplicar"
                    depressed
                    block
                    class="text-white bg-secondary_dark rounded-lg elevation-0"
                >
                aplicar
            </v-btn>

            </v-col>
            </v-row>
        </v-card-text>
        </v-card>
    </v-col>
    <v-col cols="12">
        <v-card class="rounded-lg">
            <v-card-title class="bg-secondary_dark">
                    <v-row class="mx-3 mt-0 mb-0">
                        <v-col cols="12" sm="7" md="7" lg="9">
                            <h4 class="text-lg-left text-md-center text-sm-center text-center p-1">
                                Listado de clientes
                            </h4>
                        </v-col>
                        <v-col cols="12" sm="5" md="5" lg="3">
                            <v-btn
                                class="rounded-lg text-primary mx-lg-1 text-center p-1"
                                depressed
                                block
                                color="white"
                                @click="openModal()">
                                Agregar
                            </v-btn>
                        </v-col>
                    </v-row>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-data-table
                            v-model:items-per-page="itemsPerPage"
                            :headers="headers"
                            :items="clients"
                            item-value="name"
                            no-data-text="No hay clientes"
                            :show-footer="false">

                            <template v-slot:item.status="{ item }">
                                <v-chip v-if="item.columns.status === 'active'" class="rounded-lg text-white bg-success" >{{ 'Activo' }}</v-chip>
                            </template>
                            <template v-slot:item.created_at="{ item }">
                                {{ dateFilter(item.columns.created_at) }}
                            </template>
                            <template v-slot:item.fullname="{ item }">
                                {{  item.raw.user.name + ' ' +  item.raw.user.last_name }}
                            </template>
                            <template v-slot:item.actions="{item}">
                                <div class="d-flex justify-space-around">
                                    <v-btn
                                        color="secondary_dark"
                                        depressed
                                        block
                                        variant="outlined"
                                        >
                                        Opciones

                                        <v-menu activator="parent">
                                            <v-list>
                                            <v-list-item>
                                                <v-list-item-title>
                                                   Editar
                                                </v-list-item-title>
                                            </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </v-btn>
                                </div>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-col>
    <v-dialog v-model="showModal" :width="dialogWidth()" class="overflow-hidden">
        <v-card class="rounded-lg">
            <v-card-title class="bg-secondary_dark">
                <v-row class="mx-3 mt-0 mb-0">
                    <v-col cols="12">
                        <h4 class="text-center p-0">
                           Agregar cliente
                        </h4>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-row no-gutters>
                        <v-col cols="12">
                            <v-text-field
                                label="Nombre del cliente"
                                variant="outlined"
                                v-model="name"
                                :rules="nameRule"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                label="Teléfono"
                                variant="outlined"
                                v-model="phone"
                                :rules="nameRule"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-select
                                :items="status"
                                item-value="value"
                                item-title="name"
                                label="Estatus"
                                variant="outlined"
                                v-model="statusValue"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                label="Correo electrónico"
                                variant="outlined"
                                v-model="email"
                            />
                        </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-row class="mx-0">
                    <v-col cols="12" lg="6">
                        <v-btn
                            block
                            depressed
                            @click="closeModal()"
                            class="rounded-lg text-fail"
                            >
                            Cerrar
                        </v-btn>
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-btn
                            block
                            depressed
                            @click="createClient()"
                            class="bg-primary rounded-lg white--text"
                            >
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
                <v-btn
                    class="rounded-lg"
                    large
                    depressed
                    block
                    color="primary text-white"
                    @click="closeDialog()"
                >
                    Entendido
                </v-btn>
            </v-col>
        </v-row>
    </v-notification-dialog>
</template>

<script>
import moment from 'moment';
import { VDataTable } from 'vuetify/labs/VDataTable';
import VNotificationDialog from './VNotificationDialog.vue';

export default {
  components:{
    VDataTable,
    VNotificationDialog,
  },
  props:{
    token: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    clients:{
        type: Array,
        required: true,
    },
    listClient:{
        type: Function,
        required: true,
    }
  },
  mounted(){
     this.date = this.$moment().format('YYYY-MM-DD');
     this.date2 = this.$moment().format('YYYY-MM-DD');
  },
  data: () => ({
    search: "",
    showModal: false,
    name: "",
    phone: "",
    date: "",
    date2: "",
    statusValue: "",
    email: "",
    itemsPerPage: 5,
        headers: [
          { title: 'Nombre', align: 'center', key: 'name',},
          { title: 'Teléfono', align: 'center', key: 'phone' },
          { title: 'Registrado por', align: 'center', key: 'fullname' },
          { title: 'Correo', align: 'center', key: 'email' },
          { title: 'Estatus', align: 'center', key: 'status' },
          { title: 'Fecha de registro', align: 'center', key: 'created_at' },
          { title: 'Acciones', align: 'center', key: 'actions' },
        ],
        desserts: [],
        status:[
            {
                name: "Activo",
                value: "active"
            },
            {
                name: "Inactivo",
                value: "anactive"
            }
        ]
  }),
  methods: {
    openModal(){
        this.showModal = true;
    },
    dialogWidth() {
      if (this.$vuetify.display.xl) {
        return "25vw";
      }
      if (this.$vuetify.display.lg) {
        return "35vw";
      }
      return "70vw";
    },
    createClient(){
        if (this.$refs.form === false) return;
        let params = {
            token: this.token,
            user_id: this.userId,
            name: this.name,
            phone: this.phone,
            status: this.statusValue,
            email: this.email
        }
        this.$store.dispatch('clients/createClient', params).then(res =>{
            this.$store.dispatch("alerts/setDialog", {
                color: "success",
                icon: "mdi-check-circle-outline",
                title: "Nuevo registro",
                msg: `Se agregó un nuevo cliente correctamente`,
                type: 0,
            });

            this.closeModal();
            this.listClient();
        });
    },
    closeModal(){
        this.showModal = false;
        this.name = "";
        this.phone = "";
        this.statusValue = "active";
        this.email = "";
    },
    dateFilter(created_at){
        return moment(created_at).format('YYYY-MM-DD HH:mm:ss a');
    },
    closeDialog(){
        this.$store.dispatch('alerts/closeDialog');
    }
  },
}
</script>

<style>
.v-data-table-footer{
    display: none;
}

.custom-outlined-button {
  border-width: 2px; /* Ajusta el ancho del borde según lo necesites */
}
</style>