<template>
	<div class="DisciplineSelect">
		<DisciplineSelectActivator @open="openPopup" />

		<DisciplineSelectDialog />
	</div>
</template>

<script setup>
import { useDisciplineStore } from '@/stores/discipline'

import DisciplineSelectDialog from '@components/layouts/Main/DisciplineSelect/DisciplineSelectDialog.vue'
import DisciplineSelectActivator from '@components/layouts/Main/DisciplineSelect/DisciplineSelectActivator.vue'

const disciplineStore = useDisciplineStore()

const openPopup = () => disciplineStore.setDialogModel(true)
</script>

<style lang="scss"></style>
