var eventBus = new Vue();

Vue.component("product-review", {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">Erros:</p>
      <b>Please, correct the following error(s):</b>
      <ul>
        <li v-for="error in errors"> {{ error }}</li>
      </ul>
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>

    <p>
      <label for="review">Review:</label>
      <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>

    <p>
      <label for="recommend">Would you recommend this product?</label>
      <input type="radio" name="recommendation" v-model="recommend" value="yes"> Yes
      <input type="radio" name="recommendation" v-model="recommend" value="no"> No
    </p>

    <p>
      <input type="submit" value="Submit">
    </p>

  </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.rating && this.review && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        };
        eventBus.$emit("review-submitted", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = null;
      } else {
        if (!this.name) this.errors.push("Name must be filled out");
        if (!this.review) this.errors.push("Review must be filled out");
        if (!this.rating) this.errors.push("Rating must be filled out");
        if (!this.recommend) this.errors.push("Recommend is required");
      }
    }
  }
});

Vue.component("product-cart", {
  template: `
    <div class="cart">
        <p>Cart({{ cart.length }})</p>
        <ul>
          <li v-for="item in cart" :key="item.variantId">
            {{ item.variantId }} {{ item.variantColor }}
            <button @click="removeFromCart(item.variantId)">
              X
            </button>
          </li>
        </ul>
      </div>
  `,
  data() {
    return {
      cart: []
    };
  },
  methods: {
    removeFromCart(id) {
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].variantId === id) {
          this.cart.splice(i, 1);
        }
      }
    }
  },
  mounted() {
    eventBus.$on("add-to-cart", product => {
      this.cart.push(product);
    });
  }
});

Vue.component("product-details", {
  props: {
    description: {
      type: String,
      required: true,
      default: "Rafael"
    }
  },
  template: `
      <h3> {{ description }} </h3>
  `
});

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: false
    }
  },
  template: `
    <div>

      <div>
        <span class="tab"
              :class="{ activeTab: selectedTab === tab }"
              v-for="(tab, index) in tabs"
              :key="index"
              @click="selectedTab = tab">
              {{ tab }}
              </span>
      </div>

      <div v-show="selectedTab === 'Reviews'">
        <p v-if="!reviews.length"> There are no review yet for this product. </p>
        <ul>
          <li v-for="review in reviews">
            <p>{{ review.name }}</p>
            <p>Rating: {{ review.rating }}</p>
            <p>{{ review.review }}</p>
            <p>Recommended: {{ review.recommend }}</p>
          </li>
        </ul>
      </div>

      <product-review v-show="selectedTab === 'Make a Review'">
      </product-review>

    </div>
  `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Reviews"
    };
  }
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
      <product-details description="This is a description"></product-details>
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
    </div>

    <product-tabs :reviews="reviews"></product-tabs>
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
          variantQuantity: 100
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: "./assets/vmSocks-blue-onWhite.jpg",
          variantQuantity: 10
        }
      ],
      reviews: []
    };
  },
  methods: {
    addToCart() {
      eventBus.$emit("add-to-cart", this.variants[this.selectedVariant]);
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
  },
  mounted() {
    eventBus.$on("review-submitted", productReview => {
      this.reviews.push(productReview);
    });
  }
});

var app = new Vue({
  el: "#app",
  data: {
    premium: true
  }
});
Vue.config.devtools = true;
