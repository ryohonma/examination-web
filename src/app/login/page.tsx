import { Card } from "../_components/atoms/card/card";
import { LoginForm } from "../_components/templates/login/login-form";
import styles from "./page.module.scss";

export default function Login() {
  return (
    <Card className={styles.page}>
      <LoginForm />
    </Card>
  );
}
