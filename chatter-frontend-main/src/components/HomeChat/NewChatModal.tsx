import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import FormData from 'form-data';

import { ChatModalProps } from '../../types/chat';
import apiClient from '../../utils/client';
import { useAppSelector } from '../../redux/hooks';
import { getUser } from '../../redux/userSlice';

function NewChatModal(chatModalProps: ChatModalProps) {
  const { isOpen, setIsOpen } = chatModalProps;

  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [newChatName, setNewChatName] = useState<any | null>();

  const data = new FormData();
  const user = useAppSelector(getUser);

  const createChat = () => {
    data.append('name', newChatName);
    data.append('image', selectedImage);
    /*
        TODO:
        1. Create new chat and
        2. Update chats queue with getChatsData to display it
        3. Close popup with handleClose

        SOLUTION BELOW vvv
    */

        apiClient.post("chats", data, {
          headers: {
            'Authorization': "Bearer " + user.authToken,
            'Content-Type': 'multipart/form-data'
          }
        })

        .then(response => {
          // Chats will re-render when a new chat has been added.
          handleClose();

        })

        .catch(err => {
          console.log("There was an error!");
          
        })
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChatName(e.target.value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal className="text-chatter-black" show={isOpen} centered>
      <Modal.Header className="justify-content-center">
        <Modal.Title>Agregar Nuevo Chat</Modal.Title>
      </Modal.Header>

      <Modal.Body className="justify-content-center text-center">
        <input
          type="text"
          placeholder="Ingrese Nombre y Apellido"
          className="form-control mb-3"
          onChange={handleNameChange}
        />
        <input
          type="file"
          placeholder="Subir foto de perfil"
          className="form-control"
          onChange={handleImageChange}
        />
      </Modal.Body>

      <Modal.Footer className="justify-content-center">
        <button className="btn btn-green bg-chatter-blue text-white px-4" onClick={createChat}>
          Agregar
        </button>
        <button className="btn btn-secondary px-4" onClick={handleClose}>
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewChatModal;
