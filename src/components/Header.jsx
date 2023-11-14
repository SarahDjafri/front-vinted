import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";

const Header = ({ token, handleToken, search, setSearch }) => {
  return (
    <header>
      <div className="root">
        <div>
          <img src={logo} alt="Logo Vinted" />
        </div>
        <div className="container-button">
          {token ? (
            <button
              onClick={() => {
                handleToken(null);
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <Link to="/signup" className="button-login-signup button-signup">
                S'inscrire
              </Link>
              <Link to="/login" className="header-button button-login-signup">
                Se connecter
              </Link>
            </>
          )}
          <input
            placeholder="Recherche"
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />

          <Link to={token ? "/publish" : "/login"}>Vends tes articles</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
