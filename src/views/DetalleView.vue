
<template>
  <main class="container py-5">
    <RouterLink to="/" class="btn btn-outline-dark mb-4">
      ← Volver al listado
    </RouterLink>

    <div v-if="cargando" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3">Cargando producto...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
      <button class="btn btn-outline-danger ms-3" @click="obtenerProducto">
        Reintentar
      </button>
    </div>

    <div v-else-if="producto" class="row g-5">
      <div class="col-12 col-md-5">
        <div class="bg-white border rounded p-4 text-center">
          <img
            :src="producto.image"
            :alt="producto.title"
            class="img-fluid imagen-detalle"
          >
        </div>
      </div>

      <div class="col-12 col-md-7">
        <span class="badge text-bg-secondary mb-3">
          {{ producto.category }}
        </span>

        <h1 class="mb-3">{{ producto.title }}</h1>

        <p class="text-secondary">
          {{ producto.description }}
        </p>

        <p class="precio fs-2 fw-bold text-primary">
          ${{ producto.price.toFixed(2) }}
        </p>

        <div class="border-top pt-3 mt-4">
          <h2 class="fs-5">Calificación</h2>

          <p v-if="producto.rating">
            <span class="text-warning fs-4">★</span>
            <strong>{{ producto.rating.rate }} / 5</strong>
            <span class="text-secondary ms-2">
              ({{ producto.rating.count }} opiniones)
            </span>
          </p>

          <p v-else class="text-secondary">
            No hay calificación disponible.
          </p>
        </div>

        <RouterLink to="/" class="btn btn-dark mt-3">
          Seguir explorando
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const producto = ref(null)
const cargando = ref(true)
const error = ref('')

async function obtenerProducto() {
  cargando.value = true
  error.value = ''
  producto.value = null

  try {
    const respuesta = await fetch(
      `https://fakestoreapi.com/products/${route.params.id}`
    )

    if (!respuesta.ok) {
      throw new Error('No se pudo obtener el producto.')
    }

    const datos = await respuesta.json()

    if (!datos || !datos.id) {
      throw new Error('El producto solicitado no existe.')
    }

    producto.value = datos
  } catch (err) {
    error.value = 'No se pudo cargar el producto. Revisá tu conexión e intentá nuevamente.'
  } finally {
    cargando.value = false
  }
}

watch(() => route.params.id, obtenerProducto, { immediate: true })
</script>

<style scoped>
.imagen-detalle {
  width: 100%;
  height: 400px;
  object-fit: contain;
}

.precio {
  letter-spacing: -0.5px;
}
</style>
