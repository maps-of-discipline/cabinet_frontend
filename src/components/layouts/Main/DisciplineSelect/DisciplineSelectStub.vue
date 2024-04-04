<template>
	<div class="DisciplineSelectStub">
		{{ message }}
	</div>
</template>

<script setup>
defineProps({
	message: {
		type: String,
		default: 'Произошла неизвестная ошибка.',
	},
})
</script>

<style lang="scss">
.DisciplineSelectStub {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
