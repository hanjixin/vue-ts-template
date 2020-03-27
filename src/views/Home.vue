<template>
  <div class="home">
    <Test></Test>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Test from "@/components/Test.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Test
  }
};
</script>
