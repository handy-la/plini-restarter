const express = require('express');
const Docker = require('dockerode');
const app = express();
const port = 3001;

const docker = new Docker({socketPath: '/var/run/docker.sock'});

// Array of Docker containers
const containers = ['container1', 'container2', 'container3'];

app.post('/', (req, res) => {
  let restartErrors = [];
  containers.forEach((containerName) => {
    const container = docker.getContainer(containerName);
    container.restart((err) => {
      if (err) {
        console.error(`Error restarting container ${containerName}: ${err}`);
        restartErrors.push(containerName);
      }
    });
  });

  if (restartErrors.length === 0) {
    res.status(200).send('All containers restarted successfully');
  } else {
    res.status(500).send(`Failed to restart containers: ${restartErrors.join(', ')}`);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});
