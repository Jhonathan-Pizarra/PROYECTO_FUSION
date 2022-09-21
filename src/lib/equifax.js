import api from "@/lib/api";


async function create(data) {
    return await api.post(`/back-obo-extension/equifax`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const Equifax = {
    create,
};