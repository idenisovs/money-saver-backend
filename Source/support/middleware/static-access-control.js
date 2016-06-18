/**
 * The purpose of Static Access Control middleware is to controll
 * access to static HTML files and redirect to login.html if user
 * is not authorized.
 *
 * Created by I.Denisovs on 16.18.6.
 */

var path = require('path');
var log = require('log4js').getLogger('static-access-control');

function staticAccessControl(req, res, next)
{
    var fileName = path.basename(req.path);

    if (req.isAuthenticated())
    {
        if (isLoginPage(fileName))
        {
            return res.redirect('index.html');
        }

        return next();
    }

    if (!isHtmlFile(fileName))
    {
        return next();
    }

    if (isLoginPage(fileName))
    {
        log.debug('Login page requested!');

        return next();
    }

    log.warn('Requested %s and user is not authenticated, redirecting...', fileName);

    return res.redirect('login.html?not-authorized=true');
}

module.exports = staticAccessControl;

function isHtmlFile(fileName)
{
    return path.extname(fileName) === '.html';
}

function isLoginPage(fileName)
{
    return !fileName || fileName === 'login.html';
}