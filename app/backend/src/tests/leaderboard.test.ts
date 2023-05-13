import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Leaderboard from '../utils/Leaderboard';

import { mockedLeaderboard, mockedUtilsLeaderboard } from './mocks/leaderboard.mocks';
import mockedTeams from './mocks/teams.mocks';
import { mockedMatches } from './mocks/match.mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests /leaderboard endpoints', async () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Should return the home leaderboard', async () => {
    sinon.stub(Leaderboard, 'getHomeLeaderboard').resolves(mockedLeaderboard);

    const response = await chai.request(app).get('/leaderboard/home');

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(mockedLeaderboard);
  });

  it('Should return the away leaderboard', async () => {
    sinon.stub(Leaderboard, 'getAwayLeaderboard').resolves(mockedLeaderboard);

    const response = await chai.request(app).get('/leaderboard/away');

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(mockedLeaderboard);
  });

  it('Should return the full leaderboard', async () => {
    sinon.stub(Leaderboard, 'getFullLeaderboard').resolves(mockedLeaderboard);

    const response = await chai.request(app).get('/leaderboard');

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(mockedLeaderboard);
  });
});

describe('Tests leaderboard utils', async () => {
  it('Should return the home leaderboard', async () => {
    const leaderboard = Leaderboard.getHomeLeaderboard(mockedMatches, mockedTeams);

    expect(leaderboard).to.be.deep.eq(mockedUtilsLeaderboard);
  });

  it('Should return the away leaderboard', async () => {
    const leaderboard = Leaderboard.getAwayLeaderboard(mockedMatches, mockedTeams);

    expect(leaderboard).to.be.deep.eq(mockedUtilsLeaderboard);
  });

  it('Should return the full leaderboard', async () => {
    const leaderboard = Leaderboard.getFullLeaderboard(mockedMatches, mockedTeams);

    expect(leaderboard).to.be.deep.eq(mockedUtilsLeaderboard);
  });
});
