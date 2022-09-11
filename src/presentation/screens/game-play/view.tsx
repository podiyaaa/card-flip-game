import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  LayoutChangeEvent,
  LayoutRectangle,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {CardView} from '../../components';
import {useGamePlayScreenViewModel} from './view-model';

type GamePlayScreenProps = {};

const GamePlayScreen: React.FC<GamePlayScreenProps> = () => {
  const {
    cards,
    refresh,
    handleSelection,
    stayFlipped,
    disable,
    turns,
    isFinished,
  } = useGamePlayScreenViewModel();
  const [baseContainerFrame, setBaseContainerFrame] = useState<LayoutRectangle>(
    {height: 0, width: 0, x: 0, y: 0},
  );
  const {height, width} = useWindowDimensions();

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (isFinished) {
      Alert.alert('Congratulations!', `You win this game by ${turns} steps`, [
        {text: 'Try another round', style: 'default', onPress: refresh},
      ]);
    }
  }, [isFinished]);

  const onLayoutContainer = (event: LayoutChangeEvent) => {
    setBaseContainerFrame(event.nativeEvent.layout);
  };

  if (height < width) {
    return (
      <View style={styles.center}>
        <Text>Currently not supporting landscape.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.actionButtonsContainer}>
        <View style={styles.resetButtonContainer}>
          <Button title="Reset" onPress={refresh} />
        </View>
        <View style={styles.stepsButtonContainer}>
          <Text>STEPS {turns}</Text>
        </View>
      </View>
      <View style={styles.baseContainer} onLayout={onLayoutContainer}>
        {cards.map(card => {
          return (
            <CardView
              key={card.id}
              card={card}
              height={baseContainerFrame.height / 4}
              width={baseContainerFrame.width / 3}
              onPress={handleSelection}
              flipped={stayFlipped(card)}
              disabled={disable}
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
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resetButtonContainer: {marginLeft: 10},
  stepsButtonContainer: {marginRight: 20},
  baseContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    margin: 10,
  },
});
