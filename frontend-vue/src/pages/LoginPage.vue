<script setup>
import LoginForm from '../components/features/auth/LoginForm.vue';

const emit = defineEmits(['loginSuccess']);
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden">
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
    
    <div class="z-10 text-center mb-8">
      <h1 class="text-5xl font-extrabold text-white mb-3 tracking-tight">Corporate <span class="text-primary">Directory</span></h1>
      <p class="text-gray-400 text-lg">Component-Driven Vue Architecture</p>
    </div>
    
    <div class="z-10 w-full">
      <LoginForm @loginSuccess="emit('loginSuccess')" />
    </div>
  </div>
</template>
