<template>
	<component :is="$route.meta.layout || EmptyLayout">
		<RouterView />
	</component>

	<Toast />
</template>

<script setup>
import EmptyLayout from '@layouts/EmptyLayout.vue'
import Toast from 'primevue/toast'

import { RouterView } from 'vue-router'

import { useUser } from '@stores/user'

const userStore = useUser()

userStore.fetchUser()
</script>
