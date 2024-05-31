import type { Key } from '@models/Key'
import type { ILesson } from './ILesson'
import type { IStudyGroup } from './IStudyGroup'

export interface IFetchLessons {
	discipline_table_id: Key
	title: string
	topics: ILesson[]
	groups: IStudyGroup[]
	places: any[]
	control_types: any[]
}
