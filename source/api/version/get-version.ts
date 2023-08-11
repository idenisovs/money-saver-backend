import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import statusCodes from 'http-status';
import log4js from 'log4js';
import ErrnoException = NodeJS.ErrnoException;

const log = log4js.getLogger('version');

export default function getVersion(req: Request, res: Response) {
	const versionFilePath = path.join(global.basedir, 'version');

	fs.readFile(versionFilePath, { encoding: 'utf8' }, readDone);

	function readDone(err: ErrnoException | null, version: string) {
		if (err) {
			log.error(err);

			return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ version: '0.0.0.0' });
		}

		version = version.replace(/[\r\n]/g, '');

		res.json({ version });
	}
}
