<template>
	<div class="TableSelect">
		<Button
			class="TableSelect__activator"
			label="История"
			@click="aupsDialogModel = true"
		/>

		<Dialog
			v-model:visible="aupsDialogModel"
			class="TableSelect__popup"
			:draggable="false"
			modal
			header="Поиск учебного плана"
			:style="{ width: '35rem' }"
		>
			<div class="TableSelect__content">
				<InputText
					class="TableSelect__input"
					type="text"
					v-model="search"
					placeholder="Введите сюда"
				/>

				<div class="TableSelect__result">
					<div v-if="search.length === 0" class="TableSelect__empty-search">
						Введите что-нибудь. Например, "Веб-технологии"
					</div>

					<div
						v-else-if="disciplineStore.aups.length === 0"
						class="TableSelect__not-found"
					>
						Ничего не было найдено
					</div>

					<div v-else class="TableSelect__body">
						<div class="AupsList">
							<div class="AupsList__list">
								<Button
									v-for="aup in disciplineStore.aups"
									class="AupsList__button"
									:key="aup.id_aup"
									:label="aup.name_op.name_spec"
									@click="openDisciplineDialog(aup.num_aup)"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Dialog>

		<Dialog
			v-model:visible="disciplineDialogModel"
			class="TableSelect__popup"
			header="Поиск дисциплины"
			:draggable="false"
			modal
			:style="{ width: '35rem' }"
		>
			<div class="TableSelect__content">
				<div class="AupsList">
					<div class="AupsList__list">
						<Button
							v-for="discipline in disciplineStore.disciplinesDialogItems"
							class="AupsList__button"
							:key="discipline.id"
							:label="discipline.title"
							@click="onSelectDiscipline(discipline.id)"
						/>
					</div>
				</div>
			</div>
		</Dialog>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisciplineStore } from '@/stores/discipline'
import { useRouter } from 'vue-router'
import { useLessonsStore } from '@stores/lessons'

const router = useRouter()
const lessonsStore = useLessonsStore()

const disciplineStore = useDisciplineStore()

const aupsDialogModel = computed({
	get() {
		return disciplineStore.aupsDialogModel
	},

	set(val) {
		disciplineStore.setAupsDialogModel(val)
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

const openDisciplineDialog = async aup => {
	disciplineDialogModel.value = true
	disciplineStore.setSelectedAup(aup)
	await disciplineStore.fetchDisciplinesDialogItems(aup)
}

const search = computed({
	get() {
		return disciplineStore.search
	},

	set(val) {
		disciplineStore.setSearch(val)
	},
})

const onSelectDiscipline = idDiscipline => {
	disciplineDialogModel.value = false
	aupsDialogModel.value = false

	router.push({
		path: '/lessons/',
		query: { aup: disciplineStore.selectedAup, id: idDiscipline },
	})

	lessonsStore.fetchLessons(disciplineStore.selectedAup, idDiscipline)
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.TableSelect {
	&__input {
		width: 100%;
	}

	&__body {
		padding: 8px 0;
	}

	&__empty-search,
	&__not-found {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	&__aup-button {
		width: 100%;
	}

	&__content {
		height: 60vh;
		display: grid;
		grid-template-rows: auto 1fr;
	}
}

.AupsList {
	&__title {
		margin: 8px 0;
		font-weight: 600;
		line-height: 130%;
	}

	&__list {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	&__button {
		text-align: left;
		background-color: #0000001f;
		height: 50px;
	}
}
</style>
