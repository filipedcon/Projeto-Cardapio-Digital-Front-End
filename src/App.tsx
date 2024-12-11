import { useState } from 'react'
import './App.css'
import { Card } from './assets/components/card/card'
import { FoodData } from './interface/FoodData'
import { useFoodData } from './hooks/useFoodData'
import { CreateModal } from './assets/components/create-modal/create-modal'

function App() {
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  return (
      <div className="container">
        <h1>Cardápio</h1>
        <div className="card-grid">
              {data?.map(FoodData => 
                <Card 
                  price = {FoodData.price} 
                  title = {FoodData.title} 
                  image = {FoodData.image}
            />
          )}
          {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
          <button onClick={handleOpenModal}>Novo Item</button>
          </div>
      </div>
  )
}

export default App
