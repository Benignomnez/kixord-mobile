"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, FlatList, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

// Sample review data
const sampleReviews = [
  {
    id: "1",
    user: "John D.",
    avatar:
      "https://sjc.microlink.io/65rnUpQJ8Yb-aVCAUoWLMRYyEiaYnxi4yW1A8F-XCYIl_-LOsw1sQ8f9cCR0Xjo18CvBduno7zQUu2cgS5gSwg.jpeg",
    rating: 5,
    date: "March 10, 2025",
    title: "Amazing quality and comfort!",
    comment:
      "These sneakers are incredibly comfortable and stylish. The quality is top-notch and they look even better in person. Highly recommend!",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tenni.jpg-MxNLFNOPIGovX9C0oQCK3qzVF35Zxd.jpeg"],
    helpful: 12,
  },
  {
    id: "2",
    user: "Sarah M.",
    avatar:
      "https://sjc.microlink.io/65rnUpQJ8Yb-aVCAUoWLMRYyEiaYnxi4yW1A8F-XCYIl_-LOsw1sQ8f9cCR0Xjo18CvBduno7zQUu2cgS5gSwg.jpeg",
    rating: 4,
    date: "March 5, 2025",
    title: "Great shoes, runs a bit small",
    comment:
      "Love these sneakers! The design is beautiful and they're very well made. Just a heads up that they run a bit small, so I'd recommend sizing up.",
    images: [],
    helpful: 8,
  },
  {
    id: "3",
    user: "Michael T.",
    avatar:
      "https://sjc.microlink.io/65rnUpQJ8Yb-aVCAUoWLMRYyEiaYnxi4yW1A8F-XCYIl_-LOsw1sQ8f9cCR0Xjo18CvBduno7zQUu2cgS5gSwg.jpeg",
    rating: 5,
    date: "February 28, 2025",
    title: "Perfect for everyday wear",
    comment:
      "I've been wearing these almost daily for the past month and they still look brand new. Super comfortable for all-day wear and they go with everything.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tenni.jpg-MxNLFNOPIGovX9C0oQCK3qzVF35Zxd.jpeg",
      "https://sjc.microlink.io/65rnUpQJ8Yb-aVCAUoWLMRYyEiaYnxi4yW1A8F-XCYIl_-LOsw1sQ8f9cCR0Xjo18CvBduno7zQUu2cgS5gSwg.jpeg",
    ],
    helpful: 15,
  },
]

interface ProductReviewProps {
  productId: string
}

