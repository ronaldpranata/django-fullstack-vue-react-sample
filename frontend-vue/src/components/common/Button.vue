<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const baseStyle = "px-4 py-2 rounded-md font-semibold transition-all duration-200";
const variants = {
  primary: "bg-primary text-gray-900 hover:bg-primary-dark disabled:opacity-50",
  danger: "bg-red-500 text-white hover:bg-red-600 disabled:opacity-50",
  secondary: "bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50",
  outline: "border border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
};

const computedClass = computed(() => `${baseStyle} ${variants[props.variant]}`);
</script>

<template>
  <button :class="computedClass" :disabled="disabled">
    <slot></slot>
  </button>
</template>
