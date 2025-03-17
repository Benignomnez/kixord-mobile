"use client";

import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, theme === "light" && styles.activeButton]}
        onPress={() => setTheme("light")}
      >
        <Ionicons
          name="sunny"
          size={20}
          color={theme === "light" ? "#fff" : "#000"}
        />
        <Text style={[styles.text, theme === "light" && styles.activeText]}>
          Light
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, theme === "dark" && styles.activeButton]}
        onPress={() => setTheme("dark")}
      >
        <Ionicons
          name="moon"
          size={20}
          color={theme === "dark" ? "#fff" : "#000"}
        />
        <Text style={[styles.text, theme === "dark" && styles.activeText]}>
          Dark
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, theme === "system" && styles.activeButton]}
        onPress={() => setTheme("system")}
      >
        <Ionicons
          name="settings"
          size={20}
          color={theme === "system" ? "#fff" : "#000"}
        />
        <Text style={[styles.text, theme === "system" && styles.activeText]}>
          System
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 4,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginHorizontal: 2,
  },
  activeButton: {
    backgroundColor: "#E32636",
  },
  text: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "500",
  },
  activeText: {
    color: "#fff",
  },
});
