import * as Yup from 'yup';
import { IUser, IRepublic } from '@interfaces';

class RepublicValidator {
  async store(obj: object): Promise<{ republic: IRepublic, user: IUser }> {
    const schema = Yup.object().shape({
      republic: Yup.object().shape({
        name: Yup.string(),
        description: Yup.string(),
      }),
      user: Yup.object().shape({
        email: Yup.string().email(),
        password: Yup.string().min(8).max(16),
        firstName: Yup.string(),
        lastName: Yup.string(),
        phone: Yup.string(),
      }),

    });

    const body: { republic: IRepublic, user: IUser } = await schema.validate(obj);

    body.user.email = body.user.email.toLowerCase();

    return body;
  }

}

export default new RepublicValidator();
