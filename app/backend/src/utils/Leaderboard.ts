import { ILeaderboardRow, IMatch, ITeam } from '../interfaces';
import LeaderboardRow from './LeaderboardRow';

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

  static getFullLeaderboard(matches: IMatch[], teams: ITeam[]): ILeaderboardRow[] {
    const leaderboard = teams.map((team) =>
      LeaderboardRow.createFullLeaderboardRow(matches, team));
    return Leaderboard.sortLeaderboard(leaderboard);
  }

  static sortLeaderboard(leaderboard: ILeaderboardRow[]): ILeaderboardRow[] {
    return leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsOwn - a.goalsOwn);
  }
}

export default Leaderboard;
