import { createStore } from "@stencil/store";

const { state } = createStore({
  categories: {
    phones: {
      brands: []
    }
  },
  products: [],
  loved: {
    brands: [],
    products: []
  },
  removed: {
    brands: [],
    products: []
  }
});

export default state;