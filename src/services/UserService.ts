import axios from "axios";

const API_BASE = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = () => axios.get(API_BASE);
export const fetchUserById = (id: string) => axios.get(`${API_BASE}/${id}`);
