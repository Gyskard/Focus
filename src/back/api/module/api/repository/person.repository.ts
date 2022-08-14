import { Request, Response } from 'express';

import Person from '../model/person.model';

type Params = {
  first_name: string,
  last_name: string
};

async function createPerson(req: Request, res: Response): Promise<Response> {
  if (!Object.hasOwn(req.body, 'first_name')) return res.status(400).send('Missing first name parameter');
  if (!Object.hasOwn(req.body, 'last_name')) return res.status(400).send('Missing last name parameter');
  if (typeof req.body.first_name !== 'string') return res.status(400).send('First name parameter not a string');
  if (typeof req.body.last_name !== 'string') return res.status(400).send('Last name parameter not a string');

  const params: Params = { first_name: req.body.first_name, last_name: req.body.last_name };

  const person = await Person.findOne({ where: params });
  if (person) return res.status(400).send('Person already exists');

  const newPerson = new Person(params);
  await newPerson.save();

  return res.sendStatus(201);
}

export default createPerson;
