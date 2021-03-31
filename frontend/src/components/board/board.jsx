import React from 'react';
import '../../stylesheets/board.scss'
import '../../stylesheets/reset.scss';

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.boardTiles = this.boardTiles.bind(this);
    }

    boardTiles() {
        const tiles = [...Array(16).keys()];
        return (
            <ul className='tile-wrapper'>
                {tiles.map((tile, i) => (
                    <li 
                    key={`tile-${i}`}
                    className='tile tile-i'>
                        <p className='letter'>{`${tile}`}</p>
                    </li>
                ))}
            </ul>
        )
    }

    render() {
        return (
            <div className='main-wrapper'>
                <div className='info-wrapper'>
                    <div className='timer'>
                        <div className='timer-header'>Timer</div>
                        <div className='time'>0:00</div>
                    </div>
                    <div className='game-wrapper'>
                        <div className='game'> 
                            <h2 className='info-header'>Game Info</h2>
                            <div className='side-content'>Content</div>
                        </div>
                        <div className='board-wrapper'>
                            <h2>{this.boardTiles()}</h2>
                        </div>
                        <div className='score-board'>
                            <h2 className='info-header'>Leader Board</h2>
                            <div className='side-content'>Content</div>
                        </div>
                    </div>
                    <div className='word-bank'>
                        <h2 className='info-header'>Word Bank</h2>
                        <div className='words'>Words</div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Board;