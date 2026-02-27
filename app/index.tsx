import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#00457d", "#05051f"]} style={styles.container}>
      <SafeAreaView edges={["top"]} />
      <Image source={require("../assets/images/Logo.png")} />
      <Image source={require("../assets/images/Ilustra.png")} />
      <Text style={styles.title}>Boas Vindas!</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/Cities")}
      >
        <Text style={styles.textbtn}>Entrar</Text>
        <MaterialIcons name="arrow-forward" size={24} color="#01080E" />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,

    paddingHorizontal: 32,
  },

  title: {
    fontSize: 25,
    color: "#FFFFFF",

    fontFamily: "Montserrat_400Regular",
  },

  btn: {
    width: "100%",
    height: 40,
    backgroundColor: "#7693FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    flexDirection: "row",
    gap: 8,
  },

  textbtn: {
    color: "#01080E",
    fontSize: 20,

    fontFamily: "Montserrat_600SemiBold",
  },
});
