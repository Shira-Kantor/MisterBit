import React, { Component } from 'react'
import { useFormRegister } from '../customHooks/useFormRegister';


export function ContactFilter (props) {
  const [register] = useFormRegister({ ...props.filterBy }, props.onChangeFilter)
    
    return (
        <form className='contact-filter'>
            <section>
                <label htmlFor="name"></label>
                <input {...register('name', 'text')} />
            </section>
          
        </form>
    )
  }
