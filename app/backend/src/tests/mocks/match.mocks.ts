const mockedNewResult = {
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

const mockedNewResultResponse = {
  ...mockedNewResult,
  id: 1,
  inProgress: false,
  homeTeamId: 16,
  awayTeamId: 8,
};

const mockedMatches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'Internacional',
    },
    awayTeam: {
      teamName: 'Santos',
    },
  },
];

export { mockedNewResult, mockedNewResultResponse, mockedMatches }