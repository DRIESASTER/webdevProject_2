import { useMutation, useQueryClient } from 'vue-query';
import apiClient from './apiClient';


const useDeleteMutation = (resourceType) => {
    const queryClient = useQueryClient();
    const deleteResource = async (url) => {
        const response = await apiClient.delete(url);
        return response.data;
    };

    return useMutation(deleteResource, {
        onError: (error) => {
            console.error('Error deleting resource:', error);
        },
        onSuccess: () => {
            console.log('Resource deleted successfully');
            queryClient.invalidateQueries([resourceType]);
        },
    });
};

export default useDeleteMutation;