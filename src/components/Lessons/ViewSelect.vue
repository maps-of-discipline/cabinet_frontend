<template>
	<SelectButton
		v-model="value"
		:options="options"
		optionLabel="value"
		dataKey="value"
		aria-labelledby="custom"
	>
		<template #option="slotProps">
			<i :class="slotProps.option.icon"></i>
		</template>
	</SelectButton>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, computed } from 'vue'

import ViewModesEnum from '@models/lessons/ViewModesEnum'
import { useLessonsStore } from '@/stores/lessons'

const lessonsStore = useLessonsStore()

interface IOption {
	icon: string
	value: ViewModesEnum
}

const options: Ref<IOption[]> = ref([
	{ icon: 'mdi mdi-menu', value: ViewModesEnum.Simple },
	{ icon: 'mdi mdi-file-tree', value: ViewModesEnum.Nested },
])

const value = computed({
	get() {
		return options.value.find(
			option => option.value === lessonsStore.viewMode
		) as IOption
	},

	set(option: IOption) {
		lessonsStore.setViewMode(option.value)
	},
})
</script>

<style lang="scss" scoped></style>
