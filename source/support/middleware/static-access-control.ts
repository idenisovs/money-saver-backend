import path from 'path';
import { NextFunction, Request, Response } from 'express';
import log4js from 'log4js';

const log = log4js.getLogger('static-access-control');

function staticAccessControl(req: Request, res: Response, next: NextFunction) {
	const fileName = path.basename(req.path);

	if (req.isAuthenticated()) {
		if (isLoginPage(fileName)) {
			return res.redirect('index.html');
		}

		return next();
	}

	if (!isHtmlFile(fileName)) {
		return next();
	}

	if (isLoginPage(fileName)) {
		log.debug('Login page requested!');

		return next();
	}

	log.warn('Requested %s and user is not authenticated, redirecting...', fileName);

	return res.redirect('login.html?not-authorized=true');
}

module.exports = staticAccessControl;

function isHtmlFile(fileName: string): boolean {
	return path.extname(fileName) === '.html';
}

function isLoginPage(fileName: string): boolean {
	return !fileName || fileName === 'login.html';
}