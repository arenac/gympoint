import Mail from '../../lib/Mail';

class HelpEmail {
  get key() {
    return 'HelpOrderEmail';
  }

  async handle({ data }) {
    const { help } = data;
    console.log('job: welcome email', help);
    await Mail.sendMail({
      to: `${help.student.name} <${help.student.email}>`,
      subject: 'Suport GymSpot',
      template: 'help',
      context: {
        student_name: help.student.name,
        question: help.question,
        answer: help.answer,
      },
    });
  }
}

export default new HelpEmail();
