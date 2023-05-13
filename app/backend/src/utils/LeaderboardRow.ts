import { ILeaderboardRow, IMatch, ITeam, IStats } from '../interfaces';

class LeaderboardRow {
  static createHomeLeaderboardRow(matches: IMatch[], team: ITeam): ILeaderboardRow {
    const matchesPlayed = matches.filter((match) => match.homeTeamId === team.id);
    const stats = LeaderboardRow.getHomeTeamStats(matchesPlayed);

    return {
      name: team.teamName,
      ...stats,
    };
  }

  static getHomeTeamStats(matchesPlayed: IMatch[]): IStats {
    const matchesWon = matchesPlayed.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
    const matchesDrawn = matchesPlayed.filter((m) => m.homeTeamGoals === m.awayTeamGoals);
    const matchesLost = matchesPlayed.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
    const goalsFavor = matchesPlayed.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    const goalsOwn = matchesPlayed.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    const totalPoints = (matchesWon.length * 3 + matchesDrawn.length);
    const efficiency = Number(((totalPoints / (matchesPlayed.length * 3)) * 100).toFixed(2));
    return {
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

  static createAwayLeaderboardRow(matches: IMatch[], team: ITeam): ILeaderboardRow {
    const matchesPlayed = matches.filter((match) => match.awayTeamId === team.id);
    const stats = LeaderboardRow.getAwayTeamStats(matchesPlayed);

    return {
      name: team.teamName,
      ...stats,
    };
  }

  static getAwayTeamStats(matchesPlayed: IMatch[]): IStats {
    const matchesWon = matchesPlayed.filter((match) => match.awayTeamGoals > match.homeTeamGoals);
    const matchesDrawn = matchesPlayed.filter((m) => m.awayTeamGoals === m.homeTeamGoals);
    const matchesLost = matchesPlayed.filter((match) => match.awayTeamGoals < match.homeTeamGoals);
    const goalsFavor = matchesPlayed.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    const goalsOwn = matchesPlayed.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    const totalPoints = (matchesWon.length * 3 + matchesDrawn.length);
    const efficiency = Number(((totalPoints / (matchesPlayed.length * 3)) * 100).toFixed(2));
    return {
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

  static createFullLeaderboardRow(matches: IMatch[], team: ITeam): ILeaderboardRow {
    const homeMatchesPlayed = matches.filter((match) => match.homeTeamId === team.id);
    const awayMatchesPlayed = matches.filter((match) => match.awayTeamId === team.id);
    const stats = LeaderboardRow.getFullTeamStats(homeMatchesPlayed, awayMatchesPlayed);

    return {
      name: team.teamName,
      ...stats,
    };
  }

  static getFullTeamStats(homeMatchesPlayed: IMatch[], awayMatchesPlayed: IMatch[]): IStats {
    const homeStats = LeaderboardRow.getHomeTeamStats(homeMatchesPlayed);
    const awayStats = LeaderboardRow.getAwayTeamStats(awayMatchesPlayed);
    const totalPoints = homeStats.totalPoints + awayStats.totalPoints;
    const totalGames = homeStats.totalGames + awayStats.totalGames;
    const totalLosses = homeStats.totalLosses + awayStats.totalLosses;
    const goalsFavor = homeStats.goalsFavor + awayStats.goalsFavor;
    const goalsOwn = homeStats.goalsOwn + awayStats.goalsOwn;
    return {
      totalPoints,
      totalGames,
      totalVictories: homeStats.totalVictories + awayStats.totalVictories,
      totalDraws: homeStats.totalDraws + awayStats.totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: Number(((totalPoints / ((totalGames) * 3)) * 100).toFixed(2)),
    };
  }
}

export default LeaderboardRow;
