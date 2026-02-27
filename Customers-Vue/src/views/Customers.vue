<script setup>
import { onMounted } from 'vue';
import CustomerCard from '../components/CustomerCard.vue';
import HeaderComponent from '../components/HeaderComponent.vue';
import { useCustomerStore } from '../stores/customers';
import CustomerForm from '../components/CustomerForm.vue';

const customerStore  = useCustomerStore();

onMounted(async() => {
    await customerStore.getCustomers();
    console.log("Dades carregades", customerStore.customers);
})

</script>

<template>
    <HeaderComponent />
    <h2>Customers Page</h2> 
        <section id="customers-page">
            <CustomerForm />
    <h2 v-if="customerStore.loading">Carregant</h2>
    <h2 v-else-if ="customerStore.error">Error al carregar les dades</h2>
    <ul v-else class="customer-list">
        <li v-for="customer in customerStore.customers" :key="customer.id">
            <CustomerCard :customer="customer" />
        </li>
    </ul>
    </section>
</template>

<style scoped>

.customer-list {
    list-style-type: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}
#customers-page {
    padding: 2rem;
}
.customer-list li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

</style>