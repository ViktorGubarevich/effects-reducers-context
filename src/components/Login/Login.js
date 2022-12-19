import React, {
  useEffect,
  useReducer,
  useState,
  useContext,
  useRef,
} from "react";
import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store-context/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isValid: action.value.includes("@"),
    };
  }

  if (action.type === "INPUT_BLUR")
    return {
      value: prevState.value,
      isValid: prevState.value.includes("@"),
    };

  return { value: "", isValid: false };
};

const passwordReducer = (prevState, action) => {
  if (action.type === "PASSWORD_INPUT") {
    return {
      value: action.value,
      isValid: action.value.trim().length > 7,
    };
  }

  if (action.type === "PASSWORD_BLUR")
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length > 7,
    };

  return { value: "", isValid: false };
};

const Login = () => {
  // const [inputEmail, setInputEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [inputPassword, setInputPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmailState] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });

  const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  const ctx = useContext(AuthContext);

  //clear function

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmailState({ type: "USER_INPUT", value: event.target.value });
    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordState({
      type: "PASSWORD_INPUT",
      value: event.target.value,
    });
    // setFormIsValid(event.target.value.trim().length > 7 && emailState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmailState({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPasswordState({ type: "PASSWORD_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          type="email"
          label="Email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          type="password"
          label="Пароль"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
