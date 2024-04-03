<template>
	<div class="LeftMenuAccount">
		<Avatar icon="pi pi-user" shape="circle" />

		<div class="LeftMenuAccount__detail">
			<div class="LeftMenuAccount__name">Даниил Кириллов</div>
			<div class="LeftMenuAccount__role">Преподаватель</div>
		</div>

		<Button icon="mdi mdi-logout" text rounded @click="onClick" />
	</div>
</template>

<script setup>
import app from '@/main.ts'

const onClick = () => {
	console.log('click')
	app.config.globalProperties.$toast.add({
		severity: 'info',
		summary: 'Учетные записи в разработке.',
		life: 2000,
	})
}
</script>

<style lang="scss" scoped>
.LeftMenuAccount {
	display: grid;
	grid-template-columns: auto 1fr auto;
	align-items: center;

	&__detail {
		margin-left: 12px;
	}

	&__name {
		font-size: 1rem;
	}

	&__role {
		margin-top: 4px;
		font-size: 0.8rem;
	}
}
</style>
