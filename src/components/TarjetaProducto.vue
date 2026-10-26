
<template>
  <RouterLink
    :to="`/producto/${producto.id}`"
    class="text-decoration-none text-dark"
  >
    <article class="card h-100 shadow-sm">
      <div class="p-3 bg-white">
        <img
          :src="producto.image"
          :alt="producto.title"
          class="card-img-top imagen-producto"
        >
      </div>

      <div class="card-body d-flex flex-column">
        <h2 class="card-title fs-6">
          {{ producto.title }}
        </h2>

        <p class="card-text fw-bold text-primary mt-auto">
          ${{ producto.price.toFixed(2) }}
        </p>

        <span class="btn btn-dark mt-2">
          Ver detalle
        </span>
      </div>
    </article>
  </RouterLink>
</template>

<script setup>
defineProps({
  producto: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.imagen-producto {
  height: 200px;
  object-fit: contain;
}

.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.12) !important;
}
</style>
