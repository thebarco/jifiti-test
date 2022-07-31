import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Table } from "react-bootstrap";

const propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  onClickRow: PropTypes.func,
};

const defaultProps = {
  data: [],
};

export default function TableComponent({ name, data, onClickRow }) {
  const renderTable = () => {
    const headers = Object.keys(data[0]);

    return (
      <Table className="header-sticky" striped bordered hover>
        <thead>
          <tr>
            {headers.map((th) => (
              <th key={th}>{th}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((rowData, idx) => {
            const rowKey = `table-row-#${idx}`;
            return (
              <tr
                className={classNames({ clickable: !!onClickRow })}
                key={rowKey}
                onClick={() => onClickRow && onClickRow(rowData)}
              >
                {headers.map((key) => (
                  <td key={`${rowKey}-${key}`}>{rowData[key]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };
  return (
    <React.Fragment
      key={`table-component=${name.toLowerCase().replace(/ /g, "-")}`}
    >
      {(!data.length && <div className="muted">No {name} to show</div>) ||
        renderTable()}
    </React.Fragment>
  );
}

TableComponent.propTypes = propTypes;
TableComponent.defaultProps = defaultProps;
