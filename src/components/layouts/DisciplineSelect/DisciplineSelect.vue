<template>
	<div class="DisciplineSelect">
		<div class="DisciplineSelect__activators">
			<DisciplineSelectActivator
				@open="openDisciplineColumn"
				:label="disciplineStore.selectedDiscipline?.name"
				:color="disciplineStore.selectedDiscipline?.color"
			/>

			<!-- 			<Button
				v-if="userStore.isTeacher"
				class="DisciplineSelectActivator DisciplineSelectActivator--dev"
				icon="mdi mdi-alert"
				v-tooltip.bottom="{
					value:
						'Выбор дисциплины. Интерфейс для разработки и выбора любого направления и дисциплины',
					showDelay: 500,
				}"
				@click="openPopup"
			/> -->
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { useDisciplineStore } from '@/stores/discipline'
import { useUser } from '@/stores/user'

import DisciplineSelectActivator from '@components/layouts/DisciplineSelect/DisciplineSelectActivator.vue'

const disciplineStore = useDisciplineStore()
const userStore = useUser()

const openPopup = () => disciplineStore.setDirectionDialogModel(true)

const openDisciplineColumn = () =>
	disciplineStore.setIsOpenDisciplineColumn(
		!disciplineStore.isOpenDisciplineColumn
	)
</script>

<style lang="scss">
.DisciplineSelect {
	&__activators {
		display: flex;
		gap: 12px;
	}
}
</style>
