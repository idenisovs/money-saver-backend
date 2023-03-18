import { Request, Response } from 'express';
import ms from 'ms';

let timestamp = 0;

updateTimestamp();

export default function makeHealthResponse(req: Request, res: Response) {
	res.json({
		timestamp,
	});
}

function updateTimestamp() {
	timestamp = Date.now();

	setTimeout(updateTimestamp, ms('1m'));
}
