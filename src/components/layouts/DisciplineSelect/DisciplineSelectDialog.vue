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
				:id="aup.id"
				:label="aup.title"
				:tag="aup.year_beg"
				@open="onSelectDirection(aup.num_aup)"
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

const directionDialogModel = computed({
	get() {
		return disciplineStore.directionDialogModel
	},

	set(val) {
		disciplineStore.setDirectionDialogModel(val)
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

const onSelectDirection = aup => {
	disciplineStore.setSelectedAup(aup)
	directionDialogModel.value = false
	searchModel.value = ''
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
