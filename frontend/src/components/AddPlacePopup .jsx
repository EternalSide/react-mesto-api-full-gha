import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";
const AddPlacePopup = ({ onClose, isAddPlacePopupOpen, onAddPlace, isLoading }) => {
  const [cardInfo, setCardInfo] = useState({
    name: "",
    link: "",
  });

  useEffect(() => {
    setCardInfo({ name: "", link: "" });
  }, [isAddPlacePopupOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    return onAddPlace(cardInfo);
  };
  return (
    <PopupWithForm
      isLoading={isLoading}
      onClose={onClose}
      isOpen={isAddPlacePopupOpen}
      name="add"
      title="Новое место"
      onSubmit={handleSubmit}
    >
      <input
        value={cardInfo.name}
        id="name-input"
        name="name"
        type="text"
        className="popup__input popup__input_type_cardname"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={(e) => {
          setCardInfo((prevState) => ({
            ...prevState,
            name: e.target.value,
          }));
        }}
      />
      <span className="name-input-error popup__input-error"></span>

      <input
        value={cardInfo.link}
        id="email-input"
        name="link"
        type="url"
        className="popup__input popup__input_type_cardlink"
        placeholder="Ссылка на картинку"
        required
        onChange={(e) => {
          setCardInfo((prevState) => ({
            ...prevState,
            link: e.target.value,
          }));
        }}
      />
      <span className="email-input-error popup__input-error"></span>
    </PopupWithForm>
  );
};
export default AddPlacePopup;
