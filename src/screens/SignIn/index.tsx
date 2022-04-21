import React from "react";

import {
  Container,
  Content,
  Title,
  Brand,
  ForgetPasswordButton,
  ForgetPasswordLabel,
} from "./styles";

import brandImg from "@assets/brand.png";

import { KeyboardAvoidingView, Platform } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Content>
          <Brand source={brandImg} />
          <Title>Login</Title>
          <Input
            placeholder="E-mail"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Input placeholder="Senha" type="secondary" secureTextEntry />

          <ForgetPasswordButton>
              <ForgetPasswordLabel>Esqueci minha senha</ForgetPasswordLabel>
          </ForgetPasswordButton>

          <Button title="Entrar" type="secondary" />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
