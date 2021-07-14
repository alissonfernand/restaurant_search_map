import React from 'react';
import TextField, { Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';

import { useSelector } from 'react-redux';

import {Wrapper, Container, Search, Logo, Title, Carousel} from './styles';

import { ImageCard, RestaurantCard, Map, Modal, Text, Loader, ImageSkeleton as  Skeleton } from '../../components';

import logo from '../../assets/logo.svg';

const Home = () => {
  const { restaurants, restaurantSelected } = useSelector((state) => state.restaurants)

  const [value, setValue] = React.useState('');
  const [query, setQuery] = React.useState('');
  const [placeId, setPlaceId] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const hasRestaurants = restaurants.length > 0;

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: true,
  };


  const RenderCarousel = () => {
    if (hasRestaurants) {
      return(
        <>
        <Title size="large">Na sua Área</Title>
        <Carousel {...settings}>
          {restaurants.map((restaurant) => (
            <ImageCard
              key={restaurant.place_id}
              restaurant={restaurant}
            />
          ))}
        </Carousel>
        </>
      );
    }
    return <Loader />
  };

  const RenderRestaurants = () => {
    if (hasRestaurants) {
      return restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.place_id}
          onClick={() => {
            setPlaceId(restaurant.place_id);
            setOpen(true);
          }}
        />
      ))
    }
    return null;
  };

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      setQuery(value);
    }
  }

  return(
    <Wrapper>
      <Container>
        <Search>
          <Logo src={logo} alt="Logo Empresa" />
          <TextField
            outlined
            label="Pesquisar"
            trailingIcon={<MaterialIcon role="button" icon="search" />}
          >
            <Input type="text" value={value} onKeyPress={handleKeyPress} onChange={handleChange} />
          </TextField>

          <RenderCarousel />
        </Search>

        <RenderRestaurants />

      <Modal open={open} onClose={() => setOpen(false)}>
        {restaurantSelected ? (
          <>
            <Text size="large">Restaurante Name</Text>
            <Text size="medium">83 9871487</Text>
            <Text size="medium">Endereço</Text>
            <Text size="medium">Aberto</Text>
          </>
        ) : (
          <>
            <Skeleton width="10px" height="10px" />
            <Skeleton width="10px" height="10px" />
            <Skeleton width="10px" height="10px" />
            <Skeleton width="10px" height="10px" />
          </>
        )}

      </Modal>
      </Container>

      <Map query={query} placeId={placeId} />
    </Wrapper>
  )
}

export default Home;
