import { memo } from "react";
import { ContactPreview } from '../cmps/ContactPreview'

function _ContactList({ contacts, onRemoveContact }) {
  
    return (
      <section className="contacts-list">
       
            {contacts.map(contact =>
                <ContactPreview key={contact._id} contact={contact} onRemoveContact={onRemoveContact} />
            )}
        </section>
    )
  }

export const ContactList = memo(_ContactList)
