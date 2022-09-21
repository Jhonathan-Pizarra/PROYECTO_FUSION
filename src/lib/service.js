import axios from "./api";

export class Service {
    url;
    constructor(url) {
        this.url = process.env.NEXT_PUBLIC_API_BASE_URL+url;
    }

    async getAll() {
        return await axios.get(this.url);
    }

    async getById(id) {
        return await axios.get(`${this.url}/${id}`);
    }

    async create(data) {
        return await axios.post(`${this.url}`, data);
    }

    async update(id, data) {
        return await axios.put(`${this.url}/${id}`, data,{
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async delete(id) {
        return await axios.delete(`${this.url}/${id}`);
    }
}