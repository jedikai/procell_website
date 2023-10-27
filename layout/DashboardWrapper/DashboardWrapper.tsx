import useOnlineStatus from "@/hooks/useDetectOnline";
import { DashboardStyle } from "@/styles/StyledComponents/DashboardStyle";

import { Box, Container, Stack } from "@mui/system";
import { useRouter } from "next/router";
import SideNavbar from "../SideNavbar/SideNavbar";

interface DashboardProps {
  children: JSX.Element | JSX.Element[];
}

export default function DashboardWrapper({ children }: DashboardProps) {
  const router = useRouter();

  const routerText = router.pathname.split("");

  routerText.shift();

  useOnlineStatus();
  return (
    <DashboardStyle>
      <Container fixed>
        <Stack direction="row" flexWrap="wrap" className="dashboard_stack">
          
          <SideNavbar />
         

          <Box className="dashboard_body">{children}</Box>
        </Stack>
      </Container>
    </DashboardStyle>
  );
}
