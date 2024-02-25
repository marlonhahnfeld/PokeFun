import { useState } from "react";
    const [score, setScore] = useState(0);
    const [roundDone, setRoundDone] = useState(true);
    const [isClickable, setIsClickable] = useState(true);
    const [lastFetchTime, setLastFetchTime] = useState(0);    
    const [isMarked1, setIsMarked1] = useState(false);
    const [isMarked2, setIsMarked2] = useState(false);
    const [isMarked3, setIsMarked3] = useState(false);    

export const checkClickEligibility = () => {
    const currentTime = new Date().getTime();
    if (!isClickable || currentTime - lastFetchTime < 1000) {
      return false;
    }
    setLastFetchTime(currentTime);
    setIsClickable(false);
    return true;
  };
  
  export const applyColorToCards = () => {
    const pokemonCardContainers = document.querySelectorAll('.container');
    pokemonCardContainers.forEach((container, index) => {
      const canPokeLearnMove = eval(`canPoke${index + 1}LearnMove`);
      container.classList.add(canPokeLearnMove ? 'green-mark' : 'red-mark');
    });
  };
  
  export const handleCorrectAnswer = () => {
    setScore(score + 1);
    setTimeout(() => {
      setRoundDone((prev) => !prev);
      setIsClickable(true);
      setIsMarked1(false);
      setIsMarked2(false);
      setIsMarked3(false);
      const pokemonCardContainers = document.querySelectorAll('.container');
      pokemonCardContainers.forEach((container) => {
        container.classList.remove('green-mark', 'red-mark');
      });
    }, 2000);
  };

  export const handleIncorrectAnswer = () => {
    setScore(0);
    setTimeout(() => {
      setRoundDone((prev) => !prev);
      setIsClickable(true);
      setIsMarked1(false);
      setIsMarked2(false);
      setIsMarked3(false);
      const pokemonCardContainers = document.querySelectorAll('.container');
      pokemonCardContainers.forEach((container) => {
        container.classList.remove('green-mark', 'red-mark');
      });
    }, 2000);
  };