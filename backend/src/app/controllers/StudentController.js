import { Op } from 'sequelize';
import * as Yup from 'yup';

import Student from '../models/Student';
import User from '../models/User';

class StudentController {
  async index(req, res) {
    const isUserAdmin = await User.findOne({
      where: { id: req.userId, is_admin: true },
    });

    if (!isUserAdmin) {
      return res.status(410).json({ error: 'User not authorized' });
    }

    const { student_name } = req.query;

    const students = student_name
      ? await Student.findAll({
          where: {
            name: {
              [Op.like]: `%${student_name}%`,
            },
          },
        })
      : await Student.findAll();
    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .required()
        .moreThan(14),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    const isUserAdmin = await User.findOne({
      where: { id: req.userId, is_admin: true },
    });

    if (!isUserAdmin) {
      return res.status(410).json({ error: 'User not authorized' });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists!' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );
    return res.json({ id, name, email, age, weight, height });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .required()
        .moreThan(14),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    const isUserAdmin = await User.findOne({
      where: { id: req.userId, is_admin: true },
    });

    if (!isUserAdmin) {
      return res.status(410).json({ error: 'User not authorized' });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id: student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist!' });
    }

    const { id, name, email, age, weight, height } = await student.update(
      req.body
    );

    return res.json({ id, name, email, age, weight, height });
  }

  async delete(req, res) {
    const isUserAdmin = await User.findOne({
      where: { id: req.userId, is_admin: true },
    });

    if (!isUserAdmin) {
      return res.status(410).json({ error: 'User not authorized' });
    }

    const { id: student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist!' });
    }

    student.destroy();

    return res.json();
  }
}

export default new StudentController();
