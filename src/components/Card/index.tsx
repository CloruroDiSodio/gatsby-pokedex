import React from 'react';
import './index.scss';

interface ICard {
  image: string;
  title: string;
}

const Card = ({ image, title }: ICard) => {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h5>{title}</h5>
    </div>
  );
};

export default Card;
