<template>
    <footer>
        <p>© 2016 - 2018 by helijun</p>
    </footer>
</template>

<script>

export default {
    name: 'footer',
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
    
    footer {
        display: block;
        background: #2d3e50;
        p {
            color: #7f8c8d;
            margin: 0 auto;
            padding: 15px 0;
            width: 1200px;
            text-align: center;
        }
    }
</style>
