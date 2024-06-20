import '../../stylesheets/reset.css';
import '../../stylesheets/tile.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetSelected } from '../../actions/boardActions';

function Tile ({ letter, position, boardOps }) {
  const [gameActive, setGameActive] = useState(false);
  const [selected, setSelected] = useState(false);
  const tileRef = useRef(null);
  const dispatch = useDispatch();

  const reset = useSelector (state => state.board.resetSelected);
  const socket = useSelector (state => state.socket.socket);

  useEffect( () => {
    if (!socket) return;
    socket.on("startGame", () => setGameActive(true));
    socket.on("endGame", () => setGameActive(false));
    return () => {
      socket.off("startGame", () => setGameActive(true));
      socket.off("endGame", () => setGameActive(false));
    }
  }, [socket]);

  if (reset && selected) setSelected(false);

  const handlePointerLeave = e => {
    // if (([0,   4,  8, 12].includes(position) && (e.nativeEvent.offsetX < 0)) || //exit left side
    //     ([0,   1,  2,  3].includes(position) && (e.nativeEvent.offsetY < 0)) || //exit top
    //     ([3,   7, 11, 15].includes(position) && (e.nativeEvent.offsetX >  e.currentTarget.offsetWidth)) || //exit right
    //     ([12, 13, 14, 15].includes(position) && (e.nativeEvent.offsetY >= e.currentTarget.offsetHeight))) //exit bottom
    if (([0,   4,  8, 12].includes(position) && (e.offsetX < 0)) || //exit left side
        ([0,   1,  2,  3].includes(position) && (e.offsetY < 0)) || //exit top
        ([3,   7, 11, 15].includes(position) && (e.offsetX >  e.currentTarget.offsetWidth)) || //exit right
        ([12, 13, 14, 15].includes(position) && (e.offsetY >= e.currentTarget.offsetHeight))) //exit bottom
    {
      boardOps.handlePointerLeaveBoard();
    }
    else
      boardOps.handlePointerLeaveTile(position, setSelected);
  }

  const handlePointer = e => {
    e.preventDefault(); 
    e.stopPropagation();
    switch (e.type) {
      // On touchscreens with direct manipulation, `pointerdown` causes implicit
      // pointer capture that causes the target to capture all other pointer
      // events as if they were firing over the target. This continues until the
      // capture is released after `pointerup`. See
      // https://w3c.github.io/pointerevents/#dfn-implicit-pointer-capture. 
      // To prevent this behavior, we need to release the capture.
      case "pointerdown":
        if (e.target.hasPointerCapture(e.pointerId)) e.target.releasePointerCapture(e.pointerId);
        boardOps.handlePointerEvent(e.type, letter, position, selected, setSelected);
        break;
      case "pointerenter":
        boardOps.handlePointerEvent(e.type, letter, position, selected, setSelected);
        break;
      case "pointerup":
        boardOps.handlePointerUp(position, selected);
        break;
      case "pointerleave":
        handlePointerLeave(e);
        break;
      default:
        console.error("Unknown pointer event");
        break;
    }
  }

  useEffect(() => {
    // Specify position because only need to dispatch once
    if (reset && position === 0) dispatch(resetSelected(false))
  }, [reset, position, dispatch]);
 
  useEffect(() => {
    if (!gameActive) return;
    // Assign tileRef.current to variable so the clean-up function will close 
    // over the correct reference and not rely on the mutable `.current`.
    const tile = tileRef.current;
    const pointerEvents = ["pointerdown", "pointerenter", "pointerup", "pointerleave"];
    pointerEvents.forEach ((pointerEvent) => {
      tile.addEventListener(pointerEvent, handlePointer, { passive: false });
    })

    return (() => {
      pointerEvents.forEach ((pointerEvent) => {
        tile.removeEventListener(pointerEvent, handlePointer);
      })
    });
  });

  return (
    <li  ref={tileRef}
      className={'tile' + (selected ? ' selected' : '')}
    >
      <p className='letter'>{letter}</p>
    </li>
  )
}

export default Tile;
