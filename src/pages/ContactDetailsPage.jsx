import { Component, useEffect, useState } from 'react'
import { contactService } from '../services/ContactService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TransferFund from '../cmps/TransferFund'
import { spendBalance, transferCoins } from '../store/actions/user.actions'
import MovesList from '../cmps/MovesList'
import { userService } from '../services/UserService'
import { connect, useSelector } from 'react-redux'

export function ContactDetailsPage(props) {
    console.log(props);
    const [contact, setContact] = useState(null)
    const user = useSelector((storeState) => {
        return storeState.userModule.loggedInUser
    })
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadContact()
    }, [params.id])

    async function loadContact() {
        try {
            const contact = await contactService.getContactById(params.id)
            setContact(contact)
        } catch (error) {
            console.log('error:', error)
        }
    }
    function onBack() {
        navigate('/')
    }

    
    // const [transferCoins, setTransferCoins] = useState(null)
    // useEffect(() => {
    //     setTransferCoins(amount, contact)
    // }, [user])


    function onTransferCoins(amount, contact) {
       userService.transferCoins(amount, contact)
    }


    // console.log(storeState);
    const [filterMoves, setFilterMoves] = useState(null)
    useEffect(() => {
        setFilterMoves(user.moves.filter((move) => move.toId === contact?._id))
    }, [contact])




    if (!contact) return <div>Loading...</div>
    return (
        <section className='contact-details'>
            <div className='details-btn flex'>
                <button className='bold' onClick={onBack}><span className='icon'>🔙</span></button>
                <Link to={`/contact/5a56640243427b8f8445231e`}><button className='next-btn'>Next Contact</button></Link>
                <Link to={`/contact/edit/${contact._id}`}> <button><span className='icon'>✏️</span> </button> </Link>
            </div>
            <img src={`https://robohash.org/${contact._id}/?set=set5`} />
            <section className='details'>
                <h3><span className='bold'>Name:</span>  {contact.name}</h3>
                <h3><span className='bold'>Phone:</span>  {contact.phone}</h3>
                <h3> <span className='bold'> Email: </span>{contact.email}</h3>
            </section>
            <TransferFund contact={contact} maxCoins={user.coins} onTransferCoins={onTransferCoins}></TransferFund>
            <MovesList title={'Your Moves:'} moves={filterMoves}></MovesList>
        </section>
    )
}
