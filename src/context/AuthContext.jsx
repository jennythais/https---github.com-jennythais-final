import { message } from "antd";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../constants/path";
import { authService } from "../services/authService";
import tokenMethod from "../utils/token";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [showedModal, setShowedModal] = useState();
  const [profile, setProfile] = useState();
  useEffect(() => {
    const accessToken = !!tokenMethod.get()?.accessToken;
    if (accessToken) {
      handleGetProfile();
    }
  }, []);

  // START HANDLE
  const handleShowedModal = (modalType) => {
    setShowedModal(modalType || "");
  };
  const handleClosedModal = (e) => {
    e?.stopPropagation();
    setShowedModal("");
  };
  const handleSignIn = async (loginData, callback) => {
    const payload = { ...loginData };
    try {
      const res = await authService.login(payload);
      if (res?.data?.data) {
        const { token: accessToken, refreshToken } = res.data.data || {};
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        //Save
        tokenMethod.set({ accessToken, refreshToken });

        //Get profile
        handleGetProfile();
        handleClosedModal();
        message.success("Login success");
      } else {
        message.error("Login fail");
      }
    } catch (error) {
      message.error("Login fail");
    } finally {
      callback?.();
    }
  };
  const handleRegister = async (registerData, callback) => {
    const { email, password } = registerData || {};
    const payload = {
      firstName: "",
      lastName: "",
      email: email,
      password: password,
    };

    try {
      const res = await authService.register(payload);
      if (res?.data?.data?.id) {
        handleSignIn({
          email: email,
          password: password,
        });

        message.success("Register success");
      } else {
        message.error("Register fail");
      }
    } catch (error) {
      console.log("error", error);
      if (error?.response?.status === 403) {
        message.error("Email is already, input another email please");
      } else {
        message.error("Register fail");
      }
    } finally {
      callback?.();
    }
  };
  const handleLogout = () => {
    tokenMethod.remove();
    navigate(PATHS.HOME);
    message.success("Account is logged out ");
    setProfile(null);
  };
  const handleGetProfile = async () => {
    try {
      const res = await authService.getProfile();
      if (res?.data?.data) {
        setProfile(res.data.data);
      }
    } catch (error) {
      console.log("error", error);
      handleLogout();
    }
  };
  const handleUpdateProfile = async (profileData) => {
    try {
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
      } = profileData;
      const payload = {
        firstName: firstName,
        lastName: lastName,
        email,
        phone,
        birthday,
        street,
        province,
        district,
        ward,
      };
      const res = await authService.updateProfile(payload);
      if (res?.data?.data?.id) {
        message.success("Cập nhật thông tin thành công");
        handleGetProfile();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  // END HANDLE

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((res) => {
        setCities(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);

    const selectedCityData = cities.find((city) => city.Id === cityId);
    if (selectedCityData) {
      setDistricts(selectedCityData.Districts || []);
    } else {
      setDistricts([]);
    }
  };

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);

    const selectedCityData = cities.find((city) => city.Id === selectedCity);
    if (selectedCityData) {
      const selectedDistrictData = selectedCityData.Districts.find(
        (district) => district.Id === districtId
      );
      if (selectedDistrictData) {
        setWards(selectedDistrictData.Wards || []);
      } else {
        setWards([]);
      }
    } else {
      setWards([]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        profile,
        showedModal,
        cities,
        selectedCity,
        districts,
        selectedDistrict,
        wards,
        handleShowedModal,
        handleClosedModal,
        handleSignIn,
        handleRegister,
        handleLogout,
        handleUpdateProfile,
        handleCityChange,
        handleDistrictChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
