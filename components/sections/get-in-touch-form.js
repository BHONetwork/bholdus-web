import { useState } from "react";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { MdDone } from "react-icons/md";
import useTranslation from "next-translate/useTranslation";

import Button from "../common/button";
import Text from "../common/text";

import { fetchAPI } from "../../utils/api";

const GetInTouchForm = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const { t } = useTranslation();

  const FormSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().required(),
  });

  return (
    <Formik
      initialValues={{ name: "", email: "", message: "" }}
      validationSchema={FormSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        setLoading(true);

        try {
          setErrors({ api: null });
          await fetchAPI("/lead-form-submissions", {
            method: "POST",
            body: JSON.stringify({
              name: values.name,
              email: values.email,
              message: values.message,
            }),
          });
          setIsSuccessful(true);
          setTimeout(() => {
            setIsSuccessful(false);
          }, 3000);
        } catch (err) {
          setErrors({ api: err.message });
        }

        setLoading(false);
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <>
          <Form
            className="contact-form flex flex-col lg:gap-6"
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom"
          >
            <Field
              className="form-field p-4 rounded focus:outline-none lg:mb-0 mb-2"
              type="text"
              name="name"
              placeholder={t("common:getInTouchFormName")}
            />
            <Text className="text-left" type="div" uppercase>
              {errors.name && touched.name && errors.name}
            </Text>
            <Field
              className="form-field p-4 rounded focus:outline-none lg:mb-0 mb-2"
              type="email"
              name="email"
              placeholder={t("common:getInTouchFormEmail")}
            />
            <Text className="text-left" type="div" uppercase>
              {errors.email && touched.email && errors.email}
            </Text>
            <Field
              className="form-field p-4 rounded focus:outline-none lg:mb-0 mb-2"
              component="textarea"
              style={{ height: 190, resize: "none" }}
              type="text"
              name="message"
              placeholder={t("common:getInTouchFormMessage")}
            />
            <Text className="text-left" type="div" uppercase>
              {errors.message && touched.message && errors.message}
            </Text>
            <Button
              type="submit"
              disabled={isSubmitting || isSuccessful}
              loading={loading}
              color={isSuccessful ? "purple" : "green"}
            >
              {isSuccessful ? (
                <div className="flex flex-row items-center justify-center text-left">
                  <MdDone
                    className="mr-2 flex-shrink-0"
                    color="#fff"
                    size={20}
                  />
                  <Text>{t("common:getInTouchFormThankYou")}</Text>
                </div>
              ) : (
                <Text>{t("common:getInTouchFormSendMessage")}</Text>
              )}
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default GetInTouchForm;
