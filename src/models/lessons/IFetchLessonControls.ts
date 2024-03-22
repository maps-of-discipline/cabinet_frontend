/* Нагрузка дисциплины */
export interface ITypeControl {
	id_type_control: number
	amount: number
}

export interface IFetchLessonControls {
	/* Доступные нагрузки дисциплины за определенный семестр */
	[id_period: number]: ITypeControl[]
}
