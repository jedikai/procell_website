module.exports = {
  apps : [{
    name: 'Procell Website',
    script: 'npm',
    args: 'start',
    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '2G',
    exec_mode: 'cluster'
  }]
};