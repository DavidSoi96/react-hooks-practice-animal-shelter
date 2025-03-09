import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  const onChangeType = (type) => {
    setFilters({ type });
  };

  const onFindPetsClick = () => {
    const endpoint = filters.type === "all" 
      ? "http://localhost:3001/pets"
      : `http://localhost:3001/pets?type=${filters.type}`;
    
    fetch(endpoint)
      .then(res => res.json())
      .then(petsData => {
        setPets(petsData.map(pet => ({
          ...pet,
          isAdopted: pet.isAdopted || false
        })));
      })
      .catch(error => console.error('Error fetching pets:', error));
  };

  const onAdoptPet = (petId) => {
    setPets(pets.map(pet => 
      pet.id === petId ? { ...pet, isAdopted: true } : pet
    ));
  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;