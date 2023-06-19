<template>
  <div v-if="isLoading">
    <p>Loading review data...</p>
  </div>
  <div v-else-if="isError">
    <p>Error fetching review data.</p>
  </div>
  <div v-else>
    <ResourceDetails
        :title="`${text}`"
        :details="details"
        resource-type="review"
        navigate-path="/review"
        :data="review"
        :url="resourceUrl"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useSingleResourceQuery } from "@/apiHandling/useResourceQuery";
import { computed, ref } from "vue";
import ResourceDetails from "@/components/ResourceDetails";

const route = useRoute();
const resourceUrl = route.params.url;

const { data: review, isError, isLoading } = useSingleResourceQuery(ref(resourceUrl));

const companyUrl = computed(() => review.value?.company);
const score = computed(() => review.value?.score);
const text = computed(() => review.value?.text);

const { data: companyData, isError: isCompanyError, isLoading: isCompanyLoading } = useSingleResourceQuery(companyUrl);


const details = computed(() => [
  { label: "Score", value: score.value },
  { label: "Text", value: text.value },
  {
    label: "Company",
    value: companyData.value ? companyData.value.name : "Loading...",
    isLink: true,
    url: companyData.value ? companyData.value.url : null,
  }
]);
</script>

<style scoped>
</style>
