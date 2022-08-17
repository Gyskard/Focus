import { Request, Response } from 'express';

import Person from '../model/person.model';

type ParamsCreateUser = {
  first_name: string,
  last_name: string
};

type ParamsUpdateUser = ParamsCreateUser & {
  new_first_name: string,
  new_last_name: string
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
  if (!Object.hasOwn(req.body, 'new_first_name')) return res.status(400).send('Missing new first name parameter');
  if (!Object.hasOwn(req.body, 'new_last_name')) return res.status(400).send('Missing new last name parameter');
  if (typeof req.body.new_first_name !== 'string') return res.status(400).send('New first name parameter not a string');
  if (typeof req.body.new_last_name !== 'string') return res.status(400).send('New last name parameter not a string');
  if (req.params.name.split('+').length !== 2) return res.status(400).send('Name parameter is incorrect');

  const queryString: ParamsCreateUser = { first_name: '', last_name: '' };
  [queryString.first_name, queryString.last_name] = req.params.name.split('+');

  if (queryString.first_name.length === 0) return res.status(400).send('Missing first name parameter');
  if (queryString.last_name.length === 0) return res.status(400).send('Missing last name parameter');

  const params: ParamsUpdateUser = {
    first_name: req.params.name.split('+')[0],
    last_name: req.params.name.split('+')[1],
    new_first_name: req.body.new_first_name,
    new_last_name: req.body.new_last_name,
  };

  const person = await Person.findOne({
    where: {
      first_name: params.first_name,
      last_name: params.last_name,
    },
  });

  if (!person) return res.status(400).send('This person doesn\'t exist');

  await person.update({ first_name: params.new_first_name, last_name: params.new_last_name });

  return res.sendStatus(200);
}

export { createPerson, updatePerson };
