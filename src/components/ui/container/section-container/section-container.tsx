import React from "react";
import styles from "./section-container.module.css";

export const SectionContainer: React.FC = ({ children }) => {
    
  return (
    <div className={styles.section}>
        {children}
    </div>
  );
};
