import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { transactionsCombined } from "./ApplicationItem.helper";
import TableComponent from "./TableComponent";

const propTypes = {
  getApplication: PropTypes.func.isRequired,
};

export default function ApplicationsItem(props) {
  const { appId } = useParams();
  const [applicationData, setApplicationData] = useState();

  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [cards, setCards] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const appData = props.getApplication(appId);
    setApplicationData(appData);
  }, [appId]);

  useEffect(() => {
    setIsLoadingCards(true);
    fetch(`http://localhost:8080/cards/${appId}`, {
      method: "get",
      headers: {
        "Content-Type": "text/plain",
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        setCards(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => setIsLoadingCards(false));
  }, [applicationData]);

  useEffect(() => {
    fetch(`http://localhost:8080/trans/${appId}`, {
      method: "get",
      headers: {
        "Content-Type": "text/plain",
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        setTransactions(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [cards]);

  const cardTransactionsData = useMemo(() => {
    if (cards.length && transactions.length) {
      return transactionsCombined(cards, transactions);
    }

    return [];
  }, [transactions]);

  const renderBody = () => {
    if (!applicationData) {
      return (
        <div className="muted">
          Couldn't find any application associated with id #{appId}
        </div>
      );
    }

    return (
      <React.Fragment>
        <h4>
          {applicationData.id}&nbsp;-&nbsp;{applicationData.firstName}&nbsp;
          {applicationData.lastName}
        </h4>
        <Col>
          {
            <TableComponent
              name="application item"
              data={cardTransactionsData}
            />
          }
        </Col>
      </React.Fragment>
    );
  };

  return (
    <div id="application-item-view">
      <Row>
        <Col>
          <h1>Applications item {appId}</h1>
        </Col>
      </Row>
      <Row>
        {isLoadingCards ? (
          <Col>
            <div>Loading...</div>
          </Col>
        ) : (
          renderBody()
        )}
      </Row>
    </div>
  );
}

ApplicationsItem.propTypes = propTypes;
