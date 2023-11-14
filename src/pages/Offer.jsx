import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fectData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
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
    <main className="container-offer">
      <div className="block-offer">
        <div className="picture-offer">
          <img
            className="picture-offer"
            src={data.product_image.secure_url}
            alt=""
          />
        </div>
        <div className="info-offer">
          <p className="price-offer">{data.product_price}€</p>
          <ul>
            <li>
              {data.product_details.map((detail) => {
                const clefs = Object.keys(detail);
                const clef = clefs[0];
                return (
                  <p key={clef}>
                    {clef} : {detail[clef]}
                  </p>
                );
              })}
            </li>
          </ul>
          <div className="content-offer">
            <p className="product-name">{data.product_name}</p>
            <p className="product-description">{data.product_description}</p>
            <div className="avatar-username">
              {data.owner.account.avatar && (
                <img
                  className="avatar-offer"
                  src={data.owner.account.avatar.secure_url}
                  alt=""
                />
              )}

              {data.owner.account.username}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Offer;
