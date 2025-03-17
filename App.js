import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar,
    FlatList
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Main Shop Screen
function ShopScreen({ navigation }) {
    const [activeCategory, setActiveCategory] = useState('Run');

    const categories = [
        'Run', 'Athletic', 'Hot Deals', 'Exclusive'
    ];

    const products = [
        {
            id: '1',
            title: 'LIGHTWEIGHT RUNNING',
            subtitle: 'CASUAL SNEAKERS SHOE',
            price: '$250.00',
            size: 'MAN SNEAKERS - 7,8',
            isNew: true,
            image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: '2',
            title: 'ATHLETIC PERFORMANCE',
            subtitle: 'BLACK SPORTS SHOE',
            price: '$180.00',
            size: 'MAN SNEAKERS - 8,9',
            isNew: true,
            image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>SHOP</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="search" size={22} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Cart')}
                    >
                        <Ionicons name="cart-outline" size={22} color="white" />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>2</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Categories */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesContainer}
                    contentContainerStyle={styles.categoriesContent}
                >
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryButton,
                                activeCategory === category && styles.categoryButtonActive
                            ]}
                            onPress={() => setActiveCategory(category)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    activeCategory === category && styles.categoryTextActive
                                ]}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <View style={styles.heroContent}>
                        <Text style={styles.heroTitle}>ELEVATE YOUR LOOK WITH A FRESH, NEW STYLE</Text>
                        <TouchableOpacity style={styles.getStartedButton}>
                            <Text style={styles.getStartedText}>GET STARTED</Text>
                            <Ionicons name="arrow-forward" size={18} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* New Arrivals */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>New Arrivals</Text>

                    <FlatList
                        data={products}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.productCard}
                                onPress={() => navigation.navigate('ProductDetail', { product: item })}
                            >
                                <View style={styles.productImageContainer}>
                                    {item.isNew && (
                                        <View style={styles.newBadge}>
                                            <Text style={styles.newBadgeText}>New</Text>
                                        </View>
                                    )}
                                    <TouchableOpacity style={styles.favoriteButton}>
                                        <Ionicons name="heart-outline" size={22} color="black" />
                                    </TouchableOpacity>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.productImage}
                                        resizeMode="cover"
                                    />
                                </View>
                                <View style={styles.productInfo}>
                                    <Text style={styles.productTitle}>{item.title}</Text>
                                    <Text style={styles.productSubtitle}>{item.subtitle}</Text>
                                    <View style={styles.productMeta}>
                                        <Text style={styles.productPrice}>{item.price}</Text>
                                        <Text style={styles.productSize}>{item.size}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}
                        numColumns={1}
                        contentContainerStyle={styles.productList}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Product Detail Screen
function ProductDetailScreen({ route, navigation }) {
    const { product } = route.params || {
        title: 'LIGHTWEIGHT RUNNING',
        subtitle: 'CASUAL SNEAKERS SHOE',
        price: '$250.00',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.detailHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.detailHeaderTitle}>Details</Text>
                <TouchableOpacity>
                    <Ionicons name="share-social-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.detailContent}>
                {/* Product Title */}
                <Text style={styles.detailTitle}>LIGHTWEIGHT RUNNING - CASUAL SHOES SNEAKERS</Text>

                {/* Rating */}
                <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map(star => (
                        <Ionicons key={star} name="star" size={16} color="gold" />
                    ))}
                    <Text style={styles.reviewCount}>(45 Reviews)</Text>
                </View>

                {/* Product Image */}
                <View style={styles.detailImageContainer}>
                    <Image
                        source={{ uri: product.image }}
                        style={styles.detailImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Description */}
                <View style={styles.descriptionContainer}>
                    <View style={styles.descriptionHeader}>
                        <Text style={styles.descriptionTitle}>Description</Text>
                        <View style={styles.colorOptions}>
                            <View style={[styles.colorOption, styles.blackColor]} />
                            <View style={[styles.colorOption, styles.redColor]} />
                        </View>
                    </View>

                    <Text style={styles.descriptionText}>
                        Shoe Island Player-X Trendy White Lightweight Running Sports Boys Men Casual Shoes Sneakers For Men. Classic. Perfection. In-live.
                    </Text>
                    <Text style={styles.descriptionText}>
                        Flaunt a minimalistic and stylish statement as you adorn this pair of sneakers by Shoe Island. Featuring a synthetic upper material that ensures comfort and breathability.
                    </Text>
                </View>

                {/* Product Details */}
                <View style={styles.productDetailsContainer}>
                    <Text style={styles.productDetailsTitle}>Product Details</Text>
                    <View style={styles.productDetailsItem}>
                        <Text style={styles.productDetailsLabel}>Brand</Text>
                        <Text style={styles.productDetailsValue}>Shoe Island</Text>
                    </View>
                    <View style={styles.productDetailsItem}>
                        <Text style={styles.productDetailsLabel}>Material</Text>
                        <Text style={styles.productDetailsValue}>Synthetic</Text>
                    </View>
                    <View style={styles.productDetailsItem}>
                        <Text style={styles.productDetailsLabel}>Available Sizes</Text>
                        <Text style={styles.productDetailsValue}>7, 8, 9, 10</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Add to Cart Button */}
            <View style={styles.addToCartContainer}>
                <Text style={styles.detailPrice}>{product.price}</Text>
                <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => navigation.navigate('Cart')}
                >
                    <Text style={styles.addToCartText}>Add to cart</Text>
                    <Ionicons name="cart-outline" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// Shopping Cart Screen
function CartScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.cartHeaderLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.cartHeaderTitle}>Shopping Cart</Text>
                </View>
                <View style={styles.cartIconContainer}>
                    <Ionicons name="cart-outline" size={24} color="white" />
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>2</Text>
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.cartContent}>
                <Text style={styles.cartSectionTitle}>Your Items</Text>

                {/* Cart Items */}
                <View style={styles.cartItem}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }}
                        style={styles.cartItemImage}
                        resizeMode="cover"
                    />
                    <View style={styles.cartItemDetails}>
                        <View style={styles.cartItemHeader}>
                            <Text style={styles.cartItemTitle}>LIGHTWEIGHT RUNNING</Text>
                            <TouchableOpacity>
                                <Ionicons name="close" size={18} color="#777" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.cartItemVariants}>Size: 8 | Color: White/Navy</Text>
                        <View style={styles.cartItemFooter}>
                            <View style={styles.quantityControl}>
                                <TouchableOpacity style={styles.quantityButton}>
                                    <Text style={styles.quantityButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityValue}>1</Text>
                                <TouchableOpacity style={styles.quantityButton}>
                                    <Text style={styles.quantityButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.cartItemPrice}>$250.00</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.cartItem}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }}
                        style={styles.cartItemImage}
                        resizeMode="cover"
                    />
                    <View style={styles.cartItemDetails}>
                        <View style={styles.cartItemHeader}>
                            <Text style={styles.cartItemTitle}>ATHLETIC PERFORMANCE</Text>
                            <TouchableOpacity>
                                <Ionicons name="close" size={18} color="#777" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.cartItemVariants}>Size: 9 | Color: Black</Text>
                        <View style={styles.cartItemFooter}>
                            <View style={styles.quantityControl}>
                                <TouchableOpacity style={styles.quantityButton}>
                                    <Text style={styles.quantityButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityValue}>1</Text>
                                <TouchableOpacity style={styles.quantityButton}>
                                    <Text style={styles.quantityButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.cartItemPrice}>$180.00</Text>
                        </View>
                    </View>
                </View>

                {/* Order Summary */}
                <View style={styles.orderSummary}>
                    <Text style={styles.orderSummaryTitle}>Order Summary</Text>
                    <View style={styles.orderSummaryItem}>
                        <Text style={styles.orderSummaryLabel}>Subtotal</Text>
                        <Text style={styles.orderSummaryValue}>$430.00</Text>
                    </View>
                    <View style={styles.orderSummaryItem}>
                        <Text style={styles.orderSummaryLabel}>Shipping</Text>
                        <Text style={styles.orderSummaryValue}>$10.00</Text>
                    </View>
                    <View style={styles.orderSummaryItem}>
                        <Text style={styles.orderSummaryLabel}>Tax</Text>
                        <Text style={styles.orderSummaryValue}>$43.00</Text>
                    </View>
                    <View style={styles.orderTotal}>
                        <Text style={styles.orderTotalLabel}>Total</Text>
                        <Text style={styles.orderTotalValue}>$483.00</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Checkout Button */}
            <View style={styles.checkoutContainer}>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// Navigation Stack
