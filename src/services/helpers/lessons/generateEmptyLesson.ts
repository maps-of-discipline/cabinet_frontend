import type { Key } from '@models/Key'

const generateEmptyLesson = (
	prefixLocalId: string,
	semester: number,
	study_group_id: Key,
	rpdId: Key
) => {
	const lesson = {
		id: prefixLocalId + Date.now(),
		id_rpd: rpdId,
		id_type_control: null,
		chapter: '',
		task_link: '',
		task_link_name: '',
		completed_task_link: '',
		completed_task_link_name: '',
		topic: '',
		semester,
		study_group_id,
	}

	return lesson
}

export default generateEmptyLesson
