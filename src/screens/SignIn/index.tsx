import React, { useState } from "react";

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

import { useAuth } from "@hooks/auth";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
  const { signIn, isLogging, forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    signIn(email, password);
  }

  function handleForgotPassoword() {
    forgotPassword(email)
  }

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
            onChangeText={setEmail}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Input
            placeholder="Senha"
            onChangeText={setPassword}
            type="secondary"
            secureTextEntry
          />

          <ForgetPasswordButton onPress={handleForgotPassoword}>
            <ForgetPasswordLabel>Esqueci minha senha</ForgetPasswordLabel>
          </ForgetPasswordButton>

          <Button
            title="Entrar"
            type="secondary"
            onPress={handleSignIn}
            isLoading={isLogging}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
