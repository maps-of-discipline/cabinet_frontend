<template>
	<div class="AdminView">
		<div v-if="route.path !== '/admin'" class="AdminView__router">
			<HeaderAdmin />
			<RouterView />
		</div>

		<div class="AdminHome" v-else>
			<router-link to="/admin/groups" rel="noopener">
				<Button label="Группы" link />
			</router-link>
			<router-link to="/admin/tutors" rel="noopener">
				<Button label="Тьюторы" link />
			</router-link>
		</div>
	</div>
</template>

<script setup>
import HeaderAdmin from '@components/admin/HeaderAdmin.vue'

import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style lang="scss">
.AdminView {
	height: 100%;

	&__router {
		height: 100%;
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 12px;
	}
}

.AdminHome {
}
</style>
