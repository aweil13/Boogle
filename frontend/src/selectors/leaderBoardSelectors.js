import { createSelector } from 'reselect';

const selectLeaderBoard = state => state.leaderboard;
export const selectLeaderBoardArray = createSelector(selectLeaderBoard, 
  (leaderBoard) => Object.values(leaderBoard) 
);
