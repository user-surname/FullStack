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

    return {
        customers, 
        loading,
        error,
        getCustomers,
    }

});
