import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';

export const multerUpload = multer({ storage: multer.memoryStorage() });

export const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};