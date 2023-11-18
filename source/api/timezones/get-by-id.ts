import log4js from 'log4js';
import { Request, Response } from 'express';
import dal from '../../dal';

const log = log4js.getLogger('timezones');

export default function getById(req: Request, res: Response) {
  const timezoneId = req.params.timezoneId;

  log.debug('User requested timezone %s', timezoneId);

  const timezone = dal.timezones.getById(timezoneId);

  if (!timezone) {
    res.status(404).json({
      error: 'NOT_FOUND'
    });
  }

  res.json(timezone);
}
