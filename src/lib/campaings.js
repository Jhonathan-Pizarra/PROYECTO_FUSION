import api from "./api";

async function getAll() {
    return await api.get(`/back-obo/campaigns`);
}

async function getById(id) {
    return await api.get(`/back-obo/campaigns/${id}`);
}

async function create(data) {
    return await api.post(`/back-obo/campaigns`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function update(id, data) {
    return await api.put(`/back-obo/campaigns/${id}`, data,{
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function deleteCallCampaing(id) {
    return await api.delete(`/back-obo/campaigns/${id}`);
}

export const Campaing = {
    getAll,
    getById,
    create,
    update,
    delete: deleteCallCampaing,
};