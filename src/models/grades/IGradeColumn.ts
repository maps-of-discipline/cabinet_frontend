import type { Key } from '@models/Key'
import type { ITopic } from '@models/lessons/ITopic'

export interface IGradeColumn {
	id: Key
	discipline_table_id: Key
	grade_type_id: Key
	topic_id: Key
	hidden: boolean
	grade_type: string
	topic: ITopic
}
