import api from "./api";

async function getAll() {
    return await api.get(`/back-obo/orders`);
}

async function getFilter(data) {
    //return await api.get(`/orders/filter?type=${data.identification}&value=${data.value}&limit=5&page=1`);
    //const filr = await api.get(`/orders/filter?type=${data.type}&value=${data.number}&limit=${5}&page=${1}`);
    console.log('filtró???', data)
    console.log('Tipo', data.type)
    console.log('Number', data.number)
    //console.log('Enserio??', filr)
    //eturn await api.get(`/orders/filter?type=${data.identification}&value=${data.value}&limit=5&page=1`);
    //filter?type=identification&value=1723781083&limit=5&page=1
    return await api.get(`/back-obo/orders/filter?type=${data.type}&value=${data.number}&limit=${5}&page=${1}`);

}

async function getById(id) {
    return await api.get(`/back-obo/orders/${id}`);
}

async function create(data) {
    return await api.post(`/back-obo/orders`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function update(id, data) {
    return await api.put(`/back-obo/orders/${id}`, data,{
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function deleteOrder(id) {
    return await api.delete(`/back-obo/orders/${id}`);
}

export const Order = {
    getAll,
    getById,
    getFilter,
    create,
    update,
    delete: deleteOrder,
};