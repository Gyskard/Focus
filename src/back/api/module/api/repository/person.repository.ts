import { Request, Response } from 'express';

import Person from '../model/person.model';

type ParamsCreateUser = {
  first_name: string,
  last_name: string
};

type ParamsUpdateUser = ParamsCreateUser & {
  id: number,
  first_name: string,
  last_name: string
};

async function createPerson(req: Request, res: Response): Promise<Response> {
  if (!Object.hasOwn(req.body, 'first_name')) return res.status(400).send('Missing first name parameter');
  if (!Object.hasOwn(req.body, 'last_name')) return res.status(400).send('Missing last name parameter');
  if (typeof req.body.first_name !== 'string') return res.status(400).send('First name parameter not a string');
  if (typeof req.body.last_name !== 'string') return res.status(400).send('Last name parameter not a string');

  const params: ParamsCreateUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };

  const person = await Person.findOne({ where: params });
  if (person) return res.status(400).send('This person already exists');

  const newPerson = new Person(params);
  await newPerson.save();

  return res.sendStatus(201);
}

async function updatePerson(req: Request, res: Response): Promise<Response> {
  if (!Object.hasOwn(req.body, 'first_name')) return res.status(400).send('Missing first name parameter');
  if (!Object.hasOwn(req.body, 'last_name')) return res.status(400).send('Missing last name parameter');
  if (typeof req.body.first_name !== 'string') return res.status(400).send('First name parameter not a string');
  if (typeof req.body.last_name !== 'string') return res.status(400).send('Last name parameter not a string');
  if (!Object.hasOwn(req.params, 'id')) return res.status(400).send('Missing id parameter');

  const params: ParamsUpdateUser = {
    id: parseInt(req.params.id, 10),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };

  if (Number.isNaN(params.id)) return res.status(400).send('Person id not a number');

  const person = await Person.findOne({ where: { id: params.id } });

  if (!person) return res.status(400).send('Person not found');

  await person.update({ first_name: params.first_name, last_name: params.last_name });

  return res.sendStatus(200);
}

// async function getPerson
// async function deletePerson

export { createPerson, updatePerson };
