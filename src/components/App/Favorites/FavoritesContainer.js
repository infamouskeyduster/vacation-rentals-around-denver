import React, { Component } from 'react';
import {retrieveFavoritesData} from '../apiCalls';
import ListingDetails from '../../Listings/ListingDetails'

class FavoritesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      favoritesData: []
    }
  }
  
  componentDidMount = async () => {
    const fetchedFavoritesData = await retrieveFavoritesData(this.props.favorites)

    Promise.all(fetchedFavoritesData)
    .then(fetchedFavoritesData => this.setState({favoritesData: fetchedFavoritesData}))
  }

  render() {
    console.log(this.state.favoritesData)
    const allFavorites = this.state.favoritesData.map(favorite => {
      return(
          <ListingDetails 
          key={favorite.listing_id}
          listing={favorite}
          isFavorite={true}
          // addListingToFavorite={this.addListingToFavorite}
          removeListingFromFavorites={this.props.removeFavoriteOnParent(favorite.listing_id)}
          // isFavorite={this.state.favorites[this.state.foundSingleListing[0].listing_id] === true}
          />
      )
    })
    if(!this.state.favoritesData.length) {
      return (
        <h3>You don't have any favorites yet, you should probably add some…</h3>
      )
    } else {
    return (
      <div>
        {allFavorites}
      </div>
    )
    }
  }
  
}



export default FavoritesContainer;