import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CityDetails = () => {
  const API_KEY = "Chave_Api_aqui";
  const searchParams = useLocalSearchParams();
  const [cityAtual, setCityAtual] = useState<{
    city: string;
    date: string;
    temp: number;
    description: string;
    humidity: number;
    forecast: {
      min: number;
      max: number;
      date: string;
      weekday: string;
    }[];
  } | null>(null);

  const handleData = async () => {
    // aqui estou criando a url para fazer a requisição para a API, usando o nome da cidade que vem dos parametros de busca
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchParams.cityName},BR&appid=${API_KEY}&units=metric&lang=pt_br`;
    try {
      // aqui estou fazendo uma requisição para a APi
      const response = await fetch(url);

      //   aqui preciso  transformar a resposta da api em json para poder usar os dados
      const data = await response.json();

      console.log(data);
      const cityData = {
        city: data.city.name,
        // aqui estou convertendo a data que vem em formato timestamp para uma data legivel, usando a função toLocaleDateString para formatar a data no formato dia/mes/ano
        date: new Date(data.list[0].dt * 1000).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }),
        temp: Math.round(data.list[0].main.temp),
        description: data.list[0].weather[0].description,
        humidity: data.list[0].main.humidity,
        forecast: data.list.slice(0, 25).map((item: any) => ({
          min: Math.round(item.main.temp_min),
          max: Math.round(item.main.temp_max),
          date: new Date(item.dt * 1000).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          }),
          weekday: new Date(item.dt * 1000).toLocaleDateString("pt-BR", {
            weekday: "short",
          }),
        })),
      };

      setCityAtual(cityData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  const limitedCityName = cityAtual?.forecast.filter((_, index) =>
    [5, 13, 21].includes(index),
  );

  const router = useRouter();

  return (
    <LinearGradient colors={["#00457d", "#05051f"]} style={styles.container}>
      <SafeAreaView edges={["top"]} />
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.back()} style={styles.headerIcon}>
          <MaterialIcons name="chevron-left" size={24} color="white" />
        </Pressable>
        <Text style={styles.cityName}>{cityAtual?.city}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderTitle}>Hoje</Text>
          <Text style={styles.cardHeaderTitle}>{cityAtual?.date}</Text>
        </View>

        <View style={styles.cardBox}>
          <Image
            source={require("../assets/images/Vector.png")}
            style={styles.cardImage}
          />

          <View>
            <Text style={styles.cardTemperature}>{cityAtual?.temp}º</Text>
            <Text style={styles.cardDecription}>{cityAtual?.description}</Text>
          </View>
        </View>
        <View style={styles.rowBox}>
          <View style={styles.row}>
            <Image source={require("../assets/images/umidade.png")} />
            <Text style={styles.rowTitle}>Humidade:</Text>
            <Text style={styles.rowValue}>{cityAtual?.humidity}%</Text>
          </View>
          <View style={styles.row}>
            <Image source={require("../assets/images/Temperatura.png")} />
            <Text style={styles.rowTitle}>Min/Max:</Text>
            <Text style={styles.rowValue}>
              {cityAtual?.forecast[0].min}° / {cityAtual?.forecast[0].max}°
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.boxContainerPrevision}>
        {/* Aqui e a rederização dos proximos dias  */}
        {limitedCityName?.map((item, index) => {
          const week = (index === 0 && "Amanhã") || item.weekday;

          return (
            <View key={index} style={styles.boxPrevision}>
              <View style={styles.boxPrevisionHeader}>
                <Text style={styles.boxPrevisionHeaderTitle}>{week}</Text>

                <Text style={styles.boxPrevisionHeaderTitle}>
                  ({item.date})
                </Text>
              </View>
              <Image
                source={require("../assets/images/Vector.png")}
                style={styles.imagePrevision}
              />
              <Text style={styles.templePrevision}>
                {item.max}° / {item.min}°
              </Text>
            </View>
          );
        })}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 40,
  },

  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  cityName: {
    fontSize: 20,
    fontFamily: "Montserrat_600SemiBold",
    color: "white",
    textAlign: "center",
  },

  card: {
    width: "100%",
    borderRadius: 24,
    backgroundColor: "#4463d5",
    padding: 16,
    gap: 24,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  cardHeaderTitle: {
    fontSize: 16,
    color: "white",
    fontFamily: "Montserrat_600SemiBold",
  },

  headerIcon: {
    position: "absolute",
    left: 0,
  },
  cardImage: {
    width: 72,
    height: 64,
  },

  cardTemperature: {
    fontSize: 43,
    color: "white",
    fontFamily: "Montserrat_700Bold",
    textAlign: "center",
  },
  cardDecription: {
    fontSize: 13,
    color: "white",
    fontFamily: "Montserrat_400Regular",
    textAlign: "center",
  },
  cardBox: {
    alignItems: "center",
    justifyContent: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  rowTitle: {
    fontSize: 16,
    color: "white",
    fontFamily: "Montserrat_600SemiBold",
  },

  rowValue: {
    fontSize: 16,
    color: "white",
    fontFamily: "Montserrat_400Regular",
    marginLeft: "auto",
  },

  rowBox: {
    gap: 8,
  },

  boxContainerPrevision: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 8,
  },

  boxPrevision: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 114,
    height: 152,
    borderRadius: 24,
    padding: 12,
    gap: 16,
  },

  boxPrevisionHeader: {
    flexDirection: "column",
  },
  imagePrevision: {
    width: 30,
    height: 25,
  },

  boxPrevisionHeaderTitle: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontFamily: "Montserrat_500Medium",
  },

  templePrevision: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontFamily: "Montserrat_600SemiBold",
  },
});

export default CityDetails;
