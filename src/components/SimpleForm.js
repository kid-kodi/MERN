import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const SimpleForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    console.log(JSON.stringify(values));
    setTimeout(() => {
      console.log("Hello, World!");
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-2xl">Simple formulaire</h1>
        <p>{error}</p>
        <Formik
          initialValues={{
            firstName: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required("Champs requis"),
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="">
              <div className="my-2">
                <label className="" htmlFor="firstName">
                  Nom
                </label>
                <div>
                  <Field
                    className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                    name="firstName"
                    type="text"
                  />
                  <span className="text-red-400 text-sm">
                    <ErrorMessage name="firstName" />
                  </span>
                </div>
              </div>

              <div className="my-4">
                <button
                  className="flex items-center justify-center w-full bg-blue-400 text-white rounded-full px-4 py-2 hover:bg-blue-500"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? "Loading..." : "Enregistrer"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SimpleForm;
