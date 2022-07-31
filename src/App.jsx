import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import ApplicationsList from "./components/ApplicationsList";
import ApplicationItem from "./components/ApplicationItem";

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8080/application/list", {
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
        setApplications(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const getApplicationById = (appId) =>
    applications.find((app) => app.id === parseInt(appId, 10));

  return (
    <div className="App">
      <Container fluid>
        <Routes>
          <Route
            path="/"
            element={
              <ApplicationsList
                applications={applications}
                isLoading={isLoading}
              />
            }
          />
          {applications.length ? (
            <Route
              path="application/:appId"
              element={<ApplicationItem getApplication={getApplicationById} />}
            />
          ) : (
            () => <Navigate to="/" />
          )}
        </Routes>
      </Container>
    </div>
  );
}

export default App;
