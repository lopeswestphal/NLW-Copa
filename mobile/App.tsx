import { NativeBaseProvider, StatusBar } from "native-base";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Pools } from './src/screens/Pools';
import { Loading } from './src/components/Loading';

import { Theme } from './src/styles/theme';

import { AuthContextProvider } from './src/contexts/AuthContext';

export default function App() {
  // Garantir que a fonte seja carregada:
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={Theme}>
      <AuthContextProvider>
        <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />  
        { fontsLoaded ? <Pools /> : <Loading /> }  
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}