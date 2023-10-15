import React, {useState} from "react";

function Card() {
  const [cardData, setCardData] = useState([
    {
        title: "My Card",
        description: "This is a description of my card.",
      }, 
      {
        title: "My Card",
        description: "This is a description of my card.",
      }, 
      {
        title: "My Card",
        description: "This is a description of my card.",
      }
  ]);

  const handleEditCard = () => {
    // Open the card editor.
  };

  const handleDeleteCard = () => {
    // Delete the card.
  };

  return (
    <div className="card">
        {cardData.map((card)=>{
            return (
                <>
<h3>{card.title}</h3>
      <p>{card.description}</p>
      <button onClick={handleEditCard}>Edit Card</button>
      <button onClick={handleDeleteCard}>Delete Card</button>
      </>
            )
        })}
      
    </div>
  );
}

export default Card;