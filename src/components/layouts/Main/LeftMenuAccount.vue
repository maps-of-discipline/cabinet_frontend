<template>
	<div class="LeftMenuAccount">
		<Avatar icon="pi pi-user" shape="circle" />

		<div class="LeftMenuAccount__detail">
			<div class="LeftMenuAccount__name">{{ userStore.name }}</div>
			<div class="LeftMenuAccount__role">{{ userStore.status }}</div>
		</div>

		<Button icon="mdi mdi-logout" text rounded @click="onClickLogout" />
	</div>
</template>

<script setup>
import app from '@/main.ts'

import { useAuth } from '@stores/auth'
import { useUser } from '@stores/user'

const authStore = useAuth()
const userStore = useUser()

const onClickLogout = () => authStore.logout()
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
