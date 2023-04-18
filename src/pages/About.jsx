import { NavLink, Route } from "react-router-dom";


export function About() {
    return (
        <section className="about">
            <section className="title-container">
                <h2>About us and contacts</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla minus explicabo ipsum necessitatibus cupiditate facere corrupti, praesentium tempora molestias, accusantium repellendus, in quasi. Iste labore maxime, vitae nulla odit sint.</p>
            </section>

            <nav>
                <NavLink to="/about/team" className='bold'>Team</NavLink>
                <NavLink to="/about/vision" className='bold'>Vision</NavLink>
            </nav>

        </section>
    )
}
