<template>
	<ToggleButton
		class="LoadViewSelect"
		v-model="value"
		onLabel=""
		offLabel=""
		onIcon="mdi mdi-table-column-plus-after"
		offIcon="mdi mdi-table-column"
	/>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import { useLessonsStore } from '@/stores/lessons'

const lessonsStore = useLessonsStore()

const value = computed({
	get() {
		return lessonsStore.loadViewMode
	},

	set() {
		lessonsStore.switchLoadViewMode()
	},
})
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.LoadViewSelect {
	background-color: $shade950;
	color: $shade400;
	border-radius: $borderRadius;

	outline: $focusOutlineTransparent;
	transition: outline 0.2s, color 0.2s;

	&:hover,
	&:focus {
		border: none;
		outline: $focusOutline;
		color: $shade000;

		.p-multiselect-label.p-placeholder {
			color: #fff;
		}
	}
}
</style>
