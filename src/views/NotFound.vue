<template>
    <section class="page_404 overflow-hidden">
        <v-container >
            <v-row >
                <v-col cols="12" >
                    <v-col cols="12" sm="10" class="text-center offset-sm-1">
                        <h1 class="text-center">404</h1>
                        <div class="four_zero_four_bg"></div>
                        <div class="content_box_404">
                            <h3 class="text-center">Página no encontrada</h3>
                            <p class="mt-2 mb-3">Lo sentimos, la página que buscas no existe</p>
                            <a @click="$router.push('/')">Regresar</a>
                        </div>
                    </v-col>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
export default {

}
</script>

<style scoped>

h1{
    font-size: 80px;
    color: rgb(40, 41, 43);
}

h3{
    font-size: 40px;
    color: rgb(40, 41, 43);
}

p{
    font-size: 20px;
    color: rgb(40, 41, 43);
}
.page_404{
    padding: 10px 0;
}

.page_404 img{
    width: 100%;
}

.four_zero_four_bg{
    background: url('../../src/assets/img/bg.gif');
    height: 400px;
    background-position: center;
}

.content_box_404{
    margin-top: -50px;
}

a{
    cursor: pointer;
    padding: 5px 20px;
    color: white;
    text-decoration: none;
    background-color: #39ac31;
    display: inline-block;
    border-radius: 8px;
}

a:hover{
    text-decoration: none;
    color: white;
    cursor: pointer;
}

</style>