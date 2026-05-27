import axios from "axios";

const api = axios.create({
    baseURL: "https://ai-fact-checker-yr9y.onrender.com/api/facts"
});

export default api;
