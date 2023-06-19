
<template>
  <div>
    <FormWrapper
        :resource="'recruiter'"
        :initialState="initialState"
        navigateTo="/recruiters"
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
  name: "",
  email: "",
  company: "",
  url: "",
};

const { data: companyData, isLoading: companiesLoading, isError: companiesError } = useResourceQuery("/company", "companies");

const formFields = (state, setState) => [
  {
    component: TextInput,
    label: "Name",
    value: state.name,
    onInput: (value) => setState({ ...state, name: value }),
  },
  {
    component: DropDownMenu,
    dataList: companyData.value,
    dataValue: state.company,
    setData: (company) => setState({...state, company}),
    label: "Company",
    attributeToDisplay: "name",
  },
  {
    component: TextInput,
    label: "Email",
    value: state.email,
    onInput: (value) => setState({ ...state, email: value }),
  },
];

</script>

<style scoped>
</style>