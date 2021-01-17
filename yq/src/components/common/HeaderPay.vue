<template>
    <header id="component-header" >
        <div 
            :class="[hasBackIcon?'back':'none']" 
            @click="handleGoBackClick"
        >
            <i></i>
        </div>
        <div class="title" v-html="title"></div>
        <div 
            class="right"
            @click="handleRightClick"
            v-html="right"
        ></div>
    </header>
</template>

<script>
export default {
    props: {
        type: {//wechat为微信内打开
            type: String,
            default: 'wechat'
        },
        hasBackIcon: {//是否有返回键
            type: Boolean,
            default: true
        },
        isGoBack: {//是否执行后退，如果不是，则触发父组件自定义事件 handleGoBackClick
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: ''
        },
        right: {
            type: String,
            default: ''
        }
    },
    computed: {

    },
    data() {
        return {
            headerShow: true
        }
    },
    created() {
        
    },
    methods: {
        //后退点击事件
        handleGoBackClick() {
            if(this.isGoBack){
                event.stopPropagation();
                event.preventDefault();
                this.$router.go(-1);
            }else{
                this.$emit('handleGoBackClick');
            }
        },
        //右边点击事件
        handleRightClick() {
            this.$emit('handleRightClick');
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/css/common.scss";

#component-header {
    position: relative;
    display: -webkit-box;
    width: 100%;
    height: pxrem($header-height-mobile);
    line-height: pxrem($header-height-mobile);
    background-color: #fff;
    transition: all 0.2s linear 0s;
    box-shadow: 0 1px 10px 0 rgba(19, 27, 51, 0.1);
    text-align: center;

    .none {
        visibility: hidden;
    }

    .back {
        position: absolute;
        left: 0;
        padding: 0 pxrem(10px);

        i {
            background: url('../../assets/img/icon/icon-back.png');
            background-repeat: no-repeat;
            background-size: cover;
            display: inline-block;
            line-height: pxrem(40px);
            width: pxrem(16px);
            height: pxrem(28px);
        }
    }

    .title {
        display: flex;
        width: 100%;
        justify-content: center;

    }

    .right {
        position: absolute;
        right: 0;
        padding: 0 pxrem(10px);
        display: flex;
        align-items: center;
        height: pxrem(40px);
    }

}
</style>