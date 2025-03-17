// Mock React Native components for web rendering
const ReactNativeMock = {
    View: 'div',
    Text: 'span',
    TouchableOpacity: 'button',
    ScrollView: 'div',
    StyleSheet: {
        create: (styles) => styles,
    },
    Platform: {
        OS: 'web',
        select: (obj) => obj.web || obj.default,
    },
    Dimensions: {
        get: () => ({
            width: typeof window !== 'undefined' ? window.innerWidth : 0,
            height: typeof window !== 'undefined' ? window.innerHeight : 0,
        }),
    },
    Animated: {
        View: 'div',
        createAnimatedComponent: (component) => component,
        timing: () => ({
            start: (callback) => {
                if (callback) callback({ finished: true });
            },
        }),
        Value: function (initialValue) {
            this.setValue = () => { };
            this.interpolate = () => ({ interpolate: () => ({}) });
            return initialValue;
        },
    },
    ActivityIndicator: 'div',
    Image: 'img',
    TextInput: 'input',
    FlatList: 'div',
    StatusBar: {
        setBarStyle: () => { },
        currentHeight: 0,
    },
};

// Mock for @expo/vector-icons
export const Ionicons = ({ name, size, color, ...props }) => {
    return {
        type: 'span',
        props: {
            className: `icon icon-${name}`,
            style: { fontSize: size, color },
            ...props,
        },
    };
};

export default ReactNativeMock; 