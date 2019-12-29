import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpQuestionController {
  async index(req, res) {
    const { id: student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const helps = await HelpOrder.findAll({
      where: { student_id },
      order: [['created_at', 'DESC']],
    });

    return res.json(helps);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id: student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const { question } = req.body;

    const help = await HelpOrder.create({
      student_id,
      question,
    });

    return res.json(help);
  }
}

export default new HelpQuestionController();
