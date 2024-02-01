import assest from "@/json/assest";
import { ClientListWrapper } from "@/styles/StyledComponents/ClientListWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import BackArrowIcon from "@/ui/Icons/BackArrowIcon";
import DeleteIcon from "@/ui/Icons/DeleteIcon";
import UpdateProfileIcon from "@/ui/Icons/UpdateProfileIcon";
import { Button, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Image from "next/image";
import React, { memo } from "react";

const ClientsList = ({
  handleChangeState,
  clientsList,
  getSelectedClientData
}: any) => {
  return (
    <>
      <ClientListWrapper>
        <Box className="back_btn_holder">
          <Button
            type="button"
            onClick={() => handleChangeState("customer_profile")}
          >
            <BackArrowIcon />
          </Button>
        </Box>
        <Box className="btn_holder">
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            onClick={() => {
              getSelectedClientData(null);
              handleChangeState("add_customer");
            }}
          >
            Add Customer
          </CustomButtonPrimary>
        </Box>
        <Stack direction="row" flexWrap="wrap" className="client_list">
          {clientsList.map((_client: any) => (
            <Box
              className="client_col"
              onClick={() => {
                getSelectedClientData(_client);
                handleChangeState("customer_profile");
              }}
            >
              <Box className="client_box">
                <Box className="image_box">
                  <img
                    src={
                      _client?.profile_image_url != "false" &&
                      !!_client?.profile_image_url
                        ? _client?.profile_image_url
                        : assest.avatarIcon
                    }
                    alt=""
                    width={80}
                    height={80}
                  />
                </Box>
                <Box className="right">
                  {!!_client?.first_name && !!_client?.last_name && (
                    <Typography variant="body1" sx={{ textAlign: "center" }}>
                      {`${_client?.first_name} ${_client?.last_name}`}
                    </Typography>
                  )}
                  {/* <Box className="btn_holder">
                    <Button type="button">
                      <UpdateProfileIcon IconWidth="30" IconHeight="30" />
                    </Button>
                    <Button type="button">
                      <DeleteIcon IconColor="red" />
                    </Button>
                  </Box> */}
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>
      </ClientListWrapper>
    </>
  );
};

export default memo(ClientsList);
