import { useState, memo } from 'react'

export const Categories = memo(() => {
  const [activeIndex, setActiveIndex] = useState(0)
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  return (
    <div className="categories">
      <ul>
        {categories.map((c, i) => (
          <li
            key={c}
            className={activeIndex === i ? 'active' : ''}
            onClick={() => setActiveIndex(i)}
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  )
})
