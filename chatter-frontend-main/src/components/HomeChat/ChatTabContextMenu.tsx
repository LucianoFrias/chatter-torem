import * as Menu from '@radix-ui/react-context-menu';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import Ticket from '../Ticket';
import { MockTicketData } from '../../utils/mockData';
import { TicketStatus } from '../../types/chat';

const Container = styled.div`
  background-color: #fff;
  border: 1px solid #eee;
  padding: 5px;
`;

const Item = styled(Menu.Item)`
  color: #000;
  padding: 3px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    color: #fff;
    background-color: #36dd81;
  }
`;

const ReworkedItem = styled.li`
  color: #000;
  padding: 3px;
  cursor: pointer;
  transition: 0.3s ease;
  list-style: none;

  &:hover{
    color: #fff;
    background-color: #36dd81;
  }
`


export default function ChatTabContextMenu() {

  const [showOpenTicketModal, setShowOpenTicketModal] = useState(false);
  const [showClosedTicketModal, setShowClosedTicketModal] = useState(false);


  const handleShowOpenTicket = () => {
    console.log('Opened ticket...');
    // TODO: Show open ticket component.
    setShowOpenTicketModal(true);
  };

  const handleShowClosedTicket = () => {
    console.log('Closed ticket...');
    // TODO: Show closed ticket component.
    setShowClosedTicketModal(true);
  };


  return (
    <Container>
      <ReworkedItem onClick={handleShowOpenTicket}> Ver ticket abierto</ReworkedItem>
      <Menu.Separator />
      <ReworkedItem onClick={handleShowClosedTicket}>Ver ticket cerrado</ReworkedItem>

      <Modal show={showOpenTicketModal} centered>
        <Modal.Body>
          <Ticket
            title={MockTicketData[0].title}
            description={MockTicketData[0].description}
            brand={MockTicketData[0].brand}
            tag={MockTicketData[0].tag}
            date={MockTicketData[0].date}
            priority={MockTicketData[0].priority}
            id={MockTicketData[0].id}
            status={MockTicketData[0].status} />
           
        </Modal.Body>
      </Modal>

      <Modal show={showClosedTicketModal} centered>
        <Modal.Body>
          <Ticket
          title={MockTicketData[1].title}
          description={MockTicketData[1].description}
          brand={MockTicketData[1].brand}
          tag={MockTicketData[1].tag}
          date={MockTicketData[1].date}
          priority={MockTicketData[1].priority}
          id={MockTicketData[1].id}
          status={MockTicketData[1].status} />
        </Modal.Body>
      </Modal>
    </Container>
  );
}
