import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import TableComponent from "./TableComponent";

const propTypes = {
  applications: PropTypes.array,
};

export default function ApplicationsList({ applications, isLoading }) {
  const navigate = useNavigate();
  const handleRowClick = (app) => {
    navigate(`/application/${app.id}`);
  };

  return (
    <div id="application-list">
      <Row>
        <Col>
          <h1>Applications list</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <TableComponent
              name="application list"
              data={applications}
              onClickRow={handleRowClick}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}

ApplicationsList.propTypes = propTypes;
