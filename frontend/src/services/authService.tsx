import axios from 'axios';

// API de autentición
const API_URL = 'http://localhost:8080/siman/auth/';

interface AuthResponse {
    message: string;
    id?: number;
    username?: string;
    roles?: string[];
}

const login = (username: string, password: string): Promise<AuthResponse> => {
    return axios.post<AuthResponse>(API_URL + 'login', {
        username,
        password
    }).then(response => {
        if (response.data.username) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = (): Promise<AuthResponse> => {
    localStorage.removeItem('user');
    return axios.post<AuthResponse>(API_URL + 'logout').then(response => {
        return response.data;
    });
};

const getCurrentUser = (): AuthResponse | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        return JSON.parse(userStr) as AuthResponse;
    }
    return null;
};

// Asignar el objeto a una variable antes de exportarlo
const authService = {
    login,
    logout,
    getCurrentUser
};

export default authService;
