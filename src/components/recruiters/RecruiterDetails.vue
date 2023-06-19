<template>
  <div v-if="isLoading || isJobsLoading">
    <p>Loading recruiter data...</p>
  </div>
  <div v-else-if="isError || isJobsError">
    <p>Error fetching recruiter data.</p>
  </div>
  <div v-else>
    <ResourceDetails
        :title="`Recruiter: ${name}`"
        :details="details"
        resource-type="recruiter"
        navigate-path="/recruiter"
        :data="recruiter"
        :url="resourceUrl"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useSingleResourceQuery, useMultipleResourceQueries } from "@/apiHandling/useResourceQuery";
import {computed, ref} from "vue";
import ResourceDetails from "@/components/ResourceDetails";

const route = useRoute();
const resourceUrl = route.params.url;

const { data: recruiter, isError, isLoading } = useSingleResourceQuery(ref(resourceUrl));

const name = computed(() => recruiter.value?.name);
const email = computed(() => recruiter.value?.email);
const companyUrl = computed(() => recruiter.value?.company);

const { data: company, isError: isCompanyError, isLoading: isCompanyLoading } = useSingleResourceQuery(companyUrl);

const jobsUrls = computed(() => recruiter.value?.jobs);
const { data: jobs, isError: isJobsError, isLoading: isJobsLoading } = useMultipleResourceQueries(jobsUrls);

const details = computed(() => [
  { label: "Name", value: name.value },
  { label: "Email", value: email.value },
  {
    label: "Company",
    value: company.value ? company.value.name : "Loading...",
    isLink: true,
    url: company.value ? company.value.url : null,
  },
  {
    label: "Jobs",
    value: jobs.value
        ? jobs.value.map((job) => ({
          ...job,
          displayValue: job.description,
        }))
        : [],
    isList: true,
  },
]);

</script>

<style scoped>
</style>