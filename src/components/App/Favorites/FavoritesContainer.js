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
    //retrieveFavoritesData being imported from apiCalls
    const fetchedFavoritesData = await retrieveFavoritesData(this.props.favorites)

    Promise.all(fetchedFavoritesData)
    .then(fetchedFavoritesData => this.setState({favoritesData: fetchedFavoritesData}))

  }

  toggleFavorite = (id, isFavorite) => {
    isFavorite = !isFavorite;
    if(!isFavorite){
      this.props.removeFavoriteOnParent(id);

    const removeFavorite = this.state.favoritesData.filter(favorite => favorite.listing_id !== id)

    this.setState({favoritesData: removeFavorite})

      return;
    }
  }

  render() {
    if(!this.state.favoritesData.length) {
      return (
        <h3 className="no-favorites-message">You don't have any favorites yet! <br/> you should probably add some…</h3>
      )
    }

    const allFavorites = this.state.favoritesData.map(favorite => {
      return(
          <ListingDetails
          key={favorite.listing_id}
          listing={favorite}
          isFavorite={true}
          toggleFavorite={this.toggleFavorite}
          />
      )
    })

    return (
      <div>
        {allFavorites}
      </div>
    )
  }
}

export default FavoritesContainer;
