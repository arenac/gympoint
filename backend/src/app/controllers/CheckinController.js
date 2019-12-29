import { Op } from 'sequelize';
import { subDays } from 'date-fns';
import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const { id: student_id } = req.params;
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id,
      },
      order: [['created_at', 'DESC']],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { id: student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const numCheckins = await Checkin.findAndCountAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    });

    if (numCheckins.count >= 5) {
      return res
        .status(400)
        .json({ error: 'You reach your limit of checkins' });
    }

    const chekin = await Checkin.create({
      student_id,
    });

    return res.json(chekin);
  }
}

export default new CheckinController();
