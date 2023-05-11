export interface INewMatch {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
}

export interface IMatch extends INewMatch {
  id: number,
  inProgress: boolean,
}
