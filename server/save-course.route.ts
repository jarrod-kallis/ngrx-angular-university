import { Request, Response } from 'express';

import { COURSES } from './db-data';

export function saveCourse(req: Request, res: Response) {

  const id = req.params['id'],
    changes = req.body;

  console.log('Saving course ...', id);

  COURSES[id] = {
    ...COURSES[id],
    ...changes
  };

  setTimeout(() => {
    // res.status(500).json({message: 'A fake error has occurred' });
    res.status(200).json(COURSES[id]);
  }, 2000);
}
