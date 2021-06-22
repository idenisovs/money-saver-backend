import { IntervalRecord, ScheduleItemRecord, SpendingRecord } from '../../../shared';

const moment = require('moment');

const dateFormat = 'YYYY-MM-DD';

export default function calculateSchedule(interval: IntervalRecord, spendings: SpendingRecord[] ): ScheduleItemRecord[] {
    const startingDay = moment(interval.start).subtract(1, 'days');
    const endingDay = moment(interval.end);
    const daysCount = endingDay.diff(startingDay, 'days', false);
    const dailySum = interval.sum / daysCount;
    let expectedResidual = interval.sum;
    let realResidual = interval.sum;

    const schedule: ScheduleItemRecord[] = [];

    for (let day = 0; day <= daysCount; day++) {
        const inc = day > 0 ? 1 : 0;

        const date = startingDay.add(inc, 'day').format(dateFormat);

        const sum = expectedResidual;

        expectedResidual -= dailySum;

        const spent = takeDailySpendings(date, spendings);

        realResidual -= spent;

        const residual = realResidual;

        const balance = residual - sum;

        const dailyBalance = dailySum - spent;

        schedule.push({
            date, sum, balance, dailyBalance, residual, spent, prediction: residual
        });
    }

    schedule.shift();

    return schedule;
}

function takeDailySpendings(date: string, spendings: SpendingRecord[]) {
    for (let i = 0; i < spendings.length; i++) {
        if (spendings[i].date === date) {
            return spendings[i].sum;
        }
    }

    return 0.0;
}