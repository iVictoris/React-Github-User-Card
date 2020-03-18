import React from 'react'
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const userLookupForm = () => {
  return (
    <Form>
      <label className="form-row">
        <section className="input-group col-md-4">
          <section className='input-group-prepend'>
            <span className='input-group-text' >Username:</span>
          </section>
          <Field
            className="form-control"
            type="text"
            name="username"
            placeholder="Enter github handle"
          />
          <button className='submit btn btn-dark' type='submit'>Search</button>
        </section>
      </label>
    </Form>
  );
};

const UserLookupForm = withFormik({
  mapPropsToValues({ username = "" }) {
    return { username };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Please enter a github handle")
  }),
  handleSubmit({ username }, { props: {searchUser}, resetForm }) {
    searchUser(username);
    resetForm({ username: "" });
  }
})(userLookupForm);

export default UserLookupForm
