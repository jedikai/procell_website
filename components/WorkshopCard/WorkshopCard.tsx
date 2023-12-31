import { workshopProps } from "@/interface/workshop.interfaces";
import { WorkshopCardWrapper } from "@/styles/StyledComponents/WorkshopCardWrapper";
import { primaryColors } from "@/themes/_muiPalette";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import CalenderIcon from "@/ui/Icons/CalenderIcon";
import ClockIcon from "@/ui/Icons/ClockIcon";
import MoonIcon from "@/ui/Icons/MoonIcon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { memo } from "react";

export default memo(function WorkshopCard(props: workshopProps | any) {
  const {name,workshop_url,date} = props;

  // const { date, time, title }: any = props;

  const timeFormatter = (date: Date) => {
    var hours: number = date.getHours();
    var minutes: number = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? 0 + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };
  const getDaySuffix = (day: number) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const inputDateStr = date ?? "2023-12-11 12:30:00";

  // Parse the input date using the Date constructor
  const inputDate = new Date(inputDateStr);

  // Create an array of month names for reference
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  // Get the month, day, and year from the input date
  const month = monthNames[inputDate.getMonth()];
  const day = inputDate.getDate();
  const year = inputDate.getFullYear();
  const daySuffix = getDaySuffix(day);

  // Create the output date string
  const outputDateStr = `${month} ${day}${daySuffix}, ${year}`;

  return (
    <WorkshopCardWrapper className={name === "TBD" ? "disabled" : ""}>
      <i className="icon">
        <MoonIcon />
      </i>
      <Box className="card_content">
        <Typography variant="h5">
          {/* {title} */}
          {name}
          </Typography>
        <List disablePadding>
          <ListItem disablePadding>
            <CalenderIcon
              IconColor={
                name === "TBD"
                  ? primaryColors?.disabledBg
                  : primaryColors?.black
              }
              IconWidth="13"
              IconHeight="13"
            />
            {/* {date} */}
            {outputDateStr}
          </ListItem>
          <ListItem disablePadding>
            <ClockIcon
              IconColor={
                name === "TBD"
                  ? primaryColors?.disabledBg
                  : primaryColors?.black
              }
            />
            {/* {time} */}
            {timeFormatter(new Date(date))}
          </ListItem>
        </List>
        <Box className="btn_otr">
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            disabled={name === "TBD"}
            onClick={() => window.open(workshop_url ?? "", "_blank")}
          >
            <Typography>Register now</Typography>
          </CustomButtonPrimary>
        </Box>
      </Box>
    </WorkshopCardWrapper>
  );
})
