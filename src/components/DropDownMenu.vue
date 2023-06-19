<template>
  <div class="form-group">
    <label>
      {{ label }}:
      <select :value="dataValue" @change="handleChange">
        <option value="">Select a {{ label.toLowerCase() }}</option>
        <option
            v-for="data in dataList"
            :key="data.url"
            :value="data.url"
        >
          {{ data[attributeToDisplay] }}
        </option>
      </select>
    </label>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  dataList: {
    type: Array,
    default: () => [],
  },
  dataValue: {
    type: String,
    default: '',
  },
  setData: {
    type: Function,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  attributeToDisplay: {
    type: String,
    default: '',
  },
});

const handleChange = (event) => {
  const value = event.target.value;
  props.setData(value);
};
</script>

<style scoped>

</style>