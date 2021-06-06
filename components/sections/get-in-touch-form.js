import { useState } from "react";
import { fetchAPI } from "../../utils/api";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { MdDone } from "react-icons/md";

import Button from "../common/button";
import Text from "../common/text";

const GetInTouchForm = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

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
          <Form className="flex flex-col lg:gap-6">
            <Field
              className="form-field p-4 rounded focus:outline-none lg:mb-0 mb-2"
              type="text"
              name="name"
              placeholder="Name"
            />
            <Text className="text-left" type="div" uppercase>
              {errors.name && touched.name && errors.name}
            </Text>
            <Field
              className="form-field p-4 rounded focus:outline-none lg:mb-0 mb-2"
              type="email"
              name="email"
              placeholder="Email"
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
              placeholder="Message"
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
                  <Text>
                    Thanks for your interest. We will contact you soon!
                  </Text>
                </div>
              ) : (
                <Text>Send Message</Text>
              )}
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default GetInTouchForm;
