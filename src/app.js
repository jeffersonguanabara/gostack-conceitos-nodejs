const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid, v4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  
  const { title, url, techs } = request.body;

  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repositorie);

  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  
  const { id } = request.params;

  const { title, url, techs } = request.body;

  const auxiliar = {
    title,
    url,
    techs
  };

  const repositorieIndex = repositories.findIndex( repositorie => repositorie.id == id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ error : 'Repository not found.'});
  }

  const repositorie = repositories[repositorieIndex]; 

  repositorie.title = auxiliar.title;
  repositorie.url = auxiliar.url;
  repositorie.techs = auxiliar.techs;

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex( repositorie => repositorie.id == id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ error : 'Repository not found.'});
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params;

  const repositorieIndex = repositories.findIndex( repositorie => repositorie.id == id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.'});
  }

  const repositorie = repositories[repositorieIndex];

  repositorie.likes = repositorie.likes + 1;

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

module.exports = app;
