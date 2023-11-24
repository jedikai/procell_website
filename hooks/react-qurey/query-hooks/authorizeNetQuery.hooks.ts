// import axiosInstance from "@/api/axiosInstance";
// import axiosInstance from "@/api/axiosInstance";
import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { useMutation } from "react-query";

const createCustomerProfile = async (payload: object) => {
  const {
    cardNumber,
    expirationDate,
    email,
    description,
    merchantCustomerId,
    name,
    transactionKey
  }: any = payload ?? {};
  const body: any = {
    createCustomerProfileRequest: {
      merchantAuthentication: {
        name,
        transactionKey
      },
      profile: {
        description,
        email,
        paymentProfiles: {
          customerType: "individual",
          payment: {
            creditCard: {
              cardNumber,
              expirationDate
            }
          }
        }
      },
      validationMode: "testMode"
    }
  };
  if (merchantCustomerId) {
    body.createCustomerProfileRequest.profile.merchantCustomerId =
      merchantCustomerId;
  }
  const res = await axiosInstance.post(endpoints.app.authorizeNet, body);
  return res;
};

export const useCreateCustomerProfile = () =>
  useMutation(createCustomerProfile);
