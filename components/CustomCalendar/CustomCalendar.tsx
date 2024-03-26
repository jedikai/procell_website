// /* eslint-disable import/no-extraneous-dependencies */
// import { CustomCalendarWrapper } from "@/styles/StyledComponents/CustomCalendarWrapper";
// import DownArrowIcon from "@/ui/Icons/DownArrowIcon";
// import Box from "@mui/material/Box";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
// import React, { useEffect, useState } from "react";
// import Calendar from "react-calendar";

// const generateMonthOptions = () => {
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December"
//   ];

//   return months.map((month, index) => ({
//     value: index,
//     label: month
//   }));
// };

// const startYear = 2000;
// const endYear = 2030;

// const yearOptions = Array.from(
//   { length: endYear - startYear + 1 },
//   (_, index) => ({
//     value: startYear + index,
//     label: `${startYear + index}`
//   })
// );

// export default function CustomCalendar({ getDate }: any) {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedMonth, setSelectedMonth] = useState(
//     selectedDate.getMonth() + 1
//   ); // Adding 1 to convert from 0-based to 1-based index
//   const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());

//   const handleDateChange = (date: any) => {
//     console.log(
//       "selectedDate first",
//       new Date(selectedYear, selectedMonth - 1, date.getDate())
//     );
//     getDate(new Date(selectedYear, selectedMonth - 1, date.getDate()))
//     setSelectedDate(date);
//   };

//   const handleMonthChange = (event: any) => {
//     const newMonth = parseInt(event.target.value, 10);
//     setSelectedMonth(newMonth);
//     setSelectedDate(
//       new Date(selectedYear, newMonth - 1, selectedDate.getDate())
//     );
//   };

//   const handleYearChange = (event: any) => {
//     const newYear = parseInt(event.target.value, 10);
//     setSelectedYear(newYear);
//     setSelectedDate(
//       new Date(newYear, selectedMonth - 1, selectedDate.getDate())
//     );
//   };
//   console.log("selectedDate", selectedDate);
//   useEffect(() => {
//     getDate(new Date());
//   }, []);

//   return (
//     <CustomCalendarWrapper className="custom_calendar">
//       <Stack
//         className="calendar_top"
//         alignItems="center"
//         justifyContent="space-between"
//         direction="row"
//         flexWrap="wrap"
//       >
//         <Typography variant="body1" className="left">
//           Select Your date
//         </Typography>
//         <Stack
//           direction="row"
//           className="calendar_control"
//           alignItems="center"
//           flexWrap="wrap"
//         >
//           <Box className="select_holder">
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={selectedMonth}
//               IconComponent={() => <DownArrowIcon />}
//               onChange={handleMonthChange}
//             >
//               {Array.from({ length: 12 }, (_, index) => index + 1).map(
//                 (month, index) => (
//                   // eslint-disable-next-line react/no-array-index-key
//                   <MenuItem key={month} value={month}>
//                     {new Date(selectedYear, month - 1, 1).toLocaleString(
//                       "en-US",
//                       { month: "long" }
//                     )}
//                   </MenuItem>
//                 )
//               )}
//             </Select>
//           </Box>
//           <Box className="select_holder">
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={selectedYear}
//               IconComponent={() => <DownArrowIcon />}
//               MenuProps={{
//                 PaperProps: {
//                   sx: {
//                     "&.MuiMenu-paper": {
//                       overflow: "auto !important"
//                     }
//                   }
//                 }
//               }}
//               onChange={handleYearChange}
//             >
//               {Array.from(
//                 { length: selectedYear - 2000 + 1 },
//                 (_, index) => 2000 + index
//               ).map((year, index) => (
//                 // eslint-disable-next-line react/no-array-index-key
//                 <MenuItem key={year} value={year}>
//                   {year}
//                 </MenuItem>
//               ))}
//             </Select>
//           </Box>
//         </Stack>
//       </Stack>
//       <Box className="calendar_main">
//         <Calendar
//           showNavigation={false}
//           onChange={handleDateChange}
//           value={selectedDate}
//         />
//       </Box>
//     </CustomCalendarWrapper>
//   );
// }

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-extraneous-dependencies */
import { CustomCalendarWrapper } from "@/styles/StyledComponents/CustomCalendarWrapper";
import DownArrowIcon from "@/ui/Icons/DownArrowIcon";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";

