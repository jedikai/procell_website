/* eslint-disable no-nested-ternary */
import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import VerifyBox from "@/components/VerifyBox/VerifyBox";
import {
  useRepVerificationToken,
  useVerifyToken
} from "@/hooks/react-qurey/query-hooks/verifyRepQuery.hooks";
import useNotiStack from "@/hooks/useNotistack";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { VerifyStepsWrapper } from "@/styles/StyledComponents/VerifyStepsWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import CallIcon from "@/ui/Icons/CallIcon";
import ClipBoadrIcon from "@/ui/Icons/ClipBoadrIcon";
import FaliureIcon from "@/ui/Icons/FaliureIcon";
import MailIcon from "@/ui/Icons/MailIcon";
import SuccessIcon from "@/ui/Icons/SuccessIcon";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import { List, ListItem, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { toastSuccess, toastError } = useNotiStack();
  const [openModal, setopenModal] = useState(false);
  const [isTokenGenerate, setIsTokenGenerate] = useState(false);
  const [loader, setLoader] = useState(false);
  const [token, setToken] = useState("");
  const [userGivenKey, setUserGivenKey] = useState("");
  const [procellRepData, setprocellRepData] = useState<any>({});
  const [isVerificationSuccessfull, setIsVerificationSuccessfull] =
    useState(true);

  const { mutate: verifyToken, isLoading: verifyTokenLoader } =
    useVerifyToken();
  const { data, isLoading, refetch } = useRepVerificationToken(
    (response: any) => {
      setToken(response);
      incrStep(2);
      setLoader(false);

      // const formData: FormData = new FormData();
      // formData.append("token", `${response}`);
      // verifyToken(formData, {
      //   onSuccess: (response: any) => {
      //     console.log("showww success", response);
      //     incrStep(2)
      //     setLoader(false);
      //   },
      //   onError: (error: any) => {
      //     console.log("showww error", error);
      //     toastError(
      //       error?. response?.data?.message ??
      //         "Something went wrong, please try again later."
      //     );
      //   }
      // });
    }
  );

  const handleOpenModal = () => {
    setopenModal(true);
  };
  const handleCloseModal = () => {
    setopenModal(false);
  };
  const getUserGivenTokenHandler = (e: any) => setUserGivenKey(e.target.value);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [step, setStep] = useState<Number>(1);

  const incrStep = (nextStep: Number) => {
    setStep(nextStep);
  };
  console.log("rep_data", data);

  const generateToken = () => {
    setIsTokenGenerate(!isTokenGenerate);
    setLoader(true);
    // incrStep(2)
  };
  const copyToClickBoard = async () => {
    await navigator.clipboard.writeText(token).then(
      () => {
        toastSuccess("Content copied to clipboard");
        /* Resolved - text copied to clipboard successfully */
      },
      () => {
        console.error("Failed to copy");
        /* Rejected - text failed to copy to the clipboard */
      }
    );
  };
  const verifyTokenKey = () => {
    setLoader(true);
    const formData: FormData = new FormData();
    formData.append("token", `${userGivenKey}`);
    verifyToken(formData, {
      onSuccess: (response: any) => {
        console.log("showww success", response);
        // incrStep(2);
        setprocellRepData(response?.data ?? {});
        setLoader(false);
        setIsVerificationSuccessfull(true);
        handleOpenModal();
      },
      onError: (error: any) => {
        console.log("showww error", error);
        setLoader(false);
        setIsVerificationSuccessfull(false);
        handleOpenModal();
        // toastError(
        //   error?.response?.data?.message ??
        //     "Something went wrong, please try again later."
        // );
      }
    });
  };
  useEffect(() => {
    if (isTokenGenerate) {
      refetch();
    }
  }, [isTokenGenerate]);

  return (
    <Wrapper>
      <InnerHeader
        bannerImage={assest.innerHeaderbackground}
        innerHeaderRediractedPage="Rep"
        innerHeaderTitle="Rep"
        innerHeaderMainPage="Verify"
        innnerHeaderMainurl="/verify"
      />

      <Box className="cmn_gap">
        <Container fixed>
          <VerifyBox>
            <Box className="verify_inner">
              <VerifyStepsWrapper>
                {step === 1 ? (
                  <>
                    <Typography variant="body1" className="verify_text">
                      Generate a 10 minute secret “Verification key”
                    </Typography>
                    <Box className="btn_holder">
                      {loader ? (
                        <CustomButtonPrimary
                          variant="contained"
                          color="primary"
                        >
                          <ButtonLoader />
                        </CustomButtonPrimary>
                      ) : (
                        <CustomButtonPrimary
                          variant="contained"
                          color="primary"
                          onClick={generateToken}
                        >
                          <Typography variant="body1">Generate</Typography>
                        </CustomButtonPrimary>
                      )}
                    </Box>
                  </>
                ) : step === 2 ? (
                  <Box className="verify_rep_2">
                    <Typography variant="body1" className="verify_text">
                      Send this code to the Procell representative you are
                      speaking with
                    </Typography>
                    <Box className="input_group copy_group">
                      <InputFieldCommon
                        value={token}
                        adorMentIcon={<ClipBoadrIcon />}
                        onClick={copyToClickBoard}
                      />
                    </Box>
                    <Box className="btn_holder">
                      <CustomButtonPrimary
                        variant="contained"
                        color="primary"
                        onClick={() => incrStep(3)}
                      >
                        <Typography variant="body1">Next</Typography>
                      </CustomButtonPrimary>
                    </Box>
                  </Box>
                ) : step === 3 ? (
                  <Box className="verify_rep_3">
                    <Typography variant="body1" className="verify_text">
                      Enter the verified key provided to you by the Procell
                      representative you are speaking with
                    </Typography>
                    <Box className="input_group ">
                      <InputFieldCommon
                        value={userGivenKey}
                        onChange={getUserGivenTokenHandler}
                      />
                    </Box>
                    <Box className="btn_holder">
                      {loader ? (
                        <CustomButtonPrimary
                          variant="contained"
                          color="primary"
                        >
                          <ButtonLoader />
                        </CustomButtonPrimary>
                      ) : (
                        <CustomButtonPrimary
                          variant="contained"
                          color="primary"
                          onClick={verifyTokenKey}
                        >
                          <Typography variant="body1">Submit</Typography>
                        </CustomButtonPrimary>
                      )}
                    </Box>
                  </Box>
                ) : null}
              </VerifyStepsWrapper>
            </Box>
          </VerifyBox>
        </Container>
      </Box>
      <MuiModalWrapper
        open={openModal}
        onClose={handleCloseModal}
        title=""
        className="verify_modal"
      >
        <Box className="success_modal">
          <Box className="icon_wrap">
            {isVerificationSuccessfull ? <SuccessIcon /> : <FaliureIcon />}
          </Box>
          <Typography variant="h2">
            Verification {isVerificationSuccessfull ? "Successful" : "Failed"}!
          </Typography>
          {isVerificationSuccessfull ? (
            <Typography variant="h3">
              You are speaking with a verified Procell Therapies rep
            </Typography>
          ) : (
            <Typography variant="h3">
              You are NOT speaking with a verified Procell Therapies rep
            </Typography>
          )}
          {isVerificationSuccessfull && (
            <Stack
              direction="row"
              alignItems="center"
              flexWrap="wrap"
              className="rep_user"
              justifyContent="center"
            >
              <Box className="cnt_image">
                <img
                  src={procellRepData?.image_url ?? assest.avatarIcon}
                  alt=""
                  width={248}
                  height={264}
                />
              </Box>
              <List disablePadding className="cnt_list">
                {!!procellRepData?.user && (
                  <ListItem disablePadding>
                    <Typography variant="body1" className="cnt_text cnt_name">
                      {procellRepData?.user}
                    </Typography>
                  </ListItem>
                )}
                {!!procellRepData?.phone && (
                  <ListItem disablePadding className="cnt_item">
                    <i className="icon">
                      <CallIcon />
                    </i>
                    <Typography variant="body1" className="cnt_text">
                      {
                        <Link href={`tel:${procellRepData?.phone}`}>
                          {procellRepData?.phone}
                        </Link>
                      }
                    </Typography>
                  </ListItem>
                )}
                {!!procellRepData?.email && (
                  <ListItem disablePadding className="cnt_item">
                    <i className="icon">
                      <MailIcon />
                    </i>
                    <Typography variant="body1" className="cnt_text">
                      <Link href={`mailto:${procellRepData?.email}`}>
                        {procellRepData?.email}
                      </Link>
                    </Typography>
                  </ListItem>
                )}
                
              </List>
            </Stack>
          )}
          <Box className="btn_wrapper">
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              onClick={handleCloseModal}
            >
              <Typography variant="body1">Ok</Typography>
            </CustomButtonPrimary>
          </Box>
        </Box>
      </MuiModalWrapper>
    </Wrapper>
  );
}
