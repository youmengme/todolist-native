const ci = require('miniprogram-ci')
;(async () => {
  console.log('__dirname', __dirname)
  const project = new ci.Project({
    appid: process.env.appid,
    type: 'miniProgram',
    projectPath: `${__dirname}`,
    privateKeyPath: `${__dirname}/private.key`,
    ignores: ['node_modules/**/*'],
  })
  const uploadResult = await ci.upload({
    project,
    version: process.env.version || '1.1.1',
    desc: process.env.message || 'desc',
    setting: {
      es6: true,
    },
    onProgressUpdate: console.log,
  })
  console.log(uploadResult)
})()
