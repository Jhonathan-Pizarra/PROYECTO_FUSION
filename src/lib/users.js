import api from "./api";

async function getAll() {
    return await api.get(`/back-obo/users`);
}

async function getById(id) {
    return await api.get(`/back-obo/users/${id}`);
}

async function create(data) {
    return await api.post(`/back-obo/users`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function update(id, data) {
    return await api.put(`/back-obo/users/${id}`, data,{
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function deleteUsers(id) {
    return await api.delete(`/back-obo/users/${id}`);
}

export const User = {
    getAll,
    getById,
    create,
    update,
    delete: deleteUsers,
};