import React, { useState } from "react";
import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton,
  Form,
  InputGroup,
  InputGroupHeader,
  Label,
  MaxCharacters,
} from "./styles";
import * as ImagePicker from "expo-image-picker";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ProductNavigationProps } from "@src/@types/navigation";

import { Platform, TouchableOpacity, ScrollView, Alert } from "react-native";
import { ButtonBack } from "@components/ButtonBack";
import { Photo } from "@components/Photo";
import { Button } from "@components/Button";
import { InputPrice } from "@components/InputPrice";
import { Input } from "@components/Input";

export function Product() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceSizeP, setPriceSizeP] = useState("");
  const [priceSizeM, setPriceSizeM] = useState("");
  const [priceSizeG, setPriceSizeG] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const { id } = route.params as ProductNavigationProps;

  

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  async function handleAddProduct() {
    if (
      !name.trim() ||
      !description.trim() ||
      !image ||
      !priceSizeG ||
      !priceSizeM ||
      !priceSizeP
    ) {
      return Alert.alert(
        "Cadastro",
        "Por gentileza informe todas as informações necessárias"
      );
    }

    setIsLoading(true);

    const fileName = new Date().getTime();

    const reference = storage().ref(`/pizzas/${fileName}.png`);

    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection("pizzas")
      .add({
        name,
        name_insensitive: name.toLowerCase().trim(),
        description,
        prices_sizes: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG,
        },
        photo_url,
        photo_path: reference.fullPath,
      })
      .then(() => Alert.alert("Cadastro", "Pizza cadastrada com sucesso"))
      .catch(() =>
        Alert.alert("Cadastro", "Não foi possível cadastrar a pizza.")
      );

    setIsLoading(false);
  }

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <ButtonBack />
          <Title>Cadastrar</Title>

          <TouchableOpacity>
            <DeleteLabel>Deletar</DeleteLabel>
          </TouchableOpacity>
        </Header>

        <Upload>
          <Photo uri="" />
          <PickImageButton
            onPress={handlePickerImage}
            title="Carregar"
            type="secondary"
          />
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input onChangeText={setName} value={name} />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>
            <Input
              onChangeText={setDescription}
              value={description}
              multiline
              maxLength={60}
              style={{ height: 80 }}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e Preços</Label>

            <InputPrice
              onChangeText={setPriceSizeP}
              value={priceSizeP}
              size="P"
            />
            <InputPrice
              onChangeText={setPriceSizeM}
              value={priceSizeM}
              size="M"
            />
            <InputPrice
              onChangeText={setPriceSizeG}
              value={priceSizeG}
              size="G"
            />
          </InputGroup>

          <Button
            title="Cadastrar pizza"
            isLoading={isLoading}
            onPress={handleAddProduct}
          />
        </Form>
      </ScrollView>
    </Container>
  );
}
