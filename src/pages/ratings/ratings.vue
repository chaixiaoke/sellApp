<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select
        :ratings="ratings"
        :select-type="selectType"
        :only-content="onlyContent"
        @select="onSelect"
        @toggle="onToggle"
      />
      <div class="rating-wrapper">
        <ul>
          <li
            v-show="needshow(rating.rateType, rating.text)"
            v-for="(rating, index) in ratings"
            :key="index"
            class="rating-item border-1px"
          >
            <div class="avatar">
              <img :src="rating.avatar" alt="" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.rateType === 0 && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="(recommend, index) in rating.recommend" :key="index"
                      class="recommend-item">{{recommend}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {formatDate} from '../../common/js/date'
  import star from '@/components/star/star'
  import split from '../split/split'
  import ratingSelect from '../ratingselect/ratingselect'

  const ERR_OK = 0
  const ALL = 2

  export default {
    name: 'ratings',
    components: {
      star,
      split,
      ratingSelect
    },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      }
    },
    created() {
      this.$api.ratings().then(res => {
        if (res.errno === ERR_OK) {
          this.ratings = res.data
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            })
          })
        }
      })
    },
    methods: {
      onSelect(type) {
        this.selectType = type
      },
      onToggle() {
        this.onlyContent = !this.onlyContent
      },
      needshow(type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/style/mixin.scss';

  .ratings {
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 0;
    left: 0;
    overflow: hidden;

    .overview {
      display: flex;
      padding: 18px 0;

      .overview-left {
        flex: 0 0 137px;
        padding: 6px 0;
        width: 137px;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;

        .score {
          margin-bottom: 6px;
          font-size: 24px;
          line-height: 28px;
          color: rgb(255, 153, 0);
        }

        .title {
          margin-bottom: 8px;
          font-size: 12px;
          line-height: 12px;
          color: rgb(7, 17, 27);
        }

        .rank {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }

      .overview-right {
        flex: 1;
        padding: 6px 0 6px 24px;

        .score-wrapper {
          margin-bottom: 8px;
          font-size: 0;

          & > * {
            display: inline-block;
            vertical-align: top;
          }

          .title, .score {
            font-size: 12px;
            line-height: 18px;
          }

          .title {
            color: rgb(7, 17, 27);
          }

          .star {
            margin: 0 12px;
          }

          .score {
            color: rgb(255, 153, 0);
          }
        }

        .delivery-wrapper {
          font-size: 0;

          .title, .delivery {
            font-size: 12px;
            line-height: 18px;
            color: rgb(7, 17, 27);
          }

          .delivery {
            color: rgb(147, 153, 159);
            margin-left: 12px;
          }
        }
      }
    }

    .rating-wrapper {
      padding: 0 18px;

      .rating-item {
        display: flex;
        padding: 18px 0;
        @include border-1px(rgba(7, 17, 27, 0.1));

        .avatar {
          flex: 0 0 28px;
          width: 28px;
          margin-right: 12px;

          img {
            border-radius: 50%;
          }
        }

        .content {
          position: relative;
          flex: 1;

          .name {
            margin-bottom: 4px;
            font-size: 10px;
            line-height: 12px;
            color: rgb(7, 17, 27);
          }

          .star-wrapper {
            margin-bottom: 6px;
            font-size: 0;

            & > * {
              display: inline-block;
              vertical-align: top;
            }

            .delivery {
              font-size: 10px;
              font-weight: 200;
              color: rgb(147, 153, 159);
              line-height: 12px;
              margin-left: 6px;
            }
          }

          .text {
            margin-bottom: 8px;
            font-size: 12px;
            color: rgb(7, 17, 27);
            line-height: 18px;
          }

          .recommend {
            line-height: 16px;
            font-size: 0;

            & > * {
              margin: 0 8px 4px 0;
              display: inline-block;
            }

            .icon-thumb_up {
              font-size: 12px;
              color: rgb(0, 160, 220);
            }

            .recommend-item {
              border-radius: 2px;
              padding: 0 6px;
              border: 1px solid rgba(7, 17, 27, 0.1);
              font-size: 9px;
              color: rgb(147, 153, 159);
            }
          }

          .time {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 10px;
            font-weight: 200;
            color: rgb(147, 153, 159);
            line-height: 12px;
          }
        }
      }
    }
  }
</style>
