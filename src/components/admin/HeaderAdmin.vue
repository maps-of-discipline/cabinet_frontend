<template>
	<div class="HeaderAdmin">
		<Button
			label="Все разделы"
			link
			icon="mdi mdi-chevron-left"
			@click="onClickAllCategories"
		/>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const onClickAllCategories = () => {
	console.log(router)
	router.push({ name: 'admin' })
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.HeaderAdmin {
	display: flex;
}
</style>
