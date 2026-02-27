import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import citiesData from "../data/cities.json";

const Cities = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filteredCities, setFilteredCities] = useState(citiesData);

  useEffect(() => {
    const newFilteredCities = citiesData.filter((city) =>
      city.city.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredCities(newFilteredCities);
  }, [search]);

  return (
    <LinearGradient colors={["#00457d", "#05051f"]} style={styles.container}>
      <SafeAreaView edges={["top"]} />
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
              onPress={() => {
                router.push(`/${city.city}`);
              }}
              key={city.city}
              style={styles.listItem}
            >
              <Image
                style={styles.cityImage}
                source={require("../assets/images/Vector.png")}
              ></Image>

              <Text style={styles.cityName}>
                {" "}
                {city.city.replace(", ", " - ")}
              </Text>
              <Text style={styles.cityTemp}>{city.temp}º</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
