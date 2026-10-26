
<template>
  <main class="container py-5">
    <h1 class="text-center mb-4">UrbanWear Explorer</h1>

    <p class="text-center text-secondary mb-5">
      Explorá nuestro catálogo de productos.
    </p>

    <!-- Estado de carga -->
    <div v-if="cargando" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>

      <p class="mt-3">Cargando productos...</p>
    </div>

    <!-- Estado de error -->
    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}

      <button
        class="btn btn-outline-danger ms-3"
        @click="obtenerProductos"
      >
        Reintentar
      </button>
    </div>

    <!-- Listado de productos -->
    <div
      v-else
      class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4"
    >
      <div
        v-for="producto in productos"
        :key="producto.id"
        class="col"
      >
        <TarjetaProducto :producto="producto" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TarjetaProducto from '../components/TarjetaProducto.vue'

const productos = ref([])
const cargando = ref(true)
const error = ref('')

async function obtenerProductos() {
  cargando.value = true
  error.value = ''

  try {
    const respuesta = await fetch(
      'https://fakestoreapi.com/products'
    )

    if (!respuesta.ok) {
      throw new Error('No se pudieron obtener los productos.')
    }

    productos.value = await respuesta.json()
  } catch (err) {
    error.value =
      'Ocurrió un error al cargar los productos. Revisá tu conexión e intentá nuevamente.'
  } finally {
    cargando.value = false
  }
}

onMounted(obtenerProductos)
</script>
