import InnerHeader from "@/components/InnerHeader/InnerHeader";
import ReferralForm from "@/components/ReferralForm/ReferralForm";
import {
  useSchoolReferralIsValid,
  useSubmitSchoolReferral
} from "@/hooks/react-qurey/query-hooks/referralQuery.hooks";
import useNotiStack from "@/hooks/useNotistack";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import SpinnerLoaderIcon from "@/ui/Icons/SpinnerLoaderIcon";
import { Backdrop } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

const SchoolReferral = () => {
  const router = useRouter();
  const { toastSuccess, toastError } = useNotiStack();
  const { name, id } = router.query ?? "";

  const [backDrop, setBackDrop] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const { data, isLoading, refetch } = useSchoolReferralIsValid(
    name,
    id,
    () => {
      setBackDrop(false);
    },
    () => {
      setBackDrop(false);
      router.push('/contact')
    }
  );
  const { mutate: submitReferralForm, isLoading: submitLoader } =
    useSubmitSchoolReferral();

  const submitSchoolReferral = useCallback((data: any) => {
    submitReferralForm(
      { id, name, body: data },
      {
        onSuccess: (response: any) => {
          console.log(
            "response?.data?.message",
            response?.data?.error,
            response
          );
          setResetForm(true);
          if (!!response?.data?.message) {
            toastSuccess(
              response?.data?.message ?? "Contact form submitted successfully."
            );
          }
          if (!!response?.data?.error) {
            toastError(
              response?.data?.error ??
                "Something went wrong, please try again later."
            );
          }
        },
        onError: (error: any) => {
          console.log("error", error.message);

          toastError(
            error?.response?.data?.message ??
              "Something went wrong, please try again later."
          );
        }
      }
    );
    setResetForm(false);
  }, []);

  useEffect(() => {
    if (!!name) {
      setBackDrop(true);
      refetch();
    }
  }, [name]);
  return (
    <>
      <Wrapper>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backDrop}
          // onClick={handleClose}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <SpinnerLoaderIcon width={150} height={150} fill="#56cfff" />
            {/* <h1 style={{ color: 'white' }}>Please wait we are proccesing your request.</h1> */}
          </div>
        </Backdrop>
        {backDrop ? (
          <></>
        ) : (
          <>
            <InnerHeader
              innerHeaderTitle="Contact Us"
              innerHeaderRediractedPage="Get in touch"
              bannerImage={assest.innerHeaderbackground}
              innerHeaderMainPage="Home"
            />
            <ReferralForm
              isCompanyAdded={false}
              getFormData={submitSchoolReferral}
              resetForm={resetForm}
              buttonLoader={submitLoader}
            />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default SchoolReferral;