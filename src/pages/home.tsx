import { Categories } from '../components/categories'
import { PizzaBlock, PizzaPropsType } from '../components/pizzaBlock'
import { Skeleton } from '../components/pizzaBlock/skeleton'
import { Sort } from '../components/sort'
import '../../src/scss/app2.scss'
import { useEffect, useState } from 'react'
import pizzas from '../assets/pizzas.json'

type HomeProps = {
  modalSortOpen: boolean
  setModalSortOpen: (modalSortOpen: boolean) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}
export type SortType = 'rating' | 'price' | 'title'
export const Home = ({
  modalSortOpen,
  setIsLoading,
  isLoading,

  setModalSortOpen,
}: HomeProps) => {
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [sortIndex, setSortIndex] = useState<SortType>('rating')
  const [pizzasArray, setPizzasArray] = useState<PizzaPropsType[]>([])

  const getPizzas = async () => {
    setIsLoading(true)
    try {
      const res = (await getPizzasFromDB()) as PizzaPropsType[]
      const pizzasInit = [...res].sort((a, b) => a.rating - b.rating)
      setPizzasArray(pizzasInit)
    } catch {
      console.log('error')
    } finally {
      setIsLoading(false)
    }
  }

  const getSortedPizza = async (categoryIndex: number, sortIndex: SortType) => {
    setIsLoading(true)
    try {
      if (categoryIndex) {
        const res = (await getPizzasFromDB()) as PizzaPropsType[]
        const sortedPizzas = res
          .filter((p) => p.category === categoryIndex)
          .sort((a, b) => (a[sortIndex] > b[sortIndex] ? 1 : -1))
        setPizzasArray(sortedPizzas)
      } else {
        const res = (await getPizzasFromDB()) as PizzaPropsType[]
        const sortedPizzas = [...res].sort((a, b) => (a[sortIndex] > b[sortIndex] ? 1 : -1))
        setPizzasArray(sortedPizzas)
      }
    } catch {
      console.log('error')
    } finally {
      setIsLoading(false)
    }
  }

  const getPizzasFromDB = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(pizzas)
      }, 1000)
    })
  }

  useEffect(() => {
    getSortedPizza(categoryIndex, sortIndex)
  }, [categoryIndex, sortIndex])

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryIndex={categoryIndex} setCategoryIndex={setCategoryIndex} />
        <Sort
          sortIndex={sortIndex}
          setSortIndex={setSortIndex}
          modalSortOpen={modalSortOpen}
          setModalSortOpen={setModalSortOpen}
        />
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(8)].map((el, i) => <Skeleton key={i} />)
            : pizzasArray.map((p, i) => <PizzaBlock key={p.id} {...p} />)}
        </div>{' '}
      </div>
    </div>
  )
}
