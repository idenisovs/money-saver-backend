module.exports = {
  apps : [{
    name: 'Money Saver',
    script: 'daemon.js'
  }],
  deploy : {
    production : {
      user : 'pm2',
      host : 'e-dreams.lv',
      ref  : 'origin/v2/dev',
      repo : 'https://github.com/idenisovs/money-saver.git',
      path : '/opt/pm2/money-saver',
      'post-deploy' : 'npm run update && pm2 startOrRestart ./ecosystem.config.js',
      'post-setup': 'npm run setup && pm2 start ./ecosystem.config.js && pm2 save'
    }
  }
};
