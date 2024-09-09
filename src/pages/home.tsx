import { Categories } from '../components/categories'
import { PizzaBlock, PizzaPropsType } from '../components/pizzaBlock'
import { Skeleton } from '../components/pizzaBlock/skeleton'
import { Sort } from '../components/sort'
import '../../src/scss/app2.scss'
import { useContext, useEffect, useState } from 'react'
import pizzas from '../assets/pizzas.json'
import { resolve } from 'path'
import { SearchContext } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { isAppLoaderSwitcher } from '../store/appSlice'
import qs from 'qs'
import { Navigate, useNavigate } from 'react-router-dom'

export type SortType = 'rating' | 'price' | 'title'
export const Home = () => {
  const { categoryIndex, isAsc, sortIndex } = useSelector(
    (state: RootState) => state.searchPizzaReducer
  )
  const [pizzasArray, setPizzasArray] = useState<PizzaPropsType[]>([])
  const navigate = useNavigate()
  const { searchValue } = useContext(SearchContext)
  const isLoading = useSelector((state: RootState) => state.AppReducer.isLoading)
  const dispatch = useDispatch()
  const getPizzas = async () => {
    dispatch(isAppLoaderSwitcher(true))
    try {
      const res = (await getPizzasFromDB()) as PizzaPropsType[]
      const pizzasInit = [...res].sort((a, b) => a.rating - b.rating)
      setPizzasArray(pizzasInit)
    } catch {
      console.log('error')
    } finally {
      dispatch(isAppLoaderSwitcher(false))
    }
  }

  const getSortedPizza = async (
    pizzaName: string,
    categoryIndex: number,
    sortIndex: SortType,
    isAsc: boolean
  ) => {
    dispatch(isAppLoaderSwitcher(true))
    try {
      const res = (await getPizzasFromDB()) as PizzaPropsType[]
      let sortedPizzas = res

      if (categoryIndex) {
        sortedPizzas = sortedPizzas.filter((p) => p.category === categoryIndex)
      }
      if (pizzaName) {
        sortedPizzas = sortedPizzas.filter((p) =>
          p.title.toLowerCase().includes(pizzaName.toLowerCase())
        )
      }
      sortedPizzas = sortedPizzas.sort((a, b) => (a[sortIndex] > b[sortIndex] ? 1 : -1))

      if (!isAsc) {
        sortedPizzas.reverse()
      }

      setPizzasArray(sortedPizzas)
    } catch {
      console.log('error')
    } finally {
      dispatch(isAppLoaderSwitcher(false))
    }
  }
  const findPizza = async (pizzaName: string) => {
    try {
      dispatch(isAppLoaderSwitcher(true))

      const res = (await getPizzasFromDB()) as PizzaPropsType[]

      const filteredByNamePizzas = res.filter((p) =>
        p.title.toLowerCase().includes(pizzaName.toLowerCase())
      )
      setPizzasArray(filteredByNamePizzas)
    } catch (e) {
      console.log('some error sort by name pizzas')
    } finally {
      dispatch(isAppLoaderSwitcher(false))
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
    const queryString = qs.stringify({
      category: categoryIndex,
      sortBy: sortIndex,
      Asc: isAsc,
      search: searchValue,
    })
    navigate(`?${queryString}`)
    getSortedPizza(searchValue, categoryIndex, sortIndex, isAsc)
  }, [categoryIndex, sortIndex, isAsc, searchValue])

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryIndex={categoryIndex} />
        <Sort isAsc={isAsc} sortIndex={sortIndex} />
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
