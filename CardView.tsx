import {useRef} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import {Card} from './Models';

type CardViewProps = {
  card: Card;
  height: number;
  width: number;
};

const CardView: React.FC<CardViewProps> = ({card, height, width}) => {
  const animatedValue: Animated.Value = useRef(new Animated.Value(0)).current;
  var value: number = 0;
  animatedValue.addListener(obj => {
    value = obj.value;
  });
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

  const onPress = () => {
    if (value >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
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
      <Pressable onPress={onPress} style={styles.pressableContainer}>
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
