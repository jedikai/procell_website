import InnerHeader from "@/components/InnerHeader/InnerHeader";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { MicroChannelWrapper } from "@/styles/StyledComponents/MicroChannelWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Index() {
    const [play, setPlay] = useState(false);
    const videoRef = useRef<any>(null);

    const playVideo = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setPlay(true);
        }
    };

    const pauseVideo = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            setPlay(false);
        }
    };
    return (
        <Wrapper>
            <InnerHeader
                bannerImage={assest.innerHeaderbackground}
                innerHeaderRediractedPage="Intro to microchanneling"
                innerHeaderTitle="Intro to microchanneling" innerHeaderMainPage="Practitioner acadamy" innnerHeaderMainurl="practitioner-academy" />
            <MicroChannelWrapper className="cmn_gap">
                <Container fixed>
                    <Box className="channel_wrapper">
                        <Box className="video_sec">
                            <Box className="video_sec_inner">
                                <video
                                    width="auto"
                                    height="auto"
                                    loop
                                    muted
                                    playsInline
                                    poster={assest.videoposter}
                                    ref={videoRef as any}

                                >
                                    <source src={assest.banner_vdo} type="video/mp4" />
                                </video>
                                {play ? (
                                    <Button
                                        type="button"
                                        className="play_btn pause_btn"
                                        onClick={() => pauseVideo()}
                                    >
                                        <Image
                                            src={assest?.pause_btn_black}
                                            alt="play btn"
                                            width={48}
                                            height={48}
                                        />
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        className="play_btn"
                                        onClick={() => playVideo()}
                                    >
                                        <Image
                                            src={assest?.play_btn_black}
                                            alt="play btn"
                                            width={48}
                                            height={48}
                                        />
                                    </Button>
                                )}
                            </Box>
                        </Box>
                        <Box className="channel_content">
                            <Typography variant="h4">What is microchanneling</Typography>
                            <Typography>
                                Lorem ipsum dolor sit amet consectetur. Ante sit ultrices cras
                                sit vulputate ullamcorper purus mauris. Nulla donec eu etiam ut
                                tristique amet sodales condimentum fringilla. A enim euismod in
                                adipiscing dui urna et auctor ultricies. Nisl mattis aliquam
                                arcu ut venenatis elementum. Elit vel et amet volutpat eu
                                egestas.
                            </Typography>
                            <Typography>
                                In viverra diam varius eros et suspendisse sit tristique quam.
                                Iaculis viverra faucibus arcu posuere massa in. Etiam varius
                                tempus dolor odio cursus tellus posuere. Volutpat risus
                                vulputate habitasse augue aliquam vitae nibh praesent mauris.
                                Tellus commodo ultrices ipsum pellentesque. A auctor elit
                                imperdiet diam pellentesque diam. Nec cursus justo justo at.
                            </Typography>
                            <Typography>
                                Dui consectetur euismod leo tempus. Facilisis sed ornare purus
                                habitant accumsan suscipit egestas massa. Eros diam sed sagittis
                                risus varius id. Dignissim pellentesque tristique tellus
                                porttitor urna tellus pretium. Odio proin tellus cursus
                                ultricies id sed venenatis non cras. Senectus egestas lectus
                                odio mauris dignissim euismod tellus mauris lectus. Feugiat urna
                                vel adipiscing nam porta quisque. Non enim egestas vulputate
                                condimentum. Laoreet arcu tincidunt vestibulum lorem leo elit
                                varius cras lorem. Enim eget ultricies pharetra bibendum. Sit
                                lacus eu imperdiet ac netus et gravida libero neque. Sem tortor
                                adipiscing adipiscing amet risus integer ultrices non. Quisque
                                porttitor semper morbi sagittis amet suspendisse eget tristique
                                nibh. Interdum nunc massa vel nec quis fermentum mauris
                                tincidunt eu.
                            </Typography>
                            <Typography>
                                Nibh nec viverra sed nisi enim feugiat nulla sed volutpat.
                                Gravida in lorem viverra suspendisse vestibulum sagittis sed
                                orci habitant. Elementum bibendum ut ac egestas a laoreet auctor
                                dui. Eu tortor dictum quis scelerisque porttitor. Quisque
                                aliquam iaculis tortor amet. Fermentum aenean id cursus rhoncus.
                                At aliquam.
                            </Typography>
                        </Box>
                        <Box className="btn_otr">
                            <CustomButtonPrimary variant="contained" color="primary">
                                <Typography>Mark as Incomplete</Typography>
                            </CustomButtonPrimary>
                        </Box>
                    </Box>
                </Container>
            </MicroChannelWrapper>
        </Wrapper>
    )
}
