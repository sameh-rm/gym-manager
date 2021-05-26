import React from "react";
import { Button, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LinkContainer } from "react-router-bootstrap";
import { loadImageUrl } from "../../utils/utils";

export const TableTD = ({ cellData, children, alt, className }) => {
  const imageType = /jpg|jpeg|png|PNG|JPG|JPEG/;
  return (
    <td className={`align-middle text-center ${className}`}>
      {typeof cellData === "boolean" ? (
        cellData ? (
          <i className="fas fa-check" style={{ color: "#22DD86" }}></i>
        ) : (
          <i className="fa fa-times" style={{ color: "#fc9f9f" }}></i>
        )
      ) : imageType.test(cellData) ? (
        <Image
          alt={alt}
          rounded
          fluid
          width="45px"
          src={loadImageUrl(cellData)}
        />
      ) : (
        children
      )}
    </td>
  );
};

export const ActionsTD = ({
  children,
  deleteHandler,
  id,
  editEndpoint,
  noEdit,
  editIcon,
  editHandler,
}) => {
  const { t } = useTranslation();
  return (
    <td className="align-middle">
      {noEdit ??
        (editIcon ? (
          <Button
            onClick={editHandler}
            variant="info"
            className="table-action-btn btn-sm mx-2"
            title={t("Confirm")}
          >
            {editIcon}
          </Button>
        ) : (
          <LinkContainer
            to={`/${editEndpoint}/${id}/edit`}
            className="table-action-btn mx-2"
          >
            <Button className="btn-sm" variant="info" title={t("Edit")}>
              <i className="fas fa-edit"></i>
            </Button>
          </LinkContainer>
        ))}

      <Button
        onClick={deleteHandler}
        variant="danger"
        className="table-action-btn btn-sm mx-2"
        title={t("Delete")}
      >
        <i className="fas fa-trash"></i>
      </Button>
    </td>
  );
};
