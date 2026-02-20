<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import { useCustomerStore } from '../stores/customers';

const customerStore  = useCustomerStore();

onMounted(() => {
    customerStore.getCustomers();
    console.log("Dades carregades", customerStore.customers);
})

</script>

<template>
    <HeaderComponent />
    <h2>Customers Page</h2>
    
</template>

<style scoped>

</style>