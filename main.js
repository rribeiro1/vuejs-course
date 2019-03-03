var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    image: "./assets/vmSocks-green-onWhite.jpg",
    inventory: 12,
    onSale: false,
    details: ["P", "M", "G"]
  }
});
Vue.config.devtools = true;
