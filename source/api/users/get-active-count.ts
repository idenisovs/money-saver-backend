import { Request, Response } from 'express';
import status from 'http-status';
import bl from '../../bl';

export default async function getActiveUsersCount(req: Request, res: Response) {
    try {
        const activeUsersCount = await bl.users.getActiveCount();

        res.json({ activeUsersCount });
    } catch (e) {
        res.status(status.INTERNAL_SERVER_ERROR).json(e);
    }
}