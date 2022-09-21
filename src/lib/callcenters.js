import api from "./api";

async function getAll() {
    return await api.get(`/back-obo/callcenters`);
}

async function getById(id) {
    return await api.get(`/back-obo/callcenters/${id}`);
}

async function create(data) {
    return await api.post(`/back-obo/callcenters`, data, {
        headers: {
            "Content-Type": "application/json",
            //"Authorization": jwt
        },
    });
}

async function update(id, data) {
    return await api.put(`/back-obo/callcenters/${id}`, data,{
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function deleteCallCenter(id) {
    return await api.delete(`/back-obo/callcenters/${id}`);
}

export const Callcenter = {
    getAll,
    getById,
    create,
    update,
    delete: deleteCallCenter,
};