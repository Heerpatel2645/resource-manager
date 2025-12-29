import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/resources",
});

export const fetchResources = async () => {
  const res = await api.get("/");
  return res.data;
};

export const createResource = async (data: {
  title: string;
  description: string;
  type: string;
  link?: string;
}) => {
  const res = await api.post("/", data);
  return res.data;
};

export const updateResource = async (
  id: string,
  data: {
    title: string;
    description: string;
    type: string;
    link?: string;
  }
) => {
  const res = await api.put(`/${id}`, data);
  return res.data;
};

export const deleteResource = async (id: string) => {
  await api.delete(`/${id}`);
};

