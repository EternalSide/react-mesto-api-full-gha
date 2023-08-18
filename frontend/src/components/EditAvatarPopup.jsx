import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";
const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {
  useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }
  const inputRef = useRef();
  return (
    <PopupWithForm
      isLoading={isLoading}
      onClose={onClose}
      isOpen={isOpen}
      name="avatar"
      title="Новый аватар"
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        id="email-input"
        name="link"
        type="url"
        className="popup__input popup__input_type_cardlink"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="email-input-error popup__input-error"></span>
    </PopupWithForm>
  );
};
export default EditAvatarPopup;
