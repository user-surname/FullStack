<script setup>
import { ref } from "vue";
import { useConflictsStore } from "../stores/conflicts";

const conflictsStore = useConflictsStore();

const form = ref({
  name: "",
  description: "",
  status: "ACTIVE",
  startDate: ""
});

const resetForm = () => {
  form.value = {
    name: "",
    description: "",
    status: "ACTIVE",
    startDate: ""
  };
};

const submitForm = async () => {
  const success = await conflictsStore.addConflict({
    ...form.value,
    countries: [],
    factions: [],
    events: []
  });

  if (success) {
    resetForm();
  }
};
</script>

<template>
  <form class="form" @submit.prevent="submitForm">
    <h2>Crear conflicte</h2>
    <input v-model="form.name" type="text" placeholder="Nom del conflicte" required />
    <textarea
      v-model="form.description"
      rows="3"
      placeholder="Descripcio breu"
      required
    ></textarea>
    <select v-model="form.status" required>
      <option value="ACTIVE">Actiu</option>
      <option value="FROZEN">Congelat</option>
      <option value="ENDED">Finalitzat</option>
    </select>
    <input
      v-model="form.startDate"
      type="datetime-local"
      placeholder="Data d'inici"
      required
    />
    <button type="submit">Guardar</button>
  </form>
</template>

<style scoped>
.form {
  display: grid;
  gap: 0.6rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
}

.form input,
.form textarea,
.form select {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0.65rem;
  font-family: inherit;
}
</style>
