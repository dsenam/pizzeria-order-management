import React from 'react';
import { View } from 'react-native';
import {useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'
import AppLoading from 'expo-app-loading';
import {ThemeProvider} from 'styled-components/native'
import theme from '@src/theme';


export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  if(!fontsLoaded) {
    return <AppLoading/>
  }

  return (
    <ThemeProvider theme={theme}>
      
    </ThemeProvider>
  );
}

