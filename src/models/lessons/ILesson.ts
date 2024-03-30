import type { Key } from '@models/Key'

export interface ILesson {
	id: Key
	id_rpd: Key
	id_type_control: Key | null
	chapter: Key
	task_link: string
	task_link_name: string
	completed_task_link: string
	completed_task_link_name: string
	topic: string
	semester: number
}
