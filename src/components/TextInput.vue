<template>
  <div class="text-input">
    <label v-if="label">{{ label }}</label>
    <input
        :type="type"
        :value="value"
        @input="onInput($event.target.value)"
        :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';


const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  onInput: {
    type: Function,
    default: () => {},
  },
});



</script>

<style scoped>

</style>