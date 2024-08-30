import { useState } from 'react'
import { SortType } from '../pages/home'

type SortProps = {
  modalSortOpen: boolean
  setModalSortOpen: (modalSortOpen: boolean) => void
  sortIndex: SortType
  setSortIndex: (title: SortType) => void
  isAsc: boolean
  setIsAsc: (isAsc: boolean) => void
}

export const Sort = (props: SortProps) => {
  const { modalSortOpen, setModalSortOpen, sortIndex, setSortIndex, isAsc, setIsAsc } = props
  const sorts = { rating: 'популярности', price: 'цене', title: 'алфавиту' }

  return (
    <div className="sort">
      <div onClick={() => setIsAsc(!isAsc)} className="sort__label">
        <svg
          style={{ transform: isAsc ? 'rotate(180deg)' : 'none' }}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setModalSortOpen(!modalSortOpen)}>{sorts[sortIndex]}</span>
      </div>
      {modalSortOpen ? (
        <div className="sort__popup">
          <ul>
            {Object.values(sorts).map((s, i) => (
              <li
                onClick={() => {
                  const sortKey = Object.keys(sorts)[i] as SortType
                  setSortIndex(sortKey)
                }}
                className={Object.keys(sorts)[i] === sortIndex ? 'active' : ''}
                key={s}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
