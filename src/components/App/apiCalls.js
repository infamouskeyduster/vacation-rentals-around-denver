
export const retrieveFavoritesData = async (favorites) => {
  const favoritesIds = Object.keys(favorites);

  const fetchFavorites = favoritesIds.map(async favoriteId => {
   const response = await fetch(`https://vrad-api.herokuapp.com/api/v1/listings/${favoriteId}`)
   const data = await response.json()
   return data
  })
  return fetchFavorites
}