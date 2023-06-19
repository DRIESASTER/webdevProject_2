import {useMutation} from "vue-query";
import apiClient from "@/apiHandling/apiClient";


const useUpdateMutation = (resourceType) => {

    const updateResource = async ({ url, data }) => {
        console.log(url, data);
        const response = await apiClient.patch(url, data, {
            headers: { 'Content-Type': 'application/vnd.jobs+json' },
        });
        return response.data;
    };

    return useMutation(updateResource, {
        onError: (error) => {
            console.error(`Error updating ${resourceType}:`, error);
        },
        onSuccess: () => {
            console.log(`${resourceType} updated successfully`);
        },
    });
};

export default useUpdateMutation;