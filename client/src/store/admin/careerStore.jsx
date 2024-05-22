import { create } from "zustand";
import axios from "axios";

const careerStore = create((set) => {
  return {
    career: null,
    createCareerForm: {
      date: "",
      title: "",
      jobdescription: "",
      qualification: "",
      salary: "",
      lastdate: "",
    },
    updateCareerForm: {
      id: null,
      date: "",
      title: "",
      jobdescription: "",
      qualification: "",
      salary: "",
      lastdate: "",
    },

    fetchCareer: async () => {
      try {
        const res = await axios.get("/admin/viewcareers");
        set({ career: res.data.note });
      } catch (error) {
        console.error("Error fetching career data:", error);
      }
    },

    updateCreateCareerFormField: (e) => {
      const { name, value } = e.target;

      set((state) => ({
        createCareerForm: {
          ...state.createCareerForm,
          [name]: value,
        },
      }));
    },

    createCareer: async (e) => {
      e.preventDefault();
      const { createCareerForm, career } = careerStore.getState();

      try {
        const res = await axios.post("/admin/addcareer", createCareerForm);
        set({
          career: [...career, res.data.career],
          createCareerForm: {
            date: "",
            title: "",
            jobdescription: "",
            qualification: "",
            salary: "",
            lastdate: "",
          },
        });
      } catch (error) {
        console.error("Error creating career:", error);
      }
    },

    deleteCareer: async (_id) => {
      try {
        await axios.delete(`/admin/deletecareer/${_id}`);
        const { career } = careerStore.getState();
        const newCareer = career.filter((c) => c._id !== _id);
        set({ career: newCareer });
      } catch (error) {
        console.error("Error deleting career:", error);
      }
    },

    handleUpdateCareerFieldChange: (e) => {
      const { value, name } = e.target;

      set((state) => ({
        updateCareerForm: {
          ...state.updateCareerForm,
          [name]: value,
        },
      }));
    },

    toggleUpdateCareer: ({ _id, date, title, jobdescription, qualification, salary, lastdate }) => {
      set({
        updateCareerForm: {
          _id,
          date,
          title,
          jobdescription,
          qualification,
          salary,
          lastdate,
        },
      });
    },

    updateCareer: async (e) => {
      e.preventDefault();

      const { updateCareerForm, career } = careerStore.getState();
      const { _id, date, title, jobdescription, qualification, salary, lastdate } = updateCareerForm;

      try {
        const res = await axios.put(`/notes/${_id}`, {
          date,
          title,
          jobdescription,
          qualification,
          salary,
          lastdate,
        });

        const newCareer = career.map((c) => (c._id === _id ? res.data.career : c));

        set({
          career: newCareer,
          updateCareerForm: {
            _id: "",
            title: "",
            jobdescription: "",
            qualification: "",
            salary: "",
            lastdate: "",
          },
        });
      } catch (error) {
        console.error("Error updating career:", error);
      }
    },
  };
});

export default careerStore;
