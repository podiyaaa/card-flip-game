import {act, renderHook} from '@testing-library/react-hooks';
import expect from 'expect';
import {Card} from '../src/domain/models';
import {useGamePlayScreenViewModel} from '../src/presentation/screens/game-play/view-model';

describe('useGamePlayScreenViewModel', () => {
  it('initially card should be []', () => {
    const {result} = renderHook(useGamePlayScreenViewModel);
    expect(result.current.cards).toStrictEqual([]);
  });
  it('initially disable should be false', () => {
    const {result} = renderHook(useGamePlayScreenViewModel);
    expect(result.current.disable).toBe(false);
  });
  it('cards array length after refresh', async () => {
    const {result, waitForNextUpdate} = renderHook(useGamePlayScreenViewModel);
    act(() => {
      result.current.refresh();
    });
    await waitForNextUpdate();
    expect(result.current.cards.length).toEqual(12);
    expect(result.current.turns).toEqual(0);
  });
  it('turns count after refresh', async () => {
    const {result, waitForNextUpdate} = renderHook(useGamePlayScreenViewModel);
    act(() => {
      result.current.refresh();
    });
    await waitForNextUpdate();
    expect(result.current.turns).toEqual(0);
  });
  it('flip 1st card', async () => {
    const {result, waitForNextUpdate} = renderHook(useGamePlayScreenViewModel);
    act(() => {
      result.current.refresh();
      result.current.handleSelection(result.current.cards[0]);
    });
    await waitForNextUpdate();
    expect(result.current.turns).toEqual(1);
  });
  it('flip 1st and 2nd card', async () => {
    const {result, waitForNextUpdate} = renderHook(useGamePlayScreenViewModel);
    act(() => {
      result.current.refresh();
    });
    await waitForNextUpdate();
    const firstSelection = result.current.cards[0];
    const significantOther = result.current.cards.findIndex(card => {
      return (
        card.id !== result.current.cards[0].id &&
        card.number === result.current.cards[0].number
      );
    });
    const secondSelection = result.current.cards[significantOther];
    act(() => {
      result.current.handleSelection(firstSelection);
    });
    act(() => {
      result.current.handleSelection(secondSelection);
    });
  });

  it('selected card flipped', () => {
    const {result} = renderHook(useGamePlayScreenViewModel);
    var selectedCardOne = {id: '0', number: 23, matched: false} as Card;
    expect(result.current.stayFlipped(selectedCardOne)).toEqual(false);
    selectedCardOne = {id: '0', number: 23, matched: true} as Card;
    expect(result.current.stayFlipped(selectedCardOne)).toEqual(true);
  });
});
