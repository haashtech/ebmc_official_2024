import { create } from "zustand";
import axios from "axios";

const newsStore = create((set) => ({
  news: null,
  createForm: {
    title: "",
    body: "",
  },
  updateForm: {
    id: null,
    title: "",
    body: "",
  },

  fetchNews: async () => {
    const res = await axios.get("/admin/viewnewses");
    set({ news: res.data.newses });
  },

  updateCreateformField: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });
  },

  createNews: async (e) => {
    e.preventDefault();

    const { createForm, news } = newsStore.getState();
    const res = await axios.post("/admin/addnews", createForm);

    set({
      news: [...news, res.data.news],
      createForm: {
        title: "",
        body: "",
      },
    });
  },

  deleteNews: async (_id) => {
    const res = await axios.delete(`/admin/news/${_id}`);
    const { news } = newsStore.getState();
    const newNews = news.filter((item) => item._id !== _id);
    set({ news: newNews });
  },

  handleUpdateFieldChange: (e) => {
    const { value, name } = e.target;

    set((state) => {
      return {
        updateForm: {
          ...state.updateForm,
          [name]: value,
        },
      };
    });
  },

  toggleUpdate: ({ _id, title, body }) => {
    set({
      updateForm: {
        _id,
        title,
        body,
      },
    });
  },

  updateNews: async (e) => {
    e.preventDefault();

    const { updateForm: { title, body, _id }, news } = newsStore.getState();

    const res = await axios.put(`/admin/news/${_id}`, { title, body });

    const newNews = [...news];
    const newsIndex = news.findIndex((item) => item._id === _id);
    newNews[newsIndex] = res.data.news;

    set({
      news: newNews,
      updateForm: {
        _id: "",
        title: "",
        body: "",
      },
    });
  },
}));
export default newsStore;