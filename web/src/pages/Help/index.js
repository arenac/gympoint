import React, { useState, useEffect } from 'react';

import Modal from './components/ReactModal';

import api from '~/services/api';

import { Container, Header, Content, HelpTable, AnswerButton } from './styles';

export default function Help() {
  const [helps, setHelps] = useState([]);
  const [modalData, setModalData] = useState({
    isOpen: false,
    question: '',
    idQuestion: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('help-orders');

      const data = response.data.map(help => {
        return {
          id: help.id,
          question: help.question,
          studentName: help.student.name,
        };
      });

      setHelps(data);
    }
    fetchData();
  }, []);

  function hadleInfosModal(help) {
    setModalData({
      isOpen: true,
      question: help.question,
      idQuestion: help.id,
    });
  }

  function removeHelpFromList({ helpId = null }) {
    if (helpId) {
      const _helps = helps.filter(item => item.id !== helpId);

      setHelps(_helps);
    }

    setModalData({
      isOpen: false,
    });
  }

  return (
    <Container>
      <Header>
        <p>Help List</p>
      </Header>
      <Content>
        <HelpTable>
          <thead>
            <tr>
              <th className="studentColumn">STUDENT</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {helps.map(help => (
              <tr key={help.id}>
                <td>{help.studentName}</td>
                <td align="right">
                  <AnswerButton
                    type="button"
                    onClick={() => hadleInfosModal(help)}
                  >
                    answer
                  </AnswerButton>
                </td>
              </tr>
            ))}
          </tbody>
        </HelpTable>
      </Content>
      {modalData.isOpen && (
        <Modal
          isOpen={modalData.isOpen}
          question={modalData.question}
          idQuestion={modalData.idQuestion}
          onRemoveHelpItem={removeHelpFromList}
        />
      )}
    </Container>
  );
}
