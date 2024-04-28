import styles from "./style.module.css";

type HighlightTextProps = {
  text: string;
  highlight: string;
};

export const HighlightText: React.FC<HighlightTextProps> = ({ text, highlight }) => {
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return (
    <p>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} className={styles.highlightedText}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </p>
  );
};