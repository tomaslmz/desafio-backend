import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validate = 
  (schema: AnyZodObject) => 
    async(req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.parseAsync({
          body: req.body,
          params: req.params,
          query: req.query
        });

        return next();
      } catch(err: any) {
        const errorMessage = JSON.parse(err.message);
        console.log(errorMessage);
        return res.status(400).json({
          status: 'Bad request!',
          message: errorMessage[0].message,
        });
      }
    };

export default validate;