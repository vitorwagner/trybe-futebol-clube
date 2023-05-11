/* eslint-disable max-lines-per-function */
import { ILeaderboardRow, IMatch, ITeam } from '../interfaces';

const leaderboardMock = [
  {
    name: 'Palmeiras',
    totalPoints: 13,
    totalGames: 5,
    totalVictories: 4,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 17,
    goalsOwn: 5,
    goalsBalance: 12,
    efficiency: 86.67,
  },
  {
    name: 'Corinthians',
    totalPoints: 15,
    totalGames: 5,
    totalVictories: 4,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 12,
    goalsOwn: 3,
    goalsBalance: 9,
    efficiency: 80,
  },
];

class LeaderboardRow {
  static createHomeLeaderboardRow(matches: IMatch[], team: ITeam): ILeaderboardRow {
    const matchesPlayed = matches.filter((match) => match.homeTeamId === team.id);
    const matchesWon = matchesPlayed.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
    const matchesDrawn = matchesPlayed.filter((match) =>
      match.homeTeamGoals === match.awayTeamGoals);
    const matchesLost = matchesPlayed.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
    const goalsFavor = matchesPlayed.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    const goalsOwn = matchesPlayed.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    const totalPoints = (matchesWon.length * 3 + matchesDrawn.length);
    const efficiency = Number(((totalPoints / (matchesPlayed.length * 3)) * 100).toFixed(2));

    return {
      name: team.teamName,
      totalPoints,
      totalGames: matchesPlayed.length,
      totalVictories: matchesWon.length,
      totalDraws: matchesDrawn.length,
      totalLosses: matchesLost.length,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency,
    };
  }

  static createAwayLeaderboardRow(): ILeaderboardRow { return leaderboardMock[1]; }
  static createFullLeaderboardRow(): ILeaderboardRow { return leaderboardMock[0]; }
}

export default LeaderboardRow;
