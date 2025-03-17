import type React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

interface OnboardingScreenProps {
  navigation: any;
  finishOnboarding: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  navigation,
  finishOnboarding,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.contentContainer}>
        <View style={styles.overlay}>
          <Text style={styles.logoText}>KIXORD</Text>
          <Text style={styles.title}>ELEVATE YOUR LOOK</Text>
          <Text style={styles.subtitle}>WITH A FRESH, NEW STYLE</Text>

          <TouchableOpacity style={styles.button} onPress={finishOnboarding}>
            <Text style={styles.buttonText}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E32636",
  },
  contentContainer: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "#E32636",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 60,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: "#E32636",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OnboardingScreen;
