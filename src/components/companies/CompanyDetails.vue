<template>
  <div v-if="isLoading || isEmployeesLoading || isJobsLoading || isReviewsLoading">
    <p>Loading company data...</p>
  </div>
  <div v-else-if="isError || isEmployeesError || isJobsError || isReviewsError">
    <p>Error fetching company data.</p>
  </div>
  <div v-else>
    <ResourceDetails
        :title="`Company: ${name}`"
        :details="details"
        resource-type="company"
        navigate-path="/company"
        :data="company"
        :url="resourceUrl"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useSingleResourceQuery, useMultipleResourceQueries } from "@/apiHandling/useResourceQuery";
import {computed, ref, watchEffect} from "vue";
import ResourceDetails from "@/components/ResourceDetails";
import router from "@/router/router";

const route = useRoute();
const resourceUrl = route.params.url;


const { data: company, isError, isLoading } = useSingleResourceQuery(ref(resourceUrl));

const name = computed(() => company.value?.name);
const industry = computed(() => company.value?.industry);
const description = computed(() => company.value?.description);
const size = computed(() => company.value?.size);
const score = computed(() => company.value?.score);

const employeesUrls = computed(() => company.value?.employees);


const { data: employees, isError: isEmployeesError, isLoading: isEmployeesLoading } = useMultipleResourceQueries(employeesUrls)

const jobsUrls = computed(() => company.value?.jobs);
const { data: jobs, isError: isJobsError, isLoading: isJobsLoading } = useMultipleResourceQueries(jobsUrls);

const reviewsUrls = computed(() => company.value?.reviews);
const { data: reviews, isError: isReviewsError, isLoading: isReviewsLoading } = useMultipleResourceQueries(reviewsUrls)


const details = computed(() => [
  { label: "Industry", value: industry.value },
  { label: "Description", value: description.value },
  { label: "Size", value: size.value },
  { label: "Score", value: score.value },
  {
    label: "Employee",
    value: employees.value
        ? employees.value.map((employee) => ({
          ...employee,
          displayValue: employee.name,
        }))
        : [],
    isList: true,
  },
  {
    label: "Job",
    value: jobs.value
        ? jobs.value.map((job) => ({
          ...job,
          displayValue: job.description,
        }))
        : [],
    isList: true,
  },
  {
    label: "Review",
    value: reviews.value
        ? reviews.value.map((review) => ({
          ...review,
          displayValue: review.text,
        }))
        : [],
    isList: true,
  },
]);

</script>

<style scoped>
</style>
