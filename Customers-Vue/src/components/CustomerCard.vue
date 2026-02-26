<script setup>
const props = defineProps({
    customer: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="customer-card" v-if="props.customer">
        <div class="card-header">  
            <div class="avatar">  
                <h3>{{ props.customer.firstName.charAt(0) }}</h3>
                <p>{{ props.customer.email.charAt(0) }}</p>
            </div>
            <div class="header-info">
                <h3>{{ props.customer.firstName }} {{ props.customer.lastName }}</h3>
            </div>
            <div class="card-body">
                <div class="info-item">
                    <span class="label">Email</span>
                    <span class="value">{{ props.customer.email }}</span>
                </div>
                <div class="info-item">
                    <span class="label">Incidencies: </span>
                    <span :class="['status-tag', props.customer.incidencies.length > 0 ? 'active' : 'empty']">
                        {{ props.customer.incidencies.length || 0 }} assignades
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}
.value {
    font-size: 0.95rem;
    color: goldenrod;
}
.status-tag {
    display: inline-block;
    font-size: 0.85rem;
    margin-top: 4px;
}
.status-tag.active {
    color: #059669;
    font-weight: 500rem;
}
.status-tag.empty {
    color: #ff0000;
    font-weight: 500rem;

}
.header-info {
    margin: 0;
    font-size: 1.1rem;
    color: #1f2937;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.customer-card {
    border-radius: 12px;
    padding: 16px;
    background-color: white;
    box-shadow: 0 4px 6px -1 rgba(0, 0, 0, 0.1), 0 2px 4px -1 rgba(0, 0, 0, 0.06);
    padding: 1.5rem;
    transition: transform 0.2s, box-shadow 0.2s;
    border: 1px solid #f0f0f0;
    max-width: 400px;
}
.customer-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3 rgba(0, 0, 0, 0.1);
}

.card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}
.avatar {
    width: 48px;
    height: 48px;
    background-color: blue;
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 1.2rem;
    }
.card-body {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}
.info-item {
    display: flex;
    text-transform: uppercase;
    color: gray;
    letter-spacing: 0.05em;
}
</style>