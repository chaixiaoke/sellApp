<template>
  <div class="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"/>
    </keep-alive>
  </div>
</template>

<script>
  import header from './header/header'

  export default {
    name: 'sellApp',
    components: {
      'v-header': header
    },
    data() {
      return {
        seller: {}
      }
    },
    created() {
      this.$api.seller().then(res => {
        if (res.errno === 0) {
          this.seller = Object.assign({}, this.seller, res.data)
        }
      })
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  @import '../common/style/mixin.scss';
  .app{
    .tab{
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      @include border-1px(rgba(7, 17, 27, 0.1));
      .tab-item{
        flex: 1;
        text-align: center;
        a{
          display: block;
          font-size: 14px;
          color: rgb(77, 85, 93);
          &.router-link-exact-active{
            color: rgb(240, 20, 20);
          }
        }
      }
    }
  }
</style>
