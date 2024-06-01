<template>
	<div class="AdminView">
		<div v-if="route.path !== '/admin'" class="AdminView__router">
			<HeaderAdmin />
			<RouterView />
		</div>

		<div class="AdminHome" v-else>
			<div class="AdminHome__title">Все разделы</div>

			<div class="AdminHome__blocks">
				<CategoryBlock
					v-for="category in categories"
					:key="category.id"
					:label="category.label"
					:to="category.to"
					:icon="category.icon"
					:color="category.color"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import HeaderAdmin from '@components/admin/HeaderAdmin.vue'
import CategoryBlock from '@components/admin/CategoryBlock.vue'

import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const categories = ref([
	{
		id: 1,
		label: 'Справочник групп',
		to: '/admin/groups',
		icon: 'mdi mdi-account-group',
		color: 'rgb(168, 95, 236)',
	},
	{
		id: 2,
		label: 'Тьюторы',
		to: '/admin/tutors',
		icon: 'mdi mdi-human-male-board',
		color: 'rgb(238, 158, 68)',
	},
	{
		id: 3,
		label: 'Справочник звонков',
		to: '/admin/bells',
		icon: 'mdi mdi-bell',
		color: 'rgb(60, 210, 136)',
	},
	{
		id: 3,
		label: 'Доступ к системе',
		to: '/admin/access',
		icon: 'mdi mdi-security',
		color: 'rgb(236, 95, 107)',
	},
])
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.AdminView {
	height: 100%;

	&__router {
		height: 100%;
		display: grid;
		justify-content: center;
		grid-template-rows: auto 1fr;
		gap: 12px;
	}
}

.AdminHome {
	background-color: $shade900;
	border-radius: $borderRadius;
	padding: 20px;

	&__title {
		font-size: 1.4rem;
		font-weight: 600;
		color: $text;
	}

	&__blocks {
		display: flex;
		flex-flow: wrap;
		gap: 8px;
		margin-top: 20px;
	}

	&__block {
	}
}
</style>
