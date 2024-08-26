import '../src/scss/app2.scss'
import { Header } from './components/header'

import { useEffect, useState } from 'react'
import { PizzaPropsType } from './components/pizzaBlock'
import { Home } from './pages/home'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/notFoung'
import { Cart } from './pages/cart'
//v 10

function App() {
  const [modalSortOpen, setModalSortOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const modalClose = () => {
    if (modalSortOpen) {
      setModalSortOpen(false)
    }
  }

  return (
    <>
      <div onClick={modalClose} className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            {' '}
            <Route
              path="/"
              element={
                <Home
                  setIsLoading={setIsLoading}
                  modalSortOpen={modalSortOpen}
                  setModalSortOpen={setModalSortOpen}
                  isLoading={isLoading}
                />
              }
            />
            <Route path={'/cart'} element={<Cart />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
