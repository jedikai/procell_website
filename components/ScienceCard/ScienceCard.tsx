/* eslint-disable mui-path-imports/mui-path-imports */
import { scienceCardProps } from '@/interface/scienceCard.interfaces'
import { ScienceCardWrapper } from '@/styles/StyledComponents/ScienceCardWrapper'
import KnowMoreIcon from '@/ui/Icons/knowMoreIcon'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ScienceCard({title,image,link}:scienceCardProps) {
  return (
    <ScienceCardWrapper>
        <Box className='card_wrapper'>
            <figure>
                <Image src={image} alt='' width={360} height={370} />
            </figure>
            <Typography variant="h4" >{title}</Typography>
            <Link href={link}>Know more <KnowMoreIcon/>   </Link>
        </Box>
    </ScienceCardWrapper>
  )
}