const Stack = createStackNavigator();

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <StatusBar barStyle="light-content" backgroundColor="#000" />
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Shop" component={ShopScreen} />
                    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                    <Stack.Screen name="Cart" component={CartScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    // Header styles
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#000',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 0.5,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#333',
        marginLeft: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#E32636',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    // Categories styles
    categoriesContainer: {
        paddingHorizontal: 12,
        marginVertical: 16,
    },
    categoriesContent: {
        paddingRight: 12,
    },
    categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#e5e5e5',
        marginHorizontal: 4,
    },
    categoryButtonActive: {
        backgroundColor: '#000',
    },
    categoryText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    categoryTextActive: {
        color: 'white',
    },
    // Hero section styles
    heroSection: {
        backgroundColor: '#E32636',
        padding: 20,
        marginHorizontal: 15,
        borderRadius: 16,
        marginBottom: 20,
    },
    heroContent: {
        width: '100%',
    },
    heroTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    getStartedButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignSelf: 'flex-start',
    },
    getStartedText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 8,
    },
    // Section styles
    sectionContainer: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    // Product styles
    productList: {
        paddingBottom: 16,
    },
    productCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    productImageContainer: {
        position: 'relative',
        width: '100%',
        height: 200,
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    newBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: '#E32636',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        zIndex: 1,
    },
    newBadgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    favoriteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1,
    },
    productInfo: {
        padding: 16,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productSubtitle: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    productMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productSize: {
        fontSize: 12,
        color: '#777',
    },
    // Detail screen styles
    detailHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
    },
    detailHeaderTitle: {
        fontSize: 18,
        fontWeight: '500',
    },
    detailContent: {
        padding: 16,
    },
    detailTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    reviewCount: {
        fontSize: 12,
        color: '#777',
        marginLeft: 8,
    },
    detailImageContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    detailImage: {
        width: '100%',
        height: 250,
    },
    descriptionContainer: {
        marginBottom: 16,
    },
    descriptionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    descriptionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    colorOptions: {
        flexDirection: 'row',
    },
    colorOption: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'white',
    },
    blackColor: {
        backgroundColor: 'black',
        position: 'absolute',
        right: 12,
    },
    redColor: {
        backgroundColor: '#E32636',
    },
    descriptionText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
        marginBottom: 8,
    },
    productDetailsContainer: {
        marginBottom: 100,
    },
    productDetailsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    productDetailsItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    productDetailsLabel: {
        fontSize: 14,
        color: '#666',
    },
    productDetailsValue: {
        fontSize: 14,
        fontWeight: '500',
    },
    addToCartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    detailPrice: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    addToCartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E32636',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
    },
    addToCartText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        marginRight: 8,
    },
    // Cart screen styles
    cartHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartHeaderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 12,
    },
    cartIconContainer: {
        position: 'relative',
    },
    cartContent: {
        padding: 16,
    },
    cartSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 16,
        marginBottom: 12,
    },
    cartItemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    cartItemDetails: {
        flex: 1,
        marginLeft: 12,
    },
    cartItemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    cartItemTitle: {
        fontWeight: 'bold',
    },
    cartItemVariants: {
        fontSize: 12,
        color: '#777',
    },
    cartItemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        overflow: 'hidden',
    },
    quantityButton: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    quantityButtonText: {
        fontWeight: '500',
    },
    quantityValue: {
        paddingHorizontal: 12,
    },
    cartItemPrice: {
        fontWeight: 'bold',
    },
    orderSummary: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        marginBottom: 100,
        marginTop: 8,
    },
    orderSummaryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    orderSummaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    orderSummaryLabel: {
        color: '#666',
    },
    orderTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 12,
        marginTop: 8,
    },
    orderTotalLabel: {
        fontWeight: 'bold',
    },
    orderTotalValue: {
        fontWeight: 'bold',
    },
    checkoutContainer: {
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    checkoutButton: {
        backgroundColor: '#E32636',
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
}); 