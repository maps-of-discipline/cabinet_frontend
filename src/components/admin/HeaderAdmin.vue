<template>
	<div class="HeaderAdmin">
		<Button
			class="HeaderAdmin__all-categories-link"
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
	align-items: center;

	&__all-categories-link {
		padding-left: 0px;
		color: $blue000;
		font-weight: 600;

		font-size: 0.85rem;

		&:hover {
			filter: brightness(0.97);
		}

		.p-button-icon {
			font-size: 1.2rem;
		}

		.p-button-label {
			text-decoration: none;
		}
	}
}
</style>
