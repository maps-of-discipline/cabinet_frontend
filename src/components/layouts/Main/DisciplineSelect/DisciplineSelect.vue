<template>
	<div class="DisciplineSelect">
		<DisciplineSelectActivator @open="openPopup" :label="lessonsStore.title" />

		<DisciplineSelectDialog />
	</div>
</template>

<script setup>
import { useDisciplineStore } from '@/stores/discipline'
import { useLessonsStore } from '@/stores/lessons'

import DisciplineSelectDialog from '@components/layouts/Main/DisciplineSelect/DisciplineSelectDialog.vue'
import DisciplineSelectActivator from '@components/layouts/Main/DisciplineSelect/DisciplineSelectActivator.vue'

const disciplineStore = useDisciplineStore()
const lessonsStore = useLessonsStore()

const openPopup = () => disciplineStore.setDirectionDialogModel(true)
</script>

<style lang="scss"></style>
