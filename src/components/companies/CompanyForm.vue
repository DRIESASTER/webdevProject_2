<template>
  <div>
    <div v-if="isLoading">
      <p>Loading company data...</p>
    </div>
    <div v-else-if="isError">
      <p>Error fetching company data.</p>
    </div>
    <div v-else>
      <FormWrapper
          :resource="'company'"
          :initialState="initialState"
          navigateTo="/companies"
      >
        <template #default="{ state, setState }">
          <component
              v-for="(field, index) in formFields(state, setState)"
              :key="index"
              :is="field.component"
              v-bind="field"
          ></component>
        </template>
      </FormWrapper>
    </div>
  </div>
</template>

<script setup>
import TextInput from "@/components/TextInput.vue";
import FormWrapper from "@/components/FormWrapper.vue";

const initialState = {
  name: "",
  industry: "",
  description: "",
  size: "",
  score: "",
  url: "",
};

const formFields = (state, setState) => [
  {
    component: TextInput,
    label: "Name",
    value: state.name,
    onInput: (value) => setState({ ...state, name: value }),
  },
  {
    component: TextInput,
    label: "Industry",
    value: state.industry,
    onInput: (value) => setState({ ...state, industry: value }),
  },
  {
    component: TextInput,
    label: "Description",
    value: state.description,
    onInput: (value) => setState({ ...state, description: value }),
  },
  {
    component: TextInput,
    label: "Size",
    value: state.size,
    onInput: (value) => setState({ ...state, size: value }),
  },
  {
    component: TextInput,
    label: "Score",
    value: state.size,
    onInput: (value) => setState({ ...state, score: value }),
  },
];
</script>

<style scoped>
</style>
