<template>
	<header class="header">
		<Card
			class="logo-block p-ripple"
			v-ripple
			style="border: 1px solid #3f3f46"
		>
			<template #content>
				<div class="logo-block__logo">Успеваемость</div>
			</template>
		</Card>

		<Menubar class="navigation" :model="items">
			<template #item="{ item, props, hasSubmenu }">
				<router-link
					v-if="item.route"
					v-slot="{ href, navigate }"
					:to="item.route"
					custom
				>
					<a v-ripple :href="href" v-bind="props.action" @click="navigate">
						<span :class="item.icon" />
						<span class="ml-2">{{ item.label }}</span>
					</a>
				</router-link>
				<a
					v-else
					v-ripple
					:href="item.url"
					:target="item.target"
					v-bind="props.action"
				>
					<span :class="item.icon" />
					<span class="ml-2">{{ item.label }}</span>
					<span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
				</a>
			</template>
		</Menubar>

		<Card
			class="profile-block p-ripple"
			v-ripple
			style="border: 1px solid #3f3f46"
		>
			<template #content>
				<div class="profile-block__inner">
					<Avatar icon="pi pi-user" class="mr-2" />
					<div class="profile-block__info">
						<div class="profile-block__name">Даниил Кириллов</div>
						<div class="profile-block__role">Преподаватель</div>
					</div>

					<i class="profile-block__chevron pi pi-chevron-down"></i>
				</div>
			</template>
		</Card>
	</header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
	{
		label: 'Журнал',
		route: '/grades',
	},
	{
		label: 'Темы занятий',
		route: '/lessons',
	},
])
</script>

<style lang="scss">
.header {
	margin-bottom: 16px;
	display: grid;
	grid-template-columns: 250px 1fr 250px;
	gap: 16px;
}

.navigation {
	width: 100%;
}

.logo-block {
	justify-content: center;

	.p-card-body {
		padding: 8px 16px;
	}

	&__logo {
		height: 100%;
		display: flex;
		justify-content: center;
	}
}

.profile-block {
	.p-card-body {
		padding: 8px 16px;
	}

	&__inner {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
	}

	&__info {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	&__name {
		font-size: 15px;
	}

	&__role {
		font-size: 12px;
	}
}

.p-menubar .p-menuitem {
	margin: 2px 0 !important;
}
</style>
