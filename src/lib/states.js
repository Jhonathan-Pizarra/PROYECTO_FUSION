import api from "./api";

async function getAll() {
    return await api.get(`/callcenters`);
}

async function getById(id) {
    return await api.get(`/callcenters/${id}`);
}

async function create(data) {
    return await api.post(`/callcenters`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function update(id, data) {
    return await api.put(`/callcenters/${id}`, data,{
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function deleteState(id) {
    return await api.delete(`/callcenters/${id}`);
}

export const State = {
    getAll,
    getById,
    create,
    update,
    delete: deleteState,
};