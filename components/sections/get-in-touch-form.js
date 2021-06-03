import { useState } from "react";
import { fetchAPI } from "../../lib/api";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import Button from "../common/button";
import Text from "../common/text";

const GetInTouchForm = ({ data }) => {
  const [loading, setLoading] = useState(false);

  const FormSchema = yup.object().shape({
    name: yup.string().length(100).required(),
    email: yup.string().email().required(),
    message: yup.string().length(500).required(),
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
              email: values.email,
              location: data.location,
            }),
          });
        } catch (err) {
          setErrors({ api: err.message });
        }

        setLoading(false);
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <>
          <Form className="flex flex-col gap-6">
            <Field
              className="form-field p-4 rounded focus:outline-none"
              type="text"
              name="name"
              placeholder="Name"
            />
            <Text className="text-left" type="div" uppercase>
              {errors.name && touched.name && errors.name}
            </Text>
            <Field
              className="form-field p-4 rounded focus:outline-none"
              type="email"
              name="email"
              placeholder="Email"
            />
            <Text className="text-left" type="div" uppercase>
              {errors.email && touched.email && errors.email}
            </Text>
            <Field
              className="form-field p-4 rounded focus:outline-none"
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
              button={{ text: "Send Message" }}
              disabled={isSubmitting}
              loading={loading}
            />
          </Form>
        </>
      )}
    </Formik>
  );
};

export default GetInTouchForm;
