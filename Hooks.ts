import {useEffect, useState} from 'react';
import {Card} from './Models';
import {randomNumbers, shuffleArray} from './Utils';

export function useGamePlayScreenViewModel() {
  const sixNumbers = randomNumbers(6);
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [selectionOne, setSelectionOne] = useState<Card | null>(null);
  const [selectionTwo, setSelectionTwo] = useState<Card | null>(null);
  const [dissable, setDissable] = useState<boolean>(false);
  const refresh = () => {
    var _cards = [...sixNumbers, ...sixNumbers].map((number, index) => {
      return {id: `${index}`, number: number, matched: false} as Card;
    });
    _cards = shuffleArray(_cards);
    setCards(_cards);
    setTurns(0);
  };
  const increementTurns = () => {
    setTurns(preTurns => preTurns + 1);
  };
  const handleSelection = (card: Card) => {
    increementTurns();
    selectionOne ? setSelectionTwo(card) : setSelectionOne(card);
  };
  const stayFliped = (card: Card) => {
    return card === selectionOne || card === selectionTwo || card.matched;
  };

  useEffect(() => {
    if (selectionOne && selectionTwo) {
      setDissable(true);
      if (selectionOne.number === selectionTwo.number) {
        setCards(preCards => {
          return preCards.map(card => {
            if (card.number === selectionOne.number) {
              return {...card, matched: true};
            } else {
              return card;
            }
          });
        });
        resetSelection();
      } else {
        setTimeout(() => {
          resetSelection();
        }, 1000);
      }
    }
  }, [selectionOne, selectionTwo]);
  const resetSelection = () => {
    setSelectionOne(null);
    setSelectionTwo(null);
    setDissable(false);
  };
  return {
    cards,
    refresh,
    turns,
    handleSelection,
    stayFliped,
    dissable,
  };
}
