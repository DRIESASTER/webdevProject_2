<template>
  <div>
    <FormWrapper
        :resource="'job'"
        :initialState="initialState"
        navigateTo="/jobs"
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
import DropDownMenu from "@/components/DropDownMenu";

const initialState = {
  description: "",
  company: "",
  recruiter: "",
  salaryMin: "",
  salaryMax: "",
  published: "",
  deadline: "",
  url: "",
};

const { data: companyData, isLoading: companiesLoading, isError: companiesError } = useResourceQuery("/company", "companies");
const { data: recruiterData, isLoading: recruitersLoading, isError: recruitersError } = useResourceQuery("/recruiter", "recruiters");

const formFields = (state, setState) => [
  {
    component: TextInput,
    label: "Description",
    value: state.description,
    onInput: (value) => setState({ ...state, description: value }),
  },
  {
    component: DropDownMenu,
    dataList: companyData.value,
    dataValue: state.company,
    setData: (company) => setState({ ...state, company }),
    label: "Company",
    attributeToDisplay: "name",
  },
  {
    component: DropDownMenu,
    dataList: recruiterData.value,
    dataValue: state.recruiter,
    setData: (recruiter) => setState({ ...state, recruiter }),
    label: "Recruiter",
    attributeToDisplay: "name",
  },
  {
    component: TextInput,
    label: "Salary Min",
    value: state.salaryMin,
    onInput: (value) => setState({ ...state, salaryMin: value }),
  },
  {
    component: TextInput,
    label: "Salary Max",
    value: state.salaryMax,
    onInput: (value) => setState({ ...state, salaryMax: value }),
  },
  {
    component: TextInput,
    label: "Published",
    value: state.published,
    onInput: (value) => setState({ ...state, published: value }),
    type: "date",
  },
  {
    component: TextInput,
    label: "Deadline",
    value: state.deadline,
    onInput: (value) => setState({ ...state, deadline: value }),
    type: "date",
  },

 ];

</script>

<style scoped>
</style>