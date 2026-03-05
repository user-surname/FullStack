<script setup>
import { ref } from 'vue';

const userName = ref("Maria");
const emit = defineEmits(['login']);

const login = () => {
    emit('login', userName.value);
};

</script>

<template>
    <div class="fill">
        <slot name="top"></slot>
        <h2>Componente fill</h2>
        <p>Nom d'usuari: {{ userName }}</p>
        <p><button @click="login">Login</button></p>
        <slot name="bottom"></slot>
    </div>
</template>

<style scoped>
.fill {
    border: 4px solid goldenrod;
}
</style>