import type { Key } from '@models/Key'

export interface ILesson {
	id: Key
	id_rpd: Key
	id_type_control: Key | null
	chapter: Key
	task_link: string
	topic: string
	semester: number
}
