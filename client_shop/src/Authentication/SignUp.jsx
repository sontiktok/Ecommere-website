import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import "./Auth.css";
import queryString from "query-string";
import MessengerAPI from "../API/MessengerAPI";

SignUp.propTypes = {};

function SignUp(props) {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [errorEmail, setEmailError] = useState(false);
  const [emailRegex, setEmailRegex] = useState(false);
  const [errorPassword, setPasswordError] = useState(false);
  const [errorFullname, setFullnameError] = useState(false);
  const [errorPhone, setPhoneError] = useState(false);
  const [errorEmailEx, setErrorEmailEx] = useState(false);

  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const history = useHistory();

  const onChangeName = (e) => {
    setFullName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handlerSignUp = (e) => {
    e.preventDefault();

    if (submitted) return;

    if (!fullname) {
      setFullnameError(true);
      setEmailError(false);
      setPhoneError(false);
      setPasswordError(false);
      setEmailRegex(false);
      return;
    } else {
      console.log("0");

      setFullnameError(false);
      setPhoneError(false);
      setPasswordError(false);
      setFullnameError(false);
      setEmailRegex(false);

      if (!email) {
        setFullnameError(false);
        setEmailError(true);
        setPhoneError(false);
        setPasswordError(false);
        return;
      } else {
        console.log("1");

        setEmailError(false);
        setPhoneError(false);
        setPasswordError(false);
        setFullnameError(false);

        if (!validateEmail(email)) {
          setEmailRegex(true);
          setFullnameError(false);
          setEmailError(false);
          setPhoneError(false);
          setPasswordError(false);
          return;
        } else {
          console.log("2");
          setEmailRegex(false);

          if (!password) {
            setFullnameError(false);
            setEmailError(false);
            setPhoneError(false);
            setPasswordError(true);
            return;
          } else {
            console.log("3");

            setFullnameError(false);
            setPhoneError(false);
            setPasswordError(false);
            setFullnameError(false);
            setEmailRegex(false);

            if (!phone) {
              setFullnameError(false);
              setEmailError(false);
              setPhoneError(true);
              setPasswordError(false);
            } else {
              console.log("4");

              const fetchSignUp = async () => {
                const params = {
                  fullname: fullname,
                  email: email,
                  password: password,
                  phone: phone,
                };
                const query = "?" + queryString.stringify(params);
                const res = await UserAPI.postSignUp(query);
                if (res !== "Thanh Cong") {
                  setErrorEmailEx(true);

                  setSubmitted(true);
                } else {
                  setSuccess(true);

                  //   Hàm này dùng để tạo các conversation cho user và admin

                  const fetchConversation = async () => {
                    const params = {
                      email: email,
                      password: password,
                    };
                    const query = "?" + queryString.stringify(params);
                    await MessengerAPI.postConversation(query);
                    history.push("/signin");
                    setSubmitted(false);
                  };
                  fetchConversation();
                }
              };
              fetchSignUp();
            }
          }
        }
      }
    }
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
          <span className="login100-form-title p-b-33">Đăng nhập</span>
          <div className="d-flex justify-content-center pb-5">
            {errorFullname && (
              <span className="text-danger">
                * Vui lòng kiểm tra tên của bạn!
              </span>
            )}
            {errorEmail && (
              <span className="text-danger">* Vui lòng kiểm tra email!</span>
            )}
            {emailRegex && (
              <span className="text-danger">* Email không đúng định dạng</span>
            )}
            {errorPassword && (
              <span className="text-danger">* Vui lòng kiểm tra mật khẩu!</span>
            )}
            {errorEmailEx && (
              <span className="text-danger">* Email đã tồn tại </span>
            )}
            {errorPhone && (
              <span className="text-danger">
                * Vui lòng kiểm tra số điện thoại!
              </span>
            )}
          </div>
          <div className="wrap-input100 validate-input">
            <input
              className="input100"
              value={fullname}
              onChange={onChangeName}
              type="text"
              placeholder="Full Name"
            />
          </div>

          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              value={email}
              onChange={onChangeEmail}
              type="text"
              placeholder="Email"
            />
          </div>

          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              value={password}
              onChange={onChangePassword}
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              value={phone}
              onChange={onChangePhone}
              type="text"
              placeholder="Phone"
            />
          </div>

          <div className="container-login100-form-btn m-t-20">
            <button className="login100-form-btn" onClick={handlerSignUp}>
              Đăng kí
            </button>
          </div>

          <div className="text-center p-t-45 p-b-4">
            <span className="txt1">Bạn đã có tài khoản?</span>
            &nbsp;
            <Link to="/signin" className="txt2 hov1">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
