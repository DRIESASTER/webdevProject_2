<!-- src/components/ApplicationForm.vue -->

<template>
  <div>
    <FormWrapper
        :resource="'application'"
        :initialState="initialState"
        navigateTo="/applications"
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
</template>

<script setup>
import TextInput from "@/components/TextInput.vue";
import FormWrapper from "@/components/FormWrapper.vue";
import {useResourceQuery} from "@/apiHandling/useResourceQuery";
import DropDownMenu from "@/components/DropDownMenu.vue";

const initialState = {
  text: "",
  job: "",
  applicant: "",
  url: "",
};

const { data: jobData, isLoading: jobsLoading, isError: jobsError } = useResourceQuery("/job", "jobs");
const { data: applicantData, isLoading: applicantsLoading, isError: applicantsError } = useResourceQuery("/applicant", "applicants");

const formFields = (state, setState) => [
  {
    component: TextInput,
    label: "Text",
    value: state.text,
    onInput: (value) => setState({ ...state, text: value }),
  },
  {
    component: DropDownMenu,
    dataList: jobData.value,
    dataValue: state.job,
    setData: (job) => setState({...state, job}),
    label: "Job",
    attributeToDisplay: "description",
  },
  {
    component: DropDownMenu,
    dataList: applicantData.value,
    dataValue: state.applicant,
    setData: (applicant) => setState({...state, applicant}),
    label: "Applicant",
    attributeToDisplay: "name",
  },
];

</script>

<style scoped>
</style>
