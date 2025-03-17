import type React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Linking,
  Text,
  View,
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";

interface WhatsAppWidgetProps {
  phoneNumber: string;
  companyName?: string;
  message?: string;
  position?: "bottomRight" | "bottomLeft" | "bottomCenter";
  welcomeMessage?: string;
}

const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  phoneNumber,
  companyName = "KIXORD",
  message = "Hi! I'm interested in your products.",
  position = "bottomRight",
  welcomeMessage = "👋 How can we help you today?",
}) => {
  const [showModal, setShowModal] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showModal) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [showModal, fadeAnim]);

  const openWhatsApp = () => {
    // Remove any non-numeric characters from the phone number
    const formattedNumber = phoneNumber.replace(/\D/g, "");

    // Create the WhatsApp URL with custom message
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;

    // Close modal if open
    setShowModal(false);

    // Open WhatsApp
    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(whatsappUrl);
        } else {
          console.log("WhatsApp is not installed on this device");
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  // Determine position styles based on props
  let positionStyle = {};
  switch (position) {
    case "bottomLeft":
      positionStyle = { left: 20 };
      break;
    case "bottomCenter":
      positionStyle = { left: Dimensions.get("window").width / 2 - 28 };
      break;
    case "bottomRight":
    default:
      positionStyle = { right: 20 };
      break;
  }

  return (
    <>
      <TouchableOpacity
        style={[styles.whatsappButton, positionStyle]}
        onPress={() => (welcomeMessage ? setShowModal(true) : openWhatsApp())}
      >
        <Ionicons name="logo-whatsapp" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Welcome Message Modal */}
      <Modal
        transparent={true}
        visible={showModal}
        animationType="none"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        >
          <Animated.View
            style={[
              styles.messageContainer,
              positionStyle,
              { opacity: fadeAnim },
            ]}
          >
            <View style={styles.messageHeader}>
              <View style={styles.companyInfo}>
                <View style={styles.companyLogo}>
                  <Text style={styles.companyInitial}>
                    {companyName.charAt(0)}
                  </Text>
                </View>
                <Text style={styles.companyName}>{companyName}</Text>
              </View>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.messageBody}>
              <Text style={styles.welcomeMessage}>{welcomeMessage}</Text>
            </View>

            <TouchableOpacity style={styles.chatButton} onPress={openWhatsApp}>
              <Text style={styles.chatButtonText}>Start Chat</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  whatsappButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#25D366",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 999,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  messageContainer: {
    position: "absolute",
    bottom: 80,
    width: 300,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  companyInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#25D366",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  companyInitial: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  messageBody: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    marginBottom: 16,
  },
  welcomeMessage: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  chatButton: {
    backgroundColor: "#25D366",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  chatButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 8,
  },
});

export default WhatsAppWidget;
