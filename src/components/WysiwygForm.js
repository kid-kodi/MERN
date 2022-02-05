// Dependices
// yarn add react-draft-wysiwyg draft-js draftjs-to-html html-to-draftjs
// ----------------------------------------------------------------
// Using textEditor components
import React, { useContext, useEffect } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextEditor from "./TextEditor";
import { ContentState } from "draft-js";

const WysiwygForm = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(20).required("Required"),
    message: Yup.string().min(3).max(2000).required("Required"),
  });

  const initialValues = { name: "", message: "<p>Testing</p>" };

  const handleSubmit = (values, actions) => {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 3000);
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-2xl">Wysiwyg formulaire</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue, isSubmitting }) => (
            <Form className="">
              <div className="my-2">
                <label className="" htmlFor="name">
                  Nom
                </label>
                <div>
                  <Field
                    className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                    name="name"
                    type="text"
                  />
                  <span className="text-red-400 text-sm">
                    <ErrorMessage name="name" />
                  </span>
                </div>
              </div>
              <div className="flex">
                <TextEditor
                  setFieldValue={(val) => setFieldValue("message", val)}
                  value={values.message}
                />
              </div>

              <div className="my-4">
                <button
                  className="flex items-center justify-center w-full bg-blue-400 text-white rounded-full px-4 py-2 hover:bg-blue-500"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Loading..." : "Enregistrer"}
                </button>
              </div>
              <p>formik values {JSON.stringify(values)}</p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default WysiwygForm;
