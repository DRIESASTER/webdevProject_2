import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://groep35.webdev.ilabt.imec.be', // Replace this with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;