import { Component, useEffect, useState } from 'react'
import { contactService } from '../services/ContactService'
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '../customHooks/useForm';

export function ContactEdit(props) {

  const [contact, handleChange, setContact] = useForm(contactService.getEmptyContact())

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadContact()
}, []);
 
async function loadContact() {
  const contactId = params.id
  if (contactId) {
      try {
          const contact = await contactService.getContactById(contactId)
          setContact(contact)
      } catch (error) {
          console.log('error:', error)
      }
  }
}

  async function onSaveContact (ev) {
    ev.preventDefault()
    try {
      await contactService.saveContact({ ...contact })
      navigate('/')
    } catch (error) {
      console.log('error:', error)
    }
  }

 async function onRemoveContact (contactId) {
    try {
      await contactService.deleteContact(contactId)
      // this.setState(({ contacts }) => ({
      //     contacts: contacts.filter(contact => contact._id !== contactId)
      // }))

    } catch (error) {
      console.log('error:', error)
    }
  }

  const { name, phone, email } = contact
  return (
    <section className='contact-edit'>
      <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
      <form onSubmit={this.onSaveContact} >
        <button className='delete-edit-btn' onClick={() => this.onRemoveContact(contact._id)}>Delete</button>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={this.handleChange} type="text" name="name" id="name" />

        <label htmlFor="phone">Phone: </label>
        <input type="text" value={phone} onChange={this.handleChange} name="phone" id="phone" />

        <label htmlFor="email">Email: </label>
        <input type="email" value={email} onChange={this.handleChange} name="email" id="email" />

        <button className='save-edit-btn'>Save</button>
        <Link to={`/contact/${contact._id}`} className='edit-back'>Back</Link>
      </form>
    </section>
  )

}
