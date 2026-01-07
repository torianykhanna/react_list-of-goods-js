import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import goodsFromServer from './api/goods.json';
import { ButtonsPanel } from './components/ButtonsPanel';
import { GoodsList } from './components/GoodsList';

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isResetVisible, setIsResetVisible] = useState(false);

  const [isAlphabetActive, setIsAlphabetActive] = useState(false);
  const [isLengthActive, setIsLengthActive] = useState(false);
  const [isReverseActive, setIsReverseActive] = useState(false);

  const handleSortAlphabetically = () => {
    setGoods(prev =>
      [...prev].sort((a, b) =>
        isReverseActive ? b.localeCompare(a) : a.localeCompare(b)),);

    setIsAlphabetActive(true);
    setIsResetVisible(true);
  };

  const handleSortByLength = () => {
    setGoods(prev =>
      [...prev].sort((a, b) =>
        isReverseActive ? b.length - a.length : a.length - b.length,),);

    setIsLengthActive(true);
    setIsResetVisible(true);
  };

  const handleReverse = () => {
    setGoods(prev => [...prev].reverse());
    setIsReverseActive(prev => !prev);

    if (isReverseActive && !isAlphabetActive && !isLengthActive) {
      setIsResetVisible(false);
    } else {
      setIsResetVisible(true);
    }
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setIsAlphabetActive(false);
    setIsLengthActive(false);
    setIsReverseActive(false);
    setIsResetVisible(false);
  };

  return (
    <div className="section content">
      <ButtonsPanel
        onSortAlphabetically={handleSortAlphabetically}
        onSortByLength={handleSortByLength}
        onReverse={handleReverse}
        onReset={handleReset}
        isResetVisible={isResetVisible}
        isAlphabetActive={isAlphabetActive}
        isLengthActive={isLengthActive}
        isReverseActive={isReverseActive}
      />

      <GoodsList goods={goods} />
    </div>
  );
};
