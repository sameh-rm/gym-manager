import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMember,
  listAllMembers,
} from "../../redux/memberReducers/member.actions";
import CustomTable from "../CustomTable/CustomTable";
import Loader from "../Loader";
/**
 * @param loading shows Loader Component if its true.
 * @param error the printed Error message if any.
 * @param usersList list of objects (the date to be displayed in the table body).
 */
const MembersTable = ({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { membersList, loading, error } = useSelector(
    (state) => state.membersList
  );
  const deleteHandler = (id) => {
    if (window.confirm(t("Are you sure?"))) {
      dispatch(deleteMember(id));
    }
  };
  useEffect(() => {
    dispatch(listAllMembers());
  }, [dispatch]);
  const columns = ["image", "name", "age", "tall", "nationalId"];

  return membersList ? (
    <CustomTable
      columns={columns}
      data={membersList}
      deleteHandler={deleteHandler}
      loading={loading}
      error={error}
    />
  ) : (
    <Loader />
  );
};

export default MembersTable;
