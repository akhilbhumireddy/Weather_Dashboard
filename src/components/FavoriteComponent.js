import React from "react";
import "../styles/FavoriteComponent.css";

const FavoriteComponent = ({
  favorites,
  onAddFavorite,
  onRemoveFavorite,
  onSelectFavorite,
}) => {
  return (
    <div className="favorite-component">
      <h3>Favorite Cities</h3>
      <button onClick={onAddFavorite}>Add Current City to Favorites</button>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>
              <span onClick={() => onSelectFavorite(favorite.name)}>
                {favorite.name}
              </span>
              <button onClick={() => onRemoveFavorite(favorite.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite cities added yet.</p>
      )}
    </div>
  );
};

export default FavoriteComponent;
