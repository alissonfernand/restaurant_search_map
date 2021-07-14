import styled from "styled-components";

import  Text from '../Text';

export const Restaurant = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  padding: 16px;
  background-color: #ffffff;
  border-left: 5px solid transparent;
  cursor: pointer;
  :hover {
    background-color: #00000021;
    border-left-color: ${(props) => props.theme.colors.primary};
  }
`

export const RestaurantInfor = styled.div`
  display: flex;
  flex-direction: column;
`
export const Content = styled(Text)`
  margin-top: 5px;
`

export const RestaurantPhoto = styled.img`
  border-radius: 6px;
  width: 100px;
  height: 100px;
  object-fit: cover;
`
