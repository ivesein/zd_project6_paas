<template>
  <div class="home">
    <Header></Header>
    <Content></Content>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "components/home/Header";
import Content from "components/home/Content";
import Footer from "../components/home/Footer";

export default {
  name: "home",
  components: {
    Header,
    Content,
    Footer
  },
  methods: {}
};
</script>
<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
}
</style>
