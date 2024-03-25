<template>
	<header class="MainHeader">
		<router-link class="MainHeader__logo-block" to="/">
			<img class="MainHeader__logo" src="@assets/logo.png" alt="" />
			<div class="MainHeader__logo-title">Кабинет преподавателя</div>
		</router-link>

		<MainHeaderNav class="MainHeader__nav" :data="items" />

		<div class="MainHeader__footer">
			<divider class="MainHeader__divider" />
			<MainHeaderAccount />
		</div>
	</header>
</template>

<script setup>
import { ref } from 'vue'

import MainHeaderNav from '@components/layouts/MainHeaderNav.vue'
import MainHeaderAccount from '@components/layouts/MainHeaderAccount.vue'

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
				label: 'Темы занятий',
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

.MainHeader {
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