const ProductReview: React.FC<ProductReviewProps> = ({ productId }) => {
  const [reviews, setReviews] = useState(sampleReviews)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [newReview, setNewReview] = useState({
    title: "",
    comment: "",
    rating: 0,
  })
  const [selectedImage, setSelectedImage] = useState(null)

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((total, review) => total + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0] // 5 stars to 1 star

    reviews.forEach((review) => {
      distribution[5 - review.rating]++
    })

    return distribution
  }

  const getFilteredReviews = () => {
    if (selectedFilter === "all") return reviews
    return reviews.filter((review) => review.rating === Number.parseInt(selectedFilter))
  }

  const handleMarkHelpful = (reviewId) => {
    setReviews(reviews.map((review) => (review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review)))
  }

  const handleSubmitReview = () => {
    if (newReview.rating === 0 || !newReview.comment) {
      // Show error
      return
    }

    const newReviewObj = {
      id: (reviews.length + 1).toString(),
      user: "You",
      avatar:
        "https://sjc.microlink.io/65rnUpQJ8Yb-aVCAUoWLMRYyEiaYnxi4yW1A8F-XCYIl_-LOsw1sQ8f9cCR0Xjo18CvBduno7zQUu2cgS5gSwg.jpeg",
      rating: newReview.rating,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      title: newReview.title || "Review",
      comment: newReview.comment,
      images: [],
      helpful: 0,
    }

    setReviews([newReviewObj, ...reviews])
    setNewReview({ title: "", comment: "", rating: 0 })
    setShowWriteReview(false)
  }

  const renderStars = (rating) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? "star" : "star-outline"}
            size={16}
            color={star <= rating ? "#FFD700" : "#CCC"}
            style={{ marginRight: 2 }}
          />
        ))}
      </View>
    )
  }

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: item.avatar }} style={styles.reviewerAvatar} />
        <View style={styles.reviewerInfo}>
          <Text style={styles.reviewerName}>{item.user}</Text>
          <Text style={styles.reviewDate}>{item.date}</Text>
        </View>
        {renderStars(item.rating)}
      </View>

      <Text style={styles.reviewTitle}>{item.title}</Text>
      <Text style={styles.reviewComment}>{item.comment}</Text>

      {item.images.length > 0 && (
        <View style={styles.reviewImages}>
          {item.images.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedImage(image)}>
              <Image source={{ uri: image }} style={styles.reviewImage} />
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.reviewActions}>
        <TouchableOpacity style={styles.helpfulButton} onPress={() => handleMarkHelpful(item.id)}>
          <Ionicons name="thumbs-up-outline" size={16} color="#666" />
          <Text style={styles.helpfulText}>Helpful ({item.helpful})</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  const renderRatingBar = (starCount, count) => {
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0

    return (
      <View style={styles.ratingBarContainer}>
        <Text style={styles.ratingBarLabel}>{starCount}</Text>
        <View style={styles.ratingBarTrack}>
          <View style={[styles.ratingBarFill, { width: `${percentage}%` }]} />
        </View>
        <Text style={styles.ratingBarCount}>{count}</Text>
      </View>
    )
  }

  const renderWriteReviewModal = () => (
    <Modal visible={showWriteReview} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Write a Review</Text>
            <TouchableOpacity onPress={() => setShowWriteReview(false)}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.ratingSelector}>
            <Text style={styles.ratingLabel}>Your Rating</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setNewReview({ ...newReview, rating: star })}>
                  <Ionicons
                    name={star <= newReview.rating ? "star" : "star-outline"}
                    size={24}
                    color={star <= newReview.rating ? "#FFD700" : "#CCC"}
                    style={{ marginRight: 4 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Title (Optional)</Text>
            <TextInput
              style={styles.input}
              value={newReview.title}
              onChangeText={(text) => setNewReview({ ...newReview, title: text })}
              placeholder="Summarize your review"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Review</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={newReview.comment}
              onChangeText={(text) => setNewReview({ ...newReview, comment: text })}
              placeholder="Tell others about your experience with this product"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )

  const renderImageModal = () => (
    <Modal visible={selectedImage !== null} transparent={true} animationType="fade">
      <View style={styles.imageModalContainer}>
        <TouchableOpacity style={styles.imageModalCloseButton} onPress={() => setSelectedImage(null)}>
          <Ionicons name="close" size={24} color="#FFF" />
        </TouchableOpacity>
        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />}
      </View>
    </Modal>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Customer Reviews</Text>

      <View style={styles.summaryContainer}>
        <View style={styles.ratingOverview}>
          <Text style={styles.averageRating}>{calculateAverageRating()}</Text>
          {renderStars(Math.round(Number.parseFloat(calculateAverageRating())))}
          <Text style={styles.totalReviews}>Based on {reviews.length} reviews</Text>
        </View>

        <View style={styles.ratingDistribution}>
          {getRatingDistribution().map((count, index) => (
            <TouchableOpacity key={5 - index} onPress={() => setSelectedFilter((5 - index).toString())}>
              {renderRatingBar(5 - index, count)}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === "all" && styles.activeFilterButton]}
            onPress={() => setSelectedFilter("all")}
          >
            <Text style={[styles.filterButtonText, selectedFilter === "all" && styles.activeFilterButtonText]}>
              All
            </Text>
          </TouchableOpacity>

          {[5, 4, 3, 2, 1].map((rating) => (
            <TouchableOpacity
              key={rating}
              style={[styles.filterButton, selectedFilter === rating.toString() && styles.activeFilterButton]}
              onPress={() => setSelectedFilter(rating.toString())}
            >
              <Text
                style={[styles.filterButtonText, selectedFilter === rating.toString() && styles.activeFilterButtonText]}
              >
                {rating} Star
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.writeReviewButton} onPress={() => setShowWriteReview(true)}>
        <Ionicons name="create-outline" size={20} color="#FFF" />
        <Text style={styles.writeReviewButtonText}>Write a Review</Text>
      </TouchableOpacity>

      {getFilteredReviews().length > 0 ? (
        <>
          {showAllReviews ? (
            <FlatList
              data={getFilteredReviews()}
              renderItem={renderReviewItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.reviewsList}
            />
          ) : (
            <>
              {renderReviewItem({ item: getFilteredReviews()[0] })}
              {getFilteredReviews().length > 1 && (
                <TouchableOpacity style={styles.showMoreButton} onPress={() => setShowAllReviews(true)}>
                  <Text style={styles.showMoreButtonText}>Show All {getFilteredReviews().length} Reviews</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </>
      ) : (
        <View style={styles.noReviewsContainer}>
          <Text style={styles.noReviewsText}>No reviews yet</Text>
          <Text style={styles.noReviewsSubtext}>Be the first to review this product</Text>
        </View>
      )}

      {renderWriteReviewModal()}
      {renderImageModal()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  summaryContainer: {
    flexDirection: "row",
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  ratingOverview: {
    alignItems: "center",
    marginRight: 20,
  },
  averageRating: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  totalReviews: {
    fontSize: 12,
    color: "#666",
  },
  ratingDistribution: {
    flex: 1,
  },
  ratingBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  ratingBarLabel: {
    fontSize: 12,
    width: 20,
    marginRight: 8,
  },
  ratingBarTrack: {
    flex: 1,
    height: 8,
    backgroundColor: "#EEE",
    borderRadius: 4,
    overflow: "hidden",
  },
  ratingBarFill: {
    height: "100%",
    backgroundColor: "#FFD700",
  },
  ratingBarCount: {
    fontSize: 12,
    width: 20,
    textAlign: "right",
    marginLeft: 8,
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: "#E32636",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#333",
  },
  activeFilterButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  writeReviewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E32636",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 20,
  },
  writeReviewButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  reviewsList: {
    paddingBottom: 16,
  },
  reviewItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: "#666",
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewImages: {
    flexDirection: "row",
    marginBottom: 12,
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
  reviewActions: {
    flexDirection: "row",
  },
  helpfulButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#F0F0F0",
    borderRadius: 16,
  },
  helpfulText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  showMoreButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  showMoreButtonText: {
    fontSize: 14,
    color: "#E32636",
    fontWeight: "bold",
  },
  noReviewsContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  noReviewsText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  noReviewsSubtext: {
    fontSize: 14,
    color: "#666",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ratingSelector: {
    marginBottom: 16,
  },
  ratingLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#E32636",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageModalCloseButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  fullImage: {
    width: "100%",
    height: "80%",
  },
})

export default ProductReview

