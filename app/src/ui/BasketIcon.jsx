export default function BasketIcon({onClick}) {
  return (
    <div className="basket-icon" onClick={onClick}>
      <i className="fa-solid fa-basket-shopping"></i>
    </div>
  );
}
