import { useDispatch } from 'react-redux'
import { changeCategoryIndex } from '../store/searchPizzaSlice'

type CategoriesType = {
  categoryIndex: number
}

export const Categories = (props: CategoriesType) => {
  const { categoryIndex } = props
  const dispatch = useDispatch()
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  return (
    <div className="categories">
      <ul>
        {categories.map((c, i) => (
          <li
            key={c}
            className={categoryIndex === i ? 'active' : ''}
            onClick={() => dispatch(changeCategoryIndex(i))}
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  )
}
