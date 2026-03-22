<script setup>
import { ref, onMounted } from 'vue';
import { ApiService } from '../services/api';
import MainLayout from '../layouts/MainLayout.vue';
import EmployeeList from '../components/features/employees/EmployeeList.vue';
import EmployeeForm from '../components/features/employees/EmployeeForm.vue';
import Chat from '../components/features/notifications/Chat.vue';

const emit = defineEmits(['logout']);

const employees = ref([]);
const loading = ref(true);

const showForm = ref(false);
const isEditing = ref(false);
const formData = ref({ id: null, employee_id: '', first_name: '', last_name: '', email: '', department_id: 1 });

const loadData = async () => {
  loading.value = true;
  try {
    employees.value = await ApiService.getEmployees();
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);

const handleFormSubmit = async () => {
  try {
    if (isEditing.value) await ApiService.updateEmployee(formData.value.id, formData.value);
    else await ApiService.createEmployee(formData.value);
    showForm.value = false;
    loadData();
  } catch (e) {
    alert(e.message);
  }
};

const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to permanently delete this record?")) return;
  try {
    await ApiService.deleteEmployee(id);
    loadData();
  } catch (e) {
    alert(e.message);
  }
};

const openNewForm = () => {
  isEditing.value = false;
  formData.value = { id: null, employee_id: '', first_name: '', last_name: '', email: '', department_id: 1 };
  showForm.value = true;
};

const openEditForm = (emp) => {
  isEditing.value = true;
  formData.value = { 
    id: emp.id, employee_id: emp.employee_id, first_name: emp.first_name, 
    last_name: emp.last_name, email: emp.email, 
    department_id: emp.department_id || 1 
  };
  showForm.value = true;
};
</script>

<template>
  <MainLayout @logout="emit('logout')">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-300">Employee Directory</h2>
      <button class="bg-primary text-gray-900 px-5 py-2 rounded-lg font-bold hover:bg-primary-dark transition-all shadow-lg hover:shadow-green-500/20" @click="openNewForm">
        + Register New
      </button>
    </div>

    <EmployeeForm 
      v-if="showForm" 
      :isEditing="isEditing" 
      :formData="formData"
      @submit="handleFormSubmit" 
      @close="showForm = false"
    />

    <div v-if="loading" class="text-center my-16 text-primary animate-pulse">Synchronizing directory...</div>
    <EmployeeList 
      v-else 
      :employees="employees" 
      @edit="openEditForm" 
      @delete="handleDelete" 
    />
    
    <Chat />
  </MainLayout>
</template>
