<template>
  <div class="detail">
    <h2>{{ title }}</h2>
    <div v-for="(item, index) in details" :key="index" class="detail-item">
      <span>{{ item.label }}: </span>
      <span v-if="item.isList">
        <ul>
          <li v-for="(listItem, idx) in item.value" :key="idx">
            <button @click="() => handleResourceClick(listItem.url, item.label.toLowerCase())">{{ listItem.displayValue }}</button>
          </li>
        </ul>
      </span>
      <span v-else-if="item.isLink">
        <button @click="() => handleResourceClick(item.url, item.label.toLowerCase())">{{ item.value }}</button>
      </span>
      <span v-else>{{ item.value }}</span>
    </div>
    <div class="detail-actions">
      <button @click="handleDelete">Delete</button>
      <button @click="handleEdit">Edit</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import useDeleteMutation from "@/apiHandling/useDeleteMutation";
import { useRouter } from "vue-router";
import router from "@/router/router";
//import { useDeleteMutation } from "@/apiHandling/useDeleteMutation";

const props = defineProps({
  title: String,
  details: Array,
  resourceType: String,
  navigatePath: String,
  data: Object,
  url: String,
});

console.log(props.details);

//const router = useRouter();
//const deleteResourceMutation = useDeleteMutation(props.resourceType);
const deleteResourceMutation = useDeleteMutation(props.resourceType);
const handleDelete = async () => {
  try {
    console.log("Deleting resource:", props.data.url);
    await deleteResourceMutation.mutateAsync(props.data.url);
    router.push(props.navigatePath);
  } catch (error) {
    console.error("Error deleting resource:", error);
  }
};

const handleEdit = () => {
  console.log("Editing resource:", props.data.url);
  router.push({
    path: `/${props.resourceType}/form/}`,
    query: { url: encodeURIComponent(props.url) },
  });
};

function handleResourceClick(resource, hypermediaPrefix) {
  console.log('Resource clicked:', resource);
  router.push(`/${hypermediaPrefix}/${encodeURIComponent(resource)}`, { state: { data: resource } });
}

</script>

<style scoped>
@import "../assets/Detail.css";
</style>
