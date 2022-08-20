import { Request, Response } from 'express';

import Event from '../model/event.model';

type Params = {
  title: string,
  description?: string,
  localisation: string,
  date: Date
};

async function createPerson(req: Request, res: Response): Promise<Response> {
  if (!Object.hasOwn(req.body, 'title')) return res.status(400).send('Missing title parameter');
  if (!Object.hasOwn(req.body, 'localisation')) return res.status(400).send('Missing localisation parameter');
  if (!Object.hasOwn(req.body, 'date')) return res.status(400).send('Missing date parameter');
  if (typeof req.body.title !== 'string') return res.status(400).send('Title parameter not a string');
  if (typeof req.body.localisation !== 'string') return res.status(400).send('Localisation parameter not a string');
  if (typeof req.body.date !== 'string') return res.status(400).send('Date parameter not a string');

  // if (/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test((req.body.date)))
  // return res.status(400).send('Date parameter is incorrect');

  // check date not in future

  const params: Params = {
    title: req.body.title,
    localisation: req.body.localisation,
    date: req.body.date,
  };

  if (Object.hasOwn(req.body, 'description')) {
    if (typeof req.body.description !== 'string') return res.status(400).send('Description parameter not a string');
    params.description = req.body.description;
  }

  const event = await Event.findOne({ where: params });
  if (event) return res.status(400).send('This event already exists');

  const newEvent = new Event(params);
  await newEvent.save();

  return res.sendStatus(201);
}

export default createPerson;
