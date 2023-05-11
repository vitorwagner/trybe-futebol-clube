import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const getAllStub = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeamId": 9,
    "homeTeamGoals": 1,
    "awayTeamId": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Internacional"
    },
    "awayTeam": {
      "teamName": "Santos"
    }
  },
];

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
  }
);
