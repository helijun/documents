<template lang="html">
	<div class="dw-scroll"
        :class="{'down':(state===0), 'up':(state==1), refresh:(state===2), touch: touching}"
        @touchstart="touchStart($event)"
        @touchmove="touchMove($event)"
        @touchcancel="touchEnd($event)"
        @scroll.passive="onScrollFn($event)"
        @touchend="touchEnd($event)"
    >
		<section class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
			<header class="pull-refresh">
				<slot name="pull-refresh">
					<span class="down-tip"><i></i>下拉刷新</span>
					<span class="up-tip"><i></i>松开刷新</span>
					<span class="refresh-tip"><i></i>正在刷新</span>
				</slot>
			</header>
			<slot></slot>
			<footer class="load-more" v-if="showLoadMore">
				<slot name="load-more">
					<span v-show="loadingFlag === false">上拉加载更多</span>
					<span v-show="loadingFlag === true">加载中……</span>
				</slot>
			  <!-- <div class="nullData" v-show="dataList.noDataFlag">暂无更多数据</div> -->
			</footer>
		</section>
	</div>
</template>
<script>
import util from "@/utils";
/**
 * @description [throttle 节流函数]
 * @param {Function} fn 延时调用函数
 * @param {Number} delay 延迟多长时间
 * @param {Number} atleast 至少多长时间触发一次
 * @return {Function} 延迟执行的方法
 */
function throttle(fn, delay, atleast) {
  let timer = null;
  let previous = null;
  return function() {
    let now = +new Date();
    if (!previous) previous = now;
    if (atleast && now - previous > atleast) {
      fn();
      previous = now;
      clearTimeout(timer);
    } else {
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn();
        previous = null;
      }, delay);
    }
  };
}

/**
 * @description
 *
 * 思路：
 *
 *  touchstart 记录开始位置
 *  touchmove 判断上拉、下拉（暂时只用到了下拉）
 *  touchend 根据下拉、上拉位置判断是否达到下拉刷新、上拉加载更多
 *
 *  @scroll.passive="onScrollFn($event)" 记录屏幕滚动，用来处理上滑时header rgba控制（沿用早期效果）
 *  touchmove 会触发onPulling，控制下拉时header opacity（参考目前淘宝效果）
 *
 *  正在刷新时触发refresh，此时有一个回弹效果
 */
