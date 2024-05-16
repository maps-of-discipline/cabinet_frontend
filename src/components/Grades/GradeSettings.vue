<template>
	<Transition name="fade">
		<div class="GradeSettings" v-if="gradesStore.isShowSettings">
			<div class="GradeSettings__title">Настройки оценивания</div>

			<Accordion class="GradeTypeAccordion" multiple>
				<AccordionTab v-for="gradeType in gradeTypes" :key="gradeType.id">
					<template #headericon="{ index, active }">
						<i
							class="mdi mdi-chevron-down"
							style="font-size: 1.5rem; margin-right: 12px"
						></i>
					</template>

					<template #header>
						<div class="GradeTypeTab__header">
							<span>{{ gradeType.name }}</span>

							<div class="GradeTypeTab__header-controls">
								<Button
									class="GradeTypeTab__show-switcher"
									:class="{ isActive: !gradeType.archived }"
									:icon="
										gradeType.archived ? 'mdi mdi-eye-closed' : 'mdi mdi-eye'
									"
									aria-label="Скрыть данный вид оценивания"
									v-tooltip.left="{
										value: 'Скрыть данный вид оценивания',
										showDelay: 500,
									}"
									@click.stop="onClickShowSwitch(gradeType)"
								/>

								<Button
									v-if="gradeType.type === 'custom'"
									class="GradeTypeTab__delete-grade-type"
									icon="mdi mdi-delete"
									v-tooltip.left="{
										value: 'Удалить вид оценивания',
										showDelay: 500,
									}"
									@click.stop="onClickDelete(gradeType)"
								/>
							</div>
						</div>
					</template>

					<div class="GradeTypeTab">
						<div>
							<label class="GradeTypeTab__label" for="integeronly">
								Вес оценки
							</label>

							<InputNumber inputId="integeronly" />
						</div>

						<div class="GradeTypeTab__range-wrapper">
							<div>
								<label class="GradeTypeTab__label" for="integeronly">
									Минимум
								</label>

								<InputNumber
									:modelValue="gradeType.min_grade"
									inputId="integeronly"
								/>
							</div>

							<div>
								<label class="GradeTypeTab__label" for="integeronly">
									Максимум
								</label>

								<InputNumber
									:modelValue="gradeType.max_grade"
									inputId="integeronly"
								/>
							</div>
						</div>
					</div>
				</AccordionTab>
			</Accordion>

			<GradeSettingsAddType />
		</div>
	</Transition>
</template>

<script setup>
import { computed } from 'vue'
import { useGradesStore } from '@/stores/grades'

import GradeSettingsAddType from '@components/Grades/GradeSettingsAddType.vue'

const gradesStore = useGradesStore()

const gradeTypes = computed(() => gradesStore.typesGrade)

const onClickShowSwitch = gradeType => {
	const newGradeType = { ...gradeType, archived: !gradeType.archived }
	gradesStore.updateGradeType(newGradeType)
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
		background-color: $shade1000;
		padding: 16px;
		margin-bottom: 12px;
		border-radius: $borderRadius;
	}
}

.GradeTypeTab {
	display: grid;
	gap: 12px;

	&__label {
		display: inline-block;
		margin-bottom: 6px;
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

	.p-accordion-content {
		background-color: $shade1000;
	}
}
</style>
