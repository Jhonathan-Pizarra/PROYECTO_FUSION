import api from "@/lib/api";


async function getById(id) {
    return await api.get(`/back-obo-extension/sales/order/${id}`);
}

async function create(data) {
    return await api.post(`/back-obo-extension/sales`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function update(id, data) {
    return await api.put(`/back-obo-extension/sales/${id}`, data,{
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function deleteSale(id) {
    return await api.delete(`/back-obo-extension/sales/${id}`);
}

export const Sale = {
    //getAll,
    getById,
    create,
    update,
    delete: deleteSale,
};