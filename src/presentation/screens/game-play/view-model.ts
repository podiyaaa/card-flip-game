import {useEffect, useState} from 'react';
import {Card} from '../../../domain/models';
import {randomNumbers, shuffleArray} from '../../../utils';

export function useGamePlayScreenViewModel() {
  const sixNumbers = randomNumbers(6);
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [selectionOne, setSelectionOne] = useState<Card | null>(null);
  const [selectionTwo, setSelectionTwo] = useState<Card | null>(null);
  const [disable, setDisable] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const refresh = () => {
    setTurns(0);
    setSelectionOne(null);
    setSelectionTwo(null);
    setDisable(false);
    setIsFinished(false);
    setTimeout(() => {
      var _cards = [...sixNumbers, ...sixNumbers].map((number, index) => {
        return {
          id: `${index}`,
          number: number,
          matched: false,
        } as Card;
      });
      _cards = shuffleArray(_cards);
      setCards(_cards);
    }, 400);
  };

  const incrementTurns = () => {
    setTurns(preTurns => preTurns + 1);
  };

  const handleSelection = (card: Card) => {
    incrementTurns();
    selectionOne ? setSelectionTwo(card) : setSelectionOne(card);
  };

  const stayFlipped = (card: Card) => {
    return card === selectionOne || card === selectionTwo || card.matched;
  };

  useEffect(() => {
    if (selectionOne && selectionTwo) {
      setDisable(true);
      if (selectionOne.number === selectionTwo.number) {
        setCards(preCards => {
          const newCards = preCards.map(card => {
            if (card.number === selectionOne.number) {
              return {...card, matched: true};
            } else {
              return card;
            }
          });
          return newCards;
        });
        resetSelection();
      } else {
        setTimeout(() => {
          resetSelection();
        }, 1000);
      }
    }
  }, [selectionOne, selectionTwo]);

  useEffect(() => {
    if (
      turns > 0 &&
      cards.filter(card => {
        return !card.matched;
      }).length === 0
    ) {
      setTimeout(() => {
        setIsFinished(true);
      }, 400);
    }
  }, [turns, cards]);

  const resetSelection = () => {
    setSelectionOne(null);
    setSelectionTwo(null);
    setDisable(false);
  };

  return {
    cards,
    refresh,
    turns,
    handleSelection,
    stayFlipped,
    disable,
    isFinished,
    selectionOne,
    selectionTwo,
  };
}
