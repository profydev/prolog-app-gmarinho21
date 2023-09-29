import styles from "./footer.module.scss";

type FooterProps = {
  versionNumber: string;
};

export function Footer({ versionNumber }: FooterProps) {
  return (
    <footer className={styles.fixedContainer}>
      <p className={styles.version}>Version {versionNumber} </p>
      <div className={styles.container}>
        <a href="#" className={styles.links}>
          Docs
        </a>
        <a href="#" className={styles.links}>
          API
        </a>
        <a href="#" className={styles.links}>
          Help
        </a>
        <a href="#" className={styles.links}>
          Community
        </a>
      </div>
      <img src="/icons/logo-small.svg" className={styles.logo}></img>
    </footer>
  );
}
