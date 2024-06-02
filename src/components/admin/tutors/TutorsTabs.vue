<template>
	<div class="TutorsTabMenu">
		<div class="TutorsTabMenu__nav">
			<div
				v-for="(tab, i) in tabs"
				class="TutorsTabMenu__tab-button p-ripple"
				v-ripple
				@click="setActiveTabId(i)"
				:class="{ isActive: activeTabIndex === i }"
			>
				<span class="LeftMenuLink__label">{{ tab }}</span>
			</div>
		</div>

		<div class="TutorsTabMenu__view">
			<template v-if="!empty">
				<component :is="activeTabComponent" />
			</template>

			<div v-else class="TutorsTabMenu__empty">Данные отсутствуют</div>
		</div>
	</div>
</template>

<script setup>
import { computed, ref, useSlots } from 'vue'

const props = defineProps({
	empty: {
		type: Boolean,
		required: true,
	},
})

const slots = useSlots()

const activeTabIndex = ref(0)
const setActiveTabId = id => (activeTabIndex.value = id)

const activeTabComponent = computed(() => slots.default()[activeTabIndex.value])

const tabs = ref([...slots.default().map(s => s.props.title || '')])
console.log(tabs.value)
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.TutorsTabMenu {
	display: grid;
	grid-template-columns: 200px minmax(300px, 800px);
	grid-template-rows: 500px;

	&__nav {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding-right: 12px;
		border-right: 1px solid $shade700;
		width: 100%;
		max-width: 300px;
	}

	&__tab-button {
		text-decoration: none;
		color: $menu-link-color;
		display: inline-flex;
		align-items: center;
		border-radius: $borderRadius;
		padding: 12px 16px;
		transition: all 0.25s ease;
		width: 100%;
		white-space: nowrap;
		cursor: pointer;

		&:hover,
		&.isActive {
			background: $menu-link-hover-bg;
			color: #fff;
		}

		&__label {
			margin-left: 16px;
			font-size: 1rem;
			transition: opacity 0.25s ease;
		}

		&.mini {
			.LeftMenuLink {
				&__label {
					opacity: 0;
				}
			}
		}
	}

	&__view {
		padding: 0 12px;
		width: 100%;
	}

	&__empty {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
