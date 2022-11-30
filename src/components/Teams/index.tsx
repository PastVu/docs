import React  from 'react';
import Person from '../Person';

export function MainTeam (): JSX.Element {
    return (
        <div>
            <Person
                name="Ilya Varlamov"
                avatar="img/people/ilya.jpg"
                pastvu="Ilya"
            >
                The author of original idea.
            </Person>

            <Person
                name="Pavel Klimashkin"
                avatar="img/people/klimashkin.jpg"
                pastvu="klimashkin"
            >
                Project's architect, platform creator.
            </Person>

            <Person
                name="Anvar Paganini"
                avatar="img/people/abdulla_hasan.png"
                pastvu="abdulla_hasan"
            >
                Infrastructure, client relations
            </Person>

            <Person
                name="Paul K."
                avatar="img/people/paul.png"
                pastvu="_p_k"
            >
                Community relations, issues management, UX analysis.
            </Person>

            <Person
                name="Dmitry Bashlov"
                avatar="img/people/dema501.png"
                pastvu="dema501"
            >
                System administration
            </Person>
        </div>
    )
}

export function CollabTeam (): JSX.Element {
    return (
        <div>
            <Person
                name="Egor Kuzmichev"
                avatar="img/people/kuzmichev.jpg"
                github="aeifn"
                pastvu="aeifn"
            >
                DevOps, CI/CD, maintainer.
            </Person>

            <Person
                name="Ruslan Kabalin"
                avatar="img/people/kabalin.jpg"
                github="kabalin"
                pastvu="nowhereman"
            >
                Contributing developer and maintainer.
            </Person>
        </div>
    )
}

export function AlumniTeam (): JSX.Element {
    return (
        <div>
            <Person
                name="Alex Duk"
                avatar="img/people/duche.jpg"
                pastvu="Duche"
            >
                Producer of the project 2009 - 2018.
            </Person>
        </div>
    )
}

