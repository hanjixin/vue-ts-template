<template>
  <div>
    测试es6 组件
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "测试es6 组件"
    };
  },
  created() {
    console.log(this.msg);
  }
};
</script>

<style></style>
