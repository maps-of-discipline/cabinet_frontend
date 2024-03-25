<template>
	<ToggleButton
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

<style lang="scss" scoped></style>
