import type { Key } from '@models/Key'

export interface IGradeTableRow {
	id: Key
	name: string
	values: {
		[key: string]: number
	}
}
