import { defineStore } from "pinia"
import { ref } from "vue";

export const useConflictsStore = defineStore("conflicts", () => {
    const API_URL = "http://localhost:8080/conflicts";

    const conflicts = ref([]);
    const loading = ref(false);
    const error = ref(false);

    const getConflicts = async () => {
        loading.value = true;
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            conflicts.value = data;
            error.value = false;
        } catch (err) {
            error.value = true;
            console.error("Error fetching conflicts:", err);
        } finally {
            loading.value = false;
        }
    }

    const addConflict = async (newConflict) => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newConflict)
        });
        if (response.ok) {
            const data = await response.json();
            conflicts.value.push(data);
            getConflicts();
        }
    }

    return {
        conflicts,
        loading,
        error,
        getConflicts,
        addConflict
    }
})