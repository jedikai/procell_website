import { CartItemsWrapper } from "@/styles/StyledComponents/CartItemWrapper";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import AddressModal from "./AddressModal";

const dummyData = [
  {
    name: "Swagata Das",
    email: "swagata.das@webskitters.in",
    Phone: "9564300942",

    Street1:
      "Unit No- 7E, 7th Floor, BENGAL ECO INTELLIGENT PARK, Plot No. 3, EM Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091",

    Street2: "Unit 421, Jhumat House, 160 London Road, Barking IG11 8BB",

    City: "Kolkata",

    ZipCode: "700091",

    Country: "India",

    State: "West Bengal"
  }
];

const SavedAddressList = () => {
  const [openmod, setopenmod] = useState(false);
  const handleClose = () => {
    setopenmod(!openmod);
  };
  return (
    <>
      {dummyData?.map((_i) => (
        <CartItemsWrapper>
          <div className="checkout-address">
            <div className="flex-wrap">
              <FormControlLabel control={<Checkbox />} label="" />
              {dummyData?.length > 1 && (
                <div className="checkout-actions">
                  {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 26 26"
                  cursor="pointer"
                  onClick={handleClose}
                >
                  <path d="M 20.09375 0.25 C 19.5 0.246094 18.917969 0.457031 18.46875 0.90625 L 17.46875 1.9375 L 24.0625 8.5625 L 25.0625 7.53125 C 25.964844 6.628906 25.972656 5.164063 25.0625 4.25 L 21.75 0.9375 C 21.292969 0.480469 20.6875 0.253906 20.09375 0.25 Z M 16.34375 2.84375 L 14.78125 4.34375 L 21.65625 11.21875 L 23.25 9.75 Z M 13.78125 5.4375 L 2.96875 16.15625 C 2.71875 16.285156 2.539063 16.511719 2.46875 16.78125 L 0.15625 24.625 C 0.0507813 24.96875 0.144531 25.347656 0.398438 25.601563 C 0.652344 25.855469 1.03125 25.949219 1.375 25.84375 L 9.21875 23.53125 C 9.582031 23.476563 9.882813 23.222656 10 22.875 L 20.65625 12.3125 L 19.1875 10.84375 L 8.25 21.8125 L 3.84375 23.09375 L 2.90625 22.15625 L 4.25 17.5625 L 15.09375 6.75 Z M 16.15625 7.84375 L 5.1875 18.84375 L 6.78125 19.1875 L 7 20.65625 L 18 9.6875 Z"></path>
                </svg> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    cursor="pointer"
                    fill="#b91c1c"
                  >
                    <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z"></path>
                  </svg>
                </div>
              )}
            </div>
            <h3>{_i.name}</h3>
            <p>
              <b>Email : </b>
              {_i?.email}
            </p>
            <p>
              <b>Phone number : </b>
              {_i?.Phone}
            </p>
            <p>
              <b>Street 1 : </b>
              {_i?.Street1}
            </p>
            <p>
              <b>Street 2 : </b>
              {_i?.Street2}
            </p>
            <p>
              <b>City : </b>
              {_i?.City}
            </p>
            <p>
              <b>Zip code : </b>
              {_i?.ZipCode}
            </p>
            <p>
              <b>Country : </b>
              {_i?.Country}
            </p>
            <p>
              <b>State/Province : </b>
              {_i?.State}
            </p>
          </div>
        </CartItemsWrapper>
      ))}
      <AddressModal open={openmod} handleClose={handleClose} type={""} />
    </>
  );
};

export default SavedAddressList;
