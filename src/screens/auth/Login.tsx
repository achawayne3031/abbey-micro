import React, { useState } from "react";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { LoginValidation } from "../../validations/AuthValidation";
import InputField from "../../components/form/InputField";
import axiosInstance from "../../config/AxiosConfig";
import { ToasterAlert } from "../../utils/ToasterAlert";
import { saveData, saveToken } from "../../utils/LocalStorage";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFieldValue(name, value);
  };

  const initRequest = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/auth/login", values);
      setIsLoading(false);
      ToasterAlert(response.data.message, "success");
      saveToken(response.data.token);
      saveData(response.data.data);
      navigate("/user/dashboard");
    } catch (error: any) {
      setIsLoading(false);
      ToasterAlert(error.response.data.message, "error");
    }
  };

  const { values, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginValidation,
    onSubmit: () => initRequest(),
  });

  return (
    <>
      <div>
        <Container maxWidth="lg" className="login-content-wrapper mt-4">
          <div className="row">
            <div className="col-md-3 col-12"></div>
            <div className="col-md-6 col-sm-12">
              <div className="login-wrapper">
                <p className="subtitle text-center">Login.</p>

                <div className="form-wrapper">
                  <div className="mt-4">
                    <InputField
                      type="email"
                      label="Email"
                      value={values.email}
                      name="email"
                      error={Boolean(errors.email)}
                      errorText={errors.email}
                      onChange={handleChange}
                      placeholder="Please enter your email"
                    />
                  </div>

                  <div className="mt-4">
                    <InputField
                      type="password"
                      label="Password"
                      value={values.password}
                      name="password"
                      error={Boolean(errors.password)}
                      errorText={errors.password}
                      onChange={handleChange}
                      placeholder="Please enter your password"
                    />
                  </div>

                  <div className="form-group mt-4">
                    <button
                      disabled={isLoading}
                      onClick={() => {
                        handleSubmit();
                      }}
                      className="btn-block btn btn-primary login-btn"
                    >
                      {!isLoading ? (
                        <>
                          <span>Login</span>
                        </>
                      ) : (
                        <>
                          <span>
                            <div className="spinner-border text-light spinner-border-sm"></div>
                          </span>
                        </>
                      )}
                    </button>
                    <p>
                      Registered yet ? <Link to="/auth/register">Register</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;
