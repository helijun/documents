<style lang="scss">
@import "../../assets/css/global.scss";

#component-button {
    

}
</style>

<template>
    <button 
        :id="btnId"
        :class="className" 
        v-html="btnHtml"
        @click="handleClick"
    ></button>
</template>

<script>
export default {
    name: 'common-header',
    props: {
        btnId: {//防止命名冲突
            type: String,
            default: ''
        },
        className: {
            type: String,
            default: ''
        },
        btnHtml: {
            type: String,
            default: ''
        },
        clickType: {//点击后防多次点击的类型 1提示请问重复点击
            type: String,
            default: '1'
        },
        stopPropagation: {//是否阻止事件冒泡
            type: Boolean,
            default: true
        },
        preventDefault: {//是否阻止事件默认行为
            type: Boolean,
            default: true
        }
    },
    computed: {

    },
    data() {
        return {
            
        }
    },
    methods: {
        handleClick(event) {
            if(this.stopPropagation){
                event.stopPropagation();
            }
            if(this.preventDefault){
                event.preventDefault();
            }

            switch (this.clickType) {
                case '1':
                    this.$emit('handleClick');
                    break;
                case '2':
                    this.$emit('handleClick');
                    break;
            
                default:
                    
                    break;
            }
        }
    }
}
</script>