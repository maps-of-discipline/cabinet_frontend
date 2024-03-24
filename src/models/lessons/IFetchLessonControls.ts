/* Нагрузка дисциплины */

import type { Key } from 'readline'

export interface IControlType {
	id_period: Key
	id_type_control: Key
	id_edizm: Key
	name: string
	amount: number
}

export interface ILessonControls {
	[id_period: number]: IControlType[]
}

export interface IFetchLessonControls {
	/* Доступные нагрузки дисциплины за определенный семестр */
	control_types: ILessonControls
}
