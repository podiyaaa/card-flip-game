import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {randomNumbers, shuffleArray} from './Utils';

interface Card {
  id: string;
  number: number;
}

type GamePlayScreenProps = {};

function useGamePlayScreenViewModel() {
  const sixNumbers = randomNumbers(6);
  const [cards, setCards] = useState<Card[]>([]);
  const refresh = () => {
    var _cards = [...sixNumbers, ...sixNumbers].map((number, index) => {
      return {id: `${index}`, number: number} as Card;
    });
    _cards = shuffleArray(_cards);
    setCards(_cards);
  };
  return {
    cards,
    refresh,
  };
}

const GamePlayScreen = ({}: GamePlayScreenProps) => {
  const {cards, refresh} = useGamePlayScreenViewModel();

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.baseContainer}>
        {cards.map(card => {
          return (
            <View
              key={card.id}
              style={{
                width: 50,
                height: 50,
                backgroundColor: 'yellow',
                borderWidth: 2,
                borderColor: 'white',
              }}>
              <Text>{card.number}</Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default GamePlayScreen;

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  baseContainer: {flex: 1, backgroundColor: 'green'},
});
