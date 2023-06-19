

import { useQuery } from 'vue-query';
import apiClient from './apiClient';
import {ref, watch, watchEffect} from "vue";

export const fetchResources = async (resourceType, resourceListName) => {
    const response = await apiClient.get(resourceType);
    return fetchResourceData(response.data[resourceListName]);
};

export const fetchResourceData = async (resources) => {
    try {
        const data = await Promise.all(
            resources.map(async (resourceUrl) => {
                try {
                    const response = await apiClient.get(resourceUrl);
                    return response.data;
                } catch (error) {
                    console.error('Error fetching resource data:', error);
                }
            })
        );
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching resource data:', error);
    }
};

export const useResourceQuery = (resourceType, resourceListName) => {
    return useQuery(
        [resourceType, resourceListName],
        () => fetchResources(resourceType, resourceListName)
    );
};


export const useMultipleResourceQueries = (resourceUrlsRef) => {
    const data = ref(null);
    const error = ref(false);
    const isLoading = ref(false);
    console.log(resourceUrlsRef.value)
    watchEffect(async () => {
        if (!resourceUrlsRef.value) {
            return;
        }
        console.log(resourceUrlsRef.value)
        isLoading.value = true;
        try {
            const responses = await Promise.all(
                resourceUrlsRef.value.map((url) => apiClient.get(url))
            );
            data.value = responses.map((response) => response.data);
            console.log(data.value)
            error.value = false;
        } catch (e) {
            console.error("Error fetching resource data:", e);
            error.value = true;
        } finally {
            isLoading.value = false;
        }
    });

    return { data, error, isLoading };
};


export const useSingleResourceQuery = (singleResourceUrlRef) => {
    const data = ref(null);
    const isError = ref(false);
    const isLoading = ref(false);

    watchEffect(async () => {
        if (!singleResourceUrlRef.value) {
            return;
        }

        isLoading.value = true;
        try {
            const response = await apiClient.get(singleResourceUrlRef.value);
            data.value = response.data;
            isError.value = false;
        } catch (error) {
            console.error("Error fetching resource data:", error);
            isError.value = true;
        } finally {
            isLoading.value = false;
        }
    });

    return { data, isError, isLoading };
};