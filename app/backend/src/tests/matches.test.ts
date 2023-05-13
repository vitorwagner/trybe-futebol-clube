import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match.model';
import * as jsonwebtoken from 'jsonwebtoken';

import { mockedPayload, mockedToken } from './mocks/user.mocks';
import { mockedNewResult, mockedNewResultResponse } from './mocks/match.mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const getAllStub = [
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

const getByIdStub = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
};

const createStub = {
    homeTeamId: 16,
    awayTeamId: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
};

describe('Tests /matches GET endpoint', async () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Should return an array of matches', async () => {
    sinon.stub(Match, 'findAll').resolves(getAllStub as unknown as Match[]);

    const response = await chai.request(app).get('/matches');

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(getAllStub);
  });

  it('Should return an array of matches with inProgress = true', async () => {
    sinon.stub(Match, 'findAll').resolves(getAllStub as unknown as Match[]);

    const response = await chai.request(app).get('/matches?inProgress=true');

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(getAllStub);
  });
});

describe('Tests /matches POST endpoint', async () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Should return a match', async () => {
    sinon.stub(Match, 'create').resolves(getByIdStub as unknown as Match);
    sinon.stub(jsonwebtoken, 'verify').resolves(mockedPayload);


    const response = await chai
    .request(app)
    .post('/matches')
    .set({ "Authorization": mockedToken })
    .send(createStub);

    expect(response.status).to.be.eq(201);
    expect(response.body).to.be.deep.eq(getByIdStub);
  });
});

describe('Tests /matches/:id PATCH endpoint', async () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Should return a match', async () => {
    sinon.stub(Match, 'update').resolves([1]);
    sinon.stub(jsonwebtoken, 'verify').resolves(mockedPayload);

    const response = await chai
    .request(app)
    .patch('/matches/1')
    .set({ "Authorization": mockedToken })
    .send(mockedNewResult);

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(mockedNewResultResponse);
  });

  it('Should return a 404 error', async () => {
    sinon.stub(Match, 'update').resolves([0]);
    sinon.stub(jsonwebtoken, 'verify').resolves(mockedPayload);

    const response = await chai
    .request(app)
    .patch('/matches/777')
    .set({ "Authorization": mockedToken })
    .send(mockedNewResult);

    expect(response.status).to.be.eq(404);
    expect(response.body).to.be.deep.eq({ message: 'Match not found' });
  });
});

describe('Tests /matches/:id/finish PATCH endpoint', async () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Should return a message', async () => {
    sinon.stub(Match, 'update').resolves([1]);
    sinon.stub(jsonwebtoken, 'verify').resolves(mockedPayload);

    const response = await chai
    .request(app)
    .patch('/matches/1/finish')
    .set({ "Authorization": mockedToken });

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq({ message: 'Finished' });
  });

  it('Should return a 404 error', async () => {
    sinon.stub(Match, 'update').resolves([0]);
    sinon.stub(jsonwebtoken, 'verify').resolves(mockedPayload);

    const response = await chai
    .request(app)
    .patch('/matches/777/finish')
    .set({ "Authorization": mockedToken });

    expect(response.status).to.be.eq(404);
    expect(response.body).to.be.deep.eq({ message: 'Match not found' });
  });
});
