<template>
  <div>
    <h2>{{ resourceType }} List</h2>
    <!-- Add your list content here -->
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  resourceType: String,
});
console.log(props.resourceType);

</script>

<style scoped>

</style>