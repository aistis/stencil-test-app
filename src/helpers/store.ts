import { createStore } from "@stencil/store";

const { state } = createStore({
  categories: {
    phones: {
      brands: []
    }
  },
  products: [],
});

export default state;