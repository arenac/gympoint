import { format, parseISO } from 'date-fns';
import en from 'date-fns/locale/en-US';
import Mail from '../../lib/Mail';

class WellcomeEmail {
  get key() {
    return 'WellcomeEmail';
  }

  async handle({ data }) {
    const { enrollment } = data;
    console.log('job: welcome email');
    await Mail.sendMail({
      to: `${enrollment.student.name} <${enrollment.student.email}>`,
      subject: 'Wellcome to GymSpot',
      template: 'wellcome',
      context: {
        student_name: enrollment.student.name,
        student_age: enrollment.student.age,
        plan_duration: enrollment.plan.duration,
        plan_name: enrollment.plan.title,
        total_price: enrollment.price,
        start_date: format(parseISO(enrollment.start_date), 'yyyy-MM-dd', {
          locale: en,
        }),
      },
    });
  }
}

export default new WellcomeEmail();
