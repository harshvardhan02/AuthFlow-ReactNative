import * as React from 'react';
import {
    StatusBar,
    Text,
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    Image,
    Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');
import MaskedView from '@react-native-community/masked-view';
import Svg, { Rect } from 'react-native-svg';
import { LinearGradient } from 'react-native-linear-gradient';

const BACKDROP_HEIGHT = height * 0.6;

export const Backdrop = ({ movies, scrollX }) => {
    return (
        <View style={{ position: 'absolute', width, height: BACKDROP_HEIGHT }}>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.key}
                renderItem={({ item, index }) => {
                    if (!item.backdrop) {
                        return null;
                    }

                    const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE];

                    const translateX = scrollX.interpolate({
                        inputRange,
                        outputRange: [-width, 0],
                    });
                    return (
                        <MaskedView
                            style={{ position: 'absolute' }}
                            maskElement={
                                <AnimatedSvg
                                    width={width}
                                    height={height}
                                    viewBox={`0 0 ${width} ${height}`}
                                    style={{ transform: [{ translateX }] }}
                                >
                                    <Rect x='0' y='0' width={width} height={height} fill='red' />
                                </AnimatedSvg>
                            }
                        >
                            <Image
                                source={{ uri: item.backdrop }}
                                style={{
                                    width,
                                    height: BACKDROP_HEIGHT,
                                    resizeMode: 'cover',
                                }}
                            />
                        </MaskedView>
                    );
                }}
            />
            <LinearGradient
                colors={['transparent', 'white']}
                style={{
                    width,
                    height: BACKDROP_HEIGHT,
                    position: 'absolute',
                    bottom: 0,
                }}
            />
        </View>
    );
};