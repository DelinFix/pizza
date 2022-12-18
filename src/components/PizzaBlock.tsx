import { FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ICartItem, IPizza, pizzaDoughTypes } from "src/types/pizza"
import { addItem } from "../store/slices/cartSlice"
import { cartItemSelectorById } from "src/store/selectors/cart"

const typesDough: pizzaDoughTypes[] = ["тонкое", "традиционное"]

const PizzaBlock: FC<IPizza> = (props) => {
  const {
    id,
    title = "Чизбургер пицца",
    price = 415,
    imageUrl = "https://dodopizza-a.akamaihd.net/static/Img/Products/" +
      "Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
    sizes = [26, 30, 40],
    types = [0, 1],
  } = props

  const dispatch = useDispatch()
  const [activeSize, setActiveSize] = useState(0)
  const [activeType, setActiveType] = useState(0)
  const cartItem = useSelector(cartItemSelectorById(id))

  const addedCount = cartItem ? cartItem.count : 0

  const onClickAdd = () => {
    const item: ICartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typesDough[activeType],
      size: sizes[activeSize],
      count: 0,
    }
    dispatch(addItem(item))
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => (
              <li
                key={type}
                className={activeType === type ? "active" : ""}
                onClick={() => setActiveType(type)}
              >
                {typesDough[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={size}
                className={activeSize === index ? "active" : ""}
                onClick={() => setActiveSize(index)}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <div
            className="button button--outline button--add"
            onClick={onClickAdd}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock
