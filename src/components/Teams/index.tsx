import React  from 'react';
import Person from '../Person';
import Translate, {translate} from '@docusaurus/Translate';

export function MainTeam (): JSX.Element {
    return (
        <div>
            <Person
                name={translate({ id: 'person.ilya.name', message: "Ilya Varlamov"})}
                avatar="img/people/ilya.jpg"
                pastvu="Ilya"
            >
                <Translate id="person.ilya.desc">The author of original idea.</Translate>
            </Person>

            <Person
                name={translate({ id: 'person.klimashkin.name', message: "Pavel Klimashkin"})}
                avatar="img/people/klimashkin.jpg"
                pastvu="klimashkin"
                github="klimashkin"
            >
                <Translate id="person.klimashkin.desc">Project's architect, platform creator.</Translate>
            </Person>

            <Person
                name={translate({ id: 'person.abdulla_hasan.name', message: "Anvar Paganini"})}
                avatar="img/people/abdulla_hasan.png"
                pastvu="abdulla_hasan"
            >
                <Translate id="person.abdulla_hasan.desc">Infrastructure, client relations.</Translate>
            </Person>

            <Person
                name={translate({ id: 'person._p_k.name', message: "Paul K."})}
                avatar="img/people/paul.png"
                pastvu="_p_k"
            >
                <Translate id="person._p_k.desc">Community relations, issues management, UX analysis.</Translate>
            </Person>

            <Person
                name={translate({ id: 'person.aeifn.name', message: "Egor Kuzmichev"})}
                avatar="img/people/kuzmichev.jpg"
                github="aeifn"
                pastvu="aeifn"
            >
                <Translate id="person.aeifn.desc">DevOps, CI/CD, maintainer.</Translate>
            </Person>

            <Person
                name={translate({ id: 'person.nowhereman.name', message: "Ruslan Kabalin"})}
                avatar="img/people/kabalin.jpg"
                github="kabalin"
                pastvu="nowhereman"
            >
                <Translate id="person.nowhereman.desc">Contributing developer and maintainer.</Translate>
            </Person>
        </div>
    )
}

export function AlumniTeam (): JSX.Element {
    return (
        <div>
            <Person
                name={translate({ id: 'person.duche.name', message: "Alex Duk"})}
                avatar="img/people/duche.jpg"
                pastvu="Duche"
            >
                <Translate id="person.duche.desc">Producer of the project 2009 - 2018.</Translate>
            </Person>

            <Person
                name={translate({ id: 'person.dema501.name', message: "Dmitry Bashlov"})}
                avatar="img/people/dema501.png"
                pastvu="dema501"
            >
                <Translate id="person.dema501.desc">System administration till 2020.</Translate>
            </Person>            
        </div>
    )
}

