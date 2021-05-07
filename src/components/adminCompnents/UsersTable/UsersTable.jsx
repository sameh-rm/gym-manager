import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import AsyncComponent from "../../Utils/AsyncComponent";
/**
 * @param loading shows Loader Component if its true.
 * @param error the printed Error message if any.
 * @param usersList list of objects (the date to be displayed in the table body).
 */
const UsersTable = ({ history }) => {
  const { t } = useTranslation();
  const deleteHandler = () => {
    console.log("Delete Handler Not Implemented");
  };

  const { loading, error, usersList } = useSelector(
    (state) => state.core.usersList
  );
  return (
    <Container>
      <AsyncComponent loading={loading} error={error}>
        <Table striped hover bordered responsive className="mt-3">
          <thead>
            <tr>
              <th colSpan={2}>#</th>
              <th colSpan={3}>{t("Image")}</th>
              <th colSpan={3}>{t("Name")}</th>
              <th colSpan={2}>{t("Username")}</th>
              <th colSpan={1}>{t("IsAdmin")}</th>
              <th colSpan={1}></th>
            </tr>
          </thead>
          <tbody>
            {usersList.length === 0 ? (
              <tr>
                <td className="text-center" colSpan={6}>
                  {t("No records to display")}
                </td>
              </tr>
            ) : (
              usersList.map((user, idx) => (
                <tr key={idx + 1}>
                  <td colSpan={2}>{user._id}</td>
                  <td colSpan={3}>{user.image}</td>
                  <td colSpan={3}>{user.name}</td>
                  <td colSpan={2}>{user.username}</td>
                  <td colSpan={1} className="text-center">
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "#22DD86" }}
                      ></i>
                    ) : (
                      <i
                        className="fa fa-times"
                        style={{ color: "#fc9f9f" }}
                      ></i>
                    )}
                  </td>
                  <td colSpan={1} className="text-center">
                    <LinkContainer
                      to={`/users/${user._id}/edit`}
                      className="mx-2"
                    >
                      <Button
                        className="btn-sm"
                        variant="light"
                        title={t("Edit")}
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      onClick={deleteHandler}
                      variant="danger"
                      className="btn-sm mx-2"
                      title={t("Delete")}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </AsyncComponent>
    </Container>
  );
};

export default UsersTable;
