<template>
    <div class="mainCon">
        <router-view></router-view>
    </div>
</template>
<script>
import top from '@/components/header.vue';
import foot from '@/components/footer.vue';
export default {
    components: {
        top
    },
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
    }
}
</script>
<style lang='scss' scoped>
    .mainCon{
        width: 100%;
        height: 100%;
    }
</style>

