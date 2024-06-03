<template>
	<Transition name="fade">
		<div class="GradeSettings" v-if="gradesStore.isShowSettings">
			<div class="GradeSettings__title">Настройки</div>

			<Accordion class="GradeTypeAccordion" multiple>
				<AccordionTab
					v-for="(localGradeType, i) in localGradeTypes"
					:key="localGradeType.id"
				>
					<template #headericon="{ index, active }">
						<i
							class="mdi mdi-chevron-down"
							style="font-size: 1.5rem; margin-right: 12px"
						></i>
					</template>

					<template #header>
						<div class="GradeTypeTab__header">
							<span>{{ localGradeType.name }}</span>

							<div class="GradeTypeTab__header-controls">
								<Button
									class="GradeTypeTab__show-switcher"
									:class="{ isActive: !localGradeType.archived }"
									:icon="
										localGradeType.archived
											? 'mdi mdi-eye-closed'
											: 'mdi mdi-eye'
									"
									aria-label="Скрыть данный вид оценивания"
									v-tooltip.left="{
										value: 'Скрыть данный вид оценивания',
										showDelay: 500,
									}"
									@click.stop="onClickShowSwitch(localGradeType)"
								/>
							</div>
						</div>
					</template>

					<div class="GradeTypeTab">
						<div>
							<label class="GradeTypeTab__label" :for="'weight' + i">
								<span>Наименование</span>
							</label>

							<InputText
								class="GradeTypeTab__input"
								v-model="localGradeType.name"
							/>
						</div>

						<div class="GradeTypeTab__inputs">
							<div>
								<label class="GradeTypeTab__label" :for="'weight' + i">
									<span>Вес</span>

									<ApHint
										hint="Вес оценки. Рекомендуется выставлять значение от 0 до 2."
									/>
								</label>

								<InputNumber
									v-model="localGradeType.weight_grade"
									:inputId="'weight' + i"
								/>
							</div>

							<div>
								<label class="GradeTypeTab__label" :for="'min' + i">
									<span>Мин</span>

									<ApHint hint="Минимальное значение оценки" />
								</label>

								<InputNumber
									v-model="localGradeType.min_grade"
									:disabled="localGradeType.binary"
									:inputId="'min' + i"
								/>
							</div>

							<div>
								<label class="GradeTypeTab__label" :for="'max' + i">
									<span>Макc</span>

									<ApHint hint="Максимальное значение оценки" />
								</label>

								<InputNumber
									v-model="localGradeType.max_grade"
									:disabled="localGradeType.binary"
									:inputId="'max' + i"
								/>
							</div>
						</div>

						<div>
							<Checkbox
								disabled
								v-model="localGradeType.binary"
								binary
								:inputId="'binary' + i"
							/>

							<label :for="'binary' + i" class="ml-2"> Бинарная шкала </label>
						</div>

						<div>
							<label class="GradeTypeTab__label" :for="'max' + i">
								<span>Отображаемые столбцы</span>

								<ApHint
									hint="Скрытые столбцы не учитываются при подсчете итогового балла"
								/>
							</label>

							<MultiSelect
								class="GradeTypeTab__select-cols"
								panelClass="GradeTypeTab__select-cols-panel"
								:modelValue="localGradeType.columns"
								dataKey="id"
								:options="
									gradesStore.columnsByGradeTypeId?.[localGradeType.id] || []
								"
								placeholder="Выберите столбцы"
								@change="onChangeVisibleCol($event, +localGradeType.id)"
							>
								<template #option="{ option, index }">
									<!-- <div class="GradeTypeTab__order-col">
										{{ index + 1 }}
									</div> -->

									<span>
										{{
											option.grade_type.type === 'tasks'
												? option.topic.task_link_name
												: formatDateSimple(option.topic.date)
										}}
									</span>
								</template>

								<template #value="{ value }">
									{{ localGradeType.columns.length }}
									столбцов
								</template>
							</MultiSelect>
						</div>

						<Button
							class="GradeTypeTab__submit"
							label="Применить"
							:loading="isLoadingSave"
							@click="onClickSubmit(localGradeType)"
						/>
					</div>
				</AccordionTab>
			</Accordion>

			<GradeSettingsAddType />
		</div>
	</Transition>
</template>