export default {
  props: {
    showLoadMore: {
      //是否显示上拉加载更多
      type: Boolean,
      default: false
    },
    offset: {
      //默认高度
      type: Number,
      default: 100
    },
    maxScrollerHeight: {
      //滑动最大高度
      type: Number,
      default: 160
    },
    power: {
      //滑动和下拉的像素比例
      type: Number,
      default: 2
    },
    bounce: {
      //回弹时高度
      type: Number
    },
    frequency: {
      //频率控制
      type: Number,
      default: 0
    },
    enableInfinite: {
      //是否开启初始化
      type: Boolean,
      default: true
    },
    enableRefresh: {
      //是否开启刷新
      type: Boolean,
      default: true
    },
    onScroll: {
      //（向上）滑动中
      type: Function
    },
    onPulling: {
      //（向下）下拉刷新中
      type: Function
    },
    refreshFinsh: {
      // 刷新完成后回调
      type: Function
    },
    onRefresh: {
      //刷新方法
      type: Function,
      default: undefined,
      required: false
    },
    onInfinite: {
      //无限滚动todo
      type: Function,
      default: undefined,
      require: false
    },
    dataList: {
      //上拉加载更多todo
      type: Object,
      required: false
    }
  },
  data() {
    return {
      top: 0, //距离屏幕顶部的距离
      state: 0, //0初始化状态，1已达到松开手可以刷新状态，2正在执行刷新
      startX: 0,
      startY: 0,
      touching: false, //滑动中
      infiniteLoading: false,
      loadingFlag: false, //显示是否加载中
      touchTime: 0, //记录滑动开始时间
      count: 0, //刷新次数- 用来做频率控制
      islimit: false //单位时间内，次数限制
    };
  },
  methods: {
    touchStart(e) {
      //e.preventDefault()

      if (this.islimit) return;

      if (this.touchTime == 0) {
        this.touchTime = util.getTimeString();
      } else {
        if (util.getTimeString() - this.touchTime <= this.frequency / 1000) {
          ++this.count; //限制频率 TODO
          return;
        }
        this.touchTime = util.getTimeString();
      }

      if (this.state != 0) {
        return;
      }

      this.startY = e.targetTouches[0].pageY;
      this.startX = e.targetTouches[0].pageX;
      this.startScroll = this.$el.scrollTop || 0;
      this.touching = true;
      if (this.showLoadMore) {
        this.$el.querySelector(".load-more").style.display = "block";
      }
    },

    touchMove(e) {
        if (
            this.islimit ||
            !this.enableRefresh ||
            !this.touching ||
            this.state != 0 ||
            this.top >= this.maxScrollerHeight //大于maxScrollerHeight不让继续滑动
        ) {
            e.preventDefault();
            return;
        }

        console.log("this.top", this.top);
        this.$emit("onPulling", this.top);
        if (this.top >= this.offset) {
            this.state = 1;
        } else {
            this.state = 0;
        }

        //核心计算距离屏幕顶部距离
        let diff = e.targetTouches[0].pageY - this.startY - this.startScroll;
        if(diff > 0) e.preventDefault()
        this.top =
            (Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)) *
            this.power;

        if (!this.showLoadMore) {
            //没有加载更多
            return;
        }

        //todo
        let more = this.$el.querySelector(".load-more");
        if (!this.top && this.state === 0) {
            more.style.display = "block";
        } else {
            more.style.display = "none";
        }
    },

    touchEnd(e) {
      //e.preventDefault()

      if (!this.enableRefresh) {
        return;
      }

      this.touching = false;

      if (this.state === 2) {
        // 正在执行刷新
        return;
      }

      if (this.top >= this.offset) {
        // 达到了刷新条件 --> 执行刷新
        this.refresh();
      } else {
        // 取消刷新
        this.refreshDone();
      }

      //用于判断滑动是否在原地 ----begin
      let endX = e.changedTouches[0].pageX,
        endY = e.changedTouches[0].pageY,
        dy = this.startY - endY,
        dx = endX - this.startX;

      console.log("最终滑动松手位于屏幕的位置：x：", endX, " y：", endY);
      console.log("最终滑动松手时变化的像素：x：", dx, " y：", dy);

      //如果滑动距离太短
      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        console.log("滑动距离太短");
        return;
      }

      if (!this.enableInfinite || this.infiniteLoading) {
        return;
      }

      let outerHeight = this.$el.clientHeight,
        innerHeight = this.$el.querySelector(".inner").clientHeight,
        scrollTop = this.$el.scrollTop,
        ptrHeight = this.onRefresh
          ? this.$el.querySelector(".pull-refresh").clientHeight
          : 0,
        bottom = innerHeight - outerHeight - scrollTop - ptrHeight;

      console.log(bottom + " __ " + this.offset);

      if (bottom <= this.offset && this.state === 0) {
        this.loadingFlag = true;
        this.infinite();
      } else {
        if (this.showLoadMore) {
          this.$el.querySelector(".load-more").style.display = "none";
        }

        this.loadingFlag = false;
      }
    },
    //执行刷新
    refresh() {
      this.state = 2;
      //回弹效果
      this.top = this.bounce > 0 ? this.bounce : this.offset;

      setTimeout(() => {
        this.onRefresh(this.refreshDone);
      }, 300);
    },
    //刷新完成
    refreshDone(type) {
      this.state = 0;
      this.top = 0;

      this.$emit("refreshFinsh", type);
    },

    infinite() {
      this.infiniteLoading = true;

      setTimeout(() => {
        this.onInfinite(this.infiniteDone);
      }, 2000);
    },

    infiniteDone() {
      this.infiniteLoading = false;
    },

    onScrollFn(e) {
      throttle(this.$emit("onScroll", e), 100);
    }
  }
};
</script>
<style lang="scss" scoped>
@-webkit-keyframes loadingRotate {
  0% {
    -webkit-transform: rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateZ(360deg);
  }
}
.dw-scroll {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  height: auto;
  -webkit-overflow-scrolling: touch;
  .inner {
    position: absolute;
    top: -5rem;
    width: 100%;
    height: auto;
    transition-duration: 300ms;
    .pull-refresh {
      position: relative;
      left: 0;
      top: 0;
      z-index: 2;
      width: 100%;
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .load-more {
      height: 5rem;
      line-height: 5rem;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      display: none;
    }
    .nullData {
      //暂无更多数据样式
      color: #999999;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .down-tip,
    .refresh-tip,
    .up-tip {
      display: none;

      i {
        position: relative;
        top: 3px;
        display: inline-block;
        height: 16px;
        width: 16px;
        margin-right: 6px;
      }
    }

    .down-tip {
      i {
        background: url("~@/assets/img/scroller/down-white.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .up-tip {
      i {
        background: url("~@/assets/img/scroller/up-white.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .refresh-tip {
      z-index: 2;

      i {
        animation: loadingRotate 0.5s linear infinite;
        background: url("~@/assets/img/scroller/loading-white.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}

.dw-scroll.touch .inner {
  transition-duration: 0;
}

.dw-scroll.down .down-tip {
  display: block;
}

.dw-scroll.up .up-tip {
  display: block;
}

.dw-scroll.refresh .refresh-tip {
  display: block;
}
</style>
