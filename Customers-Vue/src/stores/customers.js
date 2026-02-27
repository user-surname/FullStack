import { defineStore } from "pinia"
import { ref } from "vue";

export const useCustomerStore = defineStore("customers", () => {
    const API_URL = "http://localhost:8080/customers";

    const customers = ref([]);
    const loading = ref(false);
    const error = ref(false);

    const getCustomers = async () => {
        loading.value = true;
        try {
            const response = await fetch(API_URL)
            const data = await response.json();
            customers.value = data;
            error.value = false;
        } catch (e) {
            error.value = true;
            console.log("Error carregant dades", e);
        } finally {
            loading.value = false;
        }
    }

    const addCustomer = async (newCustomer) => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCustomer)
        });
        if (response.ok) {
            const data = await response.json();
            customers.value.push(data);
            getCustomers(); // Actualitza la llista de clients després d'afegir-ne un de nou
        }

    }

    return {
        customers, 
        loading,
        error,
        getCustomers,
        addCustomer
    }

});
