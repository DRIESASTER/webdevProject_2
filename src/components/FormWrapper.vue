<template>
  <form @submit.prevent="handleSubmit" class="add-form">
    <slot :state="state" :setState="setState"></slot>
    <button type="submit" class="submit-btn">
      Save {{ resource }}
    </button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </form>
</template>

<script setup>
import {ref, reactive, watch, onMounted, watchEffect} from 'vue';
import { useRoute, useRouter } from 'vue-router';
//import { useCreateMutation, useUpdateMutation } from '../apiHandling';
import { defineProps } from 'vue';
import {useSingleResourceQuery} from "@/apiHandling/useResourceQuery";
import useUpdateMutation from "@/apiHandling/useUpdateMutation";
import useCreateMutation from "@/apiHandling/useCreateMutation";

const props = defineProps({
  resource: {
    type: String,
    required: true,
  },
  initialState: {
    type: Object,
    required: true,
  },
  navigateTo: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const router = useRouter();
const createMutation = useCreateMutation(props.resource);
const updateMutation = useUpdateMutation(props.resource);

const editModeRef = ref(false);
const errorMessage = ref(null);
const state = reactive({ ...props.initialState });

//console.log('route.params:', route.params)

onMounted(() => {
  console.log('Mounted - route.params:', route.params);
  console.log('Mounted - route.query:', route.query);
  if (route.query && route.query.url) {
    const url = decodeURIComponent(route.query.url);
    editModeRef.value = true;
    // Fetch data using the `url` and update the `state` object
    const { data: employee, isError, isLoading } = useSingleResourceQuery(ref(url));
    watchEffect(() => {
      if (employee.value) {
        setState(employee.value);
      }
    });
  }
});

const setState = (newState) => {
  console.log("newState:", newState)
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
    await router.push("/" + props.resource);
  } catch (error) {
    console.error(`Error creating ${props.resource}:`, error);
    console.error('Error details:', error.response?.data);
    errorMessage.value = error.response?.data.message;
  }
};
</script>

<style scoped>
@import '../assets/Form.css';
</style>
