import React, {useEffect, useState} from 'react';
import {
  LayoutChangeEvent,
  LayoutRectangle,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import CardView from './CardView';
import {useGamePlayScreenViewModel} from './Hooks';

type GamePlayScreenProps = {};

const GamePlayScreen: React.FC<GamePlayScreenProps> = () => {
  const {cards, refresh, handleSelection, stayFliped, dissable} =
    useGamePlayScreenViewModel();
  const [baseContainerFrame, setBaseContainerFrame] = useState<LayoutRectangle>(
    {height: 0, width: 0, x: 0, y: 0},
  );
  const {height, width} = useWindowDimensions();
  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLayoutContainer = (event: LayoutChangeEvent) => {
    setBaseContainerFrame(event.nativeEvent.layout);
  };

  console.log(cards);

  if (height < width) {
    return (
      <View style={styles.center}>
        <Text>Currently not supporting landscape.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.baseContainer} onLayout={onLayoutContainer}>
        {cards.map(card => {
          return (
            <CardView
              key={card.id}
              card={card}
              height={baseContainerFrame.height / 4}
              width={baseContainerFrame.width / 3}
              onPress={handleSelection}
              fliped={stayFliped(card)}
              diabled={dissable}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default GamePlayScreen;

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  baseContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    margin: 10,
  },
});
