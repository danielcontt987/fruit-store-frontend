<template>
   <v-col cols="6" class="text-left">        
        <span class="body-2" v-if="cashcut!=null" >
               <b class="text-primary_dark">Nombre:</b> {{ cashcut.user.name }}
        </span>
        <br>
        <span class="body-2" v-if="cashcut!=null" >
               <b class="text-primary_dark">Caja:</b> {{ cashcut.salebox.name }}
        </span>
    </v-col>
    <v-col cols="6" class="text-right">
        <span class="body-2" v-if="cashcut!=null" >
               <b class="text-primary_dark">Última venta:</b>
        </span>
        <br>
        <span class="body-2" v-if="cashcut!=null" >
               <b class="text-primary_dark">Ventas del dia:</b> 
        </span>
        <br>
        <span class="body-2" v-if="cashcut!=null" >
               <b class="text-primary_dark">Ventas en espera:</b>
        </span>
        <br>
        <span class="body-2" v-if="cashcut!=null" >
               <b class="text-primary_dark">Monto generado:</b>
        </span>
    </v-col>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState({
            cashcut: (state) => state.cashcuts.cashcut,
        })
    }
}
</script>

<style>

</style>