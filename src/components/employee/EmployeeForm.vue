<template>
  <div>
    <div v-if="companiesLoading">
      <p>Loading company data...</p>
    </div>
    <div v-else-if="companiesError">
      <p>Error fetching company data.</p>
    </div>
    <div v-else>
      <FormWrapper
          :resource="'employee'"
          :initialState="initialState"
          navigateTo="/employees"
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
import { ref } from "vue";
import { useResourceQuery } from "@/apiHandling/useResourceQuery";
import DropDownMenu from "@/components/DropDownMenu.vue";
import TextInput from "@/components/TextInput.vue";
import FormWrapper from "@/components/FormWrapper.vue";



const initialState = {
  name: "",
  email: "",
  role: "",
  company: "",
  url: "",
};

const { data: companyData, isLoading: companiesLoading, isError: companiesError } = useResourceQuery("/company", "companies");

const formFields = (state, setState) => [
  {
    component: DropDownMenu,
    dataList: companyData.value,
    dataValue: state.company,
    setData: (company) => setState({ ...state, company }),
    label: "Company",
    attributeToDisplay: "name",
  },
  {
    component: TextInput,
    label: "Name",
    value: state.name,
    onInput: (value) => setState({ ...state, name: value })
  },
  {
    component: TextInput,
    label: "Email",
    value: state.email,
    onInput: (email) => setState({ ...state, email }),
  },
  {
    component: TextInput,
    label: "Role",
    value: state.role,
    onInput: (role) => setState({ ...state, role }),
  },
];
</script>


<style scoped>

</style>