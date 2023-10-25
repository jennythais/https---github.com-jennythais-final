import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Input } from "../../components/Input";
import { MESSAGE, REGREX } from "../../utils/validate";
import Button from "../../components/Button";

const MyAccount = () => {
  const {
    profile,
    handleUpdateProfile,
    cities,
    districts,
    wards,
    selectedCity,
    selectedDistrict,
    handleCityChange,
    handleDistrictChange,
  } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (profile) {
      const {
        firstName,
        lastName,
        email,
        phone,
        birthday,
        province,
        district,
        ward,
        street,
      } = profile;

      // Set form values using setValue
      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("email", email);
      setValue("phone", phone);
      setValue("birthday", birthday);
      setValue("province", province);
      setValue("district", district);
      setValue("ward", ward);
      setValue("street", street);
    }
  }, [profile, setValue]);
  const onSubmit = () => {
    if (Object.keys(errors).length > 0) {
      console.log("Submit error: ", errors);
    } else {
      handleUpdateProfile();
    }
  };

  return (
    <form action="#" className="account-form">
      <div className="row">
        <div className="col-sm-6">
          <Input
            label="Full Name"
            type="text"
            defaultValue={
              profile ? `${profile.firstName} ${profile.lastName}` : ""
            }
            required
            {...register("name", {
              required: MESSAGE.required,
            })}
            error={errors?.name?.message || ""}
          />
        </div>
        <div className="col-sm-6">
          <Input
            label="Email address "
            type="email"
            defaultValue={profile ? `${profile.email}` : ""}
            disabled
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
          <Input
            label="Phone number"
            type="text"
            required
            {...register("phone", {
              required: MESSAGE.required,
              pattern: {
                value: REGREX.phone,
                message: MESSAGE.phone,
              },
            })}
            error={errors?.phone?.message || ""}
          />
        </div>
        <div className="col-sm-6">
          <Input
            label="Ngày sinh"
            type="date"
            required
            {...register("birthday", {
              required: MESSAGE.required,
              pattern: {
                value: REGREX.birthday,
                message: MESSAGE.birthday,
              },
            })}
            error={errors?.birthday?.message || ""}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <label>Province/City *</label>
          <div className="select-custom">
            <select
              className="form-control form-select"
              id="city"
              value={selectedCity}
              onChange={handleCityChange}
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city.Id} value={city.Id}>
                  {city.Name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-sm-4">
          <label>District/Town *</label>
          <div className="select-custom">
            <select
              className="form-control form-select"
              value={selectedDistrict}
              onChange={handleDistrictChange}
            >
              <option value="">Select a district</option>
              {districts.map((district) => (
                <option key={district.Id} value={district.Id}>
                  {district.Name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-sm-4">
          <label>Ward *</label>
          <div className="select-custom">
            <select className="form-control form-select">
              <option value="-">Select a ward</option>
              {wards.map((ward) => (
                <option key={ward.Id} value={ward.Id}>
                  {ward.Name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Input
        label="Street address"
        type="text"
        defaultValue={profile ? `${profile.street}` : ""}
        required
        {...register("street", {
          required: MESSAGE.required,
        })}
        error={errors?.street?.message || ""}
      />
      <label>Current password (leave blank to leave unchanged)</label>
      <input type="password" className="form-control" />
      <label>New password (leave blank to leave unchanged)</label>
      <input type="password" className="form-control" />
      <label>Confirm new password</label>
      <input type="password" className="form-control mb-2" />
      <Button type="submit" variant="outline" onClick={handleSubmit(onSubmit)}>
        <span>SAVE CHANGES</span>
        <i className="icon-long-arrow-right" />
      </Button>
    </form>
  );
};

export default MyAccount;
