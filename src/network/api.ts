import axios from "axios";

export const API_BASE_URL = "http://localhost:8000/api";

export const GetUrlList = async () => {
    try
    {
        const response = await axios.get(`${API_BASE_URL}/shorteners`);
        return response.data;
    }
    catch (error)
    {
        throw new Error(`Fetching error ${error}`);
    }
}

export const GenerateUrl = async (data: {long_url: string}) => {
    try
    {
        const response = await axios.post(`${API_BASE_URL}/shorteners`, data);
        return response.data;
    }
    catch (error)
    {
        throw new Error(`Sending url error ${error}`);
    }
}

export const DeleteUrl = async (id: string) => {
    try
    {
        const response = await axios.delete(`${API_BASE_URL}/shorteners/${id}`);
        return response.data;
    }
    catch (error)
    {
        throw new Error(`Deleting url error ${error}`);
    }
}