<template>
	<div class="LeftMenu" :class="{ isOpen: uiStore.leftMenuMiniMode }">
		<router-link class="LeftMenu__logo-block" to="/">
			<img class="LeftMenu__logo" src="@assets/logo.png" alt="" />
			<div class="LeftMenu__logo-title">Успеваемость</div>
		</router-link>

		<LeftMenuSwitcher class="LeftMenu__switcher" />

		<LeftMenuNav
			class="LeftMenu__nav"
			:data="items"
			:mini="uiStore.leftMenuMiniMode"
		/>

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
import LeftMenuSwitcher from '@components/layouts/Main/LeftMenuSwitcher.vue'

import { useUi } from '@stores/ui'

const uiStore = useUi()

const items = ref([
	{
		hideInMini: false,
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
				label: 'Отчеты',
				route: '/report',
				icon: 'mdi-chart-bar',
			},
			{
				label: 'Управление',
				route: '/admin',
				icon: 'mdi-cog',
			},
		],
	},

	{
		hideInMini: true,
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
	width: 100%;
	max-width: 300px;
	padding: 16px;
	background-color: $menu-bg;
	display: grid;
	grid-template-rows: 70px 1fr auto;
	grid-template-columns: 100%;
	transition: all 0.25s ease;
	position: relative;

	&__switcher {
		position: absolute;
		right: calc(0% - 4px);
		top: 51px;
		transform: translate(50%, -50%);
	}

	&__logo-block {
		display: flex;
		align-items: center;
		position: relative;
	}

	&__logo {
		width: 52px;
		padding: 0 8px;
	}

	&__logo-title {
		margin-left: 16px;
		font-size: 1.1rem;
		transition: opacity 0.25s ease;
	}

	&__nav {
		margin-top: 12px;
	}

	&__divider {
		margin: 30px 0;
	}

	&.isOpen {
		max-width: 84px;

		.LeftMenu {
			&__logo-title {
				opacity: 0;
			}
		}
	}
}
</style>
