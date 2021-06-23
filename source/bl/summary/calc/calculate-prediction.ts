import moment from 'moment';
import { Interval, ScheduleItemRecord } from '../../../shared';

export default function calculatePrediction(interval: Interval, schedule: ScheduleItemRecord[]) {
    const today = moment();

    let days = today.diff(interval.start, 'days', true);

    days = Math.ceil(days);

    const spendAvg = calculateAverageSpending(schedule, days);


    for (let d = 0; d < schedule.length; d++) {
        let currentDay = schedule[d];
        let prevDaysSum = (d > 0) ? schedule[d - 1].prediction : currentDay.sum;

        currentDay.prediction = prevDaysSum - spendAvg;
    }
}

function calculateAverageSpending(schedule: ScheduleItemRecord[], days: number) {
    const finalDay = Math.min(schedule.length, days);
    let totalSpent = 0;

    for (let d = 0; d < finalDay; d++) {
        totalSpent += schedule[d].spent;
    }

    return totalSpent / finalDay;
}