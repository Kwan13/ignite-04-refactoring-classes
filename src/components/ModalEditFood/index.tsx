import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface Foods {
  id: number,
  name: string,
  description: string,
  price: number,
  available: boolean,
  image: string;
}

interface ModalEditFoodProps {
  isOpen: Boolean;
  setIsOpen: () => void;
  editingFood: Foods;
  handleUpdateFood: (food: Foods) => void;
}

function ModalEditFood({
  editingFood,
  handleUpdateFood,
  isOpen,
  setIsOpen
}: ModalEditFoodProps) {
  const formRef = useRef(null);

  function handleSubmit(data: Foods) {
    handleUpdateFood({ ...editingFood, ...data });
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditFood;
