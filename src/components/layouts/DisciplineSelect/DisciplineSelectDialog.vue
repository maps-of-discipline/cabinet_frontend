<template>
	<Dialog
		v-model:visible="directionDialogModel"
		contentClass="DisciplineSelectDialog"
		:draggable="false"
		modal
		header="Поиск учебного плана"
		:style="{ width: '35rem' }"
	>
		<InputText
			class="DisciplineSelectDialog__input"
			type="text"
			v-model="searchModel"
			placeholder="Введите сюда"
		/>

		<div
			v-if="disciplineStore.isLoadingAups"
			class="DisciplineSelectDialog__list"
			style="overflow: hidden"
		>
			<Skeleton width="100%" height="50px" v-for="i in 10"></Skeleton>
		</div>

		<DisciplineSelectStub
			v-else-if="searchModel.length < 3"
			message='Введите что-нибудь. Например, "Веб-технологии"'
		/>

		<DisciplineSelectStub
			v-else-if="disciplineStore.aups.length === 0"
			message="Ничего не было найдено"
		/>

		<div v-else class="DisciplineSelectDialog__list">
			<DisciplineSelectListItem
				v-for="aup in disciplineStore.aups"
				:id="aup.id_aup"
				:label="aup.name_op.name_spec"
				:tag="aup.year_beg"
				@open="openDisciplineDialog(aup.num_aup)"
			/>
		</div>
	</Dialog>

	<Dialog
		v-model:visible="disciplineDialogModel"
		contentClass="DisciplineSelectDialog"
		header="Поиск дисциплины"
		:draggable="false"
		modal
		:style="{ width: '35rem' }"
	>
		<div
			v-if="isLoadingDisciplines"
			class="DisciplineSelectDialog__list"
			style="overflow: hidden"
		>
			<Skeleton width="100%" height="50px" v-for="i in 10"></Skeleton>
		</div>

		<DisciplineSelectStub
			v-else-if="disciplineStore.disciplinesDialogItems.length === 0"
			message="Ничего не было найдено"
		/>

		<div v-else class="DisciplineSelectDialog__list">
			<DisciplineSelectListItem
				v-for="discipline in disciplineStore.disciplinesDialogItems"
				:id="discipline.id"
				:label="discipline.title"
				@open="onSelectDiscipline(discipline.id)"
			/>
		</div>
	</Dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useDisciplineStore } from '@/stores/discipline'
import { useLessonsStore } from '@/stores/lessons'

import DisciplineSelectListItem from '@components/layouts/DisciplineSelect/DisciplineSelectListItem.vue'
import DisciplineSelectStub from '@components/layouts/DisciplineSelect/DisciplineSelectStub.vue'

const disciplineStore = useDisciplineStore()
const lessonsStore = useLessonsStore()
const router = useRouter()

const directionDialogModel = computed({
	get() {
		return disciplineStore.directionDialogModel
	},

	set(val) {
		disciplineStore.setDirectionDialogModel(val)
	},
})

const disciplineDialogModel = computed({
	get() {
		return disciplineStore.disciplineDialogModel
	},

	set(val) {
		disciplineStore.setDisciplineDialogModel(val)
	},
})

const searchModel = computed({
	get() {
		return disciplineStore.search
	},

	set(val) {
		disciplineStore.setSearch(val)
	},
})

const isLoadingDisciplines = ref(false)

const openDisciplineDialog = async aup => {
	isLoadingDisciplines.value = true
	disciplineDialogModel.value = true
	disciplineStore.setSelectedAup(aup)
	await disciplineStore.fetchDisciplinesDialogItems(aup)
	isLoadingDisciplines.value = false
}

const onSelectDiscipline = idDiscipline => {
	disciplineDialogModel.value = false
	directionDialogModel.value = false

	disciplineStore.setSelectedDisciplineId(idDiscipline)

	lessonsStore.fetchLessons(
		disciplineStore.selectedAup,
		disciplineStore.selectedDisciplineId
	)
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.DisciplineSelectDialog {
	display: grid;
	grid-template-rows: auto 1fr;
	height: 60vh;
	padding-top: 4px;

	&__input {
		width: 100%;
	}

	&__list {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 12px 0;
	}
}
</style>
