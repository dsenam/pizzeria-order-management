import React from "react";
import {MaterialIcons} from '@expo/vector-icons'
import { TouchableOpacity } from "react-native";
import happyEmoji from '@assets/happy.png'
import { useTheme } from "styled-components/native";
import {
  Container,
  Header,
  GreetingEmoji,
  GreetingText,
  Greting,
  MenuHeader,
  MenuItemsNumber,
  Title
} from "./styles";

import { Search } from "@components/Search";


export function Home() {
const {COLORS} = useTheme()
  return (
    <Container>
      <Header>
          <Greting>
              <GreetingEmoji source={happyEmoji} />
              <GreetingText>Olá, Admin</GreetingText>
          </Greting>

          <TouchableOpacity>

              <MaterialIcons name="logout" color={COLORS.TITLE} size={24}/>
          </TouchableOpacity>
    </Header>
    <Search onSearch={() => {}} onClear={() => {}} />

    <MenuHeader>
      <Title>Cardápio</Title>
      <MenuItemsNumber>10 pizzas</MenuItemsNumber>
    </MenuHeader>
    </Container>
  );
}
