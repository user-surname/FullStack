<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import { ref } from 'vue';
const myId = "unAltreId";
const myCondition = true;
const myValue = ref("el meu nom");
</script>

<template>
    
    <HeaderComponent />
    <h2>Home Page</h2>

    <h3 :class="myCondition ? 'clar' : 'fosc'" :id="myId">Exemple v-bind</h3>
    <h3 :class="{clar: myCondition, fosc: !myCondition}">Exemple v-bind 2</h3>

    <h3>{{ myValue }}</h3>
    <input type="text" v-model="myValue" />

</template>

<style scoped>
.clar {
    background-color: beige;
    color: red;
}
.fosc {
    background-color: gray;
}
</style>