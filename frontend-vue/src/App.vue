<script setup>
import { ref } from 'vue';
import { ApiService } from './services/api';
import LoginPage from './pages/LoginPage.vue';
import DashboardPage from './pages/DashboardPage.vue';

const isAuth = ref(ApiService.isAuthenticated());

const handleLogout = () => {
  ApiService.clearToken();
  isAuth.value = false;
};
</script>

<template>
  <LoginPage v-if="!isAuth" @loginSuccess="isAuth = true" />
  <DashboardPage v-else @logout="handleLogout" />
</template>
