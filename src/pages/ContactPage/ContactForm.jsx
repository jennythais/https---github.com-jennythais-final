import React from "react";
import { useForm } from "react-hook-form";
import ComponentLoading from "../../components/ComponentLoading/index";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { MESSAGE, REGREX } from "../../utils/validate";
const ContactForm = ({ handleSubmitForm, loading }) => {
  //Form
  const payload = {
    name: "",
    title: "",
    email: "",
    description: "",
    phone: "",
  };
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(payload);

  const onSubmit = (data) => {
    handleSubmitForm?.(data, reset);
  };
  return (
    <div className="col-lg-6">
      <h2 className="title mb-1">Got Any Questions?</h2>
      <p className="mb-2">
        Use the form below to get in touch with the sales team
      </p>
      <form onSubmit={handleSubmit(onSubmit)} style={{ position: "relative" }}>
        {loading && <ComponentLoading />}
        <div className="row">
          <div className="col-sm-6">
            <Input
              label="Name"
              required
              {...register("name", { required: MESSAGE.required })}
              error={errors?.name?.message || ""}
            />
          </div>
          <div className="col-sm-6">
            <Input
              label="Email"
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
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Input label="Phone" {...register("phone")} />
          </div>
          <div className="col-sm-6">
            <Input label="Subject" {...register("title")} />
          </div>
        </div>
        <TextArea
          label="Message"
          required
          {...register("description", {
            required: MESSAGE.required,
          })}
          error={errors?.description?.message || ""}
        />
        <button
          type="submit"
          className="btn btn-outline-primary-2 btn-minwidth-sm"
        >
          <span>SUBMIT</span>
          <i className="icon-long-arrow-right" />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
