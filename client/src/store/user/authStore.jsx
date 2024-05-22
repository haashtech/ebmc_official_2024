import { create } from "zustand";
import axios from "axios";

const authStore = create((set,get) => ({
  loggedIn: null,
  user: null,

  loginForm: {
    email: "",
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

  login: async (e) => {
    const { loginForm } = authStore.getState();
    const res = await axios.post("/user/login", loginForm);
    const {
      companyName,
      street,
      city,
      zipCode,
      country,
      emirate,
      trn,
      email,
      checkLimit,
      apiUsage,
    } = res.data.user;

    set({
      loggedIn: true,
      user: {
        companyName,
        street,
        city,
        zipCode,
        country,
        emirate,
        trn,
        email,
        checkLimit,
        apiUsage,
      },
      loginForm: {
        email: "",
        password: "",
      },
    });

localStorage.setItem("authState",JSON.stringify(get()));


  },
  checkAuth: async (e) => {
    try {
      await axios.get("/user/check-auth");
      set({ loggedIn: true });
localStorage.setItem("authState",JSON.stringify(get()))
      
    } catch (err) {
      set({ loggedIn: false, user: null });
    }
  },

  logout: async (e) => {
    try {
      await axios.get("/user/logout");
      set({ loggedIn: false });
      localStorage.setItem("authState",JSON.stringify(get()))
    } catch (err) {
      console.log(err);
    }
  },
}));

const savedAuthState =JSON.parse(localStorage.getItem("authState"))

if(savedAuthState){
authStore.setState(savedAuthState)

}

export default authStore;
