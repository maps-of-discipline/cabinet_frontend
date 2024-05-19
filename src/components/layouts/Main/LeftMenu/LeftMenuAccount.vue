<template>
	<router-link to="/profile" class="LeftMenuAccount" :class="{ isMini }">
		<div class="LeftMenuAccount__avatar-wrapper">
			<Avatar
				class="LeftMenuAccount__avatar"
				:icon="!imageUrl ? 'pi pi-user' : ''"
				:image="imageUrl"
				shape="circle"
			/>
		</div>

		<div class="LeftMenuAccount__detail">
			<div class="LeftMenuAccount__name">{{ userStore.name }}</div>
			<div class="LeftMenuAccount__role">{{ userStore.status }}</div>
		</div>

		<Button
			class="LeftMenuAccount__logout"
			icon="mdi mdi-logout"
			text
			rounded
			@click="onClickLogout"
		/>
	</router-link>
</template>

<script setup>
import { computed } from 'vue'

import { useAuth } from '@stores/auth'
import { useUser } from '@stores/user'
import { useUi } from '@stores/ui'

const authStore = useAuth()
const userStore = useUser()
const uiStore = useUi()

const onClickLogout = () => authStore.logout()
const isMini = computed(() => uiStore.leftMenuMiniMode)

const imageUrl = computed(() => userStore.userData?.avatar || '')
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.LeftMenuAccount {
	display: grid;
	grid-template-columns: auto 1fr auto;
	align-items: center;
	white-space: nowrap;
	overflow: hidden;
	border-radius: $borderRadius;
	padding: 12px 12px;

	&.router-link-active {
		background: $menu-link-hover-bg;
		color: #fff;
	}

	&__avatar-wrapper {
		display: flex;
		justify-content: center;
		width: 35px;

		img {
			object-fit: cover;
		}
	}

	&__detail {
		margin-left: 12px;
		transition: opacity 0.25s ease;
	}

	&__name {
		font-size: 1rem;
	}

	&__role {
		margin-top: 4px;
		font-size: 0.8rem;
	}

	&__logout {
		transition: opacity 0.25s ease;
	}

	&.isMini {
		.LeftMenuAccount {
			&__detail,
			&__logout {
				opacity: 0;
			}
		}
	}
}
</style>
