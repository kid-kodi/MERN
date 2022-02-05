// import "./formik-demo.css";
import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
// import classNames from "classnames";

const classNames = (input) => {
  //process
  const output = "";
  return output;
};

// Input feedback
const InputFeedback = ({ error }) =>
  error ? <div className="text-red-500">{error}</div> : null;

// Checkbox input
const Checkbox = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched, setFieldValue },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
        className="mb-2"
      />
      <label htmlFor={id}>{label}</label>
      {touched[name] && <InputFeedback error={errors[name]} />}
    </div>
  );
};

// Checkbox group
class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (event) => {
    const target = event.currentTarget;
    let valueArray = [...this.props.value] || [];

    if (target.checked) {
      valueArray.push(target.id);
    } else {
      valueArray.splice(valueArray.indexOf(target.id), 1);
    }

    this.props.onChange(this.props.id, valueArray);
  };

  handleBlur = () => {
    // take care of touched
    this.props.onBlur(this.props.id, true);
  };

  render() {
    const { value, error, touched, label, className, children } = this.props;

    const classes = classNames(
      "input-field",
      {
        "is-success": value || (!error && touched), // handle prefilled or user-filled
        "is-error": !!error && touched,
      },
      className
    );

    return (
      <div className={classes}>
        <fieldset>
          <legend>{label}</legend>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              field: {
                value: value.includes(child.props.id),
                onChange: this.handleChange,
                onBlur: this.handleBlur,
              },
            });
          })}
          {touched && <InputFeedback error={error} />}
        </fieldset>
      </div>
    );
  }
}

// Radio input
const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="radio"
        value={id} // could be something else for output?
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames("radio-button")}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

// Radio group
const RadioButtonGroup = ({
  value,
  error,
  touched,
  id,
  label,
  className,
  children,
}) => {
  const classes = classNames(
    "input-field",
    {
      "is-success": value || (!error && touched), // handle prefilled or user-filled
      "is-error": !!error && touched,
    },
    className
  );

  return (
    <div className="my-2">
      <fieldset>
        <legend>{label}</legend>
        {children}
        {touched && <InputFeedback error={error} />}
      </fieldset>
    </div>
  );
};

const validationSchema = Yup.object().shape({
  radioGroup: Yup.string().required("A radio option is required"),
  checkboxGroup: Yup.array().required("At least one checkbox is required"),
  singleCheckbox: Yup.bool().oneOf([true], "Must agree to something"),
});
const initialValues = {
  radioGroup: "",
  checkboxGroup: [],
  singleCheckbox: false,
};
const CheckboxesForm = () => (
  <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <h1 className="text-2xl">Radio & checkbox inputs with Formik</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 3000);
        }}
        render={({
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div style={{ width: "50%", float: "left" }}>
              <h2 className="text-xl my-3">Single checkbox</h2>
              <Field
                component={Checkbox}
                name="singleCheckbox"
                id="singleCheckbox"
                label="Agree to something"
              />

              <h2 className="text-xl my-3">Checkbox group</h2>
              <CheckboxGroup
                id="checkboxGroup"
                label="Which of these?"
                value={values.checkboxGroup}
                error={errors.checkboxGroup}
                touched={touched.checkboxGroup}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              >
                <Field
                  component={Checkbox}
                  name="checkboxGroup"
                  id="checkbox1"
                  label="Option 1"
                />
                <Field
                  component={Checkbox}
                  name="checkboxGroup"
                  id="checkbox2"
                  label="Option 2"
                />
                <Field
                  component={Checkbox}
                  name="checkboxGroup"
                  id="checkbox3"
                  label="Option 3"
                />
              </CheckboxGroup>

              <h2 className="text-xl my-3">Radio group</h2>
              <RadioButtonGroup
                id="radioGroup"
                label="One of these please"
                value={values.radioGroup}
                error={errors.radioGroup}
                touched={touched.radioGroup}
              >
                <Field
                  component={RadioButton}
                  name="radioGroup"
                  id="radioOption1"
                  label="Choose this option"
                />
                <Field
                  component={RadioButton}
                  name="radioGroup"
                  id="radioOption2"
                  label="Or choose this one"
                />
              </RadioButtonGroup>

              <div className="flex items-center space-x-2">
                <button
                  className="flex items-center justify-center w-full bg-blue-400 text-white rounded-full px-4 py-2 hover:bg-blue-500"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Enregistrer"}
                </button>
                <a
                  href="#"
                  className="flex items-center justify-center w-full border-2 border-blue-500 text-blue-500 rounded-full px-4 py-2 hover:border-2 hover:border-blue-300"
                >
                  Annuler
                </a>
              </div>
            </div>
            <div style={{ width: "50%", float: "right" }}>
              <pre>
                {JSON.stringify(
                  {
                    handleSubmit,
                    setFieldValue,
                    setFieldTouched,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </form>
        )}
      />
    </div>
  </div>
);

export default CheckboxesForm;
