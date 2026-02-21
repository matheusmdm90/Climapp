import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const CityDetails = () => {
  const searchParams = useLocalSearchParams();
  const [cityAtual, setCityAtual] = useState(null);

  const handleData = async () => {
    try {
      // aqui estou fazendo uma requisição para a APi
      const response = await fetch("https://climapp-api.vercel.app/api");

      //   aqui preciso  transformar a resposta da api em json para poder usar os dados
      const responseJson = await response.json();

      const city = responseJson.find(
        (cityData: { city: string | string[] }) =>
          cityData.city === searchParams.cityName,
      );
      setCityAtual(city);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return <View></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CityDetails;
