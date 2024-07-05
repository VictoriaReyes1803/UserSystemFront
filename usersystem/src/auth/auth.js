import axios from "axios";
import Cookies from "js-cookie";

const ENDPOINT_PATH = "http://127.0.0.1:8000/api/";

export default {
    setUserLogged(userLogged) {
        Cookies.set("userLogged", userLogged);
      },
      getUserLogged() {
        return Cookies.get("userLogged");
      },
    register(name,lastname,email, password) {
        const user = { name, lastname, email, password };
        console.log(user);
        return axios.post(ENDPOINT_PATH + "create", user);
    },
    async login(email, password) {
        const user = { email, password };
        console.log(user);
        try {
        const response = await axios.post(ENDPOINT_PATH + "auth/login", user);
        const token = response.data.data.access_token.toString();
        //console.log('token',token);
        Cookies.set("jwt_token", token);
        return response;
        } catch (error) {
        }
    },
    async logout() {
        try {
        const token = Cookies.get("jwt_token");
        const response = await axios.post(ENDPOINT_PATH + "auth/logout", null, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        Cookies.remove("jwt_token");
        console.log("logout", response);
        return response;
        } catch (error) {
        }
    },
    getusers() {
        const token = Cookies.get("jwt_token");
        return axios.get(ENDPOINT_PATH + "auth/index",{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    edituser(id,name,lastname,email) {
        const token = Cookies.get("jwt_token");
        const user = { id, name, lastname, email };
        return axios.put(ENDPOINT_PATH + "auth/update/"+ id, user,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    deleteuser(id) {
        const token = Cookies.get("jwt_token");
        return axios.delete(ENDPOINT_PATH + "auth/delete/"+ id,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    me() {
        const token = Cookies.get("jwt_token");
        return axios.get(ENDPOINT_PATH + "auth/me",{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
};