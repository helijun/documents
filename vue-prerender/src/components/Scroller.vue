<template lang="html">
	<div class="bike-scroll"
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
					<span class="down-tip">下拉更新1</span>
					<span class="up-tip">松开刷新数据1</span>
					<span class="refresh-tip">加载1中……</span>
				</slot>
			</header>
			<slot></slot>
			<footer class="load-more" v-if="showLoadMore">
				<slot name="load-more">
					<span v-show="loadingFlag === false">上拉加载更多</span>
					<span v-show="loadingFlag === true">加载中……</span>
				</slot>
			  <div class="nullData" v-show="dataList.noDataFlag">暂无更多数据</div>
			</footer>
		</section>
	</div>
</template>
<script>

/**
 * @description [throttle 节流函数]
 * @param {Function} fn 延时调用函数
 * @param {Number} delay 延迟多长时间
 * @param {Number} atleast 至少多长时间触发一次
 * @return {Function} 延迟执行的方法
 */
function throttle (fn, delay, atleast) {
    let timer = null
    let previous = null
    return function () {
        let now = + new Date()
        if (!previous) previous = now
        if (atleast && now - previous > atleast) {
            fn()
            previous = now
            clearTimeout(timer)
        } else {
            clearTimeout(timer)
            timer = setTimeout(function () {
                fn()
                previous = null
            }, delay)
        }
    }
}

/**
 * @description [思路：
 *  touchstart 记录开始位置
 *  touchmove 判断上拉、下拉
 *  touchend 根据下拉、上拉位置判断是否达到下拉刷新、上拉加载更多（待实现）
 *
 *  @scroll.passive="onScrollFn($event)" 记录屏幕滚动，用来处理上滑时header rgba控制（沿用早期效果）
 *  touchmove 会触发onPulling，控制下拉时header opacity（参考目前淘宝效果）
 *
 *  正在刷新时触发refresh，此时有一个回弹效果
 * ]
 * @author bike
 */
export default {
    props: {
        showLoadMore: { //是否显示上拉加载更多
            type: Boolean,
            default: false
        },
        offset: { //默认高度
            type: Number,
            default: 100
        },
        bounce: { //回弹时高度
            type: Number
        },
        enableInfinite: { //是否开启初始化
            type: Boolean,
            default: true
        },
        enableRefresh: { //是否开启刷新
            type: Boolean,
            default: true
        },
        onScroll: {//（向上）滑动中
            type: Function
        },
        onPulling: {//（向下）下拉刷新中
            type: Function
        },
        onRefresh: {//刷新方法
            type: Function,
            default: undefined,
            required: false
        },
        onInfinite: {//初始化方法
            type: Function,
            default: undefined,
            require: false
        },
        dataList: {
            default: false,
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
        }
    },
    methods: {
        touchStart(e) {
            this.startY = e.targetTouches[0].pageY;
            this.startX = e.targetTouches[0].pageX;
            this.startScroll = this.$el.scrollTop || 0;
            this.touching = true;

            this.dataList.noDataFlag = false;

            if(this.showLoadMore) {
                this.$el.querySelector('.load-more').style.display = 'block';
                }
            },

        touchMove(e) {
            if(!this.enableRefresh || this.dataList.noDataFlag || !this.touching) {
                return
            }

            console.log('this.top', this.top);
            this.$emit('onPulling', this.top);
            if(this.top >= this.offset) {
                this.state = 1;
            } else {
                this.state = 0
            }

            //核心计算距离屏幕顶部距离
            let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
            if(diff > 0) e.preventDefault()
            this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)

            if(this.state === 2) { // 正在执行刷新
                return
            }

            if(!this.showLoadMore){//没有加载更多
                return;
            }

            let more = this.$el.querySelector('.load-more');
            if(!this.top && this.state === 0) {
                more.style.display = 'block';
            } else {
                more.style.display = 'none';
            }
        },

        touchEnd(e) {

            if(!this.enableRefresh) {
                return
            }

            this.touching = false;

            if(this.state === 2) { // 正在执行刷新
                return
            }

            if(this.top >= this.offset) { // 达到了刷新条件 --> 执行刷新
                this.refresh()

                //父组件调用子组件
                //子组件定义mychild
                //this.$refs.mychild.refreshDone();
            } else { // 取消刷新 TODO
                this.refreshDone()
            }

            //用于判断滑动是否在原地 ----begin
            let endX = e.changedTouches[0].pageX,
                endY = e.changedTouches[0].pageY,
                dy = this.startY - endY,
                dx = endX - this.startX;

            console.log('最终滑动松手位于屏幕的位置：x：', endX, ' y：', endY);
            console.log('最终滑动松手时变化的像素：x：', dx, ' y：', dy);

            //如果滑动距离太短
            if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                console.log("滑动距离太短")
                return;
            }

            //--------end--------

            if(!this.enableInfinite || this.infiniteLoading) {
                return
            }

            let outerHeight = this.$el.clientHeight,
                innerHeight = this.$el.querySelector('.inner').clientHeight,
                scrollTop = this.$el.scrollTop,
                ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0,
                bottom = innerHeight - outerHeight - scrollTop - ptrHeight;

            console.log(bottom + " __ " + this.offset)

            if(bottom <= this.offset && this.state === 0) {
                this.loadingFlag = true;
                this.infinite();
            } else {
                if(this.showLoadMore){
                    this.$el.querySelector('.load-more').style.display = 'none';
                }

                this.loadingFlag = false;
            }
        },

        refresh() {
            this.state = 2;
            //回弹效果
            this.top = this.bounce > 0 ? this.bounce: this.offset;

            setTimeout(() => {
                this.onRefresh(this.refreshDone)
            }, 300);
        },

        refreshDone(type) {
            this.state = 0
            this.top = 0
        },

        infinite() {
            this.infiniteLoading = true

            setTimeout(() => {
                this.onInfinite(this.infiniteDone);
            }, 2000);
        },

        infiniteDone() {
            this.infiniteLoading = false
        },

        onScrollFn(e) {
            throttle(this.$emit('onScroll', e), 100)
        }
    }
}
</script>
<style lang="scss" scoped>
.bike-scroll {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: auto;
    overflow-x: hidden;
    overflow-y: scroll;
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
            width: 100%;
            height: 5rem;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
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
        .nullData {//暂无更多数据样式
            color: #999999;
            height: 100px;
            line-height: 100px;
            text-align: center;
        }
        .down-tip,
        .refresh-tip,
        .up-tip {
            display: none;
        }
        .up-tip:before,
        .refresh-tip:before {
            content: '';
            display: inline-block;
            width: 160px;
            height: 70px;
            background-size: 70% !important;
            position: absolute;
            top: 0;
            left: 20%;
        }
        // .up-tip:before {
        //     background: url(../img/down-logo.png) no-repeat center;
        // }
        // .refresh-tip:before {
        //     background: url(../img/refresh-logo.gif) no-repeat center;
        // }
    }
}

.bike-scroll.touch .inner {
    transition-duration: 0;
}

.bike-scroll.down .down-tip {
    display: block;
}

.bike-scroll.up .up-tip {
    display: block;
}

.bike-scroll.refresh .refresh-tip {
    display: block;
}
</style>
