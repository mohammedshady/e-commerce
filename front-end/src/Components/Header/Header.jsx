import "./Header.css";
import HeaderLogo from "../../assets/Logo.PNG";
import CartLogo from "../../assets/Cart.PNG";

const routes = ["Men", "Women", "Kids"];

function Header() {
  return (
    <div className="header-container">
      <ul className="border">
        {routes.map((route) => (
          <li className="">{route}</li>
        ))}
      </ul>
      <div className="header-item">
        <img src={HeaderLogo} width={30} />
      </div>
      <div className="header-item ">
        {" "}
        <img src={CartLogo} width={35} />
      </div>
    </div>
  );
}

export default Header;
