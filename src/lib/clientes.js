import api from "./api";

async function getAll() {
    return await api.get(`/clients`);
}

async function getById(id) {
    return await api.get(`/clients/${id}`);
}

async function create(data) {
    return await api.post(`/clients`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function update(id, data) {
    return await api.put(`/back-obo/clients/${id}`, data,{
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function deleteClient(id) {
    return await api.delete(`/clients/${id}`);
}

export const Client = {
    getAll,
    getById,
    create,
    update,
    delete: deleteClient,
};