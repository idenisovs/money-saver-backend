import { Interval, User } from '../../shared';
import { ErrorCallback, SuccessCallback } from '../callback-types';
import dal from '../../dal';

export default function getAllIntervals(user: User, success: SuccessCallback<Interval[]>, error: ErrorCallback) {
    dal.intervals.getAll(user, done);

    function done(err: Error, intervals: Interval[]) {
        if (err) {
            return error(err);
        }

        success(intervals);
    }
}