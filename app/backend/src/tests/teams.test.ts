import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team.model';


import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const getAllStub = [
  {
    id: 1,
    teamName: 'Team 1',
  },
  {
    id: 2,
    teamName: 'Team 2',
  },
];

describe('Tests /teams GET endpoint', async () => {

  afterEach(() => {
    sinon.restore();
  });

  it('Should return an array of teams', async () => {
    sinon.stub(Team, 'findAll').resolves(getAllStub as Team[]);

    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(getAllStub);
  });
});

const getByIdStub = {
  id: 1,
  teamName: 'Team 1',
};

describe('Tests /teams/:id GET endpoint', async () => {
  
    afterEach(() => {
      sinon.restore();
    });
  
    it('Should return a team', async () => {
      sinon.stub(Team, 'findByPk').resolves(getByIdStub as Team);
  
      const response = await chai.request(app).get('/teams/1');
  
      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq(getByIdStub);
    });
  
    it('Should return a 404 status when team is not found', async () => {
      sinon.stub(Team, 'findByPk').resolves(null);
  
      const response = await chai.request(app).get('/teams/1');
  
      expect(response.status).to.be.eq(404);
      expect(response.body).to.be.deep.eq({ message: 'Team not found' });
    });
  }
);
