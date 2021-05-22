import React from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FormItem from "../forms/FormItem";

const TableSearch = ({ searchText, searchHandler, searchSize = 4 }) => {
  const { t } = useTranslation();
  return (
    <Row md={12}>
      <Col md={searchSize}>
        <FormItem
          className="searchTxtInput"
          icon={<i className="fal fa-search"></i>}
          placeholder={t("Search")}
          onChangeHandler={searchHandler}
          value={searchText}
        />
      </Col>
    </Row>
  );
};

export default TableSearch;
