
export const retrieveFavoritesData = async (favorites) => {
  const favoritesIds = Object.keys(favorites);

  const fetchFavorites = favoritesIds.map(async favoriteId => {
   const response = await fetch(`https://vrad-api.herokuapp.com/api/v1/listings/${favoriteId}`)
   const data = await response.json()
   return data
  })
  return fetchFavorites
}

export const getAreaData = async () => {

  const fetchDetails = async (details) => {
    const response = await fetch(`https://vrad-api.herokuapp.com${details}`)
      const data = await response.json()
      return await data
    }

  const response = await fetch('https://vrad-api.herokuapp.com/api/v1/areas')

  const data = await response.json()

  const areaInfo = data.areas.map(async areaData => {
    return {
      area: areaData.area,
      details: await fetchDetails(areaData.details)
    }
  })

  return areaInfo;
}
