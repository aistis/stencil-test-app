import { createStore } from "@stencil/store";

const { state } = createStore({
  categories: [],
  products: [],
});

export default state;