/* eslint-disable no-nested-ternary */
import InnerHeader from "@/components/InnerHeader/InnerHeader";
import VerifyBox from "@/components/VerifyBox/VerifyBox";
import { useVerifyCertificate } from "@/hooks/react-qurey/query-hooks/verifyCertificate.hooks";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { VerifyStepsWrapper } from "@/styles/StyledComponents/VerifyStepsWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import CrossIcon from "@/ui/Icons/CrossIcon";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type Inputs = {
  certificate_id: string;
};

const validationSchema = yup.object().shape({
  certificate_id: yup.string().required("please enter certificate id.")
});

const exceptThisSymbols = ["e", "E", "+", "-", "."];

export default function Index() {
  const [step, setStep] = useState<Number>(1);
  const [errMsg, setErrMsg] = useState("");
  const [certificateData, setCertificateData] = useState([]);

  const { mutate: verifyCertificate } = useVerifyCertificate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema)
  });

  const incrStep = (nextStep: Number) => {
    setStep(nextStep);
  };
  const onFormSubmit = (data: any) => {
    console.log("verify-certificate", data);
    const { certificate_id } = data ?? {};
    const formData: any = new FormData();
    if (!!certificate_id) {
      formData.append("obfuscated_number", `${certificate_id}`);
    }
    verifyCertificate(formData, {
      onSuccess: (response: any) => {
        console.log("suc res", response);
        const { data, message } = response?.data ?? {};
        setErrMsg(message ?? "");
        if (!!data && data?.length > 0) {
          setCertificateData(data || []);
          incrStep(2);
        }
      },
      onError: (error: any) => {
        console.log("suc error", error);
      }
    });
  };
  const formatedDate = (timestamp: any) => {
    if (!!timestamp) {
      const date = new Date(timestamp);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      return formattedDate;
    } else {
      return "N/A";
    }
  };
  return (
    <Wrapper>
      <InnerHeader
        bannerImage={assest.innerHeaderbackground}
        innerHeaderRediractedPage="Certificate"
        innerHeaderTitle="Certificate"
        innerHeaderMainPage="Verify"
        innnerHeaderMainurl="/verify"
      />
      <Box className="cmn_gap">
        <Container fixed>
          <VerifyBox>
            <Box className="verify_inner">
              <VerifyStepsWrapper>
                {step === 1 ? (
                  <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Box className="verify_cer_1">
                      <Typography variant="body1" className="verify_text">
                        Certificate ID*
                      </Typography>
                      <Box className="input_group">
                        <InputFieldCommon
                          // type="number"
                          {...register("certificate_id")}
                          // onKeyDown={(e: any) =>
                          //   [" "].includes(e.key) && e.preventDefault()
                          // }
                        />
                        {errors.certificate_id && (
                          <div className="profile_error">
                            {errors.certificate_id.message}
                          </div>
                        )}
                      </Box>
                      <Box className="btn_holder">
                        <CustomButtonPrimary
                          variant="contained"
                          color="primary"
                          type="submit"
                          // onClick={() => incrStep(2)}
                        >
                          <Typography variant="body1">Submit</Typography>
                        </CustomButtonPrimary>
                      </Box>
                      {!!errMsg && (
                        <Typography variant="body1" className="err_text">
                          <i className="ico">
                            <CrossIcon />
                          </i>
                          {errMsg}
                        </Typography>
                      )}
                      <Typography variant="body1" className="protect_text">
                        Protected by reCAPTCHA,{" "}
                        <Link href="/">Privacy Policy</Link> &
                        <Link href="/">Terms of Service</Link> apply.
                      </Typography>
                    </Box>
                  </form>
                ) : step === 2 ? (
                  <Box className="verify_cer_2">
                    <Typography variant="body1" className="verify_text">
                      Certified Procell Therapies practitioner
                    </Typography>
                    {!!certificateData &&
                      certificateData?.length > 0 &&
                      certificateData?.map((_cat: any) => (
                        <Stack
                          className="pr_details"
                          direction="row"
                          alignItems="center"
                          flexWrap="wrap"
                          key={_cat?.id??''}
                        >
                          <Box className="pr_block">
                            <Typography variant="caption">Name: </Typography>{" "}
                            {_cat?.name ?? "N/A"}
                          </Box>
                          <Box className="pr_block">
                            <Typography variant="caption">
                              Certified ID:
                            </Typography>
                            {_cat?.obfuscated_number ?? "N/A"}
                          </Box>
                          <Box className="pr_block">
                            <Typography variant="caption">
                              Certificate On:
                            </Typography>
                            {_cat?.create_date
                              ? formatedDate(_cat?.create_date)
                              : "N/A"}
                          </Box>
                        </Stack>
                      ))}
                  </Box>
                ) : null}
              </VerifyStepsWrapper>
            </Box>
          </VerifyBox>
        </Container>
      </Box>
    </Wrapper>
  );
}
