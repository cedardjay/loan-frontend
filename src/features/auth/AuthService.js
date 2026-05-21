import axios from "axios"

export default class AuthService {

    static BASE_URL = import.meta.env.VITE_API_BASE_URL;

      /**AUTH */
    
        /* This  register a new user */
        static async registerUser(registration) {
            const response = await axios.post(`${this.BASE_URL}/auth/register`, registration)
            return response.data
        }
    
        /* This  login a registered user */
        static async loginUser(loginDetails) {
            const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails)
            return response.data
        }

}