import api from "./api";

async function getAll() {
    return await api.get(`/back-obo/source`);
}

async function getById(id) {
    return await api.get(`/back-obo/source/${id}`);
}

async function create(data) {
    return await api.post(`/back-obo/source`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function update(id, data) {
    return await api.put(`/back-obo/source/${id}`, data,{
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function deleteSource(id) {
    return await api.delete(`/back-obo/source/${id}`);
}

export const Source = {
    getAll,
    getById,
    create,
    update,
    delete: deleteSource,
};