import api from "../api"

class CodeLeapBackendServiceClass {
    GetPaginatedPosts = async (offset, limit) => {
        const { data } = await api.get(`?limit=${limit}&offset=${offset}`, { requiresAuth: false });
        return data;
    }

    PostPosts = async (newPost) => {
        const { data } = await api.post("", newPost, { requiresAuth: false });
        return data;
    }

    PatchPosts = async (OBJECT_ID, newPostPartial) => {
        const { data } = await api.patch(`${OBJECT_ID}/`, newPostPartial, { requiresAuth: false });
        return data;
    }

    DeletePosts = async (OBJECT_ID) => {
        const { data } = await api.delete(`${OBJECT_ID}/`, { requiresAuth: false });
        return data;
    }
}

const CodeLeapBackendService = new CodeLeapBackendServiceClass();

export default CodeLeapBackendService;