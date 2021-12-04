import { useRef, useState } from "react";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import useTranslation from "next-translate/useTranslation";
import HCaptcha from "@hcaptcha/react-hcaptcha";

import { fetchAPI } from "../../../utils/api";

const GetInTouchForm = ({ className }) => {
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
          <Form className="form-contact">
            <div className="name-form">
              <p className="label">{t("common:getInTouchFormName")}</p>
              <div className="wrap-inp">
                <Field className="input-name" type="text" name="name" />
                <div className="text-left">
                  {errors.name && touched.name && errors.name}
                </div>
              </div>
            </div>
            <div className="email-form">
              <p className="label">{t("common:getInTouchFormEmail")}</p>
              <div className="wrap-inp">
                <Field className="input-email" type="email" name="email" />
                <div className="text-left">
                  {errors.email && touched.email && errors.email}
                </div>
              </div>
            </div>

            <div className="message-form">
              <p className="label">{t("common:getInTouchFormMessage")}</p>
              <div className="wrap-textarea">
                <Field
                  className="textarea-message"
                  component="textarea"
                  style={{ height: 190, resize: "none" }}
                  type="text"
                  name="message"
                />
              </div>
            </div>

            <div className="text-left">
              {errors.message && touched.message && errors.message}
            </div>

            <div className="wrap-but">
              <button
                className="button-form"
                type="submit"
                disabled={isSubmitting || isSuccessful || isLoading}
              >
                {isSuccessful ? (
                  <p>{t("common:getInTouchFormThankYou")}</p>
                ) : (
                  <p>{t("common:getInTouchFormSendMessage")}</p>
                )}
              </button>
              <div className="text-left">{errors.api && errors.api}</div>
            </div>

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
