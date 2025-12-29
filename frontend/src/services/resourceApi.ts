import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/resources",
});

export const fetchResources = async () => {
  try {
    const res = await api.get("/");
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch resources");
  }
};

export const createResource = async (data: {
  title: string;
  description: string;
  type: string;
  link?: string;
  file?: File;
}) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("type", data.type);

    if (data.link) {
      formData.append("link", data.link);
    }

    if (data.file) {
      formData.append("file", data.file);
    }

    const res = await api.post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to create resource");
  }
};

export const updateResource = async (
  id: string,
  data: {
    title: string;
    description: string;
    type: string;
    link?: string;
    file?: File;
  }
) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("type", data.type);

    if (data.link) {
      formData.append("link", data.link);
    }

    if (data.file) {
      formData.append("file", data.file);
    }

    const res = await api.put(`/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to update resource");
  }
};

export const deleteResource = async (id: string) => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    throw new Error("Failed to delete resource");
  }
};

