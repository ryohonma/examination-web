import { Card } from "../_components/atoms/card/card";
import { SignupForm } from "../_components/templates/signup/form";
import styles from "./page.module.scss";

export default function Signup() {
  return (
    <Card className={styles.page}>
      <SignupForm />
    </Card>
  );
}
