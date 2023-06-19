<template>
  <div>
    <div v-if="isLoading">
      <p>Loading applicant data...</p>
    </div>
    <div v-else-if="isError">
      <p>Error fetching applicant data.</p>
    </div>
    <div v-else>
      <FormWrapper
          :resource="'applicant'"
          :initialState="initialState"
          navigateTo="/applicants"
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
  email: "",
  skills: [],
  resume: "",
  applications: [],
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
    label: "Email",
    value: state.email,
    onInput: (value) => setState({ ...state, email: value }),
  },
  {
    component: TextInput,
    label: "Skills",
    value: state.skills,
    onInput: (value) => setState({ ...state, skills: value.split(',').map(skill => skill.trim()) }),
  },
  {
    component: TextInput,
    label: "Resume",
    value: state.resume,
    onInput: (value) => setState({ ...state, resume: value }),
  },
];

</script>

<style scoped>
</style>