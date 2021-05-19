import React, { useEffect, useState } from "react";
import { Col, Form, Image, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FormItem from "../../forms/FormItem";
import { initMember } from "../../../redux/memberReducers/member.actions";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router";
import { listAllCourses } from "../../../redux/courseReducers/course.actions";
import { loadImageUrl, uploadImage } from "../../../utils/utils";
import Loader from "../../Loader";

const MemberForm = () => {
  // const { id } = useParams();
  const { member: memberToEdit } = useSelector(
    (state) => state.member.selectMember
  );

  const { memberToCreate } = useSelector((state) => state.member.addMember);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [image, setImage] = useState(
    memberToCreate.image || loadImageUrl("/uploads/person-sample.jpg")
  );

  const [uploading, setUploading] = useState(false);

  const uploadFileHandler = async (e) => {
    uploadImage(e, setUploading, setImage, (data) => {
      dispatch(initMember({ ...memberToCreate, image: data }));
    });
  };
  const [isActive, setIsActive] = useState(
    memberToEdit ? memberToEdit.isActive : false
  );
  useEffect(() => {
    dispatch(listAllCourses());
  }, [dispatch]);

  useEffect(() => {
    if (memberToCreate.name) {
      if (!uploading) {
        setImage(memberToCreate.image);
      }
    }
  }, [memberToCreate, image, uploading]);

  return (
    <>
      <Row>
        <Col md={8}>
          <Row>
            <Col>
              <FormItem
                title={t("Name")}
                value={memberToCreate.name}
                placeholder={t("Name")}
                onChangeHandler={(value) => {
                  dispatch(initMember({ ...memberToCreate, name: value }));
                }}
                required
                type="text"
                key="name"
              />
            </Col>
            {memberToEdit && (
              <Col md={2}>
                <Form.Group
                  controlId="IsActive"
                  style={{ paddingTop: "2.4rem" }}
                >
                  <Form.Check
                    custom
                    label={t("IsActive")}
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                </Form.Group>
              </Col>
            )}
          </Row>
          <Row>
            <Col>
              <FormItem
                title={t("NationalID")}
                value={memberToCreate.nationalId}
                placeholder={t("NationalID")}
                onChangeHandler={(value) => {
                  dispatch(
                    initMember({ ...memberToCreate, nationalId: value })
                  );
                }}
                required
                type="text"
                key="nationalId"
              />
            </Col>
            <Col>
              <FormItem
                title={t("Phone")}
                value={memberToCreate.phone}
                placeholder={t("Phone")}
                onChangeHandler={(value) => {
                  dispatch(initMember({ ...memberToCreate, phone: value }));
                }}
                required
                type="text"
                key="phone"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem
                title={t("Age")}
                value={memberToCreate.age}
                placeholder={t("Age")}
                onChangeHandler={(value) => {
                  dispatch(initMember({ ...memberToCreate, age: value }));
                }}
                required
                type="text"
                key="age"
              />
            </Col>
            <Col>
              <FormItem
                title={t("Tall")}
                value={memberToCreate.tall}
                placeholder={t("Tall")}
                onChangeHandler={(value) => {
                  dispatch(initMember({ ...memberToCreate, tall: value }));
                }}
                required
                type="text"
                key="tall"
              />
            </Col>
            <Col>
              <FormItem
                title={t("Weight")}
                value={memberToCreate.weight}
                placeholder={t("Weight")}
                onChangeHandler={(value) => {
                  dispatch(initMember({ ...memberToCreate, weight: value }));
                }}
                required
                type="text"
                key="weight"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <FormItem
                title={t("Address")}
                value={memberToCreate.address}
                placeholder={t("Address")}
                onChangeHandler={(value) => {
                  dispatch(
                    initMember({
                      ...memberToCreate,
                      personalAddress: {
                        ...memberToCreate.personalAddress,
                        address: value,
                      },
                    })
                  );
                }}
                required
                type="text"
                key="address"
              />
            </Col>
            <Col md={2}>
              <FormItem
                title={t("City")}
                value={memberToCreate.city}
                placeholder={t("City")}
                onChangeHandler={(value) => {
                  dispatch(
                    initMember({
                      ...memberToCreate,
                      personalAddress: {
                        ...memberToCreate.personalAddress,
                        city: value,
                      },
                    })
                  );
                }}
                required
                type="text"
                key="city"
              />
            </Col>
            <Col md={2}>
              <FormItem
                title={t("Center")}
                value={memberToCreate.center}
                placeholder={t("Center")}
                onChangeHandler={(value) => {
                  dispatch(
                    initMember({
                      ...memberToCreate,
                      personalAddress: {
                        ...memberToCreate.personalAddress,
                        center: value,
                      },
                    })
                  );
                }}
                required
                type="text"
                key="center"
              />
            </Col>
            <Col md={2}>
              <FormItem
                title={t("Governorate")}
                value={memberToCreate.governorate}
                placeholder={t("Governorate")}
                onChangeHandler={(value) => {
                  dispatch(
                    initMember({
                      ...memberToCreate,
                      personalAddress: {
                        ...memberToCreate.personalAddress,
                        governorate: value,
                      },
                    })
                  );
                }}
                required
                type="text"
                key="governorate"
              />
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <Image src={image} alt={memberToCreate.name} fluid />
          <Form.File.Input
            className="mt-2"
            id="image-file"
            label={t("Choose Image")}
            style={{ textAlign: "left" }}
            onChange={uploadFileHandler}
          />
          {uploading && <Loader />}
        </Col>
      </Row>
    </>
  );
};

export default MemberForm;
