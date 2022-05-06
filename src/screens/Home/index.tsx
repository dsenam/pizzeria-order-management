import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";
import happyEmoji from "@assets/happy.png";
import firestore from "@react-native-firebase/firestore";
import { useTheme } from "styled-components/native";
import {
  Container,
  Header,
  GreetingEmoji,
  GreetingText,
  Greting,
  MenuHeader,
  MenuItemsNumber,
  Title,
} from "./styles";

import { Search } from "@components/Search";
import { ProductCard, ProductProps } from "@components/ProductCard";
import { FlatList } from "react-native-gesture-handler";

export function Home() {
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState("");
  const { COLORS } = useTheme();

  function fetchPizzas(value: string) {
    const formatedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection("pizzas")
      .orderBy("name_insensitive")
      .startAt(formatedValue)
      .endAt(`${formatedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        setPizzas(data);
      })
      .catch(() =>
        Alert.alert("Consulta", "Não foi possível realizar a consulta")
      );
  }

  function handleSearch() {
    fetchPizzas(search);
  }

  function handleSearchClear() {
    setSearch("");
    fetchPizzas("");
  }

  useEffect(() => {
    fetchPizzas("");
  }, []);

  return (
    <Container>
      <Header>
        <Greting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, Admin</GreetingText>
        </Greting>

        <TouchableOpacity>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>
      <Search
        onChangeText={setSearch}
        value={search}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>10 pizzas</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            data={{
              id: item.id,
              name: item.name,
              description: item.description,
              photo_url: item.photo_url,
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />
    </Container>
  );
}
