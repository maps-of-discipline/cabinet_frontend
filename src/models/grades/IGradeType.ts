import type { Key } from '@models/Key'

export interface IGradeType {
	archived: boolean
	binary: boolean
	discipline_table_id: Key
	id: Key
	max_grade: number
	min_grade: number
	name: string
	type: string
	weight_grade: number
}
