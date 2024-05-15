<template>
	<Transition name="fade">
		<div class="GradeSettings" v-if="gradesStore.isShowSettings">
			<div>Виды оценивания</div>

			<Accordion multiple>
				<AccordionTab
					v-for="typeGrade in typesGrade"
					:key="typeGrade.id"
					:header="typeGrade.name"
				>
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
									:modelValue="typeGrade.min_grade"
									inputId="integeronly"
								/>
							</div>

							<div>
								<label class="GradeTypeTab__label" for="integeronly">
									Максимум
								</label>

								<InputNumber
									:modelValue="typeGrade.max_grade"
									inputId="integeronly"
								/>
							</div>
						</div>

						<div>
							<label class="GradeTypeTab__label" for="integeronly">
								Кратность оценки (опционально)
							</label>

							<InputNumber inputId="integeronly" />
						</div>
					</div>
				</AccordionTab>
			</Accordion>

			<div>
				<label class="GradeTypeTab__label" for="integeronly"> Автомат </label>

				<InputNumber inputId="integeronly" />
			</div>
		</div>
	</Transition>
</template>

<script setup>
import { computed } from 'vue'
import { useGradesStore } from '@/stores/grades'

const gradesStore = useGradesStore()

const typesGrade = computed(() => gradesStore.typesGrade)
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.GradeSettings {
	background-color: $view-bg;
	border-radius: 8px;
	padding: 16px;
	margin-left: 12px;
	overflow: auto;
}

.GradeTypeTab {
	display: grid;
	gap: 12px;

	&__label {
		display: inline-block;
		margin-bottom: 6px;
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
</style>
