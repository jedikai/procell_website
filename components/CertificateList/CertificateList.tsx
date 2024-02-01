/* eslint-disable react/no-array-index-key */
import { certificateListProps } from '@/interface/certificate.interface'
import { CertificateListWrapper } from '@/styles/StyledComponents/CertificateListWrapper'
import CertificateCard from '../CertificateCard/CertificateCard'

export default function CertificateList({ certificateList }: certificateListProps) {
    return (
        <CertificateListWrapper className='cert_list'>
            {
                certificateList.map((data, index) => (
                    <CertificateCard key={index} {...data} />
                ))
            }
        </CertificateListWrapper>
    )
}
