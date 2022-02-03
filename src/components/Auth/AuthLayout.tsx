import React from "react";
import styles from "../../styles/Registration/Registration.module.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Typography, IconButton } from "@material-ui/core";
// ROUTE
import { AUTH_ROUTES } from "../../routes/routes";
import { Route, Switch, Link, useHistory, useLocation } from "react-router-dom";
import NotificationList from "../AdminLinksComponent/NotificationList";

let url_signup = "/auth/signup",
  url_login = "/auth/login";

const AuthLayout: React.FC = () => {
  const history = useHistory<any>();
  const { pathname } = useLocation<any>();

  return (
    <div className={styles.registration}>
      <div className={styles.registration_form_wrapper}>
        <div className={styles.form_wrapper}>
          <header className={styles.header}>
            <div className={styles.back_login}>
              {pathname === url_signup && (
                <span onClick={() => history.goBack()}>
                  <IconButton size="small">
                    <ArrowBackIcon color="disabled" />
                  </IconButton>
                  <Typography
                    variant="subtitle1"
                    display="inline"
                    color="secondary"
                  >
                    Hазад
                  </Typography>
                </span>
              )}
              <span>
                <Typography
                  variant="subtitle1"
                  display="inline"
                  color="secondary"
                >
                  Уже есть аккаунт?
                  {pathname === url_signup && (
                    <Link to={url_login}> Войти</Link>
                  )}
                  {pathname === url_login && (
                    <Link to={url_signup}> Зарегистрироваться</Link>
                  )}
                </Typography>
              </span>
            </div>
            <h2>{pathname === url_login ? "Авторизоваться" : "Регистрация"}</h2>
            <Typography variant="subtitle1" display="inline" color="secondary">
              Зарегистрируйтесь и получите бесплатное демо
            </Typography>
          </header>
          <Switch>
            {AUTH_ROUTES.map((route) => (
              <Route {...route} key={route.key} />
            ))}
          </Switch>
        </div>
        <div className={styles.registration_bg_img}></div>
      </div>
    </div>
  );
};

export default AuthLayout;
