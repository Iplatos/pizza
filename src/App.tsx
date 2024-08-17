import '../src/scss/app2.scss'
import { Categories } from './components/categories'
import { Header } from './components/header'

import { Sort } from './components/sort'
import pizzas from './assets/pizzas.json'
import { useEffect, useState } from 'react'
import { PizzaBlock, PizzaPropsType } from './components/pizzabBlock'
import { Skeleton } from './components/pizzabBlock/skeleton'
//v 4 ; 49

function App() {
  const [modalSortOpen, setModalSortOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [pizzasArray, setPizzasArray] = useState<PizzaPropsType[]>([])
  const modalClose = () => {
    if (modalSortOpen) {
      setModalSortOpen(false)
    }
  }

  const getPizzasFromDB = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(pizzas)
      }, 1000)
    })
  }
  const getPizzas = async () => {
    setIsLoading(true)
    try {
      const res = await getPizzasFromDB()
      setPizzasArray(res as PizzaPropsType[])
    } catch {
      console.log('error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPizzas()
  }, [])

  return (
    <div onClick={modalClose} className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort modalSortOpen={modalSortOpen} setModalSortOpen={setModalSortOpen} />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map(() => <Skeleton />)
              : pizzasArray.map((p, i) => <PizzaBlock key={p.id} {...p} />)}
          </div>{' '}
        </div>
      </div>
    </div>
  )
}

export default App
