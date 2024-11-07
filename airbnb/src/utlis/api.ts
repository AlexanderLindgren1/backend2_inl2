import axios from "axios"

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export const getProperties = async () => {
    const response = await axios.get(`${backendUrl}/api/Property`)
    return response.data
}
export const getProperty = async (id: string) => {
    const response = await axios.get(`${backendUrl}/api/Property/${id}`)
    return response.data
}

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password
    })
    return response.data
}
export const register = async (email: string, password: string, isAdmin: boolean) => {
    console.log("in register frontend api");
    
    const response = await axios.post(`${backendUrl}/api/user`, {
        email,
        password,
        name,
        isAdmin
    })
    return response.data
}
