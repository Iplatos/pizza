import { PizzaPropsType } from './components/pizzaBlock'
import pizzas from '../src/assets/pizzas.json'
import { createContext } from 'react'

const getPizzasFromDB = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pizzas)
    }, 1000)
  })
}
export const findPizza = async (
  pizzaName: string,
  setIsLoading: (isLoad: boolean) => void,
  setPizzasArray: (array: PizzaPropsType) => void
) => {
  try {
    setIsLoading(true)

    const res = (await getPizzasFromDB()) as PizzaPropsType[]
    const filteredByNamePizzas = res.filter((p) =>
      p.title.toLowerCase().includes(pizzaName.toLowerCase())
    )
    console.log(res)
  } catch (e) {
    console.log('some error sort by name pizzas')
  } finally {
    setIsLoading(false)
  }
}
