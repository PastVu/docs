import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';

type FeatureItem = {
  title: string;
  description: JSX.Element;
  link: string;
  linkText: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: <Translate id="homepage.cards.openPastvu.title">PastVu Project</Translate>,
    description: (
      <Translate id="homepage.cards.openPastvu.description">
        Anyone is welcome to get involved by adding photos and discussing them, helping to identify locations, improving information accuracy.
      </Translate>
    ),
    link: 'https://pastvu.com',
    linkText: <Translate id="homepage.cards.openPastvu.linkText">Open PastVu</Translate>,
  },
  {
    title: <Translate id="homepage.cards.rules.title">Project Rules</Translate>,
    description: (
      <Translate id="homepage.cards.rules.description">
        Read PastVu project rules that platform users have to follow.
      </Translate>
    ),
    link: '/rules',
    linkText: <Translate id="homepage.cards.rules.linkText">View Rules</Translate>,
  },
  {
    title: <Translate id="homepage.cards.contributing.title">Contributing</Translate>,
    description: (
      <Translate id="homepage.cards.contributing.description">
        Find ways how one can participate and help project to evolve.
      </Translate>
    ),
    link: '/contributing',
    linkText: <Translate id="homepage.cards.contributing.linkText">Start contributing</Translate>,
  },
];


function Feature({
    index, title, description, link, linkText,
}): JSX.Element {
    return (
        <div className={clsx('col col--4 ', styles.card, styles[`card-${index}`])}>
            <div className={styles['card-inner']}>
                <div className={styles['card-content']}>
                    <h2>{title}</h2>
                    <div className={styles['card-description']}>
                        {description}
                    </div>
                    <div className={styles.buttons}>
                        <Link
                        className={clsx('button button--primary button--lg', styles['card-button'])}
                        to={link}>
                        {linkText}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
