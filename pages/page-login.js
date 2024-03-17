import Link from "next/link";
import Layout from "../components/layout/Layout";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import ApiService from "../util/ApiService";
import generateSecurityCode from "../util/generateSecurityCode";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmailColor, setErrorEmailColor] = useState("");
  const [errorPasswordColor, setErrorPasswordColor] = useState("");
  const [errorSecurityCodeColor, setErrorSecurityCodeColor] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [securityCode, ] = useState(generateSecurityCode());
  const [securityCodeInput, setSecurityCodeInput] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorEmailColor("red");
      return;
    } else if (!password) {
      setErrorPasswordColor("red");
      return;
    } else if (securityCodeInput != securityCode) {
      setErrorSecurityCodeColor("red");
      return;
    }

    await ApiService.post("/auth/login", {
      email: email,
      password: password,
    })
      .then((res) => {
        setSuccessMessage(res.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        router.push("/");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (email) {
      setErrorEmailColor("");
    }
  }, [email]);

  useEffect(() => {
    if (password) {
      setErrorPasswordColor("");
    }
  }, [password]);

  useEffect(() => {
    if (securityCodeInput) {
      setErrorSecurityCodeColor("");
    }
  }, [securityCodeInput]);

  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="Login & Register">
        <div className="page-content pt-150 pb-150">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
                <div className="row">
                  <div className="col-lg-6 pr-30 d-none d-lg-block">
                    <img
                      className="border-radius-15"
                      src="assets/imgs/page/login-1.png"
                      alt="nest"
                    />
                  </div>
                  <div className="col-lg-6 col-md-8">
                    <div className="login_wrap widget-taber-content background-white">
                      <div className="padding_eight_all bg-white">
                        <div className="heading_s1">
                          <h1 className="mb-5">Login</h1>
                          <p className="mb-30">
                            Don't have an account?{" "}
                            <Link href="/page-register">Create here</Link>
                          </p>
                        </div>
                        <form method="post">
                          <div className="form-group">
                            <input
                              type="text"
                              required=""
                              name="email"
                              placeholder="Username or Email *"
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                              style={{
                                borderColor: errorEmailColor,
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              required=""
                              type="password"
                              name="password"
                              placeholder="Your password *"
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                              style={{
                                borderColor: errorPasswordColor,
                              }}
                            />
                          </div>
                          <div className="login_footer form-group">
                            <div className="chek-form">
                              <input
                                type="text"
                                required=""
                                name="security-code"
                                placeholder="Security code *"
                                onChange={(e) => {
                                    setSecurityCodeInput(e.target.value);
                                }}
                                style={{
                                  borderColor: errorSecurityCodeColor,
                                }}
                              />
                            </div>
                            <span className="security-code">
                              <b className="text-new">{securityCode[0]}</b>
                              <b className="text-hot">{securityCode[1]}</b>
                              <b className="text-sale">{securityCode[2]}</b>
                              <b className="text-best">{securityCode[3]}</b>
                            </span>
                          </div>
                          <div className="login_footer form-group mb-50">
                            <div className="chek-form">
                              <div className="custome-checkbox">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="checkbox"
                                  id="exampleCheckbox1"
                                  value=""
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="exampleCheckbox1"
                                >
                                  <span>Remember me</span>
                                </label>
                              </div>
                            </div>
                            <a className="text-muted" href="#">
                              Forgot password?
                            </a>
                          </div>
                          <div className="form-group">
                            <p className="text-danger">{errorMessage}</p>
                            <p className="text-success">{successMessage}</p>
                          </div>
                          <div className="form-group">
                            <button
                              type="submit"
                              className="btn btn-heading btn-block hover-up"
                              name="login"
                              onClick={handleSubmit}
                            >
                              Log in
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Login;
