module.exports = {
  apps : [{
    name: 'Procell Website 14047',
    script: 'npm',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '2G',
    exec_mode: 'cluster',
    env: {
      PORT: 14047
    }
  }, 
  {
    name: 'Procell Website 14048',
    script: 'npm',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '2G',
    exec_mode: 'cluster',
    env: {
      PORT: 14048
    }
  }, {
    name: 'Nginx',
    script: 'nginx',
    args: '-g \'daemon off;\'',
    instances: 1,
    autorestart: false,
    watch: false,
    max_memory_restart: '2G'
  }]
};