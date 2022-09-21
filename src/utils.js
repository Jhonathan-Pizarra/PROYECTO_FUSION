import api from "./lib/api";

export const fetcher = async (url) => {
    

    const response = await api.get(`${url}`);

    return response.data;
};


