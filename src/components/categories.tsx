import { useState, memo } from 'react'

type CategoriesType = {
  categoryIndex: number
  setCategoryIndex: (index: number) => void
}

export const Categories = memo((props: CategoriesType) => {
  const { categoryIndex, setCategoryIndex } = props
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  return (
    <div className="categories">
      <ul>
        {categories.map((c, i) => (
          <li
            key={c}
            className={categoryIndex === i ? 'active' : ''}
            onClick={() => setCategoryIndex(i)}
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  )
})
