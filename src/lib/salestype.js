import api from "./api";

async function getAll() {
    return await api.get(`/back-obo/salestype`);
}

async function getById(id) {
    return await api.get(`/back-obo/salestype/${id}`);
}

async function create(data) {
    return await api.post(`/back-obo/salestype`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function update(id, data) {
    return await api.put(`/back-obo/salestype/${id}`, data,{
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function deleteSaleType(id) {
    return await api.delete(`/back-obo/salestype/${id}`);
}

export const SaleType = {
    getAll,
    getById,
    create,
    update,
    delete: deleteSaleType,
};