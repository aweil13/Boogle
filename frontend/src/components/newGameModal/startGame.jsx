import React from 'react';

const StartGame = ({openModal}) => {
    const modalLink = () => (
        <div className='start-game-container'>
            <button onClick={() => openModal('new-game')} className='submit game-rules-link'>START GAME</button>
        </div>
    )

    return (
        modalLink()
    )
}

export default StartGame;