const generateMonthOptions = () => {
  const months = [
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

  return months.map((month, index) => ({
    value: index,
    label: month
  }));
};

const startYear = 2000;
const endYear = 2030;

const yearOptions = Array.from(
  { length: endYear - startYear + 1 },
  (_, index) => ({
    value: startYear + index,
    label: `${startYear + index}`
  })
);

export default function CustomCalendar({ getDate, value = "" }: any) {
  const [selectedDate, setSelectedDate] = useState<any>(new Date());

  const [selectedMonth, setSelectedMonth] = useState(
    selectedDate.getMonth() + 1
  ); // Adding 1 to convert from 0-based to 1-based index
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());

  const handleDateChange = (newDate: Date | any) => {
    setSelectedDate(newDate);
    setSelectedMonth(newDate.getMonth() + 1);
    getDate(newDate);
  };

  // const handleMonthChange = (event: any) => {
  //   const newMonth = parseInt(event.target.value, 10);
  //   setSelectedMonth(newMonth);
  //   setSelectedDate(
  //     new Date(selectedYear, newMonth - 1, selectedDate.getDate())
  //   );

  // };

  const handleMonthChange = (event: any) => {
    const newMonth = parseInt(event.target.value, 10);
    setSelectedMonth(newMonth);

    const newDate = new Date(
      selectedYear,
      newMonth - 1,
      selectedDate.getDate()
    );
    setSelectedDate(new Date(newDate));
  };

  console.log("selectedDate", selectedDate);

  const handleYearChange = (event: any) => {
    const newYear = parseInt(event.target.value, 10);
    setSelectedYear(newYear);
    setSelectedDate(
      new Date(newYear, selectedMonth - 1, selectedDate.getDate())
    );
  };

  useEffect(() => {
    if (!!value) {
      getDate(new Date(value));
      setSelectedDate(new Date(value));
    } else {
      getDate(new Date());
      setSelectedDate(new Date());
    }
  }, [value]);

  console.log("selectedDate", selectedDate);

  return (
    <CustomCalendarWrapper className="custom_calendar">
      <Stack
        className="calendar_top"
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        flexWrap="wrap"
      >
        <Typography variant="body1" className="left">
          Select Your date
        </Typography>
        <Stack
          direction="row"
          className="calendar_control"
          alignItems="center"
          flexWrap="wrap"
        >
          <Box className="select_holder">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedMonth}
              IconComponent={() => <DownArrowIcon />}
              onChange={handleMonthChange}
            >
              {Array.from({ length: 12 }, (_, index) => index + 1).map(
                (month, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <MenuItem key={month} value={month}>
                    {new Date(selectedYear, month - 1, 1).toLocaleString(
                      "en-US",
                      { month: "long" }
                    )}
                  </MenuItem>
                )
              )}
            </Select>
          </Box>
          <Box className="select_holder">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedYear}
              IconComponent={() => <DownArrowIcon />}
              MenuProps={{
                PaperProps: {
                  sx: {
                    "&.MuiMenu-paper": {
                      overflow: "auto !important"
                    }
                  }
                }
              }}
              onChange={handleYearChange}
            >
              {Array.from(
                { length: selectedYear - 2000 + 1 },
                (_, index) => 2000 + index
              ).map((year, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Stack>
      </Stack>
      <Box className="calendar_main">
        <Calendar
          key={selectedDate.getTime()}
          showNavigation={false}
          onChange={handleDateChange}
          value={selectedDate}
        />
      </Box>
    </CustomCalendarWrapper>
  );
}
