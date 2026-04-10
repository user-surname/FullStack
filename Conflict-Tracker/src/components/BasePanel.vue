<template>
  <section class="panel">
    <header class="panel-header">
      <slot name="header"></slot>
    </header>
    <div class="panel-content">
      <slot></slot>
    </div>
    <footer class="panel-footer">
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<style scoped>
.panel {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
}

.panel-header,
.panel-footer {
  margin-bottom: 0.75rem;
}

.panel-footer {
  margin-top: 0.75rem;
  margin-bottom: 0;
  color: #64748b;
}
</style>
