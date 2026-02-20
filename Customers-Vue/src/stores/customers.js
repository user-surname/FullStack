import { defineStore } from "pinia"
import { ref } from "vue";

export const useCustomerStore = defineStore("customers", () => {
    const API_URL = "http://localhost:8080/customers";

    const customers = ref([]);

    const getCustomers = async () => {
        const response = await fetch(API_URL)
        const data = response.json();
        customers.value = data;
    }

    return {
        customers, 
        getCustomers,
    }

});
