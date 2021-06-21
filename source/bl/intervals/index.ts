import getByBoundary from './get-by-boundary';
import getLatestSummary from './get-latest-summary';
import getYears from './get-years';
import queryIntervals from './query-intervals';
import create from './create-interval';
import remove from './delete-interval';
import update from './update-interval';

const intervals = {
    getByBoundary,
    getLatestSummary,
    getYears,
    get: queryIntervals,
    create,
    delete: remove,
    update
};

export default intervals;