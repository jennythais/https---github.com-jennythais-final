import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/path";
import useDebounce from "../../hooks/useDebounce";
import { handleRegister } from "../../store/reducers/authReducer";
import { MESSAGE, REGREX } from "../../utils/validate";
import Button from "../Button";
import ComponentLoading from "../ComponentLoading/index";
import { Input } from "../Input";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  //Dispatch
  const dispatch = useDispatch(); //day action len reducer
  const onSubmit = async (data) => {
    if (data && !loading.register) {
      try {
        const { name, email, password } = data;
        const payload = {
          firstName: name || "",
          lastName: "",
          email,
          password,
        };
        dispatch(handleRegister(payload));
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  const renderLoading = useDebounce(loading.register, 300);
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ position: "relative" }}>
      {renderLoading && <ComponentLoading />}
      <Input
        label="Your email address"
        required
        {...register("email", {
          required: MESSAGE.required,
          pattern: {
            value: REGREX.email,
            message: MESSAGE.email,
          },
        })}
        error={errors?.email?.message || ""}
      />
      <Input
        label="Password"
        required
        type="password"
        {...register("password", {
          required: MESSAGE.required,
          minLength: {
            value: 6,
            message: MESSAGE.passwordLength,
          },
        })}
        error={errors?.password?.message || ""}
      />
      <div className="form-footer">
        <Button type="submit" variant="outline">
          <span>SIGN UP</span>
          <i className="icon-long-arrow-right" />
        </Button>
        <div>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="register-policy"
              {...register("isAgree", {
                required: "Please agree with our policy",
              })}
            />
            <label className="custom-control-label" htmlFor="register-policy">
              I agree to the{""}
              <Link to={PATHS.PRIVATE_POLICY}>privacy policy</Link> *
            </label>
          </div>
          {errors?.isAgree?.message && (
            <p className="form-error">{errors.isAgree.message}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
