import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';
import path from 'path';
import * as Yup from 'yup';
import { User, Republic } from '@models';
import { IUser } from '@interfaces';
import { Mailer, Sms, Storage, Token } from '@utils';
import { UserValidator } from '@validators';

import {
  UserRepository,
  UserTokenRepository,
  RepublicRepository
} from '@repositories';


class UserController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const { profileImage, ...body } = await UserValidator.store(req.body);
      const { email } = body;

      const {user: userAuth} = req.body; 

      const emailAlreadyExists = await UserRepository.emailExists(
        email.toLowerCase()
      );

      if (emailAlreadyExists) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      let user: User = await UserRepository.store(body, userAuth.republic);

      if (profileImage) {
        const profileImageUrl = await Storage.uploadImg(profileImage, 'profile');
        await UserRepository.update(user.id, { profileImage: profileImageUrl });
      }

      user = await UserRepository.findOne({ where: { id: user.id } });

     

      return res.status(200).json(user);
    } catch (error) {
      console.log('UserController store error', error);

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

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { user: userAuth } = req.body;
      const { page = 0, itemsPerPage = 10 } = req.query;

      const user: User = await UserRepository.getById(+userAuth.id);

      const republic: Republic = await RepublicRepository.findOneById(user.republic);

      const users = await UserRepository.listUserByRepublic(republic.id, +page, +itemsPerPage )

      return res.status(200).json(users);
    } catch (error) {
      console.log('UserController getById error', error);

      if (error instanceof EntityNotFoundError)
        return res.status(404).json({ message: 'User not found', error });

      return res.status(500).json({ error });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;

      const user: User = await UserRepository.getById(+userId);


      return res.status(200).json({
        user: user
      });
    } catch (error) {
      console.log('UserController getById error', error);

      if (error instanceof EntityNotFoundError)
        return res.status(404).json({ message: 'User not found', error });

      return res.status(500).json({ error });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {

      const { user: userAuth, ...reqBody } = req.body;
      const {
        profileImage,
        ...body
      } = await UserValidator.update(reqBody);

      let user: User = await UserRepository.update(+userAuth.id, body);

      if (profileImage) {
        const profileImageUrl = await Storage.uploadImg(profileImage, 'profile');
        await UserRepository.update(user.id, { profileImage: profileImageUrl });
      }

      user = await UserRepository.findOne({ where: { id: user.id } });

      return res.status(200).json({ user });
    } catch (error) {
      console.log('UserController update error', error);

      if (error instanceof EntityNotFoundError)
        return res.status(404).json({ message: 'User not found', error });

      if (error instanceof Yup.ValidationError) {
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
      }

      return res.status(500).json({ message: error.message, error });
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = await UserValidator.signIn(req.body);

      const isValid = await UserRepository.signIn(email, password);

      if (!isValid)
        return res.status(400).json({ message: 'Invalid password' });

      const user = await UserRepository.findOneById(isValid);

      const republic: Republic = await RepublicRepository.findOneById(user.republic);

      const token: string = await Token.generateUserToken(isValid);

      return res.status(200).json({ userType: 'user', user, republic, token });
    } catch (error) {
      console.log('UserController sign in error', error);
      if (error instanceof EntityNotFoundError)
        return res.status(404).json({ message: 'User not found', error });
      return res.status(500).json({ error });
    }
  }

  async searchByName(req: Request, res: Response) {
    try {
      const { page = 0, itemsPerPage = 20, userName } = req.query;

      const { user } = req.body;

      if (!String(userName))
        return res.status(400).json({ message: 'userName must be provided' });

      const data = await UserRepository.searchByName(
        String(userName),
        +page,
        +itemsPerPage,
        user.id
      );

      return res.status(200).json(data);
    } catch (error) {
      console.log('UserController listJoinTypes error', error);
      return res.status(500).json({ error });
    }
  }

  async generateCode(req: Request, res: Response) {
    try {
      const { phone } = await UserValidator.genereateCode(req.body);
      let code: number;

      code = await UserTokenRepository.store();
      await Sms.sendTokenSms(phone, code);

      console.log('verify code:', code);
      return res.status(200).json({ message: 'Sent code' });
    } catch (error) {
      console.log('UserController generateCode error', error);

      if (error instanceof Yup.ValidationError) {
        return res.status(400).json({
          received: {
            ...error.value,
          },
          error: error.errors,
        });
      }

      return res.status(500).json({ error });
    }
  }

  async checkCodePassword(req: Request, res: Response) {
    try {
      const { email, phone, code } = await UserValidator.checkCode(req.body);

      if (email) {
        await UserRepository.checkCode(email, 'email', code);
      } else if (phone) {
        await UserRepository.checkCode(phone, 'phone', code);
      } else {
        return res
          .status(400)
          .json({ message: 'Email or phone must be provided' });
      }

      return res.status(200).json({ message: 'code validate' })

    } catch (error) {
      console.log('UserController checkCode error', error);

      if (error instanceof EntityNotFoundError)
        return res.status(404).json({ message: 'User not found', error });

      if (error instanceof Yup.ValidationError) {
        return res.status(400).json({
          received: {
            ...error.value,
          },
          error: error.errors,
        });
      }

      return res.status(500).json({ error });
    }
  }

  async checkCode(req: Request, res: Response) {
    try {
      const { code } = await UserValidator.checkCode(req.body);


      await UserTokenRepository.getById(code);

      return res.status(200).json({ message: 'Code verified' });
    } catch (error) {
      console.log('UserController checkCode error', error);

      if (error instanceof EntityNotFoundError)
        return res.status(404).json({ message: 'User not found', error });

      if (error instanceof Yup.ValidationError) {
        return res.status(400).json({
          received: {
            ...error.value,
          },
          error: error.errors,
        });
      }

      return res.status(500).json({ error });
    }
  }

  async sendResetPassword(req: Request, res: Response) {
    try {
      const { email, phone } = await UserValidator.genereateCode(req.body);
      let code: number;

      if (email) {
        code = await UserRepository.generateCode(email, 'email');

        const user = await UserRepository.findOne({ where: { email } });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const template = path.resolve(
          __dirname,
          '..',
          'views',
          'forgot_password.html'
        );

        // await Mailer.sendMail(
        //   template,
        //   {
        //     name: 'user.name',
        //     code,
        //   },
        //   'Go Boat - nova senha'
        // );
      } else if (phone) {
        code = await UserRepository.generateCode(phone, 'phone');
        await Sms.sendTokenSms(phone, code);
      } else {
        return res
          .status(400)
          .json({ message: 'Email or phone must be provided' });
      }

      console.log('verify code:', code);
      return res.status(200).json({ message: 'Sent code' });
    } catch (error) {
      console.log('UserController generateCode error', error);

      if (error instanceof Yup.ValidationError) {
        return res.status(400).json({
          received: {
            ...error.value,
          },
          error: error.errors,
        });
      }

      return res.status(500).json({ error });
    }
  }

  async checkPasswordCode(req: Request, res: Response) {
    try {
      const { email, phone, code } = await UserValidator.checkCode(req.body);

      if (email) {
        await UserRepository.checkCode(email, 'email', code);
      } else if (phone) {
        await UserRepository.checkCode(phone, 'phone', code);
      } else {
        return res
          .status(400)
          .json({ message: 'Email or phone must be provided' });
      }

      return res.status(200).json({ message: 'Code is valid' });
    } catch (error) {
      console.log('UserController checkCode error', error);

      if (error instanceof EntityNotFoundError)
        return res.status(404).json({ message: 'User not found', error });

      if (error instanceof Yup.ValidationError) {
        return res.status(400).json({
          received: {
            ...error.value,
          },
          error: error.errors,
        });
      }

      return res.status(500).json({ error });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { email, phone, code, password } =
        await UserValidator.resetPassword(req.body);

      let message: string;

      if (email) {
        message = await UserRepository.resetPassword(
          email,
          'email',
          code,
          password
        );
      } else if (phone) {
        message = await UserRepository.resetPassword(
          phone,
          'phone',
          code,
          password
        );
      } else {
        return res
          .status(400)
          .json({ message: 'Email or phone must be provided' });
      }

      return res.status(200).json({ message });
    } catch (error) {
      console.log('UserController resetPassword error', error);

      if (error instanceof EntityNotFoundError)
        return res.status(404).json({ message: 'User not found', error });

      if (error instanceof Yup.ValidationError) {
        return res.status(400).json({
          received: {
            ...error.value,
          },
          error: error.errors,
        });
      }

      return res.status(500).json({ error });
    }
  }

}

export default new UserController();
