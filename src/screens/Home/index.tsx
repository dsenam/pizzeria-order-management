import React from "react";
import {MaterialIcons} from '@expo/vector-icons'
import happyEmoji from '@assets/happy.png'
import { useTheme } from "styled-components/native";
import {
  Container,
  Header,
  GreetingEmoji,
  GreetingText,
  Greting
} from "./styles";
import { TouchableOpacity } from "react-native";


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
    </Container>
  );
}
