<template>
	<div class="DisciplineSelect">
		<!-- <DisciplineSelectActivator @open="openPopup" :label="lessonsStore.title" /> -->
		<DisciplineSelectActivator @open="test" :label="lessonsStore.title" />
		<DisciplineSelectActivator @open="openPopup" label="123" />

		<DisciplineSelectDialog />
	</div>
</template>

<script setup>
import { useDisciplineStore } from '@/stores/discipline'
import { useLessonsStore } from '@/stores/lessons'

import DisciplineSelectDialog from '@components/layouts/DisciplineSelect/DisciplineSelectDialog.vue'
import DisciplineSelectActivator from '@components/layouts/DisciplineSelect/DisciplineSelectActivator.vue'

const disciplineStore = useDisciplineStore()
const lessonsStore = useLessonsStore()

const openPopup = () => disciplineStore.setDirectionDialogModel(true)

const test = () =>
	disciplineStore.setIsOpenDisciplineColumn(
		!disciplineStore.isOpenDisciplineColumn
	)
</script>

<style lang="scss"></style>
