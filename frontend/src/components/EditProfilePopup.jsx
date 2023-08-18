import PopupWithForm from "./PopupWithForm";
import { useState, useEffect, useContext } from "react";

import UserContext from "../contexts/CurrentUserContext";
const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const userInfo = useContext(UserContext);

  useEffect(() => {
    setName(userInfo.name);
    setDesc(userInfo.about);
  }, [userInfo, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: desc,
    });
  }

  return (
    <PopupWithForm
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      name="main"
      title="Редактировать профиль"
      onSubmit={handleSubmit}
    >
      <input
        value={name || ""}
        name="name"
        type="text"
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        id="name"
        onChange={(e) => setName(e.target.value)}
      />
      <span className="name-error popup__input-error"></span>
      <input
        value={desc || ""}
        name="about"
        type="text"
        className="popup__input popup__input_type_bio"
        placeholder="Род деятельности"
        required
        minLength="2"
        maxLength="200"
        id="bio"
        onChange={(e) => setDesc(e.target.value)}
      />
      <span className="bio-error popup__input-error"></span>
    </PopupWithForm>
  );
};
export default EditProfilePopup;
