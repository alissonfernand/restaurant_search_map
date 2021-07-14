import React from "react";
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

import { useDispatch, useSelector } from 'react-redux';
import {setRestaurants, setRestaurant} from '../../redux/modules/restaurants';

const MapContainer = (props) => {
  const dispatch = useDispatch();
  const { restaurants } = useSelector((state) => state.restaurants);

  const { google, query, placeId } = props;

  const [map, setMap] = React.useState(null);


  const searchByQuery = React.useCallback((map, query) => {
      const service = new google.maps.places.PlacesService(map);
      dispatch(setRestaurants([]));

      const request = {
        location: map.center,
        radius: '200',
        type: ['restaurant'],
        query,
      };

      service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK){
          dispatch(setRestaurants(results));
        }
      });
    },
    [dispatch, google]
  );


  const getDetails = React.useCallback(
    (placeId) => {
      const service = new google.maps.places.PlacesService(map);
      dispatch(setRestaurant(null));

      const request = {
        placeId,
        fields: ['name', 'opening_hours', 'formatted_address', 'formatted_phone_number'],
      };

      service.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK){
          dispatch(setRestaurant(place));
        }
      });
    },
    [google, map, dispatch]
  );

  React.useEffect(() => {
    if (query) {
     searchByQuery(map, query);
    }
   }, [searchByQuery, query, map]);

   React.useEffect(() => {
    if (placeId) {
      getDetails(placeId);
    }
   }, [placeId, getDetails]);

  function searchNearby(map, center) {
    const service = new google.maps.places.PlacesService(map);

    const request = {
      location: center,
      radius: '20000',
      type: ['restaurant'],
    };

    service.nearbySearch(request, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK){
        dispatch(setRestaurants(result));
      }
    });
  }

  function onMapReady(_, map) {
    setMap(map);
    searchNearby(map, map.center);
  }

  return(
    <Map
      google={google}
      centerAroundCurrentLocation
      onReady={onMapReady}
      onRecenter={onMapReady}
      zoom={15}
      {...props}

    >
      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.place_id}
          name={restaurant.name}
          position={{
            lat: restaurant.geometry.location.lat(),
            lng: restaurant.geometry.location.lng(),
          }}
        />
      ))}

    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  language: 'pt-BR'
})(MapContainer);
