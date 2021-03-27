module.exports = {
  apps : [{
    name: 'Money Saver',
    script: './target/daemon.js'
  }],
  deploy : {
    production : {
      user : 'pm2',
      host : 'e-dreams.lv',
      ref  : 'origin/v2/dev',
      repo : 'https://github.com/idenisovs/money-saver.git',
      path : '/opt/pm2/money-saver',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'post-setup': 'npm install'
    }
  }
};
