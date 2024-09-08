import { Card } from "../_components/atoms/card/card";
import { ProfileRegistrationForm } from "../_components/templates/profile/profile-form";
import styles from "./page.module.scss";

export default function Profile() {
  return (
    <Card className={styles.page}>
      <ProfileRegistrationForm />
    </Card>
  );
}
