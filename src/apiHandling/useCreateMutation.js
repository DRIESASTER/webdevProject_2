import apiClient from "@/apiHandling/apiClient";
import {useMutation} from "vue-query";


const createResource = async ({ resourceType, data }) => {
    const response = await apiClient.post(`/${resourceType}`, data, {
        headers: { 'Content-Type': 'application/vnd.jobs+json' },
    });
    return response.data;
};

const useCreateMutation = (resourceType) => {
    return useMutation((data) => createResource({ resourceType, data }));
};

export default useCreateMutation;