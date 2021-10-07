module.exports = {
  apps: [
    {
      name: 'cmu-line',
      port: 3000,
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      exp_backoff_restart_delay: 100,
      args: 'start'
    }
  ]
}
