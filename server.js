const express = require('express');
const app = express();

const pets = [
  { id: 1, name: 'Fluffy', owner: 'Alice' },
  { id: 2, name: 'Spot', owner: 'Bob' },
  { id: 3, name: 'Max', owner: 'Charlie' }
];

// Route to get all pets
app.get('/api/v1/pets', (req, res) => {

  res.json(pets);
});


// Route to get a pet by owner's name using query parameter
app.get('/api/v1/pets/owner', (req, res) => {
  const ownerName = req.query.owner; // Retrieve the 'owner' query parameter from the URL

  if (!ownerName) {
    return res.status(400).json({ error: 'Owner name is required' });
  }

  // Filter pets array to find pets belonging to the specified owner
  const foundOwner = pets.filter(pet => pet.owner.toLowerCase() === ownerName.toLowerCase());

  if (foundOwner.length === 0) {
    return res.status(404).json({ error: 'No pets found for this owner' });
  }

  res.json(foundOwner);
});
  
// Route to get a pet by name
app.get('/api/v1/pets/:name', (req, res) => {
  const petName = req.params.name;

  const foundPet = pets.find(pet => pet.name.toLowerCase() === petName.toLowerCase());
  console.log('Found pet:', foundPet);

  if (!foundPet) {
    return res.status(404).json({ error: 'Pet not found' });
  }

  res.json(foundPet);
});


app.listen(8080, () => {
  console.log(`Listening on port 8080`);
});
