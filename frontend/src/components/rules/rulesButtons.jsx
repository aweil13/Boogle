import React from 'react'


const RulesButtons = ({openModal}) => {
    const modalLinks = () => (
        <>
            <button onClick={() => openModal('game-rules')} className='submit game-rules-link'>Game Rules</button>
            <button onClick={() => openModal('word-rules')} className='submit word-rules-link'>Input Rules</button>
        </>
    )

    return (
        modalLinks()
    )
}


export default RulesButtons;



