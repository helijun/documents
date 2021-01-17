<template>
    <div class="components-radio">
        <span class="radio-title">{{title}}</span>
        <div class="radio-box" v-for="(item,index) in radios" :key="item.id">
            <span class="radio" :class="{'on':item.isChecked}"></span>
            <input v-model="radio" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="check(index)" type="radio">{{item.label}}
        </div>
    </div>
</template>

<script>
import axios from '@/services/axios';
import api from '@/services/api';
export default {
    data() {
        return {
            radio: '',
        }
    },
    props: [
        'title',
        'radios',
        'name'
    ],
    created(){
        
    },
    methods: {
        check(index) {
            // 先取消所有选中项
            this.radios.forEach((item) => {
                item.isChecked = false;
            });
            //再设置当前点击项选中
            this.radio = this.radios[index].value;
            // 设置值，以供传递
            this.radios[index].isChecked = true;

            console.log('this.radio', this.radio);
            this.$emit('radioChange', {
                currentClickValue: this.radio, //当前点击的radio值
                name: this.name //radio name
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .radio-box{
        display: inline-block;
        position: relative;
        height: 25px;
        line-height: 25px;
        margin-right: 5px;
    }
    .radio {
        display: inline-block;
        width: 25px;
        height: 25px;
        vertical-align: middle;
        cursor: pointer;
        background-image: url(../../assets/img/icon/icon-check-condition-gay.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 0 0;
    }
    .input-radio {
        display: inline-block;
        position: absolute;
        opacity: 0;
        width: 25px;
        height: 25px;
        cursor: pointer;
        left: 0px;
        outline: none;
        -webkit-appearance: none;
    }
    .on {
        background-image: url(../../assets/img/icon/icon-check-condition.png);
    }
</style>

