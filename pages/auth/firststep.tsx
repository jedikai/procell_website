import assest from "@/json/assest";
import LoginWrapper from "@/layout/wrapper/LoginWrapper";
import { primaryColors } from "@/themes/_muiPalette";
import CertifiedIcon from "@/ui/Icons/CertifiedIcon";
import PeopleIcon from "@/ui/Icons/PeopleIcon";
import StarIcon from "@/ui/Icons/StarIcon";
import StudentIcon from "@/ui/Icons/StudentIcon";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const FirstStepWrapper = styled(Box)`
  .wrapper {
    text-align: center;
    padding-bottom: 20px;
    img {
      margin-bottom: 58px;
      @media (max-width: 599px) {
        margin-bottom: 30px;
        width: 120px;
        height: 45px;
      }
      @media (max-width: 375px) {
        margin-bottom: 15px;
        width: 100px;
        height: 35px;
      }
    }

    .step_items {
      border-radius: 10px;
      background: ${primaryColors.white};
      border: 1px solid ${primaryColors.white};
      padding: 18px 25px;
      padding-right: 0;
      max-width: 422px;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      @media (max-width: 599px) {
        border-radius: 10px;
        padding: 14px 20px;
        padding-right: 10px;
        max-width: 400px;
      }
      @media (max-width: 375px) {
        padding: 10px;
        padding: 10;
      }
      &:hover {
        border: 1px solid ${primaryColors.text_purple};
      }
      :not(:last-child) {
        margin-bottom: 15px;
        @media (max-width: 599px) {
          margin-bottom: 10px;
        }
      }
      :first-child {
        width: 20%;
      }
      a {
        color: ${primaryColors.black};
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
        text-align: left;
        width: 80%;
        @media (max-width: 599px) {
          font-size: 14px;
        }
        @media (max-width: 375px) {
          font-size: 13px;
        }
      }
      .icon_box {
        width: 50px;
        height: 50px;

        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${primaryColors.purple_background};
        margin-right: 20px;
        @media (max-width: 599px) {
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
        svg {
          @media (max-width: 375px) {
            width: 20px;
          }
        }
      }
    }
  }
`;
const Firststep = () => {
  const firstStepOptions = [
    {
      icon: <PeopleIcon />,
      path: "/auth/registerpage",
      text: "Consumer"
    },
    {
      icon: <CertifiedIcon />,
      path: "/auth/register",
      text: "Certified Procell Therapies Practitioner"
    },
    {
      icon: <StarIcon />,
      path: "/contact/",
      text: "Would like to become a Procell Therapies Practitioner"
    },
    // {
    //   icon: <StudentIcon />,
    //   path: "/auth/student-category/",
    //   text: "Student"
    // }
  ];
  const router = useRouter();
  const [render, setRender] = useState(true);
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const userLoginStatus: boolean =
  //       !!localStorage.getItem("userDetails") || !!getCookie("userDetails");
  //     if (userLoginStatus) {
  //       router.push("/dashboard/profile");
  //       setRender(false);
  //     } else {
  //       setRender(true);
  //     }
  //   }
  // }, []);
  return (
    <>
      {render ? (
        <LoginWrapper title="welcome TO PROCELL">
          <FirstStepWrapper>
            <Box className="wrapper">
              <Link href="/">
                <Image
                  src={assest.logo_img}
                  alt="procell"
                  width={143}
                  height={54}
                />
              </Link>
              {firstStepOptions.map((item: any, index: number) => (
                <Box className="step_items" key={index + 1}>
                  <Box className="icon_box">{item.icon}</Box>
                  <Link href={item.path}>{item.text}</Link>
                </Box>
              ))}
            </Box>
          </FirstStepWrapper>
        </LoginWrapper>
      ) : (
        <></>
      )}
    </>
  );
};

export default Firststep;
