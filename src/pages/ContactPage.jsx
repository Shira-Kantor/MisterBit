import React, { Component, useEffect } from 'react'
import { contactService } from '../services/ContactService'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import { ContactDetailsPage } from './ContactDetailsPage'
import { ContactEdit } from './ContactEdit'
import { Link } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux'
import {REMOVE_CONTACT, SET_CONTACTS} from '../store/reducers/contact.reducer'
import { loadContacts, removeContact, setFilterBy } from '../store/actions/contact.actions'


export function ContactPage () {
const contacts = useSelector((storeState)=> storeState.contactModule.contacts)
const filterBy = useSelector((storeState)=> storeState.contactModule.filterBy)
const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(loadContacts()) 
  },[])


async function onRemoveContact(contactId) {
  try {
    await dispatch(removeContact(contactId)) 
  } catch (error) {
      console.log('error:', error)
  }
}

function onChangeFilter (filterBy) {
  dispatch(setFilterBy(filterBy)) 
  dispatch(loadContacts()) 

}   
    if (!contacts) return <div>Loading...</div>
    return (
      <section className='contact-index'>
      {
       <>
       <section className='contact-page-header'>
              <ContactFilter filterBy={filterBy} onChangeFilter={onChangeFilter} />
             <Link to={"/contact/edit"}> <button>Add contact</button> </Link>
       </section>
              <ContactList contacts={contacts} onRemoveContact={onRemoveContact} />
          </>
      }
  </section>
    )
  }
