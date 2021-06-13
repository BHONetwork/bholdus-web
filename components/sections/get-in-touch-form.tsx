import { useRef, useState } from "react";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { MdDone } from "react-icons/md";
import useTranslation from "next-translate/useTranslation";
import HCaptcha from "@hcaptcha/react-hcaptcha";

import Button from "../common/button";
import Text from "../common/text";

import { fetchAPI } from "../../utils/api";

const GetInTouchForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const { t } = useTranslation();
  const hCaptchaRef = useRef(null);

  const FormSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().required(),
    api: yup.string(),
  });

  return (
    <Formik
      initialValues={{ name: "", email: "", message: "", api: "" }}
      validationSchema={FormSchema}
      onSubmit={async () => {
        hCaptchaRef.current.execute();
      }}
    >
      {({
        errors,
        touched,
        isSubmitting,
        setErrors,
        setSubmitting,
        values,
      }) => (
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
              disabled={isSubmitting || isSuccessful || isLoading}
              loading={isLoading}
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
            <Text className="text-left" type="div" uppercase>
              {errors.api && errors.api}
            </Text>

            <HCaptcha
              sitekey={process.env.HCAPTCHA_SITEKEY}
              ref={hCaptchaRef}
              theme="dark"
              size="invisible"
              tabIndex={10}
              onError={() => {
                setErrors({ api: "Server Error" });
              }}
              onVerify={async (token) => {
                setIsLoading(true);

                try {
                  setErrors({ api: "" });

                  const response = await fetchAPI("/lead-form-submissions", {
                    method: "POST",
                    body: JSON.stringify({
                      name: values.name,
                      email: values.email,
                      message: values.message,
                      captchaToken: token,
                    }),
                  });

                  if (response) {
                    setIsSuccessful(true);
                    setTimeout(() => {
                      setIsSuccessful(false);
                    }, 3000);
                  } else {
                    throw Error("Server Error");
                  }
                } catch (err) {
                  setErrors({ api: err.message });
                }

                hCaptchaRef.current.resetCaptcha();
                setIsLoading(false);
                setSubmitting(false);
              }}
            />
          </Form>
        </>
      )}
    </Formik>
  );
};

export default GetInTouchForm;
