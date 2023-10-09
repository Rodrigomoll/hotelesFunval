import React from 'react'

export const Card = (props) => {
  const { images, title, description, rating} = props
  return (
    <div>
      <div className='apartmentCard'>
        <div className='imageContainer'>
          <img src={images} className='image' alt="" />
        </div>
        <div className='infoContainer'>
          <div>
            <span className='description'>{description}</span>
          </div>
          <div className='ratingContainer'>
            <span className='starIcon'>⭐</span>
            <span className='rating'>{rating}</span>
          </div>
        </div>
        <div className='title'>{title}</div>
      </div>
    </div>
  )
}

export default Card;