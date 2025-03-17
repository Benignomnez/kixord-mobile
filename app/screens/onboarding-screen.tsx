import type React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView } from "react-native"
import { StatusBar } from "expo-status-bar"

const { width, height } = Dimensions.get("window")

interface OnboardingScreenProps {
  navigation: any
  finishOnboarding: () => void
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation, finishOnboarding }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.contentContainer}>
        <Image
          source={{
            uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tenni.jpg-MxNLFNOPIGovX9C0oQCK3qzVF35Zxd.jpeg",
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Image
            source={{
              uri: "https://sjc.microlink.io/65rnUpQJ8Yb-aVCAUoWLMRYyEiaYnxi4yW1A8F-XCYIl_-LOsw1sQ8f9cCR0Xjo18CvBduno7zQUu2cgS5gSwg.jpeg",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>ELEVATE YOUR LOOK</Text>
          <Text style={styles.subtitle}>WITH A FRESH, NEW STYLE</Text>

          <TouchableOpacity style={styles.button} onPress={finishOnboarding}>
            <Text style={styles.buttonText}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E32636",
  },
  contentContainer: {
    flex: 1,
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    width: width,
    height: height,
    opacity: 0.9,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(227, 38, 54, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
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
})

export default OnboardingScreen

