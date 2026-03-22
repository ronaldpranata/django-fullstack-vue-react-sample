<script setup>
import Button from '../components/common/Button.vue';

defineProps({
  showLogout: { type: Boolean, default: true }
});

const emit = defineEmits(['logout']);
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 md:p-8">
    <header class="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
      <div>
        <h1 class="text-3xl font-bold text-primary tracking-tight">Corporate Directory</h1>
        <p class="text-gray-500 text-sm mt-1">Dual-Stack Vue & Django Prototype</p>
      </div>
      <Button v-if="showLogout" variant="danger" @click="emit('logout')">Sign Out</Button>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>
