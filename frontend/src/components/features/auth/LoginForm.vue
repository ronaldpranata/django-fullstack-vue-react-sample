<script setup>
import { ref } from 'vue';
import { ApiService } from '../../../services/api';
import Button from '../../common/Button.vue';

const emit = defineEmits(['loginSuccess']);

const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  error.value = '';
  try {
    await ApiService.login(username.value, password.value);
    emit('loginSuccess');
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="max-w-md w-full mx-auto mt-20 bg-surface p-8 rounded-xl shadow-2xl text-center">
    <h2 class="text-2xl font-bold text-primary mb-6">Authentication Required</h2>
    <form @submit.prevent="handleSubmit" class="text-left space-y-4">
      <div>
        <label class="block text-gray-400 mb-1 text-sm">Username</label>
        <input 
          type="text" required v-model="username"
          class="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:border-primary focus:outline-none text-white transition-colors"
        />
      </div>
      <div>
        <label class="block text-gray-400 mb-1 text-sm">Password</label>
        <input 
          type="password" required v-model="password"
          class="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:border-primary focus:outline-none text-white transition-colors"
        />
      </div>
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
      <Button type="submit" class="w-full mt-4" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Sign In' }}
      </Button>
    </form>
  </div>
</template>
