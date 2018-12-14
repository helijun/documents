<template>
    <div class="page-home-index">
        <div class="home-top-bg"></div>
        <H-header :headerOpacity="headerOpacity"></H-header>
        <scroller
            :on-refresh="refresh"
            :on-infinite="onInfinite"
            :dataList="listData"
            :offset="100"
            :bounce="50"
            @onScroll="onScroll"
            @onPulling="onPulling"
        >
            <template slot="pull-refresh">
                <span class="down-tip">别拉我</span>
                <span class="up-tip">放开我</span>
                <span class="refresh-tip">拉不动我吧，哈哈哈哈哈哈哈哈哈</span>
            </template>
            <article>
                <section class="bike-banner">
                    <h1 class="get-title">不是在写代码，就是在骑行的路上</h1>
                    <p>Coding，Riding，Or Reading.</p>
                </section>
                <div class="bike-article">
                    <div class="bike-list" v-for="(item, i) in listData" :key="i" @click="handleUrlClick(item.url)">
                        <div class="list-content">
                            <div class="title"><i :class="['iconfont', item.icon]"></i>{{item.title }}</div>
                            <div class="sub-title">{{item.content }}</div>
                        </div>
                    </div>
                </div>

                <section class="bike-about">
                    <div class="about-content">
                        <div class="about-col-10">
                            <el-popover
                                ref="popoverWx"
                                placement="top"
                                width="200"
                                trigger="hover">
                                <img class="bike-img-full" src="~@/assets/img/home/WX20181128-224630@2x.png" alt="">
                                <p class="bike-width-full bike-align-center">添加好友请备注来源</p>
                            </el-popover>
                            <el-button :class="['iconfont', 'icon-iconweixin']" v-popover:popoverWx></el-button>
                        </div>
                        <div class="about-col-10">
                            <el-button :class="['iconfont', 'icon-github']" @click="handleUrlClick('https://github.com/helijun')" title="点击跳转github" v-popover:popoverJian></el-button>
                        </div>
                        <div class="about-col-10">
                            <el-button :class="['iconfont', 'icon-jian']" @click="handleUrlClick('https://www.jianshu.com/u/ebb97922b992')" title="点击跳转简书" v-popover:popoverJian></el-button>
                        </div>
                        <div class="about-col-10">
                            <el-button :class="['iconfont', 'icon-boke3']" @click="handleUrlClick('http://www.cnblogs.com/liliangel')"  title="点击跳转博客园" v-popover:popoverJian></el-button>
                        </div>

                        <div class="about-col-60">
                            <div class="title">联系微人类</div>
                            <div class="sub-title">在知识爆炸的年代，我们不愿成为知识的过客，拥抱开源，崇尚共享，乐于交流，技术碰撞，共同进步。</div>
                        </div>
                    </div>
                </section>
            </article>
            <H-footer></H-footer>
            <div class="li-common-loading" ref="loading" v-show="loading"></div>

            <!-- <div class="animated fadeInDown">
            何立军
            </div> -->

        </scroller>
    </div>
</template>

<script>

require("@/assets/lib/bodymovin/bodymovin.min.js")

