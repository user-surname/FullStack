<script setup>
import FillComponent from '../components/FillComponent.vue';
import HeaderComponent from '../components/HeaderComponent.vue';
import { ref } from 'vue';
const myId = "unAltreId";
const myCondition = true;
const myValue = ref("el meu nom");
const longitud = ref(myValue.value.length);

const fruites = ['Poma', 'Plàtan', 'Taronja', 'Maduixa'];

const displayName = ref("");

const setName = (name) => {
    displayName.value = name;
}

</script>

<template>
    
    <HeaderComponent />
    <h2>Home Page</h2>

    <h3 :class="myCondition ? 'clar' : 'fosc'" :id="myId">Exemple v-bind</h3>
    <h3 :class="{clar: myCondition, fosc: !myCondition}">Exemple v-bind 2</h3>

    <h3>{{ myValue }}</h3>
    <h3>Longitud de myValue: {{ longitud }}</h3>
    <input type="text" v-model="myValue" />

    <ul>
        <li v-for="(fruit, index) in fruites" :key="fruit">
            {{ fruit }} - Index: {{ index }}
        </li>
    </ul>


    <h2>Hola {{ displayName }}</h2>
    <FillComponent @login="setName">
        <template v-slot:top>
            Text al top
        </template>
                <template v-slot:bottom>
            Text al bottom
        </template>
        <h3>Contingut del FillComponent</h3>
    </FillComponent>
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