import React from 'react'
import { Link } from 'react-router-dom'

export function ContactPreview({ contact, onRemoveContact}) {

    
    return (
        <article className='contact-preview'>
         {/* <Link></Link> */}
            <Link to={`${contact._id}`} className="info">
            <img src={`https://robohash.org/${contact._id}/?set=set5`} alt="" />
                <h2>{contact.name}</h2>
            </Link>
            
            <section className="actions">
                <p onClick={() => onRemoveContact(contact._id)} >X</p>
            </section>
        </article>
    )
}
