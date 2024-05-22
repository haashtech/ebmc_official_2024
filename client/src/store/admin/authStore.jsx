import { create } from "zustand";
import axios from "axios";

const authStore = create((set) => ({
  loggedIn: null,

  loginForm: {
    username: "",
    password: "",
  },

  updateLoginForm: (e) => {
    const { name, value } = e.target;
    set((state) => {
      return {
        loginForm: {
          ...state.loginForm,
          [name]: value,
        },
      };
    });
  },

  login: async () => {
    const { loginForm } = authStore.getState();
    try {
      const res = await axios.post("/admin/login", loginForm);
      set({
        loggedIn: true,
        loginForm: {
          username: "",
          password: "",
        },
      });
    } catch (error) {
      console.error("Login failed:", error);
      
    }
  },
  
  checkAuth: async () => {
    try {
      await axios.get("/admin/check-auth");
      set({ loggedIn: true });
    } catch (error) {
      console.error("Authentication check failed:", error);
      set({ loggedIn: false });
      
    }
  },
  

  logout: async (e) => {
    try {
      await axios.get("/admin/logout");
      set({ loggedIn: false });
    } catch (err) {
      console.log(err);
    }
  },
}));

export default authStore;