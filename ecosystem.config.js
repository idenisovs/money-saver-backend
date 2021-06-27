module.exports = {
  apps : [{
    name: 'Money Saver',
    script: 'daemon.js'
  }],
  deploy : {
    production : {
      user : 'pm2',
      host : 'e-dreams.lv',
      ref  : 'origin/master',
      repo : 'git@github.com:idenisovs/money-saver-backend.git',
      path : '/opt/pm2/money-saver',
      'post-deploy' : 'git submodule update && npm run update && pm2 startOrRestart ./ecosystem.config.js',
      'post-setup': 'git submodule update --init && npm run setup'
    }
  }
};
