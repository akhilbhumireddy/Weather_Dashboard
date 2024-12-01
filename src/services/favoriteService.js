// Helper function to get favorites from localStorage
const getFavoritesFromStorage = () => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

// Helper function to save favorites to localStorage
const saveFavoritesToStorage = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const getFavorites = async () => {
  try {
    return getFavoritesFromStorage();
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};

export const addFavorite = async (city) => {
  try {
    const favorites = getFavoritesFromStorage();
    const newFavorite = { id: Date.now(), name: city };
    favorites.push(newFavorite);
    saveFavoritesToStorage(favorites);
    return newFavorite;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

export const removeFavorite = async (id) => {
  try {
    const favorites = getFavoritesFromStorage();
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
    saveFavoritesToStorage(updatedFavorites);
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};
