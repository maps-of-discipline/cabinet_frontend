<template>
	<div class="LeftMenu" :class="{ isOpen: uiStore.leftMenuMiniMode }">
		<router-link class="LeftMenu__logo-block" to="/">
			<img class="LeftMenu__logo" src="@assets/logo.png" alt="" />
			<div class="LeftMenu__logo-title">Успеваемость</div>
		</router-link>

		<LeftMenuSwitcher class="LeftMenu__switcher" />

		<LeftMenuNav
			class="LeftMenu__nav"
			:data="uiStore.leftMenuNavItems"
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

import LeftMenuNav from '@components/layouts/Main/LeftMenu/LeftMenuNav.vue'
import LeftMenuAccount from '@components/layouts/Main/LeftMenu/LeftMenuAccount.vue'
import LeftMenuSwitcher from '@components/layouts/Main/LeftMenu/LeftMenuSwitcher.vue'

import { useUi } from '@stores/ui'

const uiStore = useUi()
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
		z-index: 2;
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
