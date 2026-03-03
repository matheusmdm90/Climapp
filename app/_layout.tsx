import { AppProvide } from "@/Context/Context";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts,
} from "@expo-google-fonts/montserrat";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [loaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!loaded) {
    return null;
  }
  return (
    // aqui estamos usando o SafeAreaProvider para garantir que o conteúdo do aplicativo seja exibido corretamente em dispositivos com entalhes ou áreas de recorte, e o AppProvide para fornecer o contexto global para todo o aplicativo, incluindo as rotas definidas no Stack.Navigator para as diferentes telas do aplicativo (index, Cities e detalhes da cidade) com a opção de ocultar o cabeçalho em cada tela.
    <SafeAreaProvider style={{ flex: 1 }}>
      {/* aqui esta o provedor de contexto para todo o aplicativo */}
      <AppProvide>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="Cities" options={{ headerShown: false }} />
          <Stack.Screen name="[cityName]" options={{ headerShown: false }} />
        </Stack>
      </AppProvide>
    </SafeAreaProvider>
  );
}
