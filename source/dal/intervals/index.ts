import getLatest from './get-latest';
import getNthLatest from './get-nth-latest';
import getByTime from './get-by-time';
import getByBoundary from './get-by-boundary';
import getAll from './get-all';
import getById from './get-by-id';
import create from './create';
import update from './update-interval';
import remove from './delete';
import getCount from './get-intervals-count';

const intervals = {
    getLatest,
    getById,
    getNthLatest,
    getByTime,
    getByBoundary,
    getAll,
    create,
    update,
    delete: remove,
    getCount

};

export default intervals;
