var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    inventory: 0,
    onSale: false,
    inStock: false,
    image: "./assets/vmSocks-green-onWhite.jpg",
    details: ["80% Cotton", "20% Poliester", "Gender-neutral"],
    sizes: ["P", "M", "G"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "./assets/vmSocks-green-onWhite.jpg"
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "./assets/vmSocks-blue-onWhite.jpg"
      }
    ],
    cart: 0
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    removeToCart() {
      if (this.cart > 0) this.cart -= 1;
      else return 0;
    },
    updateProduct(variantImage) {
      this.image = variantImage;
    }
  }
});
Vue.config.devtools = true;
