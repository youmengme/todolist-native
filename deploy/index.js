const ci = require('miniprogram-ci')
;(async () => {
  console.log('process.cwd()', process.cwd())
  const project = new ci.Project({
    appid: process.env.appid,
    type: 'miniProgram',
    projectPath: `${process.cwd()}`,
    privateKeyPath: `${process.cwd()}/private.key`,
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
