import moment from 'moment'
import 'moment/dist/locale/ru'

export default (date, isLabel) => {
	date = new Date(date)

	const localeMoment = moment(date).locale('ru')

	if (isLabel) return localeMoment.format('D MMMM, dddd')

	return localeMoment.format('DD.MM')
}
