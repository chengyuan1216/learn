<template>
    <view>
        <text class="title" v-if="title">{{title}}</text>
        <input v-model="title" />
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: 'Hello'
        }
    }
}
</script>

<style>
    page {
        background: #e0e0e0;
    }
</style>