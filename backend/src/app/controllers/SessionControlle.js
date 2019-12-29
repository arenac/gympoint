import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import Student from '../models/Student';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'Wrong password!' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async index(req, res) {
    const { id: student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    return res.json(student);
  }
}

export default new SessionController();
