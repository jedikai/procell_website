/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable mui-path-imports/mui-path-imports */
import { ourBlogProductProps } from '@/interface/BlogProduct.interfaces';
import { OurBlogProductWrapper } from '@/styles/StyledComponents/OurBlogProductWrapper'
import CalenderIcon from '@/ui/Icons/CalenderIcon';
import { Stack, Typography } from '@mui/material';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'



function OurBlogProduct({Blogesimg,blogesDate,blogTitletext,blogtext}:ourBlogProductProps) {
  return (
   <OurBlogProductWrapper>
        
        <Link href="" className='blogpostImg'>
        <Image src={Blogesimg} alt="blogimg" width={247} height={224}/>
        </Link>
        
        <Stack  direction="row"
                  alignItems="center"
                  className="blogdates">
            <CalenderIcon/>
            <Typography variant='body1'>{blogesDate}</Typography>
        </Stack>
        <Link href="" className='blogTitleHeader'>
            <Typography variant='h3'>{blogTitletext}</Typography>
            
        </Link>
        <Typography variant='body1'>
            {blogtext}
        </Typography>
   </OurBlogProductWrapper>
  )
}

export default OurBlogProduct