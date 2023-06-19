<!-- src/components/ApplicationDetails.vue -->

<template>
  <div v-if="isLoading">
    <p>Loading application data...</p>
  </div>
  <div v-else-if="isError">
    <p>Error fetching application data.</p>
  </div>
  <div v-else>
    <ResourceDetails
        :title="`Application: ${text}`"
        :details="details"
        resource-type="application"
        navigate-path="/application"
        :data="application"
        :url="resourceUrl"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useSingleResourceQuery } from "@/apiHandling/useResourceQuery";
import {computed, ref} from "vue";
import ResourceDetails from "@/components/ResourceDetails";

const route = useRoute();
const resourceUrl = route.params.url;

const { data: application, isError, isLoading } = useSingleResourceQuery(ref(resourceUrl));

const text = computed(() => application.value?.text);
const jobUrl = computed(() => application.value?.job);
const applicantUrl = computed(() => application.value?.applicant);

const { data: job, isError: isJobError, isLoading: isJobLoading } = useSingleResourceQuery(jobUrl);
const { data: applicant, isError: isApplicantError, isLoading: isApplicantLoading } = useSingleResourceQuery(applicantUrl);

const details = computed(() => [
  { label: "Text", value: text.value },
  {
    label: "Job",
    value: job.value ? job.value.description : "Loading...",
    isLink: true,
    url: job.value ? job.value.url : null,
  },
  {
    label: "Applicant",
    value: applicant.value ? applicant.value.name : "Loading...",
    isLink: true,
    url: applicant.value ? applicant.value.url : null,
  }
]);

</script>

<style scoped>
</style>
