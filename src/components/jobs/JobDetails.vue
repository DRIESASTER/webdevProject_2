<template>
  <div v-if="isLoading">
    <p>Loading job data...</p>
  </div>
  <div v-else-if="isError">
    <p>Error fetching job data.</p>
  </div>
  <div v-else>
    <ResourceDetails
        :title="`Job: ${description}`"
        :details="details"
        resource-type="job"
        navigate-path="/job"
        :data="job"
        :url="resourceUrl"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import {useMultipleResourceQueries, useSingleResourceQuery} from "@/apiHandling/useResourceQuery";
import {computed, ref} from "vue";
import ResourceDetails from "@/components/ResourceDetails";
import router from "@/router/router";

const route = useRoute();
const resourceUrl = route.params.url;

const { data: job, isError, isLoading } = useSingleResourceQuery(ref(resourceUrl));


const description = computed(() => job.value?.description);
const salaryMin = computed(() => job.value?.salaryMin);
const salaryMax = computed(() => job.value?.salaryMax);
const published = computed(() => job.value?.published);
const deadline = computed(() => job.value?.deadline);



const companyUrl = computed(() => job.value?.company);
const recruiterUrl = computed(() => job.value?.recruiter);
const applicationsUrls = computed(() => job.value?.applications);
// todo applications
// todo recruiter
const { data: recruiter, isError: isRecruiterError, isLoading: isRecruiterLoading } = useSingleResourceQuery(recruiterUrl);
const { data: company, isError: isCompanyError, isLoading: isCompanyLoading } = useSingleResourceQuery(companyUrl);
const { data: applications, isError: isApplicationsError, isLoading: isApplicationsLoading } = useMultipleResourceQueries(applicationsUrls);

const handleCompanyClick = () => {
  router.push({ name: "companyDetails", params: { url: companyUrl.value } });
};

const details = computed(() => [
  { label: "Description", value: description.value },
  {
    label: "Company",
    value: company.value ? company.value.name : "Loading...",
    isLink: true,
    url: company.value ? company.value.url : null,
  },
  {
    label: "Recruiter",
    value: recruiter.value ? recruiter.value.name : "Loading...",
    isLink: true,
    url: recruiter.value ? recruiter.value.url : null,
  },
  {
    label: "Applications",
    value: applications.value ? applications.value.map((application) => ({
      ...application,
      displayValue: application.text,
    })) : "Loading...",
    isList: true,
  },
  { label: "Salary Min", value: salaryMin.value },
  { label: "Salary Max", value: salaryMax.value },
  { label: "Published", value: published.value },
  { label: "Deadline", value: deadline.value },

]);

</script>

<style scoped>
</style>