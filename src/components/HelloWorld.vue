<template>
  <div class="hello">
    <router-link tag="h1" to="/sellApp">sellApp</router-link>
    <router-link tag="h2" to="/caijian">Vue-Cropper</router-link>
    <router-link tag="h2" to="/iconfont">iconfont</router-link>
    <!--<a href="#">{{devicePixelRatio}}</a>-->
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        devicePixelRatio: ''
      }
    },
    mounted () {
      this.devicePixelRatio = window.devicePixelRatio
    }
  }
</script>

<style lang="scss">
  $color: pink;
  h1, h2 {
    height: 100px;
    line-height: 100px;
    font-weight: normal;
    color: $color;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
