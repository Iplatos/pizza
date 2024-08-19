import { useNavigate } from 'react-router-dom'

const buttonStyles = {
  width: '150px',
  height: '50px',
  borderRadius: '20px',
  marginBottom: '30px',
  backgroundColor: 'black',
  color: 'white',
}

export const NotFound = () => {
  const navigate = useNavigate()
  const onButtonBackClick = () => {
    navigate('/')
  }
  return (
    <div>
      <button onClick={onButtonBackClick} style={buttonStyles}>
        Назад
      </button>
      <h1>
        404 <br /> Страница не существует
      </h1>
    </div>
  )
}
