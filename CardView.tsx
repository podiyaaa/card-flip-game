import {useEffect, useRef} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import {Card} from './Models';

type CardViewProps = {
  card: Card;
  height: number;
  width: number;
  onPress: (card: Card) => void;
  fliped: boolean;
  diabled: boolean;
};

const CardView: React.FC<CardViewProps> = ({
  card,
  height,
  width,
  onPress,
  fliped,
  diabled,
}) => {
  const animatedValue: Animated.Value = useRef(new Animated.Value(0)).current;
  const frontInterpolate: Animated.AnimatedInterpolation =
    animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });

  const backInterpolate: Animated.AnimatedInterpolation =
    animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });

  useEffect(() => {
    if (fliped) {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fliped]);

  const onPressView = () => {
    console.log(card);
    if (diabled || fliped) {
      return;
    }
    onPress(card);
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <View
      style={[
        styles.baseContainer,
        {
          width: width,
          height: height,
        },
      ]}>
      {/*eslint-disable-next-line react/react-in-jsx-scope*/}
      <Pressable onPress={onPressView} style={styles.pressableContainer}>
        {/*eslint-disable-next-line react/react-in-jsx-scope*/}
        <Animated.View
          style={[styles.backCard, {transform: [{rotateY: backInterpolate}]}]}>
          {/*eslint-disable-next-line react/react-in-jsx-scope*/}
          <Text>{card.number}</Text>
        </Animated.View>
        {/*eslint-disable-next-line react/react-in-jsx-scope*/}
        <Animated.View
          style={[
            styles.frontCard,
            {
              transform: [{rotateY: frontInterpolate}],
            },
          ]}
        />
      </Pressable>
    </View>
  );
};

export default CardView;

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: 'white',
  },
  pressableContainer: {
    width: '92%',
    height: '94%',
    margin: 5,
  },
  backCard: {
    width: '100%',
    height: '100%',
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    backfaceVisibility: 'hidden',
  },
  frontCard: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    backfaceVisibility: 'hidden',
  },
});
