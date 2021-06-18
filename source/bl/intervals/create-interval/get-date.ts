import moment from 'moment';

export default function getDate(timestamp: number) {
	return moment(timestamp).format('YYYY-MM-DD');
}