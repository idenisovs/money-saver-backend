import getLatest from './get-latest';
import getById from './get-by-id';
import getByTime from './get-by-time';
import getByBoundary from './get-by-boundary';
import getLatestSummary from './get-latest-summary';
import getAll from './get-all';
import getYears from './get-years';
import create from './create-interval';
import remove from './delete-interval';
import update from './update-interval';

const intervals = {
    getLatest,
    getById,
    getByTime,
    getByBoundary,
    getLatestSummary,
    getAll,
    getYears,
    create,
    delete: remove,
    update
};

export default intervals;