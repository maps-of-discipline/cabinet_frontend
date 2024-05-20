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

								<Button
									v-if="localGradeType.type === 'custom'"
									class="GradeTypeTab__delete-grade-type"
									icon="mdi mdi-delete"
									v-tooltip.left="{
										value: 'Удалить вид оценивания',
										showDelay: 500,
									}"
									@click.stop="onClickDelete(localGradeType)"
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
import { ref, computed, watch } from 'vue'
import { useGradesStore } from '@/stores/grades'

import GradeSettingsAddType from '@components/Grades/GradeSettingsAddType.vue'
import ApHint from '@components/ui/ApHint.vue'

const gradesStore = useGradesStore()

const localGradeTypes = ref([])
const isLoadingSave = ref(false)

const setLocalGradeTypes = () => {
	localGradeTypes.value = gradesStore.typesGrade.sort((a, b) =>
		a.name.localeCompare(b.name)
	)
}

watch(
	() => gradesStore.typesGrade,
	() => {
		setLocalGradeTypes(gradesStore.typesGrade)
	}
)

const onClickShowSwitch = gradeType => {
	const newGradeType = { ...gradeType, archived: !gradeType.archived }
	gradesStore.updateGradeType(newGradeType)
}

const onClickSubmit = async gradeType => {
	isLoadingSave.value = true
	await gradesStore.updateGradeType(gradeType)
	isLoadingSave.value = false
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.GradeSettings {
	background-color: $view-bg;
	border-radius: 8px;
	padding: 16px;
	margin-left: 12px;
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
