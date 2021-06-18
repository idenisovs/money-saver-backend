import moment from 'moment';
import dal from '../../dal';
import { Interval, User } from '../../shared';

type SuccessCallback = (years: number[]) => void;
type ErrorCallback = (error: Error) => void;

export default function getYears(user: User, success: SuccessCallback, error: ErrorCallback) {
    dal.intervals.getAll(user, processIntervals);

    function processIntervals(err: Error, intervals: Interval[]) {
        if (err) {
            return error(err);
        }

        const years: number[] = [];

        intervals.forEach((interval: Interval) => {
            const year = moment(interval.start).year();

            if (years.indexOf(year) === -1) {
                years.push(year);
            }
        });

        success(years);
    }
}