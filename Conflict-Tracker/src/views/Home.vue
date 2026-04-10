<script setup>
import { onMounted } from 'vue';
import { useConflictsStore } from '../stores/conflicts';
import ConflictCard from "../components/ConflictCard.vue";
import ConflictForm from "../components/ConflictForm.vue";
import BasePanel from "../components/BasePanel.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const conflictsStore = useConflictsStore();

onMounted(async () => {
  await conflictsStore.getConflicts();
});

const goToDetail = (id) => {
  router.push({ name: "conflict-detail", params: { id } });
};

const handleDelete = async (id) => {
  await conflictsStore.removeConflict(id);
};
</script>

<template>
  <main class="page">
    <header class="page-header">
      <h1>The Global Conflict Monitor</h1>
      <p>Seguiment de conflictes globals amb cerca i detall per ID.</p>
    </header>

    <ConflictForm />

    <BasePanel>
      <template #header>
        <div class="toolbar">
          <input
            v-model="conflictsStore.searchTerm"
            type="text"
            placeholder="Buscar per nom o descripcio..."
          />
          <select v-model="conflictsStore.selectedStatus">
            <option value="ALL">Tots els estats</option>
            <option value="ACTIVE">Actiu</option>
            <option value="FROZEN">Congelat</option>
            <option value="ENDED">Finalitzat</option>
          </select>
        </div>
      </template>

      <h2>Conflictes</h2>
      <p class="kpi">Actius: {{ conflictsStore.activeConflictsCount }}</p>

      <p v-if="conflictsStore.loading">Carregant dades...</p>
      <p v-else-if="conflictsStore.error">{{ conflictsStore.error }}</p>
      <p v-else-if="conflictsStore.filteredConflicts.length === 0">
        No hi ha conflictes per als filtres seleccionats.
      </p>

      <section v-else class="grid">
        <ConflictCard
          v-for="conflict in conflictsStore.filteredConflicts"
          :key="conflict.id"
          :conflict="conflict"
          @view-detail="goToDetail"
          @delete-conflict="handleDelete"
        />
      </section>

      <template #footer>
        <small>Total visualitzat: {{ conflictsStore.filteredConflicts.length }}</small>
      </template>
    </BasePanel>
  </main>
</template>

<style scoped>
.page {
  display: grid;
  gap: 1rem;
}

.page-header p {
  margin-top: 0;
  color: #475569;
}

.toolbar {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1fr 220px;
}

.toolbar input,
.toolbar select {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0.65rem;
}

.kpi {
  color: #334155;
  margin-top: 0;
}

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
</style>
