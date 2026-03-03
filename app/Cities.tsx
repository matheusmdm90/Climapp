import { appContext } from "@/Context/Context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AppContextType {
  estadosBrasileiros: string[];
}

interface Cidade {
  cidade: string;
  temperatura: any;
}

const Cities = () => {
  const [isLoading, setIsLoading] = useState(true);
  const API_KEY = "chave_Api_aqui";
  const [cidadeAtualizada, setCidadeAtualizada] = useState<Cidade[]>([]);
  const { estadosBrasileiros } = useContext(appContext) as AppContextType;
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filteredCities, setFilteredCities] =
    useState<Cidade[]>(cidadeAtualizada);

  useEffect(() => {
    const renderizarCidades = async () => {
      setIsLoading(true);
      const dataCidade = [];
      for (const estado of estadosBrasileiros) {
        // aqui estamos usando a API do OpenWeatherMap para obter os dados de temperatura para cada cidade
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${estado},BR&appid=${API_KEY}&units=metric&lang=pt_br`;

        try {
          const response = await fetch(url);
          const data = await response.json();

          const cidade = {
            cidade: estado,
            temperatura: Math.round(data.main.temp),
          };

          dataCidade.push(cidade);
        } catch (error) {
          console.error("Erro ao obter os dados para", estado, ":", error);
        }
      }
      setCidadeAtualizada(dataCidade);
      setIsLoading(false);
    };
    renderizarCidades();
  }, []);

  // aqui estamos usando o useEffect para filtrar as cidades com base no valor de pesquisa e atualizar a lista de cidades filtradas sempre que o valor de pesquisa ou a lista de cidades atualizada mudar

  useEffect(() => {
    const newFilteredCities = cidadeAtualizada.filter((city) =>
      city.cidade.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredCities(newFilteredCities);
  }, [search, cidadeAtualizada]);

  return (
    <LinearGradient colors={["#00457d", "#05051f"]} style={styles.container}>
      <SafeAreaView edges={["top"]} />

      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Digite a cidade"
              placeholderTextColor={"#fff"}
              value={search}
              onChangeText={(value) => setSearch(value)}
              style={styles.input}
            />
            <MaterialIcons name="search" size={18} color="#fff" />
          </View>

          <ScrollView>
            <View style={styles.scrollList}>
              {filteredCities.map((city) => (
                <TouchableOpacity
                  // aqui estamos usando o router do Expo para navegar para a página de detalhes da cidade quando o usuário clicar em uma cidade na lista, passando o nome da cidade como parâmetro na URL
                  onPress={() => {
                    router.push(`/${city.cidade}`);
                  }}
                  key={city.cidade}
                  style={styles.listItem}
                >
                  <Image
                    style={styles.cityImage}
                    source={require("../assets/images/Vector.png")}
                  ></Image>

                  <Text style={styles.cityName}>
                    {" "}
                    {city.cidade.replace(", ", " - ")}
                  </Text>
                  <Text style={styles.cityTemp}>{city.temperatura}º</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
  },

  scrollList: {
    gap: 16,
  },

  listItem: {
    width: "100%",
    height: 63,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    flexDirection: "row",
    paddingHorizontal: 16,
  },

  cityTemp: {
    color: "#ffff",
    fontSize: 25,
    fontFamily: "Montserrat_700Bold",
  },

  cityName: {
    color: "#ffff",
    fontSize: 16,
    fontFamily: "Montserrat _500Medium",
  },

  cityImage: {
    width: 27,
    height: 24,
  },

  inputContainer: {
    width: "100%",
    height: 45,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  input: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
  },
});

export default Cities;
