var app = new Vue({
  el: "#app",
  data: {
    brand: "Vue",
    product: "Socks",
    inventory: 0,
    onSale: false,
    selectedVariant: 0,
    details: ["80% Cotton", "20% Poliester", "Gender-neutral"],
    sizes: ["P", "M", "G"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "./assets/vmSocks-green-onWhite.jpg",
        variantQuantity: 0
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "./assets/vmSocks-blue-onWhite.jpg",
        variantQuantity: 10
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
    updateProduct(index) {
      this.selectedVariant = index;
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    sale() {
      return this.brand + " " + this.product;
    }
  }
});
Vue.config.devtools = true;
