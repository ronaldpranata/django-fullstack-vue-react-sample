<script setup>
import Button from '../../common/Button.vue';

defineProps({
  isEditing: Boolean,
  formData: Object
});

const emit = defineEmits(['submit', 'close', 'update:formData']);
</script>

<template>
  <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
    <div class="bg-surface p-8 rounded-2xl w-full max-w-md shadow-2xl border border-gray-800">
      <h2 class="text-2xl font-bold text-primary mb-6">{{ isEditing ? 'Modify' : 'Enroll' }} Employee</h2>
      <form @submit.prevent="emit('submit')" class="space-y-5">
        <div>
          <label class="block text-gray-400 text-sm font-medium mb-1.5">First Name</label>
          <input 
            required class="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
            v-model="formData.first_name" 
          />
        </div>
        <div>
          <label class="block text-gray-400 text-sm font-medium mb-1.5">Last Name</label>
          <input 
            required class="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
            v-model="formData.last_name" 
          />
        </div>
        <div>
          <label class="block text-gray-400 text-sm font-medium mb-1.5">Corporate Email</label>
          <input 
            type="email" required class="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
            v-model="formData.email" 
          />
        </div>
        <div class="flex justify-end gap-3 pt-6 border-t border-gray-800 mt-2">
          <Button type="button" variant="outline" @click="emit('close')">Discard</Button>
          <Button type="submit">Publish</Button>
        </div>
      </form>
    </div>
  </div>
</template>
