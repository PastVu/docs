import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  link: string;
  linkText: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'PastVu Project',
    description: (
      <>
        Anyone is welcome to get involved by adding photos and discussing them, helping to identify locations, improving information accuracy.
      </>
    ),
    link: 'https://pastvu.com',
    linkText: 'Open PastVu',
  },
  {
    title: 'Project Rules',
    description: (
      <>
        Read PastVu project rules that platform users have to follow.
      </>
    ),
    link: '/rules',
    linkText: 'View Rules',
  },
  {
    title: 'Contributing',
    description: (
      <>
        Find ways how one can participate and help project to evolve.
      </>
    ),
    link: '/contributing',
    linkText: 'Start contributing',
  },
];


function Feature({
    index, title, description, link, linkText,
}) {
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
