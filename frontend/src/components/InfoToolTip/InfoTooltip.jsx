import "./InfoTooltip.css";
import sucessPicture from "../../images/sucessPicture.svg";
import failPicture from "../../images/failPicture.svg";
import { usePopupClose } from "../../hooks/usePopupClose";
const InfoTooltip = ({ isRegSuccess, isInfoPopupOpen, setIsInfoPopupOpen }) => {
  usePopupClose(isInfoPopupOpen, () => setIsInfoPopupOpen(false));
  return (
    <div className={isInfoPopupOpen ? "popup popup_opened" : "popup"}>
      <div className="popup-info">
        <button className="popup__close" type="button" onClick={() => setIsInfoPopupOpen(false)}></button>
        <img src={isRegSuccess ? sucessPicture : failPicture} alt="Картинка со статусом запроса" />
        <h2>{isRegSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
      </div>
    </div>
  );
};
export default InfoTooltip;
