import { Request, Response } from 'express';

export default function completeAuthentication(req: Request, res: Response) {
	res.json(req.user);
}