import HHeader from '@/components/Header';
import HFooter from '@/components/Footer';
import Scroller from '@/components/Scroller';
export default {
    name: 'home-index',
    data () {
        return {
            headerOpacity: '0',
            listData: [
                {
                    title: '技术博客',
                    icon: 'icon-xinwen',
                    url: 'https://www.twobike.cn/blogs/index.html',
                    content: '技术这条路，必须走到黑，不回头。日常的总结，是点点滴滴的进步。以js为核心，java，linux为辅多元化发展，不做偏安一隅的前端，ITer，请跟随兴趣一路前行。'
                },
                {
                    title: '感悟',
                    icon: 'icon-idea',
                    url: 'https://www.twobike.cn/life/index.html',
                    content: '放下对生活的成见，做一个不动声色的人，因为不是所有的鱼都生活在同一片海里。在躁动的青春年纪，那些总以为是迷茫的，不过是某一刻突然安静下来的不知所措而罢，面对复杂，保持欢喜，漫漫余生，满怀期盼。'
                },
                {
                    title: '民谣',
                    icon: 'icon-music',
                    url: 'https://www.xiami.com/collect/162245539',
                    content: '我没有故事，也没有酒，可是我有民谣，虾米音乐--精选集--《民谣中毒》，一起细品民谣，让越来越快的生活节奏放慢几分。'
                },
                {
                    title: '自行车',
                    icon: 'icon-zixingche',
                    url: 'https://www.twobike.cn/info/1024.html',
                    content: '开车太快，走路太慢，自行车刚刚好。迎着风，向着朝阳，最好的时光在路上，即刻出发!'
                }
            ],
            aboutData: [
                {
                    icon: 'icon-jian',
                    type: 'link',
                    link: ''
                },
                {
                    icon: 'icon-iconweixin',
                    type: 'alert',
                    img: ''
                },
                {
                    icon: 'icon-boke3',
                    type: 'alert',
                    img: ''
                },
                {
                    icon: 'icon-github',
                    type: 'link',
                    link: ''
                }
            ],
            msg: 'home-index',
            loading: false
        }
    },
    components: {
        HHeader,
        HFooter,
        Scroller
    },
    async created () {

    },
    mounted () {
      let animData = {
          wrapper: this.$refs.loading,
          animType: 'svg',
          loop: true,
          prerender: true,
          autoplay: true,
          //path: "/static/lib/bodymovin/loading-bike.json",
          path: "/static/lib/bodymovin/aimee.json",
      };
      this.loading = true;
      bodymovin.loadAnimation(animData);

      setTimeout(() => {
        if(this.dataReady){
          this.loading = false;
        }
      }, 5000)
    },
    methods: {

        handleUrlClick(url) {
            if(window.innerWidth >= 0){
                window.open(url);
            }else{
                window.location.href = url;
            }

        },
        refresh(cb) {
            setTimeout(() => {
                this.headerOpacity = 0;
                cb && cb(0)
            }, 1000)
        },
        onInfinite() {},

        //top 距离顶部的像素点
        onPulling(top) {
            console.log('距离顶部的像素点', top);
            if(top && top > 0){
                //this.headerOpacity = 1 - top/100;
            }else{
                this.headerOpacity = 0;
            }
        },
        onScroll(e) {
            let scrollTop = e.target.scrollTop;
            console.log('scrollTop', scrollTop);
            this.floatimgRightPx = scrollTop + 300 + "px";


            if (scrollTop <= 400) {
                this.headerOpacity = 0;
            }else if (scrollTop > 400 && scrollTop <= 700) {
                this.headerOpacity = scrollTop / 500;
                //this.activeHeight = "40vh";
            } else {
                this.headerRgba = 1;
                this.headerOpacity = 1; //解决正在刷新时又上滑透明度不还原问题
                //this.activeHeight = "44px";
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/index.scss';
@import '~@/assets/font/iconfont.css';
@import '~@/assets/css/animate/animate.css';
.common-width {
    margin: 0 auto !important;
    width: 1200px !important;

    @media #{$media} and ($media-max-width: $max-width-768) {
        width: 100vw !important;
    }
}

.home-top-bg {
    position: fixed;
    background: #1E5B94 !important;
    height: 50vh;
    width: 100vw;
    z-index: 0;
}
.page-home-index {
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #fff;
    z-index: 1;

    /deep/ .pull-refresh {
        background: #1E5B94 !important;
        color: #fff;
    }
    .header-space {
        height: 60px;
        min-height: 60px;
    }
    article {
        position: relative;

        .bike-banner {
            background: #1E5B94;
            color: #fff;
            text-align: center;
            padding: 160px 0;

            .get-title {
                font-size: 200%;
                display: inline-block;

                @media #{$media} and ($media-max-width: $max-width-768) {
                    font-size: torem(38px);
                    text-align: left;
                }
            }
            p {
                margin-top: 40px;
                font-weight: 600;

                @media #{$media} and ($media-max-width: $max-width-768) {
                    font-size: torem(26px);
                }
            }
        }
        .bike-article {
            display: flex;
            text-align: left;
            padding-bottom: 40px;
            background-color: #fff;
            @extend .common-width;

            @media #{$media} and ($media-max-width: $max-width-768) {
                display: block;
            }

            .iconfont {
                font-size: 20px;
                margin-right: 10px;
            }
            .icon-idea {
                font-size: 22px;
                margin-right: 8px;
            }
            .bike-list {
                padding: 14px 16px;
                width: 25%;

                @media #{$media} and ($media-max-width: $max-width-768) {
                    width: 100% !important;
                }

                .list-content {
                    cursor: pointer;
                    padding: 0 10px 5px 10px;
                    border-radius: 6px;

                    @media #{$media} and ($media-min-width: $min-width-768) {
                        &:hover {
                            transform: scale(1.1154);
                            transition: all 1s;
                            box-shadow: 10px 10px 10px #CCC;
                        }
                    }
                    .title {
                        margin-top: 20px;
                        font-size: 18px;
                        margin-bottom: 6px;
                        color: #1f8dd6;
                    }

                    .sub-title {
                        margin-top: 10px;
                        letter-spacing: 1px;
                        color: #7f8c8d;
                        font-size: 15px;
                        text-align: justify;
                    }
                }
            }
        }
        .bike-about {
            background-color: #0bb59b;
            min-height: 200px;

            .about-content {
                @extend .common-width;
                display: flex;
                width: 100%;
                align-items: center;
                min-height: 200px;

                .about-col-10 {
                    width: 10%;
                    text-align: right;

                    @media #{$media} and ($media-max-width: $max-width-768) {
                        width: 14%;
                    }

                    button {
                        border: none;
                        background: transparent;
                        font-size: 35px;
                        margin-right: 40px;
                        cursor: pointer;
                        transition: all 0.8s;

                        &:hover {
                            transform: scale(1.1154);
                        }
                    }
                    .icon-jian {
                        color: #e67979;
                    }
                    .icon-boke3 {
                        color: #eaeaff;
                    }
                    .icon-github {
                        color: black;
                    }
                    .icon-iconweixin {
                        color: #236f06;
                    }
                }
                .about-col-60 {
                    width: 60%;
                    text-align: left;
                    padding-left: 20%;
                    @media #{$media} and ($media-max-width: $max-width-768) {
                        padding-left: 4%;
                    }

                    .title {
                        font-size: 140%;
                        font-weight: 600;
                        color: white;
                    }
                    .sub-title {
                        margin-top: 1.6rem;
                        color: #666;
                        width: 68%;
                        font-size: 13px;

                        @media #{$media} and ($media-max-width: $max-width-768) {
                            width: 90% !important;
                        }
                    }
                }
            }
        }

    }
}
.li-common-loading {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 10vw;
    box-sizing: border-box;
}
</style>
