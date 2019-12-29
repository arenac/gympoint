import * as Yup from 'yup';
import { addMonths, parseISO, isBefore, addDays } from 'date-fns';
import { Op } from 'sequelize';

import Enrollment from '../models/Enrollment';
import User from '../models/User';
import Plan from '../models/Plan';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import WellcomeEmail from '../jobs/WellcomeEmail';

const isUserAdmin = async id =>
  User.findOne({
    where: { id, is_admin: true },
  });

class EnrollmentController {
  async index(req, res) {
    if (!isUserAdmin(req.userId)) {
      return res.status(401).json({ error: 'User not authorized' });
    }

    const enrollments = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
    });

    return res.json(enrollments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required().Enrollmen,
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (!isUserAdmin(req.userId)) {
      return res.status(401).json({ error: 'User not authorized' });
    }

    const { student_id, plan_id, start_date } = req.body;

    if (isBefore(addDays(parseISO(start_date), 1), new Date())) {
      return res.status(400).json({ error: 'You can not start in the past' });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }
    const price = plan.price * plan.duration;
    const end_date = addMonths(parseISO(start_date), plan.duration);

    const { id } = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    const enrollment = await Enrollment.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email', 'age'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration'],
        },
      ],
    });

    Queue.add(WellcomeEmail.key, {
      enrollment,
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({});

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (!isUserAdmin(req.userId)) {
      return res.status(401).json({ error: 'User not authorized' });
    }

    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exists' });
    }

    const { student_id, plan_id, start_date } = req.body;

    if (isBefore(addDays(parseISO(start_date), 1), new Date())) {
      return res.status(400).json({ error: 'You can not start in the past' });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }
    const price = plan.price * plan.duration;
    const end_date = addMonths(parseISO(start_date), plan.duration);

    await enrollment.update({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    return res.json(enrollment);
  }

  async delete(req, res) {
    if (!isUserAdmin(req.userId)) {
      return res.status(401).json({ error: 'User not authorized' });
    }

    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exists' });
    }

    await enrollment.destroy();

    return res.json();
  }
}

export default new EnrollmentController();
