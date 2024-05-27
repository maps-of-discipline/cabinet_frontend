<template>
	<div class="DisciplineSelect">
		<div class="DisciplineSelect__activators">
			<DisciplineSelectActivator
				@open="openDisciplineColumn"
				:label="lessonsStore.title"
			/>

			<!-- v-if="userStore.isAdmin" -->
			<Button
				class="DisciplineSelectActivator DisciplineSelectActivator--dev"
				icon="mdi mdi-alert"
				v-tooltip.bottom="{
					value:
						'Выбор дисциплины. Интерфейс для разработки и выбора любого направления и дисциплины',
					showDelay: 500,
				}"
				@click="openPopup"
			/>
		</div>

		<DisciplineSelectDialog />
	</div>
</template>

<script setup>
import { RolesEnum } from '@models/auth/RolesEnum'

import { useDisciplineStore } from '@/stores/discipline'
import { useLessonsStore } from '@/stores/lessons'
import { useUser } from '@/stores/user'

import DisciplineSelectDialog from '@components/layouts/DisciplineSelect/DisciplineSelectDialog.vue'
import DisciplineSelectActivator from '@components/layouts/DisciplineSelect/DisciplineSelectActivator.vue'

const disciplineStore = useDisciplineStore()
const lessonsStore = useLessonsStore()
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
