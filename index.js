const express = require('express');
const Docker = require('dockerode');
const app = express();
const port = 3001;

const docker = new Docker({socketPath: '/var/run/docker.sock'});

app.post('/', async (req, res) => {
  let restartErrors = [];

  try {
    let containers = await docker.listContainers({ all: true });
    
    let vroomContainer = containers.find(container => container.Names.some(name => name.includes('vroom')));
    let valhallaContainer = containers.find(container => container.Names.some(name => name.includes('valhalla')));

    if (!vroomContainer) {
      res.status(404).send('No container with a name containing "vroom" found');
      return;
    }

    if (!valhallaContainer) {
      res.status(404).send('No container with a name containing "valhalla" found');
      return;
    }

    console.log(`About to restart container with ID: ${vroomContainer.Id}`);
    const vroomContainerInstance = docker.getContainer(vroomContainer.Id);
      
    await new Promise((resolve, reject) => {
      vroomContainerInstance.restart((err) => {
        if (err) {
          console.error(`Error restarting container ${vroomContainer.Id}: ${err}`);
          restartErrors.push(vroomContainer.Id);
          reject(err);
        } else {
          console.log(`Container with ID: ${vroomContainer.Id} restarted successfully`);
          setTimeout(resolve, 5000); // wait for 5 seconds
        }
      });
    });

    console.log(`About to restart container with ID: ${valhallaContainer.Id}`);
    const valhallaContainerInstance = docker.getContainer(valhallaContainer.Id);

    await new Promise((resolve, reject) => {
      valhallaContainerInstance.restart((err) => {
        if (err) {
          console.error(`Error restarting container ${valhallaContainer.Id}: ${err}`);
          restartErrors.push(valhallaContainer.Id);
          reject(err);
        } else {
          console.log(`Container with ID: ${valhallaContainer.Id} restarted successfully`);
          setTimeout(resolve, 5000); // wait for 5 seconds
        }
      });
    });

    if (restartErrors.length === 0) {
      res.status(200).send('All containers restarted successfully');
    } else {
      res.status(500).send(`Failed to restart containers: ${restartErrors.join(', ')}`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error listing containers');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});
