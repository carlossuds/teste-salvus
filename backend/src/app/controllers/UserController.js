/* eslint-disable no-underscore-dangle */
import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      name: Yup.string().required(),
      birthday: Yup.date().required(),
      phone: Yup.string().required(),
      role: Yup.string().required(),
      experience: Yup.number().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const user = await User.create(req.body);

    return res.json(user);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      name: Yup.string().required(),
      birthday: Yup.date().required(),
      phone: Yup.string().required(),
      role: Yup.string().required(),
      experience: Yup.number().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      oldPassword: Yup.string().required().min(6),
      password: Yup.string().required().min(6),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }
    const { oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password doesnt match' });
    }

    if (!req.userId) return res.status(401).json('Non authorized');

    await user.update(req.body);

    return res.json(`${user.email}'s profile updated!`);
  }

  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  }

  async destroy(req, res) {
    const user = await User.findByPk(req.userId);

    if (!req.userId) return res.status(401).json('Non authorized');

    await user.destroy();

    return res.json({ msg: `User ${user.email} was deleted!` });
  }
}
export default new UserController();
