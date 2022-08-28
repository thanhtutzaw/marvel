import React from "react";
import styles from '../../styles/Home.module.css';

export function Header({
  Quotes }) {
  const { quote, author } = Quotes.Items[0].data

  return <div className={styles.header}>
    <h2 className={styles.marvelLogo}>Marvel</h2>
    <div>
      <fieldset className={styles.quoteFieldset}>
        <legend>{`"${author}"`}</legend>
        <blockquote style={{
          fontFamily: "cursive",
          fontWeight: 'bold'
        }}>{quote.toUpperCase()}</blockquote>
      </fieldset>
    </div>
  </div>;
}
