import log4js from 'log4js';
import { Request, Response } from 'express';
import dal from '../../dal';

const log = log4js.getLogger('timezones');

export default function getById(req: Request, res: Response) {
    const timezoneParts = req.params.timezoneId as string[];
    const timezoneId = timezoneParts.join('/');

    log.debug('User requested timezone %s', timezoneId);

    const timezone = dal.timezones.getById(timezoneId);

    if (timezone) {
        return res.json(timezone);
    }

    res.status(404).json({
        error: 'NOT_FOUND'
    });
}
