import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [texte, setTexte] = useState('');
  const [curseurVisible, setCurseurVisible] = useState(true);
  const [choixSelectionne, setChoixSelectionne] = useState(0);
  const [choixVisible, setChoixVisible] = useState(false);
  const [animationTerminee, setAnimationTerminee] = useState(false);
  const message = 'Quel portfolio veux-tu visiter ?';
  const choix = ['Portfolio simple', 'Portfolio 2D'];
  const liens = [
    'https://portfolio.friedrichalyssa.com',
    'https://portfoliojs.friedrichalyssa.com'
  ];
  useEffect(() => {
    let index = 0;
    let texteActuel = '';
    const taperTexte = () => {
      if (index < message.length) {
        texteActuel += message[index];
        setTexte(texteActuel);
        index++;
        setTimeout(taperTexte, 65);
      } else {
        setAnimationTerminee(true);
      }
    };
    taperTexte();
  }, []);

  useEffect(() => {
    if (animationTerminee) {
      setChoixVisible(true);
    }
  }, [animationTerminee]);

  const gererTouche = (evenement: KeyboardEvent) => {
    if (evenement.key === "ArrowUp") {
      setChoixSelectionne((prev) => (prev === 0 ? 1 : 0));
    } else if (evenement.key === "ArrowDown") {
      setChoixSelectionne((prev) => (prev === 1 ? 0 : 1));
    } else if (evenement.key === "Enter") {
      const url = choixSelectionne === 0 
        ? 'https://portfolio.friedrichalyssa.com' 
        : 'https://portfoliojs.friedrichalyssa.com'; 
        window.open(url, '_blank');
      }
  };

  useEffect(() => {
    window.addEventListener('keydown', gererTouche);
    return () => {
      window.removeEventListener('keydown', gererTouche);
    };
  }, [choixSelectionne]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {texte}
        <span className={texte.length === message.length ? styles.cursorVisible : styles.cursor}>|</span>
      </h1>
      {choixVisible && (
        <ul className={styles.choicesList}>
          {choix.map((choixItem, index) => (
            <p
              key={index}
              className={choixSelectionne === index ? styles.selectedChoice : ''}
              onClick={() => window.open(liens[index], '_blank')}
            >
              {choixSelectionne === index ? '> ' : ''}{choixItem}
            </p>
          ))}
        </ul>
      )}
    </div>
  );
}
