import { API_BASE_URL } from "../network/api";

export const get_short_link = (short_url: string) => {
    return `${API_BASE_URL}/${short_url}`;
}