import InnerHeader from "@/components/InnerHeader/InnerHeader";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { PrivacyWrapper } from "@/styles/StyledComponents/PrivacyWrapper";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";

function index() {
  return (
    <Wrapper>
      <InnerHeader
        innerHeaderTitle="Privacy policy"
        innerHeaderRediractedPage="Privacy policy"
        bannerImage={assest.innerHeaderbackground} innerHeaderMainPage="Home"     />
      <PrivacyWrapper className="cmn_gap">
        <Container fixed>
          <Typography variant="h3">
            What information we collect about you
          </Typography>
          <Typography variant="body1">
            The information we collect on our Site generally falls into the
            following two categories: “personal information” and “non-personally
            identifiable information.” Personal information refers to
            information that lets us know the specifics of who you are (for
            example, your name, job title, company, physical mailing address,
            e-mail address, telephone and fax numbers and, if applicable,
            financial information such as your credit card information).
            Non-personally identifiable information refers to information that
            does not by itself identify a specific individual. If we do combine
            non-personally identifiable information with personal information,
            the combined information will be treated as personal information for
            as long as it remains combined. In general, we collect your personal
            information when you voluntarily provide it to us, such as when you
            register with us or place an order for products or services. We also
            collect information when you voluntarily complete customer surveys,
            provide feedback and participate in competitions. In addition, our
            Site may use “cookies” to gather non-personally identifiable
            information.
          </Typography>
          <Typography variant="h5">
           Cookies
          </Typography>
          <Typography variant="body1">
            Cookies are text files placed on your computer to collect standard
            internet log information and visitor behavior information. This
            information is used to track visitor use of the website and to
            compile statistical reports on website activity. For further
            information visit www.aboutcookies.org or www.allaboutcookies.org.
            You can set your browser not to accept cookies and the above
            websites tell you how to remove cookies from your browser. However
            in a few cases some of our Site features may not function as a
            result.
          </Typography>
          <Typography variant="h3" className="whyYourInformation">
            Why your information is processed and how it will be used
          </Typography>
          <Typography variant="body1">
            Personal information you provide to us is used to process your
            order, manage your account, deliver the services you request
            (including communicating with you about your subscription to our
            publications and your registration for a trade show, conference or
            event), and to respond to your inquiries and contact you about the
            Site and/or our services on the basis of your consent and may be
            used in a number of ways, for example:
          </Typography>
          <List>
            <ListItem>
              Registration for attendance at certain Procell trade shows,
              conferences and events;
            </ListItem>
            <ListItem>
              Subscriptions to Procell publications, including e-newsletters;
              and
            </ListItem>
            <ListItem>
              To access certain features or functions of our Site.
            </ListItem>
          </List>
          <Typography variant="body1">
            In processing your order, we may send your details to, and also use
            financial information you submit or information from credit
            reference agencies and fraud prevention agencies to verify your
            credit and collect payments for your purchases, orders, and
            registrations.We would like to send you information about products
            and services of ours and other companies in our group which may be
            of interest to you. If you have consented to receive marketing, you
            may opt out at a later date. You have a right at any time to stop us
            from contacting you for marketing purposes or providing your
            information to others.
          </Typography>
          <Typography variant="body1">
            If you no longer wish to be contacted for marketing purposes, please
            reach out to your sales representative.
          </Typography>
          <Box className="box_variant">
            <Typography variant="h3">
              Data Integrity and Purpose Limitation
            </Typography>
            <Typography variant="body1">
            Procell takes reasonable steps to ensure that the personal data that it processes is: (i) relevant for the purposes for which it is to be used, (ii) reliable for its intended use, and (iii) accurate, complete and current.
            </Typography>
          </Box>
          <Typography variant="h3">Your choices</Typography>
          <Typography variant="body1">
            Procell offers you the opportunity to choose or opt out of
            disclosure of your personal data to certain third parties or use
            your personal data for a purpose that is incompatible with the
            purpose for which the information was originally collected or
            subsequently authorized by you. You may contact Procell as indicated
            below regarding the company’s use or disclosure of your personal
            data.Procell’s online Privacy Policy sets forth the circumstances in
            which Procell may disclose personal data without offering you an
            opportunity to opt out, including:
          </Typography>
          <List>
            <ListItem>
              To its subsidiary companies as necessary to perform services on
              its behalf;
            </ListItem>
            <ListItem>
              To service providers, affiliates, agents and/or business partners
              Procell has retained to perform services on its behalf;
            </ListItem>
            <ListItem>
              When Procell believes disclosure is necessary to prevent physical
              harm or financial loss, or in connection with an investigation of
              suspected or actual illegal activity; or
            </ListItem>
            <ListItem>
              In the event it sells or transfers all or a portion of its
              business or assets (including in the event of a divestiture,
              merger, consolidation, liquidation or bankruptcy). Should such a
              sale or transfer occur, Procell will use reasonable efforts to
              direct the transferee to use the personal data in a manner that is
              consistent with this Privacy Policy.
            </ListItem>
          </List>
          <Typography variant="body1">
            Procell offers you the opportunity to choose or opt out of
            disclosure of your personal data to certain third parties or use
            your personal data for a purpose that is incompatible with the
            purpose for which the information was originally collected or
            subsequently authorized by you. You may contact Procell as indicated
            below regarding the company’s use or disclosure of your personal
            data.Procell’s online Privacy Policy sets forth the circumstances in
            which Procell may disclose personal data without offering you an
            opportunity to opt out, including:
          </Typography>
          <Box className="box_variant_two">
            <Grid container spacing={2} alignItems="center">
              <Grid item md={6} >
                <Typography variant="h3">
                  Special circumstances where we may disclose your information
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="body1">
                  Other than as set forth above, we may use and/or disclose your
                  information, including your Personally Identifiable
                  Information, in the following circumstances:
                </Typography>
                <List>
                  <ListItem>
                    To enforce, and/or investigate violations of, our site Terms
                    of Use and/or this Policy.
                  </ListItem>
                  <ListItem>
                    Although unlikely, your personal information may be
                    disclosed to the governments, courts, law enforcement or
                    regulatory agencies under a lawful order in a jurisdiction
                    where you are located and/or where your personal information
                    is stored and/or processed. You cannot opt out of disclosure
                    of your personal information if required by lawful order.
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>
          <Box className="box_variant_three">
            <Typography variant="h3">
              Accountability for onward transfer of personal data
            </Typography>
            <Typography variant="body1">
              Procell may share your personal data with third parties as
              indicated above and consistent with its online Privacy Policy.
              Except as permitted or required by applicable law, Procell
              requires third parties controllers to whom it discloses your
              personal data to either (i) subscribe to the relevant Privacy
              Principles or (ii) contractually agree that data will only be
              processed for limited and specified purposes consistent with the
              consent given by the individual, that the recipient will provide
              the same level of protection and that the recipient will notify
              Procell if it makes a determination that it can no longer meet
              those obligations.
            </Typography>
          </Box>
          <Box className="box_variant">
            <Typography variant="h3">
              How we protect your information
            </Typography>
            <Typography variant="body1">
              We use reasonable technological and physical safeguards to protect
              your personal information from loss, misuse and unauthorized
              access, disclosure, alteration and destruction. We follow
              generally accepted industry standards to protect the information
              submitted to us, both during transmission and once we receive it.
            </Typography>
          </Box>

          <Typography variant="h3">Hyperlinks and other websites</Typography>
          <Typography variant="body1">
            Our Site may contains links to websites operated by others. This
            Privacy Policy only applies to this Site. Privacy policies for these
            third party sites and services may be different from our Privacy
            Policy. You access these third party sites and services at your own
            risk so when you link to other websites, you should read their
            privacy policies.
          </Typography>
          <Typography variant="h3">
            What do we do with your information when you terminate your
            relationship with us?
          </Typography>
          <Typography variant="body1">
            In general, we will only retain your information for the time
            necessary to realize our legitimate business purposes and to comply
            with the law. However, we may continue to store anonymous or
            anonymized information, such as website visits, without identifiers,
            in order to improve our services.
          </Typography>
          <Typography variant="h3">Your rights</Typography>
          <Typography variant="body1">You have the right to:</Typography>
          <List>
            <ListItem>
              Withdraw your consent to the processing of your personal
              information at any time without penalty;
            </ListItem>
            <ListItem>
              Access your personal information and have it corrected, amended or
              deleted;
            </ListItem>
            <ListItem>
              Receive a copy of your personal data and transit such to others;
            </ListItem>
            <ListItem>
              At any time, to object to our processing of your personal
              information which we will comply with unless we demonstrate a
              compelling legitimate grounds for processing such that overrides
              your rights; and
            </ListItem>
            <ListItem>
              If you believe your personal information is inaccurate, unlawful,
              no longer necessary for our business purposes, or if you object to
              our processing of your personal information, you also have the
              right to instruct us to restrict the processing of your data
              pending our investigation and/or verification of your claim.
            </ListItem>
          </List>
          <Typography variant="body1">
            If you wish to raise a complaint and initiate and investigation on
            how we have handled your personal data, or request a copy of your
            personal information, please email us at info@procelltherapies.com.
            We may make a small charge for this service.
          </Typography>
          <Box className="box_variant">
            <Typography variant="h3">Questions or feedback</Typography>
            <Typography variant="body1">
              If you have any questions or comments regarding our privacy policy
              and practice, please email us at info@procelltherapies.com.
            </Typography>
          </Box>
        </Container>
      </PrivacyWrapper>
    </Wrapper>
  );
}

export default index;
