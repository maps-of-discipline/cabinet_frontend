import type { Key } from '@models/Key'
import type { ITopic } from './ITopic'
import type { IStudyGroup } from './IStudyGroup'

export interface IFetchLessons {
	discipline_table_id: Key
	title: string
	topics: ITopic[]
	groups: IStudyGroup[]
	places: any[]
	control_types: any[]
}
