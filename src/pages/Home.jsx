import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import effet from "../assets/effet.svg";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fectData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        //   console.log(response);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fectData();
  }, []);
  return isLoading ? (
    <span>En cours...</span>
  ) : (
    <main>
      <div className="root">
        <div className="container-main">
          <img src={effet} alt="" />
        </div>
        <div className="block">
          <div className="block-img">
            Prêts à faire du tri dans vos placards ?
            <button>Commencer à vendre</button>
          </div>
        </div>

        <div className="font-article">
          {data.offers.map((offer) => {
            // console.log(offer);
            return (
              <Link to={`/offers/${offer._id}`}>
                <article key={offer._id} className="article">
                  <div className="avatar">
                    {offer.owner.account.avatar && (
                      <img
                        src={offer.owner.account.avatar.secure_url}
                        alt=""
                        className="avatar-img"
                      />
                    )}

                    {offer.owner.account.username}
                  </div>
                  <div>
                    <img
                      src={offer.product_image.secure_url}
                      alt=""
                      className="picture-article"
                    />
                    <span>
                      <p className="price">{offer.product_price} €</p>
                      <p className="details">
                        {offer.product_details[1].TAILLE}
                      </p>
                      <p className="details">
                        {offer.product_details[0].MARQUE}
                      </p>
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Home;
