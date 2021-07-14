import React from 'react';
import ReactStars from 'react-rating-stars-component';

import {Restaurant,RestaurantInfor,Content, RestaurantPhoto } from './styles';

import Text from '../Text';

const RestaurantCard = ({onClick}) => {
  return(
  <Restaurant onClick={onClick}>
    <RestaurantInfor>
      <Text>Restaurante Name</Text>

      <ReactStars count={5} value="4" edit={false} isHalf activeColor="#e7711c" />

      <Content size="medium">Restaurante conteúdo</Content>
    </RestaurantInfor>

    <RestaurantPhoto src="https://picsum.photos/100/100" alt="Foto do Restaurante" />
  </Restaurant>
  );
}

export default RestaurantCard;
