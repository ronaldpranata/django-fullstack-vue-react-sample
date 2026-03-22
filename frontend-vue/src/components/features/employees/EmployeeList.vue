<script setup>
import Button from '../../common/Button.vue';
import Badge from '../../common/Badge.vue';

defineProps({
  employees: { type: Array, required: true }
});

const emit = defineEmits(['edit', 'delete']);
</script>

<template>
  <div v-if="employees.length === 0" class="text-center text-gray-500 my-16 italic text-lg opacity-80">
    No employees found. Seed the Django database!
  </div>
  <div v-else class="space-y-4">
    <div v-for="emp in employees" :key="emp.id" class="bg-surface border border-gray-800/50 p-6 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-lg hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(66,184,131,0.1)] transition-all duration-300">
      <div class="mb-4 sm:mb-0">
        <div class="text-xs font-bold text-primary uppercase tracking-wider mb-1">{{ emp.employee_id }}</div>
        <h2 class="text-xl font-bold text-gray-100 mb-1 tracking-tight">{{ emp.name }}</h2>
        <p class="text-gray-400 text-sm flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-green-500 block"></span>
          {{ emp.email }}
        </p>
      </div>
      <div class="flex items-center gap-3 w-full sm:w-auto justify-end border-t border-gray-800 sm:border-none pt-4 sm:pt-0">
        <Badge>{{ emp.department }}</Badge>
        <Button variant="secondary" class="px-3 py-1 text-sm bg-gray-700/50 hover:bg-gray-700" @click="emit('edit', emp)">Edit</Button>
        <Button variant="danger" class="px-3 py-1 text-sm" @click="emit('delete', emp.id)">Delete</Button>
      </div>
    </div>
  </div>
</template>
