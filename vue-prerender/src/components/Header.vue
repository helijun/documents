<template>
    <header>
        <a class="bike-title" href="//www.twobike.cn">微人类</a>
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">
                <a href="#">首页</a>
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
</template>

<script>

export default {
    name: 'header',
    data () {
        return {
            
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
    @import '~@/assets/css/common.css';

    .common-width {
        margin: 0 auto !important;
        width: 1200px !important;
    }
    header {
        position: fixed;
        right: 0;
        left: 0;
        z-index: 2;
        @extend .common-width;
        width: 100%;
        height: 60px;
        color: #666;
        background-color: transparent;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
        .bike-title {
            margin-top: 10px;
            color: #f8f8f8;
            font-weight: 600;
            font-size: 20px;
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
    .el-dropdown-menu__item--divided:before, .el-menu, .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
        background-color: transparent;
    }
    .el-menu--horizontal>.el-menu-item.is-active {
        color: #fff;
        border: 0;
    }
    .el-dropdown-menu__item--divided:before, .el-menu, .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
        background-color: transparent;
    }
</style>
