<template>
  <div v-if="isLoading || isCompanyLoading">
    <p>Loading company data...</p>
  </div>
  <div v-else-if="isError || isCompanyError">
    <p>Error fetching company data.</p>
  </div>
  <div v-else>
    <ResourceDetails
        :title="`Employee: ${name}`"
        :details="details"
        resource-type="employee"
        navigate-path="/employee"
        :data="employee"
        :url="resourceUrl"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useSingleResourceQuery } from "@/apiHandling/useResourceQuery";
import { computed, ref } from "vue";
import ResourceDetails from "@/components/ResourceDetails";
import router from "@/router/router";

const route = useRoute();
const resourceUrl = route.params.url;

const { data: employee, isError, isLoading } = useSingleResourceQuery(ref(resourceUrl));

const name = computed(() => employee.value?.name);
const email = computed(() => employee.value?.email);
const role = computed(() => employee.value?.role);
const companyUrl = computed(() => employee.value?.company);

const { data: company, isError: isCompanyError, isLoading: isCompanyLoading } = useSingleResourceQuery(companyUrl);

const companyName = computed(() => company.value?.name);

const handleCompanyClick = () => {
  router.push({ name: "companyDetails", params: { url: companyUrl.value } });
};

const details = computed(() => [
  { label: "Name", value: name.value },
  { label: "Email", value: email.value },
  { label: "Role", value: role.value },
  {
    label: "Company",
    value: company.value ? company.value.name : "Loading...",
    isLink: true,
    url: company.value ? company.value.url : null,
  },
]);

</script>

<style scoped>
</style>







