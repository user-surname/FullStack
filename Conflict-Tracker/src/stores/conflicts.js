import { defineStore } from "pinia"
import { computed, ref } from "vue";

export const useConflictsStore = defineStore("conflicts", () => {
    const API_URL = "https://conflict-tracker-production-8ce4.up.railway.app/conflicts";
    const COUNTRIES_URL = "https://conflict-tracker-production-8ce4.up.railway.app/countries";
    const FACTIONS_URL = "https://conflict-tracker-production-8ce4.up.railway.app/factions";
    const EVENTS_URL = "https://conflict-tracker-production-8ce4.up.railway.app/events";

    const conflicts = ref([]);
    const countries = ref([]);
    const factions = ref([]);
    const events = ref([]);
    const loading = ref(false);
    const error = ref("");
    const selectedStatus = ref("ALL");
    const searchTerm = ref("");

    const getConflicts = async () => {
        loading.value = true;
        error.value = "";
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const data = await response.json();
            conflicts.value = data;
        } catch (err) {
            error.value = "No s'han pogut carregar els conflictes.";
            console.error("Error fetching conflicts:", err);
        } finally {
            loading.value = false;
        }
    }

    const getConflictById = async (id) => {
        loading.value = true;
        error.value = "";
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return await response.json();
        } catch (err) {
            error.value = `No s'ha pogut carregar el conflicte ${id}.`;
            console.error("Error fetching conflict by id:", err);
            return null;
        } finally {
            loading.value = false;
        }
    };

    const addConflict = async (newConflict) => {
        error.value = "";
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newConflict)
            });
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const data = await response.json();
            conflicts.value.push(data);
            return true;
        } catch (err) {
            error.value = "No s'ha pogut crear el conflicte.";
            console.error("Error creating conflict:", err);
            return false;
        }
    };

    const updateConflict = async (id, conflictData) => {
        error.value = "";
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(conflictData)
            });
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const data = await response.json();
            conflicts.value = conflicts.value.map(conflict =>
                conflict.id === id ? data : conflict
            );
            return data;
        } catch (err) {
            error.value = `No s'ha pogut actualitzar el conflicte ${id}.`;
            console.error("Error updating conflict:", err);
            return null;
        }
    };

    const getCountries = async () => {
        try {
            const response = await fetch(COUNTRIES_URL);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            countries.value = await response.json();
        } catch (err) {
            console.error("Error fetching countries:", err);
        }
    };

    const getFactions = async () => {
        try {
            const response = await fetch(FACTIONS_URL);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            factions.value = await response.json();
        } catch (err) {
            console.error("Error fetching factions:", err);
        }
    };

    const getEvents = async () => {
        try {
            const response = await fetch(EVENTS_URL);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            events.value = await response.json();
        } catch (err) {
            console.error("Error fetching events:", err);
        }
    };

    const removeConflict = async (id) => {
        error.value = "";
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            conflicts.value = conflicts.value.filter(conflict => conflict.id !== id);
            return true;
        } catch (err) {
            error.value = `No s'ha pogut eliminar el conflicte ${id}.`;
            console.error("Error deleting conflict:", err);
            return false;
        }
    };

    const activeConflictsCount = computed(() =>
        conflicts.value.filter(conflict => conflict.status === "ACTIVE").length
    );

    const filteredConflicts = computed(() => {
        const normalizedSearch = searchTerm.value.trim().toLowerCase();
        return conflicts.value.filter(conflict => {
            const matchesStatus =
                selectedStatus.value === "ALL" || conflict.status === selectedStatus.value;
            const matchesSearch =
                conflict.name?.toLowerCase().includes(normalizedSearch) ||
                conflict.description?.toLowerCase().includes(normalizedSearch);
            return matchesStatus && matchesSearch;
        });
    });

    return {
        conflicts,
        countries,
        factions,
        events,
        loading,
        error,
        selectedStatus,
        searchTerm,
        filteredConflicts,
        activeConflictsCount,
        getConflicts,
        getConflictById,
        addConflict,
        updateConflict,
        getCountries,
        getFactions,
        getEvents,
        removeConflict
    }
})