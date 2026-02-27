<script setup>
import { ref } from 'vue';
import { useCustomerStore } from '../stores/customers';
const customerStore = useCustomerStore();

const newCustomer = ref({
    firstName: '',
    lastName: '',
    email: ''
});

const handleSubmit = async () => {
    await customerStore.addCustomer(newCustomer.value);
    newCustomer.value = {
        firstName: '',
        lastName: '',
        email: '',
        incidencies: []
    };
}

</script>  

<template>
    <form @submit.prevent="handleSubmit()" class="add-form">
        <input v-model="newCustomer.firstName" placeholder="Nom" required />
        <input v-model="newCustomer.lastName" placeholder="Cognom" required />
        <input v-model="newCustomer.email" type="email" placeholder="Email" required />
        <button type="submit" >+</button>

    </form>
</template>

<style scoped>
.add-form {
    display: flex;
    gap: 10px;
    margin-bottom: 2rem;
    padding: 1rem;
    background: grey;
    border-radius: 10px;
}
button {
    background-color: blue;
    color: bisque;
    padding: 8px 16px;
    border-radius: 4px;
}
input {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
}
</style>
