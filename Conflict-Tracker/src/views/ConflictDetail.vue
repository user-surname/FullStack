<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useConflictsStore } from "../stores/conflicts";

const route = useRoute();
const router = useRouter();
const conflictsStore = useConflictsStore();
const conflict = ref(null);
const selectedCountryId = ref("");
const selectedFactionId = ref("");
const newEvent = ref({
  eventDate: "",
  location: "",
  description: ""
});

const eventList = computed(() => conflict.value?.events ?? []);
const factions = computed(() => conflict.value?.factions ?? []);
const countries = computed(() => conflict.value?.countries ?? []);
const availableCountries = computed(() =>
  conflictsStore.countries.filter(
    country => !countries.value.some(assigned => assigned.id === country.id)
  )
);
const availableFactions = computed(() =>
  conflictsStore.factions.filter(
    faction => !factions.value.some(assigned => assigned.id === faction.id)
  )
);

const formatDate = (value) => {
  if (!value) return "Sense data";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Data invalida";
  return new Intl.DateTimeFormat("ca-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
};

onMounted(async () => {
  const id = route.params.id;
  await Promise.all([
    conflictsStore.getCountries(),
    conflictsStore.getFactions()
  ]);
  conflict.value = await conflictsStore.getConflictById(id);
});

const addCountry = () => {
  const id = Number(selectedCountryId.value);
  if (!id || !conflict.value) return;
  const match = conflictsStore.countries.find(country => country.id === id);
  if (match) {
    conflict.value.countries = [...countries.value, match];
  }
  selectedCountryId.value = "";
};

const removeCountry = (id) => {
  if (!conflict.value) return;
  conflict.value.countries = countries.value.filter(country => country.id !== id);
};

const addFaction = () => {
  const id = Number(selectedFactionId.value);
  if (!id || !conflict.value) return;
  const match = conflictsStore.factions.find(faction => faction.id === id);
  if (match) {
    conflict.value.factions = [...factions.value, match];
  }
  selectedFactionId.value = "";
};

const removeFaction = (id) => {
  if (!conflict.value) return;
  conflict.value.factions = factions.value.filter(faction => faction.id !== id);
};

const addNewEvent = () => {
  if (!conflict.value) return;
  if (!newEvent.value.eventDate || !newEvent.value.location || !newEvent.value.description) {
    return;
  }
  conflict.value.events = [
    ...eventList.value,
    {
      eventDate: newEvent.value.eventDate,
      location: newEvent.value.location,
      description: newEvent.value.description
    }
  ];
  newEvent.value = { eventDate: "", location: "", description: "" };
};

const removeEvent = (id, index) => {
  if (!conflict.value) return;
  if (!id && Number.isInteger(index)) {
    conflict.value.events = eventList.value.filter((_, idx) => idx !== index);
    return;
  }
  conflict.value.events = eventList.value.filter(event => event.id !== id);
};

const saveChanges = async () => {
  if (!conflict.value) return;
  const updated = await conflictsStore.updateConflict(conflict.value.id, conflict.value);
  if (updated) {
    conflict.value = updated;
  }
};
</script>

<template>
  <main class="detail-page">
    <button class="back" @click="router.push('/')">Tornar</button>

    <p v-if="conflictsStore.loading">Carregant detall...</p>
    <p v-else-if="conflictsStore.error">{{ conflictsStore.error }}</p>
    <article v-else-if="conflict" class="detail-card">
      <h1>{{ conflict.name }}</h1>
      <p class="description">{{ conflict.description }}</p>
      <p><strong>Estat:</strong> {{ conflict.status }}</p>
      <p><strong>Data inici:</strong> {{ formatDate(conflict.startDate) }}</p>

      <section>
        <h2>Paisos implicats</h2>
        <div class="inline-form">
          <select v-model="selectedCountryId">
            <option value="">Selecciona pais...</option>
            <option v-for="country in availableCountries" :key="country.id" :value="country.id">
              {{ country.name }} ({{ country.code }})
            </option>
          </select>
          <button @click="addCountry">Afegir pais</button>
        </div>
        <ul>
          <li v-for="country in countries" :key="country.id">
            {{ country.name }} ({{ country.code }})
            <button class="small danger" @click="removeCountry(country.id)">Eliminar</button>
          </li>
        </ul>
      </section>

      <section>
        <h2>Faccions</h2>
        <div class="inline-form">
          <select v-model="selectedFactionId">
            <option value="">Selecciona faccio...</option>
            <option v-for="faction in availableFactions" :key="faction.id" :value="faction.id">
              {{ faction.name }}
            </option>
          </select>
          <button @click="addFaction">Afegir faccio</button>
        </div>
        <ul>
          <li v-for="faction in factions" :key="faction.id">
            {{ faction.name }}
            <button class="small danger" @click="removeFaction(faction.id)">Eliminar</button>
          </li>
        </ul>
      </section>

      <section>
        <h2>Esdeveniments</h2>
        <div class="event-form">
          <input v-model="newEvent.eventDate" type="datetime-local" />
          <input v-model="newEvent.location" type="text" placeholder="Localitzacio" />
          <input v-model="newEvent.description" type="text" placeholder="Descripcio" />
          <button @click="addNewEvent">Crear i afegir esdeveniment</button>
        </div>
        <ul>
          <li v-for="(event, index) in eventList" :key="event.id ?? `tmp-${index}`">
            {{ formatDate(event.eventDate) }} - {{ event.location }} - {{ event.description }}
            <button class="small danger" @click="removeEvent(event.id, index)">Eliminar</button>
          </li>
        </ul>
      </section>
      <button class="save" @click="saveChanges">Guardar canvis del conflicte</button>
    </article>
  </main>
</template>

<style scoped>
.detail-page {
  display: grid;
  gap: 1rem;
}

.back {
  width: fit-content;
}

.detail-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
}

.description {
  color: #334155;
}

section {
  margin-top: 1rem;
}

ul {
  padding-left: 1.2rem;
}

li {
  margin-bottom: 0.4rem;
}

.inline-form,
.event-form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.inline-form select,
.event-form input {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0.5rem;
}

.small {
  margin-left: 0.5rem;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
}

.danger {
  background: #dc2626;
  border-color: #dc2626;
}

.save {
  margin-top: 1rem;
}
</style>
