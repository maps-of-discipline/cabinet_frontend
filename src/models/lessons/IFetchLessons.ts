import type { Key } from '@models/Key'
import type { ILesson } from './ILesson'
import type { IStudyGroup } from './IStudyGroup'

export interface IFetchLessons {
	rpd_id: Key
	title: string
	topics: ILesson[]
	groups: IStudyGroup[]
	places: IStudyGroup[]
}
