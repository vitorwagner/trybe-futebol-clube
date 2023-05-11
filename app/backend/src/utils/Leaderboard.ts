import { ILeaderboardRow, IMatch, ITeam } from '../interfaces';
import LeaderboardRow from './LeaderboardRow';

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

// const matchesMock = [
//   {
//     id: 1,
//     homeTeamId: 16,
//     homeTeamGoals: 2,
//     awayTeamId: 8,
//     awayTeamGoals: 1,
//     inProgress: false,
//   },
//   {
//     id: 2,
//     homeTeamId: 9,
//     homeTeamGoals: 1,
//     awayTeamId: 14,
//     awayTeamGoals: 1,
//     inProgress: false,
//   },
// ];

// const teamsMock = [
//   {
//     id: 16,
//     teamName: 'Avaí/Kindermann',
//   },
//   {
//     id: 8,
//     teamName: 'Bahia',
//   },
//   {
//     id: 9,
//     teamName: 'Botafogo',
//   },
//   {
//     id: 14,
//     teamName: 'Corinthians',
//   },
// ];

class Leaderboard {
  static getHomeLeaderboard(matches: IMatch[], teams: ITeam[]): ILeaderboardRow[] {
    const leaderboard = teams.map((team) =>
      LeaderboardRow.createHomeLeaderboardRow(matches, team));
    return Leaderboard.sortLeaderboard(leaderboard);
  }

  static getAwayLeaderboard(matches: IMatch[], teams: ITeam[]): ILeaderboardRow[] {
    const leaderboard = teams.map((team) =>
      LeaderboardRow.createAwayLeaderboardRow(matches, team));
    return Leaderboard.sortLeaderboard(leaderboard);
  }

  static getFullLeaderboard(): ILeaderboardRow[] {
    return Leaderboard.sortLeaderboard(leaderboardMock);
  }

  static sortLeaderboard(leaderboard: ILeaderboardRow[]): ILeaderboardRow[] {
    return leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsOwn - a.goalsOwn);
  }
}

export default Leaderboard;
