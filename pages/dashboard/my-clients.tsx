/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */

import ButtonLoaderSecondary from "@/components/ButtonLoader/ButtonLoaderSecondary";
import AddUpdateClients from "@/components/MyClients/AddUpdateClients";
import ClientProfile from "@/components/MyClients/ClientProfile";
import ClientsList from "@/components/MyClients/ClientsList";
import CreateEntrySec from "@/components/MyClients/CreateEntrySec";
import MyClientPreviewModal from "@/components/MyClients/MyClientPreviewModal";
import NewEntryModal from "@/components/MyClients/NewEntryModal";
import PreviewEntry from "@/components/MyClients/PreviewEntry";
// import PreviewEntries from "@/components/MyClients/PreviewEntries";
import {
  useClientEntries,
  useMyClientsListList
} from "@/hooks/react-qurey/query-hooks/myClientsQuery.hooks";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import Wrapper from "@/layout/wrapper/Wrapper";
import Box from "@mui/material/Box";
import { useCallback, useEffect, useMemo, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const settings = {
  dots: false,
  arrows: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  swipeToSlide: true,
  focusOnSelect: true,
  infinite: false,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false
      }
    },
    {
      breakpoint: 899,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false
      }
    },
    {
      breakpoint: 599,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false
      }
    }
  ]
};

export default function Index() {
  // const [openModal, setOpenModal] = useState(false);
  // const [openNewEntryModal, setOpenNewEntryModal] = useState(false);
  const [profileState, setProfileState] = useState("customer_profile");
  const [isProfileUpadte, setIsProfileUpadte] = useState(false);
  const [selectedClientData, setSelectedClientData] = useState<any>({});
  const [selectedEntryData, setSelectedEntryData] = useState<any>({});
  const [selectedClientId, setSelectedClientId] = useState("");

  const {
    data: clientsList,
    isLoading: clientListLoader,
    refetch
  }: any = useMyClientsListList(false, (response: any) => {
    // if (!(Object.keys(selectedClientData).length > 0)) {
    
    if (
      !!selectedClientId &&
      !!selectedClientData &&
      !!Object.keys(selectedClientData ?? {})?.length
    ) {
    } else {
      setSelectedClientData(response[0]);
      setSelectedClientId(response[0]?.id);
    }
    // }
  });
  const { data: clientsEntries, isLoading: clientEntriesLoader }: any =
    useClientEntries(selectedClientId);

  const handleDeleteEntry = useCallback(
    (data: any) => {
      // setOpenModal(true);
      setSelectedEntryData(data);
      setProfileState("preview_entry");
    },
    [selectedEntryData, profileState]
  );

  const handleChangeState = useCallback(
    (nextState: string) => {
      setProfileState(nextState);
    },
    [profileState]
  );

  const getSelectedClientData = useCallback(
    (data: any) => {
      /*  */
      setSelectedClientData(data);
    },
    [selectedClientData]
  );

  const getSelectedClientId = useCallback(
    (id: any) => {
      setSelectedClientId(id);
    },
    [selectedClientId]
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <Wrapper>
        <DashboardWrapper>
          <Box className="cmn_box">
            {profileState === "customer_profile" ? (
              <>
                {!clientListLoader ? (
                  <ClientProfile
                    handleChangeState={handleChangeState}
                    // handleOpenNewEntryModal={handleOpenNewEntryModal}
                    handleDeleteEntry={handleDeleteEntry}
                    // clientProfileUpdateDecider={clientProfileUpdateDecider}
                    getSelectedClientData={getSelectedClientData}
                    selectedClientData={selectedClientData}
                    clientsList={clientsList}
                    clientsEntries={clientsEntries}
                    getSelectedClientId={getSelectedClientId}
                    clientId={selectedClientId}
                    fetchClientList={refetch}
                  />
                ) : (
                  <ButtonLoaderSecondary />
                )}
              </>
            ) : profileState === "add_customer" ? (
              <AddUpdateClients
                handleChangeState={handleChangeState}
                getSelectedClientData={getSelectedClientData}
                fetchClientList={refetch}
                getSelectedClientId={getSelectedClientId}
                // clientProfileUpdateDecider={clientProfileUpdateDecider}
                // addUpdateClientsDataHandler={addUpdateClientsDataHandler}
                clientId={selectedClientData?.id}
              />
            ) : profileState === "all_client_list" ? (
              <ClientsList
                handleChangeState={handleChangeState}
                clientsList={clientsList}
                getSelectedClientData={getSelectedClientData}
              />
            ) : profileState === "create_entry" ? (
              <CreateEntrySec
                clientId={selectedClientData?.id}
                handleChangeState={handleChangeState}
              />
            ) : profileState === "preview_entry" ? (
              <PreviewEntry
                entryData={selectedEntryData}
                clientId={selectedClientData?.id}
                handleChangeState={handleChangeState}
              />
            ) : null}
          </Box>
        </DashboardWrapper>
      </Wrapper>
      {/* <MyClientPreviewModal
        entryData={selectedEntryData}
        openmod={openModal}
        close={handleCloseModal}
      /> */}
      {/* <NewEntryModal
        open={openNewEntryModal}
        close={handleCloseNewEntryModal}
      /> */}
    </>
  );
}
