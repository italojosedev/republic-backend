import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';
import path from 'path';
import * as Yup from 'yup';
import { Republic} from '@models';
import { Mailer, Sms, Storage, Token } from '@utils';
import { RepublicValidator } from '@validators';

import {
  RepublicRepository,
  UserRepository,
} from '@repositories';

import Stripe from 'stripe';

class RepublicController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      let { republic, user } = await RepublicValidator.store(req.body);

      const {email} = user;

      const emailAlreadyExists = await UserRepository.emailExists(
        email.toLowerCase()
      );

      if (emailAlreadyExists) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      republic = await RepublicRepository.store({ ...republic });

      republic = await RepublicRepository.findOne({ where: { id: republic.id } });

      const  userCreated = await UserRepository.store({
        ...user,
        isAdmin: true,
        isActived: true
      }, republic.id)

      // const token = await Token.generateRepublicToken(republic.id);

      return res.status(201).json({ user, republic });
    } catch (error) {
      console.log('RepublicController store error', error);

      if (error instanceof Yup.ValidationError)
        return res.status(400).json({
          received: {
            ...error.value,
            password: error.value.password
              ? '[WARNING] ommited for security'
              : undefined,
            profileImage: error.value.profileImage
              ? 'Image received (ex: image.png)'
              : undefined,
          },
          error: error.errors,
        });

      return res.status(500).json({ message: error.message, error });
    }
  }



}

export default new RepublicController();
