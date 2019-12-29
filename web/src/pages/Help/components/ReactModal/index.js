import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReactModal from 'react-modal';
import { Form, Input } from '@rocketseat/unform';
import { MdClose } from 'react-icons/md';

import { answerRequest } from '~/store/modules/help/actions';

import { Container, ButtonContainer } from './styles';

ReactModal.setAppElement('#root');

export default function Modal(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setQuestion(props.question);
    setIsOpen(props.isOpen);
  }, [props]);

  function closeModal({ answered = false }) {
    setIsOpen(false);
    if (answered) {
      props.onRemoveHelpItem(props.idQuestion);
    } else {
      props.onRemoveHelpItem({});
    }
  }

  function handleSubmit(data) {
    dispatch(answerRequest(props.idQuestion, data));
    const answered = true;
    closeModal({ answered });
  }

  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            zIndex: 5,
            backgroundColor: 'rgba(0,0,0,0.7)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '435px',
            background: '#fff',
          },
        }}
        contentLabel="Question Modal"
      >
        <Form onSubmit={handleSubmit}>
          <Container>
            <ButtonContainer>
              <button id="closeButton" type="button" onClick={closeModal}>
                <MdClose size="20px" />
              </button>
            </ButtonContainer>
            <div>Student question</div>
            <p>{question}</p>
            <div>Your answer</div>
            <Input multiline name="answer" />
            <button id="answerButton" type="submit">
              Answer student
            </button>
          </Container>
        </Form>
      </ReactModal>
    </div>
  );
}
