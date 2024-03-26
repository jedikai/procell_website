/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable mui-path-imports/mui-path-imports */
import { ourBlogProductProps } from "@/interface/BlogProduct.interfaces";
import assest from "@/json/assest";
import { OurBlogProductWrapper } from "@/styles/StyledComponents/OurBlogProductWrapper";
import CalenderIcon from "@/ui/Icons/CalenderIcon";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function OurBlogProduct({
  Blogesimg,
  blogesDate,
  blogTitletext,
  blogtext,
  link=''
}: ourBlogProductProps) {
  const inputDate = new Date(blogesDate);
  const options: any = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  return (
    <OurBlogProductWrapper>
      <Link href={link} className="blogpostImg">
        <img
          src={Blogesimg ?? assest.blogimg2}
          alt="blogimg"
          width={247}
          height={224}
        />
      </Link>

      <Stack direction="row" alignItems="center" className="blogdates">
        <CalenderIcon />
        <Typography variant="body1">{formattedDate}</Typography>
      </Stack>
      <Link href={link} className="blogTitleHeader">
        <Typography variant="h3">{blogTitletext}</Typography>
      </Link>
      <Typography
        variant="body1"
        dangerouslySetInnerHTML={{ __html: blogtext }}
        className="line-clam-3"
      />
      {/* {blogtext}
        </Typography> */}
    </OurBlogProductWrapper>
  );
}

export default OurBlogProduct;
