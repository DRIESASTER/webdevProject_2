<template>
  <div v-if="isLoading">
    <p>Loading applicant data...</p>
  </div>
  <div v-else-if="isError">
    <p>Error fetching applicant data.</p>
  </div>
  <div v-else>
    <ResourceDetails
        :title="`Applicant: ${name}`"
        :details="details"
        resource-type="applicant"
        navigate-path="/applicant"
        :data="applicant"
        :url="resourceUrl"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import {useMultipleResourceQueries, useSingleResourceQuery} from "@/apiHandling/useResourceQuery";
import {computed, ref, watchEffect} from "vue";
import ResourceDetails from "@/components/ResourceDetails";

const route = useRoute();
const resourceUrl = route.params.url;

const { data: applicant, isError, isLoading } = useSingleResourceQuery(ref(resourceUrl));

const name = computed(() => applicant.value?.name);
const email = computed(() => applicant.value?.email);
const skills = computed(() => applicant.value?.skills);
const resume = computed(() => applicant.value?.resume);
const applications = computed(() => applicant.value?.applications);

const { data: applicationsData, isError: applicationsError, isLoading: applicationsLoading } = useMultipleResourceQueries(applications);

const details = computed(() => [
  { label: "Name", value: name.value },
  { label: "Email", value: email.value },
  { label: "Skills", value: skills.value.join(", ") },
  { label: "Resume", value: resume.value },
  { label: "Application",
    value: applicationsData.value
    ? applicationsData.value.map((app) => ({
      ...app,
      displayValue: app.text,
    }))
    : [],
    isList: true,
  },
]);

</script>

<style scoped>
</style>
