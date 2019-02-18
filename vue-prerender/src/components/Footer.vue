<template>
    <footer>
        <p>&copy; 2016 - 2019 by helijun</p>
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
    @import '~@/assets/css/index.scss';

    footer {
        display: block;
        background: #2d3e50;
        p {
            color: #7f8c8d;
            margin: 0 auto;
            padding: 15px 0;
            width: 1200px;
            text-align: center;

            @media #{$media} and ($media-max-width: $max-width-768) {
                width: 100vw !important;
            }
        }
    }
</style>
