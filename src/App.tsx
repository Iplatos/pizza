import '../src/scss/app2.scss'
import { Header } from './components/header'

import { createContext, useState } from 'react'
import { Home } from './pages/home'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/notFoung'
import { Cart } from './pages/cart'
import React from 'react'
//v 11

export const SearchContext = createContext<{
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}>({
  searchValue: '',
  setSearchValue: () => {},
})
function App() {
  const [modalSortOpen, setModalSortOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSearchValue] = useState<string>('')

  const modalClose = () => {
    if (modalSortOpen) {
      setModalSortOpen(false)
    }
  }

  return (
    <>
      <div onClick={modalClose} className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
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
        </SearchContext.Provider>
      </div>
    </>
  )
}

export default App
