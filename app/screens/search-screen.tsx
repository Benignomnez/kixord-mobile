"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import WhatsAppWidget from "../components/whatsapp-widget"

// Sample product data for search results
const allProducts = [
  {
    id: "1",
    name: "LIGHTWEIGHT RUNNING CASUAL SNEAKERS SHOE",
    price: 250.0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tenni.jpg-MxNLFNOPIGovX9C0oQCK3qzVF35Zxd.jpeg",
    category: "Man Sneakers - 7,8",
  },
  {
    id: "2",
    name: "URBAN STREET STYLE PREMIUM SNEAKERS",
    price: 199.99,
    image:
      "https://sjc.microlink.io/65rnUpQJ8Yb-aVCAUoWLMRYyEiaYnxi4yW1A8F-XCYIl_-LOsw1sQ8f9cCR0Xjo18CvBduno7zQUu2cgS5gSwg.jpeg",
    category: "Man Sneakers - 8,9",
  },
  {
    id: "3",
    name: "CLASSIC RETRO ATHLETIC SHOES",
    price: 175.5,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tenni.jpg-MxNLFNOPIGovX9C0oQCK3qzVF35Zxd.jpeg",
    category: "Man Sneakers - 9,10",
  },
  {
    id: "4",
    name: "PREMIUM COMFORT WALKING SHOES",
    price: 220.0,
    image:
      "https://sjc.microlink.io/65rnUpQJ8Yb-aVCAUoWLMRYyEiaYnxi4yW1A8F-XCYIl_-LOsw1sQ8f9cCR0Xjo18CvBduno7zQUu2cgS5gSwg.jpeg",
    category: "Man Sneakers - 8,9,10",
  },
  {
    id: "5",
    name: "HIGH-TOP BASKETBALL SNEAKERS",
    price: 280.0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tenni.jpg-MxNLFNOPIGovX9C0oQCK3qzVF35Zxd.jpeg",
    category: "Basketball - 9,10,11",
  },
  {
    id: "6",
    name: "WOMEN'S RUNNING PERFORMANCE SHOES",
    price: 230.0,
    image:
      "https://sjc.microlink.io/65rnUpQJ8Yb-aVCAUoWLMRYyEiaYnxi4yW1A8F-XCYIl_-LOsw1sQ8f9cCR0Xjo18CvBduno7zQUu2cgS5gSwg.jpeg",
    category: "Women Sneakers - 6,7,8",
  },
]

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [recentSearches, setRecentSearches] = useState(["running shoes", "basketball", "casual sneakers"])
  const [isSearching, setIsSearching] = useState(false)
  const [showRecent, setShowRecent] = useState(true)

  const handleSearch = (query) => {
    setSearchQuery(query)

    if (query.trim() === "") {
      setSearchResults([])
      setShowRecent(true)
      return
    }

    setShowRecent(false)
    setIsSearching(true)

    // Simulate API call delay
    setTimeout(() => {
      const filteredResults = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )

      setSearchResults(filteredResults)
      setIsSearching(false)

      // Add to recent searches if not already there
      if (query.trim() !== "" && !recentSearches.includes(query.trim())) {
        setRecentSearches((prev) => [query.trim(), ...prev.slice(0, 4)])
      }
    }, 500)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setShowRecent(true)
  }

  const handleRecentSearch = (query) => {
    setSearchQuery(query)
    handleSearch(query)
  }

  const removeRecentSearch = (query) => {
    setRecentSearches((prev) => prev.filter((item) => item !== query))
  }

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => navigation.navigate("ProductDetail", { product: item })}>
      <Image source={{ uri: item.image }} style={styles.resultImage} />
      <View style={styles.resultInfo}>
        <Text style={styles.resultName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.resultCategory}>{item.category}</Text>
        <Text style={styles.resultPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for sneakers..."
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isSearching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E32636" />
        </View>
      ) : showRecent ? (
        <View style={styles.recentContainer}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Recent Searches</Text>
            {recentSearches.length > 0 && (
              <TouchableOpacity onPress={() => setRecentSearches([])}>
                <Text style={styles.clearText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>

          {recentSearches.length > 0 ? (
            recentSearches.map((item, index) => (
              <View key={index} style={styles.recentItem}>
                <TouchableOpacity style={styles.recentItemContent} onPress={() => handleRecentSearch(item)}>
                  <Ionicons name="time-outline" size={20} color="#999" />
                  <Text style={styles.recentText}>{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeRecentSearch(item)}>
                  <Ionicons name="close" size={20} color="#999" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noRecentText}>No recent searches</Text>
          )}

          <View style={styles.popularContainer}>
            <Text style={styles.popularTitle}>Popular Searches</Text>
            <View style={styles.tagsContainer}>
              {["Running", "Basketball", "Casual", "Limited Edition", "Sale"].map((tag, index) => (
                <TouchableOpacity key={index} style={styles.tagItem} onPress={() => handleRecentSearch(tag)}>
                  <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsList}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Ionicons name="search-outline" size={60} color="#DDD" />
          <Text style={styles.noResultsText}>No results found</Text>
          <Text style={styles.noResultsSubtext}>Try a different search term</Text>
        </View>
      )}

      <WhatsAppWidget phoneNumber="18499275780" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  backButton: {
    marginRight: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultsList: {
    padding: 16,
  },
  resultItem: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
  },
  resultImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  resultInfo: {
    flex: 1,
    marginLeft: 12,
  },
  resultName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  resultCategory: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  resultPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E32636",
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  recentContainer: {
    flex: 1,
    padding: 16,
  },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  clearText: {
    fontSize: 14,
    color: "#E32636",
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  recentItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  recentText: {
    fontSize: 14,
    marginLeft: 12,
  },
  noRecentText: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    marginBottom: 16,
  },
  popularContainer: {
    marginTop: 24,
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagItem: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
  },
})

export default SearchScreen

