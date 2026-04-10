<script setup>
const props = defineProps({
  conflict: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(["viewDetail", "deleteConflict"]);

const statusLabel = {
  ACTIVE: "Actiu",
  FROZEN: "Congelat",
  ENDED: "Finalitzat"
};

const formatDate = (value) => {
  if (!value) return "Sense data";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Data invalida";
  return new Intl.DateTimeFormat("ca-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
};
</script>

<template>
  <article class="card">
    <div class="card-top">
      <h3>{{ props.conflict.name }}</h3>
      <span :class="['status', props.conflict.status?.toLowerCase()]">
        {{ statusLabel[props.conflict.status] ?? props.conflict.status }}
      </span>
    </div>

    <p class="description">
      {{ props.conflict.description || "Sense descripcio disponible." }}
    </p>
    <p><strong>Inici:</strong> {{ formatDate(props.conflict.startDate) }}</p>
    <p><strong>Paisos:</strong> {{ props.conflict.countries?.length ?? 0 }}</p>
    <p><strong>Faccions:</strong> {{ props.conflict.factions?.length ?? 0 }}</p>
    <p><strong>Esdeveniments:</strong> {{ props.conflict.events?.length ?? 0 }}</p>

    <div class="actions">
      <button @click="emit('viewDetail', props.conflict.id)">Veure detall</button>
      <button class="danger" @click="emit('deleteConflict', props.conflict.id)">Eliminar</button>
    </div>
  </article>
</template>

<style scoped>
.card {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1rem;
  background: #f8fafc;
}

.card-top {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: center;
}

.description {
  color: #475569;
}

.status {
  font-size: 0.8rem;
  border-radius: 999px;
  padding: 0.15rem 0.65rem;
  font-weight: 600;
}

.status.active {
  background: #dcfce7;
  color: #166534;
}

.status.frozen {
  background: #fef9c3;
  color: #854d0e;
}

.status.ended {
  background: #e2e8f0;
  color: #334155;
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.danger {
  background: #dc2626;
  color: #fff;
}
</style>
