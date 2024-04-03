<template>
	<div class="LeftMenu">
		<router-link class="LeftMenu__logo-block" to="/">
			<img class="LeftMenu__logo" src="@assets/logo.png" alt="" />
			<div class="LeftMenu__logo-title">Успеваемость</div>
		</router-link>

		<LeftMenuNav class="LeftMenu__nav" :data="items" />

		<div class="LeftMenu__footer">
			<divider class="LeftMenu__divider" />
			<LeftMenuAccount />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

import LeftMenuNav from '@components/layouts/Main/LeftMenuNav.vue'
import LeftMenuAccount from '@components/layouts/Main/LeftMenuAccount.vue'

const items = ref([
	{
		items: [
			{
				label: 'Главная',
				route: '/',
				icon: 'mdi-home',
			},
			{
				label: 'Успеваемость',
				route: '/grades',
				icon: 'mdi-book-open-page-variant',
			},
			{
				label: 'Задания',
				route: '/lessons',
				icon: 'mdi-table',
			},
			{
				label: 'FAQ',
				route: '/faq',
				icon: 'mdi-frequently-asked-questions',
			},
		],
	},

	{
		items: [
			{
				label: 'Карты дисциплин',
				url: 'https://kd.mospolytech.ru',
			},

			{
				label: 'Личный кабинет',
				url: 'https://e.mospolytech.ru',
			},
			{
				label: 'СДО',
				url: 'https://online.mospolytech.ru/',
			},
		],
	},
])
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.LeftMenu {
	padding: 30px;
	background-color: $menu-bg;
	display: grid;
	grid-template-rows: auto 1fr auto;

	&__logo-block {
		display: flex;
		align-items: center;
	}

	&__logo {
		width: 2.5rem;
	}

	&__logo-title {
		margin-left: 16px;
		font-size: 1.1rem;
	}

	&__nav {
		margin-top: 50px;
	}

	&__divider {
		margin: 30px 0;
	}
}
</style>
