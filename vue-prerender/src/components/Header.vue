<template>
    <div class="components-header" :style="{background: `rgba(45,62,80, ${headerOpacity})`}">
        <header>
            <a class="bike-title" href="//www.twobike.cn">微人类</a>
            <el-menu :default-active="activeIndex" mode="horizontal">
                <el-menu-item index="1">
                    <a href="//www.twobike.com">首页</a>
                </el-menu-item>
                <el-menu-item index="2">
                    <a href="./blogs/index.html" target="_blank">博客</a>
                </el-menu-item>
                <el-menu-item index="3">
                    <a href="./life/index.html" target="_blank">感悟</a>
                </el-menu-item>
                <el-menu-item index="4">
                    <a href="http://www.xiami.com/collect/162245539" target="_blank">民谣</a>
                </el-menu-item>
                <el-menu-item index="4">
                    <a href="./info/1024.html" target="_blank">骑行</a>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">其他</template>
                    <el-menu-item index="2-1">
                        <a href="./book/index.html" target="_blank">1. 个人书单</a>
                    </el-menu-item>
                    <el-menu-item index="2-2">
                        <a href="./video/index.html" target="_blank">2. 电影&电视剧</a>
                    </el-menu-item>
                    <el-menu-item index="2-3">
                        <a href="https://github.com/helijun/react-learn" target="_blank">3. React学习</a>
                    </el-menu-item>
                    <el-menu-item index="2-4">
                        <a href="http://www.twobike.cn/blogs/给你的jQuery项目赋予Router技能吧.html" target="_blank">4. 最新文章</a>
                    </el-menu-item>
                    <el-menu-item index="2-5">
                        <a href="./life/闲置的2017.html" target="_blank">5. 闲置的2017</a>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </header>
    </div>
</template>

<script>

export default {
    name: 'header',
    data () {
        return {
            activeIndex: '1',
        }
    },
    props: {
        headerOpacity: {
            type: String,
            default: '0'
        }
    },
    created () {

    },
    mounted () {

    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/index.scss';

    .common-width {
        margin: 0 auto !important;
        width: 1200px !important;
    }
    .components-header {
        position: fixed;
        right: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 60px;
        color: #666;
        background-color: transparent;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
    }
    header {
        @extend .components-header;
        @extend .common-width;

        .bike-title {
            margin-top: 10px;
            color: #f8f8f8;
            font-weight: 600;
            font-size: 20px;

            @media #{$media} and ($media-max-width: $max-width-768) {
                font-size: torem(26px);
                position: relative;
                left: -2.8%;
                margin-top: torem(-10px);
            }
        }
        a:focus {
            outline: thin dotted #fff;
            outline: 5px auto -webkit-focus-ring-color;
            outline-offset: -2px;
        }
        a:hover {
            color: #fff;
        }
        .el-menu.el-menu--horizontal {
            border: 0;
        }

        ul {

        }
    }
    .el-menu {
        background-color: transparent;

    }

    .el-menu--horizontal {
        li {
            color: #fff;

            &:hover {
                color: #e4e7ed !important;
            }
        }
    }
    /deep/ .el-menu--horizontal>.el-submenu .el-submenu__title {
        color: #fff;
        border: 0;

        &:hover {
            color: #e4e7ed;
            background-color: transparent !important;
        }
    }
    .el-dropdown-menu__item--divided:before, .el-menu, .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
        background-color: transparent !important;
    }

    .el-menu--horizontal>.el-menu-item.is-active {
        color: #fff;
        border: 0;
    }
    .el-submenu__title {
        background-color: transparent !important;
        &:hover {
            background-color: transparent !important;
        }
    }
    .el-menu--popup {
        a {
            color: #666;
            &:hover {
                color: #999;
            }
        }
    }
</style>
