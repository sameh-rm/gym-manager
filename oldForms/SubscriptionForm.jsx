import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router";
import Select from "react-select";
import {
  coursesToOptions,
  optionsToMemberShipCourses,
} from "../../../redux/courseReducers/utils";
import { initMember } from "../../../redux/memberReducers/member.actions";
import { optionsToCourses } from "../../../redux/courseReducers/utils";
import FormCoursesMenu from "../../forms/FormCoursesMenu";

const SubscriptionForm = ({
  coursesAsOptions,
  membershipsAsOptions,
  coursesValues,
  setCoursesValues,
  membershipsValues,
  setMembershipsValues,
}) => {
  // const { member: memberToEdit } = useSelector(
  //   (state) => state.member.selectMember
  // );
  // const { id } = useParams();
  const { memberToCreate } = useSelector((state) => state.member.addMember);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [memberShipSelected, setMemberShipSelected] = useState(false);
  const membershipCoursesToList = (membership) => {
    setCoursesValues(
      coursesToOptions(
        membership.courses.map((course) => {
          return {
            ...course,
            membership: membership._id,
            price:
              course.plan === "شهرى" ? course.monthlyPrice : course.dayilyPrice,
          };
        })
      )
    );
  };
  useEffect(() => {
    if (memberShipSelected) {
      const membership = membershipsValues.value;

      membershipCoursesToList(membership);
      dispatch(
        initMember({
          ...memberToCreate,
          memberships: [membership],
          courses: optionsToMemberShipCourses(membership),
        })
      );
    }
  }, [memberShipSelected]);

  return (
    <Row>
      <Col md={4}>
        <Form.Group controlId="Memberships">
          <Form.Label>{t("Memberships")}</Form.Label>
          <Select
            isClearable
            options={membershipsAsOptions}
            value={membershipsValues}
            menuPosition="fixed"
            placeholder={t("Select Memberships")}
            onChange={(e) => {
              setMembershipsValues(e);
              setMemberShipSelected(e !== null);
            }}
          />
        </Form.Group>
        {memberShipSelected && (
          <Form.Group controlId="Courses">
            <Form.Label>{t("Courses")}</Form.Label>
            <Select
              options={coursesAsOptions}
              value={coursesValues}
              isMulti
              menuPosition="fixed"
              placeholder={t("Select Courses")}
              onChange={(e) => {
                console.log(e);
                setCoursesValues(e);
                dispatch(
                  initMember({
                    ...memberToCreate,
                    courses: optionsToCourses(e),
                  })
                );
              }}
            />
          </Form.Group>
        )}
      </Col>
      <Col>
        <FormCoursesMenu
          maxHeight="600px"
          title="Courses"
          coursesValues={coursesValues}
        />
      </Col>
    </Row>
  );
};

export default SubscriptionForm;
