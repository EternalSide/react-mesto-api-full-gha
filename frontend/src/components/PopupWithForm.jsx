import { usePopupClose } from "../hooks/usePopupClose";

const PopupWithForm = ({ children, isOpen, name, onClose, title, onSubmit, isLoading }) => {
  usePopupClose(isOpen, onClose);
  return (
    <div className={isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <h2 className="popup__red">{title}</h2>
        <form className="popup__form" name={name} noValidate onSubmit={onSubmit}>
          {children}
          <button disabled={isLoading} type="submit" className="popup__button">
            {isLoading ? "Сохраняю.." : "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
