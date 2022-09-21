import api from "./api";

async function getLvl1() {
    return await api.get(`/tipification?level=1&typification_id=1`);
}


export const Tipification = {
    getLvl1,
};