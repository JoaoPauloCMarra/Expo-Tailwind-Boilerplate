import Onboarding from "@/app/screens/Onboarding";
import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />
      <View style={styles.container}>
        <Onboarding />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});

export default HomeScreen;
