import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface Foods {
  id: number,
  name: string,
  description: string,
  price: number,
  available: boolean,
  image: string;
}

function Dashboard() {
  const [foods, setFoods] = useState<Foods[]>([]);
  const [editingFood, setEditingFood] = useState<Foods>({} as Foods);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods() {
      const response = await api.get('/foods');

      setFoods(response.data);
    };

    loadFoods();
  }, []);

  async function handleAddFood(food: Foods) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods(oldState => [...oldState, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  function handleEditFood(food: Foods) {
    setEditingFood({ ...food });
    setEditModalOpen(true);
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  async function handleUpdateFood(food: Foods) {
    try {
      const foodUpdated = await api.put(
        `/foods/${food.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;