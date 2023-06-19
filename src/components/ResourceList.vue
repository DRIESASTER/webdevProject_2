<template>
  <div class="list-menu">
    <h1>{{resourceType}}</h1>
    <ul>
      <li v-if="isLoading">Loading...</li>
      <li class="list-item" v-for="resource in data" :key="resource.url">
        <router-link :to="{ name: `${resourceType}Details`,params: { url: resource.url} }">{{resource[attribute]}}</router-link>
      </li>
    </ul>
    <router-link :to="{ name: `${resourceType}Add` }">
      <button class="add-btn">Add {{resourceType}}}</button>
    </router-link>
  </div>
</template>



<script setup>
  import {useResourceQuery} from "@/apiHandling/useResourceQuery";
  import { defineProps } from 'vue';
  const props = defineProps({
  resourceType: String,
  resourceListName: String,
    attribute: String,
});

  const { data, isLoading } = useResourceQuery(props.resourceType, props.resourceListName);

/*
  const formatResourceName = (name) => {
    return name.charAt(0).toUpperCase() + "Details";
  };
*/

</script>

<style>
@import "../assets/ListMenu.css";
</style>


