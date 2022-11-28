import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import clsx from 'clsx';

type PersonProps = {
  name: string;
  avatar: string;
  github?: string;
  pastvu?: string;
  children: ReactNode;
}

function GitHubLink ({ name }: {name: string}): JSX.Element {
    return (
        <Link
          to={`https://github.com/${name}`}
          className={clsx(styles.profileLink, styles.githubProfile)}
          aria-label="GitHub profile"
        ></Link>
    )
}

function PastVuLink ({ name }: {name: string}): JSX.Element {
    return (
        <Link
          to={`https://pastvu.com/u/${name}`}
          className={clsx(styles.profileLink, styles.pastvuProfile)}
          aria-label="PastVu profile"
        ></Link>
    )
}

export default function Person ({
    name,
    avatar,
    github,
    pastvu,
    children
}: PersonProps): JSX.Element {
    return (
        <div className={clsx('avatar', styles.personProfile)}>
            <img
                className="avatar__photo avatar__photo--xl"
                src={ avatar }
            />
            <div className="avatar__intro">
                <h4 className="avatar__name">
                    { name }
                    {pastvu && (
                        <PastVuLink name={pastvu} />
                    )}
                    {github && (
                        <GitHubLink name={github} />
                    )}
                </h4>
                <div className="avatar__subtitle">{ children }</div>
            </div>
        </div>
    )
}
