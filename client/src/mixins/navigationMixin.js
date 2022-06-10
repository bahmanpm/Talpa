import router from "../router";

export default {
  methods: {
    navigate(path, id) {
      router.push({ path: path, query: { id: id } });
    },
  },
};
