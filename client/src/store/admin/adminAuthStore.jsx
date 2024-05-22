import { create } from "zustand";
import axios from "axios";

const adminAuthStore = create((set) => ({
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
    const { loginForm } = adminAuthStore.getState();
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
      await axios.get("/admin/checkauth");
      set({ loggedIn: true });
    } catch (error) {
      console.error("Authentication check failed:", error);
      set({ loggedIn: false,
        errorMessage: "Authentication check failed. Please try again later." });
      
      
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

export default adminAuthStore;