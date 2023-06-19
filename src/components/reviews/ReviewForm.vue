<template>
  <div>
    <form @submit.prevent="handleSubmit" class="add-form">
      <component
          v-for="(field, index) in formFields(state, setState)"
          :key="index"
          :is="field.component"
          v-bind="field"
      ></component>
      <button type="submit" class="submit-btn">
        Save review
      </button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import TextInput from "@/components/TextInput.vue";
import { useResourceQuery } from "@/apiHandling/useResourceQuery";
import DropDownMenu from "@/components/DropDownMenu";
import {ref, reactive, watchEffect, onMounted, watch, computed} from "vue";
import { useRoute, useRouter } from "vue-router";
import useUpdateMutation from "@/apiHandling/useUpdateMutation";
import useCreateMutation from "@/apiHandling/useCreateMutation";
import { useSingleResourceQuery } from "@/apiHandling/useResourceQuery";

const initialState = {
  score: "",
  text: "",
  company: "",
  employee: "",
  url: "",
};

const { data: companyData, isLoading: companiesLoading, isError: companiesError } = useResourceQuery("/company", "companies");
const state = reactive({ ...initialState });


const selectedCompanyEmployees = ref([]);

watchEffect(async () => {
  if (state.company !== "") {
    // fetch the company
    const response = await fetch(state.company);
    const companyData = await response.json();
    const employeeUrls = companyData.employees;
    const employees = [];

    for (const employeeUrl of employeeUrls) {
      const response = await fetch(employeeUrl);
      const employeeData = await response.json();
      employees.push(employeeData);
    }
    selectedCompanyEmployees.value = employees;
  }
});

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
    component: DropDownMenu,
    dataList: selectedCompanyEmployees.value,
    dataValue: state.employee,
    setData: (employee) => setState({ ...state, employee }),
    label: "Employee",
    attributeToDisplay: "name",
  },
  {
    component: TextInput,
    label: "Score",
    value: state.score,
    onInput: (value) => setState({ ...state, score: value }),
  },
  {
    component: TextInput,
    label: "Text",
    value: state.text,
    onInput: (value) => setState({ ...state, text: value }),
  },
];

const route = useRoute();
const router = useRouter();
const createMutation = useCreateMutation("review");
const updateMutation = useUpdateMutation("review");

const editModeRef = ref(false);
const errorMessage = ref(null);


onMounted(() => {
  if (route.query && route.query.url) {
    const url = decodeURIComponent(route.query.url);
    editModeRef.value = true;
    const { data: review, isError, isLoading } = useSingleResourceQuery(ref(url));
    watchEffect(() => {
      if (review.value) {
        setState(review.value);
      }
    });
  }
});

const setState = (newState) => {
  Object.assign(state, newState);
};

const handleSubmit = async () => {
  const formData = state;
  try {
    if (editModeRef.value) {
      await updateMutation.mutateAsync({ data: formData, url: state.url });
    } else {
      await createMutation.mutateAsync(formData);
    }
    await router.push("/review");
  } catch (error) {
    console.error(`Error creating review:`, error);
    console.error('Error details:', error.response?.data);
    errorMessage.value = error.response?.data.message;
  }
};
</script>

<style scoped>
@import '../../assets/Form.css';
</style>