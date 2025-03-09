import React from "react";

import Pet from "./Pet";

function PetBrowser({ pets = [], onAdoptPet }) {
  return (
    <div className="ui cards">
      {Array.isArray(pets) && pets.map(pet => (
        <Pet 
          key={pet.id} 
          pet={pet} 
          onAdoptPet={onAdoptPet}
        />
      ))}
    </div>
  );
}

export default PetBrowser;