import React from "react";
import styled from "styled-components";

import Text from '../Text';

export const Card = styled.div`
  min-width: 90px;
  height: 90px;
  border-radius: 8px;
  background-image: url(${(props) => props.photo});
  background-size: cover;
  p {
    margin-left: 6px;
    margin-top: 10px;
  }
`

const ImageCard = ({restaurant}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const image = restaurant.photos ? restaurant.photos[0].getUrl() : restaurant.icon;

  React.useEffect(() => {
    const imageLoader = new Image();
    imageLoader = image;
    imageLoader.onload = () => setImageLoaded(true)
  }, [image])

  return(
    <Card photo={image}>
      <Text size="medium" color="#ffffff">{restaurant.name}</Text>
    </Card>
  );
}

export default ImageCard;