<script setup>
import _ from 'lodash'
import { ref, computed, watch } from 'vue'
import { useGradesStore } from '@/stores/grades'

import GradeSettingsAddType from '@components/Grades/GradeSettingsAddType.vue'
import ApHint from '@components/ui/ApHint.vue'

import formatDateSimple from '@services/helpers/formatDateSimple'

const gradesStore = useGradesStore()

const localGradeTypes = ref([])
const isLoadingSave = ref(false)

const setLocalGradeTypes = () => {
	localGradeTypes.value = gradesStore.gradeTypes
		.sort((a, b) => a.name.localeCompare(b.name))
		.map(gradeType => ({
			...gradeType,
			columns:
				gradesStore.columnsByGradeTypeId[gradeType.id]?.filter(
					col => !col.hidden
				) || [],
		}))
}

watch(
	() => [gradesStore.gradeTypes, gradesStore.columns],
	() => {
		setLocalGradeTypes()
	},
	{ deep: true }
)

const onClickShowSwitch = gradeType => {
	const newGradeType = { ...gradeType, archived: !gradeType.archived }
	gradesStore.updateGradeType(newGradeType)
}

const onClickDelete = gradeType => {
	console.log(gradeType)
	// gradesStore.deleteGradeType(gradeType)
}

const onChangeVisibleCol = (e, id) => {
	const indexToUpdate = localGradeTypes.value.findIndex(item => item.id === id)
	localGradeTypes.value[indexToUpdate].columns = e.value
}

const onClickSubmit = async gradeType => {
	try {
		isLoadingSave.value = true

		const visibleColsIds = gradeType.columns.map(col => col.id)
		const hiddenColsIds = gradesStore.columnsByGradeTypeId[gradeType.id]
			?.filter(col => !visibleColsIds.includes(col.id))
			.map(col => col.id)

		if (visibleColsIds.length && hiddenColsIds.length) {
			await gradesStore.updateVisibleColumns(
				gradeType.id,
				visibleColsIds,
				hiddenColsIds
			)
		}
	} catch (e) {
		console.log(e)
	} finally {
		isLoadingSave.value = false
	}
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.GradeSettings {
	background-color: $view-bg;
	border-radius: 8px;
	padding: 16px;
	overflow: auto;
	min-width: 300px;

	&__title {
		font-size: 1.1rem;
		margin-bottom: 12px;
		border-radius: $borderRadius;
	}
}

.GradeTypeTab {
	display: grid;
	gap: 12px;

	&__label {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 6px;
		font-size: 0.9rem;
	}

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		font-weight: 400;
		gap: 6px;
	}

	&__header-controls {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	&__input {
		width: 100%;
	}

	&__inputs {
		display: flex;
		gap: 8px;

		.p-inputtext {
			width: 100%;
		}
	}

	&__show-switcher {
		background-color: $shade1000;
		width: 2rem;
		height: 2rem;
		border: none !important;
		outline: $focusOutlineTransparent;

		&.isActive {
			outline: $focusOutline;
		}

		.p-button-icon {
			transition: all 0.35s ease;
		}
	}

	&__delete-grade-type {
		background-color: #ff3d32;
		width: 2rem;
		height: 2rem;
		border: none !important;
		outline: $focusOutlineTransparent;

		.p-button-icon {
			transition: all 0.35s ease;
		}
	}

	&__range-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
		justify-content: space-between;

		.p-inputtext {
			width: 100%;
		}
	}

	&__select-cols {
		width: 100%;
	}

	&__order-col {
		min-width: 25px;
		text-align: center;
		background-color: $shade950;
		border-radius: $borderRadius;
		padding: 2px 2px;
		transition: outline 0.2s;
		outline: $focusOutlineTransparent;
		margin-right: 6px;
	}

	&__select-cols-panel {
		max-width: 400px;

		.p-multiselect-header {
			display: none;
		}
	}
}

.GradeTypeAccordion {
	.p-accordion-header-link {
		background-color: $shade1000;

		border-top: 2px solid $shade700;
	}

	.p-accordion-tab[data-pc-index='0'] {
		.p-accordion-header-link {
			border-top: 2px solid transparent;
		}
	}

	.p-accordion-content {
		background-color: $shade1000;
	}
}
</style>
