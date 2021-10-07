module.exports = {
  apps: [
    {
      name: 'cmu-line',
      exec_mode: 'cluster',
      instances: '1', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      exp_backoff_restart_delay: 100,
      args: 'start'
    }
  ]
}
