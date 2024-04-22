<template>
	<Button
		class="AddTask"
		v-if="disciplineStore.editMode"
		style="height: 34px"
		icon="mdi mdi-plus"
		severity="success"
		label="Добавить задание"
		@click="onAddButton"
	/>
</template>

<script setup>
import { useDisciplineStore } from '@stores/discipline'

const emit = defineEmits(['add'])

const disciplineStore = useDisciplineStore()

const onAddButton = () => {
	emit('add')
}
</script>

<style lang="scss" scoped></style>
