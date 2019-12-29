import * as Yup from 'yup';
import Plan from '../models/Plan';
import User from '../models/User';

const isUserAdmin = async id =>
  User.findOne({
    where: { id, is_admin: true },
  });

class PlanController {
  async index(req, res) {
    if (!isUserAdmin(req.userId)) {
      return res.status(401).json({ error: 'User not authorized' });
    }

    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
      oder: ['created_at'],
    });

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (!isUserAdmin(req.userId)) {
      return res.status(401).json({ error: 'User not authorized' });
    }

    const { title, duration, price } = req.body;

    const plan = await Plan.create({ title, duration, price });

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (!isUserAdmin(req.userId)) {
      return res.status(401).json({ error: 'User not authorized' });
    }

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Item not found' });
    }

    const { title, duration, price } = await plan.update(req.body);

    return res.json({ title, duration, price });
  }

  async delete(req, res) {
    if (!isUserAdmin(req.userId)) {
      return res.status(401).json({ error: 'User not authorized' });
    }

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Item not found' });
    }

    await plan.destroy();

    return res.json();
  }
}
export default new PlanController();
