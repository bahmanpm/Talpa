import router from "../router";

export default {
  methods: {
    navigate(id) {
      console.log(id);
      router.push({ path: "/details", query: { id: id } });
    },
  },
};
