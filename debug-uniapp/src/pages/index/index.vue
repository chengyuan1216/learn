<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<Hello></Hello>
	</view>
</template>

<script>
import Hello from '@/components/Hello.vue'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		components: {
			Hello
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
