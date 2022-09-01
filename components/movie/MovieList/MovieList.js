import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import styles from '../../../styles/Home.module.css';

export default function MovieList({ Movies }) {

    function MoviesCard(m) {
        // console.log(m.title)
        // let title = m.title
        // let decode = decodeURIComponent(title.replace(/\+/g, ' '))
        const url = decodeURIComponent(m.title.toLowerCase()).replace(/ /g, '-').replace(/[.,\/#!$%\^&\*;:{}=]/g, "")
        return (
            <Link href={`movie/${url}`}  >
                <a className={styles.card}>
                    <li className={styles.cardItems} key={m.id}>
                        <h3>{m.title}</h3>
                        {/* <img src={m.cover_url} alt={m.title} /> */}
                        {/* img vs next/image */}
                        <Image priority src={m.cover_url} width="382" height="566" layout='fixed' alt={m.title} />
                    </li>
                </a>
            </Link>
        )

    }
    return (
        <ul className={styles.list}>
            {Movies.map((m) => (
                
                <MoviesCard  key={m.id} {...m} />
            ))}
        </ul>


    )
}

