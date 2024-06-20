import '../../stylesheets/wordBank.css';
import { useEffect, useRef } from 'react';

function WordBank ({currentWord, foundWords, submit }) {
  const sortedFoundWords = Object.keys(foundWords).sort();
  const wordDisplayEl = useRef(null);

  // Keep the current word scrolled to the end of the word
  useEffect(() => {
    if (currentWord.length > 10) {
       wordDisplayEl.current.scrollLeft = (currentWord.length - 10) * 20;
    }
  }, [currentWord]);

  const validSubmit = currentWord.length >= 3;
  const validClear = currentWord.length !== 0;

  return (
    <div className='game'> 
        <h2 className='info-header'>Word Bank</h2>
        <div className='side-content box'>
            <div className='words'>
                <li className='info-header active-word'>
                  <button 
                    className={`submit-word${validSubmit ? '' : ' invalid'}`} 
                    onClick={validSubmit ? submit : undefined}
                  >
                    ✔
                  </button>
                  <span className='word-display' ref={wordDisplayEl}>{currentWord}</span>
                  <button 
                    className={`clear-word${validClear ? '' : ' invalid'}`} 
                    onClick={validClear ? ()=>submit({ submit: false }) : undefined}
                  >
                    X
                  </button>
                </li> 
                <ul className='word-box'>
                    {sortedFoundWords.map((foundWord, i) => (
                        <li key={`foundWord-${i}`} 
                            className='found-words'>{foundWord}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default WordBank
