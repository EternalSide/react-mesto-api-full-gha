import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";
const ImagePopup = ({ card, onClose }) => {
  usePopupClose(card?.link, onClose);
  return (
    <div className={`popup popup_type_photo ${card && "popup_opened"}`}>
      <div className="popup__pic-container">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img src={`${card?.link}`} alt={card?.name} className="popup__photo-image" />
        <h3 className="popup__pic-name">{card?.name}</h3>
      </div>
    </div>
  );
};

export default ImagePopup;
