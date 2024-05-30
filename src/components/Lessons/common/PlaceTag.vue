<template>
	<div
		class="PlaceTag"
		:class="{ isEmpty, isEditMode: editMode, isLink: selectedPlaceIsOnline }"
	>
		<Button
			class="PlaceTag__activator"
			:label="_label"
			:style="{ backgroundColor }"
			@click="togglePanel"
		/>

		<OverlayPanel ref="opRef" @hide="onHidePanel">
			<div class="PlaceTag__panel">
				<div class="PlaceTag__input-block">
					<label for="placeTypeModel"> Место: </label>

					<Dropdown
						v-model="placeTypeModel"
						:options="placeOptions"
						optionLabel="name"
						inputId="placeTypeModel"
						:highlightOnSelect="false"
						placeholder="Укажите место"
						class="PlaceTag__select-place-dropdown"
					>
						<template #value="{ value }">
							<span>
								{{ value?.prefix }}
							</span>
						</template>
					</Dropdown>
				</div>

				<div class="PlaceTag__input-block">
					<label for="placeLabel">
						{{ selectedPlaceIsOnline ? 'Ссылка' : 'Аудитория' }}:
					</label>

					<InputText
						class="PlaceTag__input"
						inputId="placeLabel"
						:useGrouping="false"
						:placeholder="
							selectedPlaceIsOnline ? 'Введите ссылку' : 'Введите аудиторию'
						"
						v-model="placeModel"
					/>
				</div>
			</div>
		</OverlayPanel>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import colorById from '@services/helpers/colorById'

const emit = defineEmits(['input'])

const props = defineProps({
	places: {
		type: Array,
		default: () => [],
	},

	placeId: {
		type: [String, Number],
		default: null,
	},

	placeNote: {
		type: String,
		default: null,
	},

	editMode: {
		type: Boolean,
		default: false,
	},
})

/* other */
const _label = computed(() => {
	if (selectedPlace.value) {
		if (selectedPlace.value.is_online) {
			return selectedPlace.value?.name
		} else {
			return selectedPlace.value.prefix + props.placeNote
		}
	} else {
		return 'Место'
	}
})
const isEmpty = computed(() => !props.placeId)

const backgroundColor = computed(() => {
	return selectedPlace.value?.color || '#363636'
})

/* inputs */
const placeTypeModel = ref(null)
const placeModel = ref('')

const placeOptions = computed(() => {
	return props.places.map(place => ({ ...place, color: colorById[place.id] }))
})

const selectedPlaceIsOnline = computed(() => placeTypeModel.value?.is_online)

const selectedPlace = computed(() =>
	placeOptions.value.find(p => p.id === props.placeId)
)

/* panel */
const opRef = ref()
const togglePanel = event => {
	if (props.editMode) opRef.value?.toggle(event)
	else if (selectedPlaceIsOnline.value) window.open(props.placeNote, '_blank')
}

const onHidePanel = () => {
	emit('input', {
		placeId: placeTypeModel.value.id,
		placeNote: placeModel.value,
	})
}

watch(
	() => props.placeId,
	placeId => {
		placeTypeModel.value = placeOptions.value.find(p => p.id === placeId)
	},
	{ immediate: true }
)

watch(
	() => props.placeNote,
	placeNote => {
		console.log(1)
		placeModel.value = placeNote
	},
	{ immediate: true }
)
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.PlaceTag {
	&__activator {
		height: 35px;
		border: none;
		outline: none;
		cursor: default;

		.p-ink {
			display: none;
		}

		&.p-disabled {
			opacity: 1;
		}
	}

	&.isEmpty {
		.PlaceTag {
			&__activator {
				color: $shade400;
			}
		}
	}

	&.isLink {
		.PlaceTag {
			&__activator {
				cursor: pointer;

				.p-ink {
					display: inline-block;
				}
			}
		}
	}

	&.isEditMode {
		.PlaceTag {
			&__activator {
				cursor: pointer;
			}
		}
	}

	&__panel {
		padding-top: 18px;
		display: grid;
		grid-template-columns: 70px 1fr;
		gap: 12px;
		max-width: 280px;
	}

	&__input {
		width: 100%;
	}

	&__input-block {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
	}

	&__select-place-dropdown {
		height: 35px;
		width: 100%;
	}

	&__place-link-input {
		width: 100%;
	}
}
</style>
