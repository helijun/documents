<template>
    <div class="components-checkbox">
        <span class="checkbox-title">{{title}}</span>
        <div class="checkbox-box" v-for="(item,index) in checkboxs" :key="item.id">
            <span class="checkbox" :class="{'on':item.isChecked}"></span>
            <input v-model="checkbox" :value="item.value" class="input-checkbox" :checked='item.isChecked'  @click="check(index)" type="checkbox">
            <span class="checkbox-text">{{item.label}}</span>

            <span class="checkbox-money">¥{{item.money}}</span>
        </div>
    </div>
</template>

<script>
import axios from '@/services/axios';
import api from '@/services/api';
export default {
    data() {
        return {
            checkbox: ''
        }
    },
    props: [
        'class',
        'title',
        'checkboxs',
        'name'
    ],
    computed: {
        checks() {
            let array = [];
            this.checkboxs.forEach(element => {
                if(element.isChecked) array.push(element.value)
            });
            console.log('初始值', array)
            return array;
        }
    },
    created(){
        
    },
    methods: {
        check(index) {
            if(index == 0){ //无
                if(!this.checkboxs[index].isChecked){
                    console.log('无，且没有选中 -->> 需要将所有非无的取消选中')
                    this.checkboxs.forEach((element, index) => {
                        if(index != 0){
                            this.checkboxs[index].isChecked = false;
                        }
                    })
                }
            }else{
                if(!this.checkboxs[index].isChecked){
                    this.checkboxs[0].isChecked = false;
                    console.log('非无，且没有选中 -->> 需要将无的取消选中')
                }
            }
            
            this.checkbox = this.checkboxs[index].value;
            
            if(this.checkboxs[index].isChecked){
                this.checks.push(this.checkbox)
            }else{
                console.log('this.checks', this.checks);
                this.checks = this.checks.filter((item) => {
                    return item == this.checkbox
                })
            }

            this.checkboxs[index].isChecked = !this.checkboxs[index].isChecked;

            console.log('this.checks', this.checks.join(','));
            this.$emit('checkboxChange', {
                value: this.checks.join(','), //当前所有选中的checboxs值，隔开
                currentClickValue: this.checkboxs[index].value, //当前点击的checkbox值
                isChecked: this.checkboxs[index].isChecked, //当前点击的checkbox是否被选中 
                name: this.name //当前点击的checbox name
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/common.scss";
.components-checkbox {
    width: 100%;
}
.checkbox-box{
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    height: pxrem(30px);
    line-height: pxrem(30px);
    margin-right: 5px;
}
.checkbox {
    width: pxrem(30px);
    height: pxrem(30px);
    cursor: pointer;
    background-image: url(../../assets/img/icon/icon-check-condition-gay.png);
    background-repeat: no-repeat;
    background-size: 100%;
}
.checkbox-text {
    margin-left: pxrem(8px);
}
.input-checkbox {
    display: inline-block;
    position: absolute;
    opacity: 0;
    width: pxrem(30px);
    height: pxrem(30px);
    cursor: pointer;
    left: 0px;
    outline: none;
    -webkit-appearance: none;
}
.checkbox-money {
    color: red;
    float: right;
}
.on {
    background-image: url(../../assets/img/icon/icon-check-condition.png);
}
</style>

