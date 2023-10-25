import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import { handleLogin } from "../../store/reducers/authReducer";
import { MESSAGE, REGREX } from "../../utils/validate";
import Button from "../Button";
import ComponentLoading from "../ComponentLoading";
import { Input } from "../Input";

const LoginForm = () => {
  //Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  //Handle login = dispatch
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    if (data && !loading.login) {
      try {
        const res = await dispatch(handleLogin(data)).unwrap();
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  const renderLoading = useDebounce(loading.login, 300);
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ position: "relative" }}>
      {renderLoading && <ComponentLoading />}
      <Input
        label="Username or email address"
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
          <span>LOG IN</span>
          <i className="icon-long-arrow-right" />
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
