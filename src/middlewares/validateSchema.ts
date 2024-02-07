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
        
        return res.status(400).json({
          status: 'Bad request!',
          message: `É necessário um(a) ${errorMessage[0].path[1]} válido(a)!`,
        });
      }
    };

export default validate;