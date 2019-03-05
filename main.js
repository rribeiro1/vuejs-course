Vue.component("product-details", {
  props: {
    description: {
      type: String,
      required: true,
      default: "Rafael"
    }
  },
  template: `
      <h1> {{ description }} </h1>
  `
});

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">
    <div class="product-image">
      <img v-bind:src="image" />
    </div>

    <div class="product-info">
      <h1>{{ title }}</h1>
      <p>Shipping: {{ shipping }} </p>
      <p v-if="onSale">{{ sale }}</p>
      <p v-if="inStock">In Stock</p>
      <p v-else :class="{ outOfStock: !inStock }">Out Stock</p>

      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>

      <ul>
        <li v-for="size in sizes">{{ size }}</li>
      </ul>

      <div
        v-for="(variant, index) in variants"
        :key="variant.variantId"
        class="color-box"
        :style="{ backgroundColor: variant.variantColor }"
        @mouseover="updateProduct(index)"
      ></div>

      <button
        @click="addToCart"
        :disabled="!inStock"
        :class=" { disabledButton: !inStock } "
      >
        Add to Cart
      </button>

      <button @click="removeToCart">Remove to Cart</button>

      <div class="cart">
        <p>Cart({{ cart }})</p>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
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
    };
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
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    }
  }
});

var app = new Vue({
  el: "#app",
  data: {
    premium: true
  }
});
Vue.config.devtools = true;
