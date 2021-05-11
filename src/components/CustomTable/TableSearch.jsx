import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FormItem from "../forms/FormItem";

const TableSearch = ({ searchText, searchHandler }) => {
  const { t } = useTranslation();
  return (
    <Row>
      <Col md={3}>
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
