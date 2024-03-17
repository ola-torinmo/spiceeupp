import Link from "next/link";
import Layout from "../components/layout/Layout";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import ApiService from "../util/ApiService";
import generateSecurityCode from "../util/generateSecurityCode";

function Privacy() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [type, setType] = useState("");
  const [errorEmailColor, setErrorEmailColor] = useState("");
  const [errorPasswordColor, setErrorPasswordColor] = useState("");
  const [errorPasswordConfirmColor, setErrorPasswordConfirmColor] =
    useState("");
  const [errorSecurityCodeColor, setErrorSecurityCodeColor] = useState("");
  const [securityCode, setSecurityCode] = useState(generateSecurityCode());
  const [securityCodeInput, setSecurityCodeInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [policy, setPolicy] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorEmailColor("red");
      return;
    } else if (!password) {
      setErrorPasswordColor("red");
      return;
    } else if (!passwordConfirm) {
      setErrorPasswordConfirmColor("red");
      return;
    } else if (password !== passwordConfirm) {
      setErrorMessage("Password and confirm password must be the same");
      return;
    } else if (securityCodeInput != securityCode) {
      setErrorSecurityCodeColor("red");
      return;
    } else if (!type) {
      setErrorMessage("Please select your type");
      return;
    } else if (!policy) {
      setErrorMessage("Please agree to terms & Policy");
      return;
    }

    await ApiService.post("/auth/register", {
      email: email,
      password: password,
      type: type,
    })
      .then((res) => {
        console.log(res);
        setSuccessMessage(res.message);
        router.push("/page-login");
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
    if (passwordConfirm) {
      setErrorPasswordConfirmColor("");
    }
  }, [passwordConfirm]);

  useEffect(() => {
    if (securityCodeInput) {
      setErrorSecurityCodeColor("");
    }
  }, [securityCodeInput]);

  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="Privacy">
        <div className="page-content pt-150 pb-150">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
                <div className="row">
                  <div className="col-lg-6 col-md-8">
                    <div className="login_wrap widget-taber-content background-white">
                      <div className="padding_eight_all bg-white">
                        <div className="heading_s1 mb-50">
                          <h1 className="mb-5">Create an Account</h1>
                          <p>
                            Already have an account?{" "}
                            <Link href="/page-login">Log in instead!</Link>
                          </p>
                        </div>
                        <form method="post">
                          {/* <div className="form-group">
                            <input
                              type="text"
                              required=""
                              name="username"
                              placeholder="Username"
                            />
                          </div> */}
                          <div className="form-group">
                            <input
                              type="text"
                              required=""
                              name="email"
                              placeholder="Email"
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                              style={{ borderColor: errorEmailColor }}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              required=""
                              type="password"
                              name="password"
                              placeholder="Password"
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                              style={{ borderColor: errorPasswordColor }}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              required=""
                              type="password"
                              name="password"
                              placeholder="Confirm password"
                              onChange={(e) => {
                                setPasswordConfirm(e.target.value);
                              }}
                              style={{ borderColor: errorPasswordConfirmColor }}
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
                          <div className="payment_option mb-50">
                            <div className="custome-radio">
                              <input
                                className="form-check-input"
                                required=""
                                type="radio"
                                name="payment_option"
                                id="exampleRadios3"
                                defaultChecked=""
                                onClick={() => {
                                  setType("customer");
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="exampleRadios3"
                                data-bs-toggle="collapse"
                                data-target="#bankTranfer"
                                aria-controls="bankTranfer"
                              >
                                I am a customer
                              </label>
                            </div>
                            <div className="custome-radio">
                              <input
                                className="form-check-input"
                                required=""
                                type="radio"
                                name="payment_option"
                                id="exampleRadios4"
                                defaultChecked=""
                                onClick={() => {
                                  setType("vendor");
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="exampleRadios4"
                                data-bs-toggle="collapse"
                                data-target="#checkPayment"
                                aria-controls="checkPayment"
                              >
                                I am a vendor
                              </label>
                            </div>
                          </div>
                          <div className="form-group">
                            <p className="text-danger">{errorMessage}</p>
                            <p className="text-success">{successMessage}</p>
                          </div>
                          <div className="login_footer form-group mb-50">
                            <div className="chek-form">
                              <div className="custome-checkbox">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="checkbox"
                                  id="exampleCheckbox12"
                                  value=""
                                  onClick={() => {
                                    setPolicy(!policy);
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="exampleCheckbox12"
                                >
                                  <span>I agree to terms &amp; Policy.</span>
                                </label>
                              </div>
                            </div>
                            <Link href="/page-privacy-policy">
                              <i className="fi-rs-book-alt mr-5 text-muted"></i>
                              Lean more
                            </Link>
                          </div>
                          <div className="form-group mb-30">
                            <button
                              type="submit"
                              className="btn btn-fill-out btn-block hover-up font-weight-bold"
                              name="login"
                              onClick={handleSubmit}
                            >
                              Submit &amp; Register
                            </button>
                          </div>
                          <p className="font-xs text-muted">
                            <strong>Note:</strong>Your personal data will be
                            used to support your experience throughout this
                            website, to manage access to your account, and for
                            other purposes described in our privacy policy
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 pr-30 d-none d-lg-block">
                    <div className="card-login mt-115">
                      <a href="#" className="social-login facebook-login">
                        <img
                          src="/assets/imgs/theme/icons/logo-facebook.svg"
                          alt="nest"
                        />
                        <span>Continue with Facebook</span>
                      </a>
                      <a href="#" className="social-login google-login">
                        <img
                          src="/assets/imgs/theme/icons/logo-google.svg"
                          alt="nest"
                        />
                        <span>Continue with Google</span>
                      </a>
                      <a href="#" className="social-login apple-login">
                        <img
                          src="/assets/imgs/theme/icons/logo-apple.svg"
                          alt="nest"
                        />
                        <span>Continue with Apple</span>
                      </a>
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

export default Privacy;
