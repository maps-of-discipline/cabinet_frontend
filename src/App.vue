<template>
	<MainLayout>
		<RouterView />
	</MainLayout>

	<Toast />
</template>

<script setup>
import MainLayout from '@layouts/MainLayout.vue'
import Toast from 'primevue/toast'

import { RouterView } from 'vue-router'
</script>
