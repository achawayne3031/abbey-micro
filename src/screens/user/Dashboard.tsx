import React from "react";
import { Container } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Dashboard = () => {
  return (
    <>
      <Container className="mt-4">
        <div className="d-flex justify-content-center">
          <div>
            <AccountCircleIcon fontSize="large" />
          </div>
        </div>

        <Tabs
          defaultActiveKey="registered"
          id="uncontrolled-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="registered" title="Registered Users List">
            Tab content for List
          </Tab>
          <Tab eventKey="Following" title="Following">
            Tab content for Following
          </Tab>
          <Tab eventKey="Followers" title="Followers">
            Tab content for Follower
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default Dashboard;
