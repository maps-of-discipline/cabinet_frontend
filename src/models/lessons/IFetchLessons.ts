import type { Key } from '@models/Key'
import type { ILesson } from './ILesson'

export interface IFetchLessons {
	rpd_id: Key
	title: string
	topics: ILesson[]
}
