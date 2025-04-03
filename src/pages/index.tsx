import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [texte, setTexte] = useState('');
  const [choixSelectionne, setChoixSelectionne] = useState(0);
  const [choixVisible, setChoixVisible] = useState(false);
  const [animationTerminee, setAnimationTerminee] = useState(false);
  const [bip, setBip] = useState<HTMLAudioElement | null>(null);
  const [confirm, setConfirm] = useState<HTMLAudioElement | null>(null);

  const message = 'Quel portfolio veux-tu visiter ?';
  const choix = ['Portfolio simple', 'Portfolio 2D'];
  const liens = [
    'https://portfolio.friedrichalyssa.com',
    'https://portfoliojs.friedrichalyssa.com'
  ];

  useEffect(() => {
    setBip(new Audio('/sounds/bip.mp3'));
    setConfirm(new Audio('/sounds/confirm.mp3'));
  }, []);

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
    if (evenement.key === "ArrowUp" || evenement.key === "ArrowDown") {
      setChoixSelectionne((prev) => {
        bip?.play();
        return prev === 0 ? 1 : 0;
      });
    } else if (evenement.key === "Enter") {
      confirm?.play();
      setTimeout(() => {
        window.open(liens[choixSelectionne], '_blank');
      }, 200);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', gererTouche);
    return () => {
      window.removeEventListener('keydown', gererTouche);
    };
  }, [choixSelectionne, bip, confirm]);

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
              onClick={() => {
                confirm?.play();
                setTimeout(() => {
                  window.open(liens[index], '_blank');
                }, 200);
              }}
            >
              {choixSelectionne === index ? '> ' : ''}{choixItem}
            </p>
          ))}
        </ul>
      )}
    </div>
  );
}
