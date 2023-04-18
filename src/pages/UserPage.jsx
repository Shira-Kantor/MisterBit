import React, { Component } from 'react'
import { bitcoinService } from '../services/BitcoinService'
import { userService } from '../services/UserService'
import { SignupPage } from './SignupPage'
import  MovesList  from '../cmps/MovesList'

export default class UserPage extends Component {
  state = {
    bitcoins: null,
    user: null
  };

  async componentDidMount() {
    const user = await userService.getLoggedinUser()
    if (!user) this.props.history.push('/signup')
    const bitcoins = await bitcoinService.getRate(user.coins);
    this.setState({ user, bitcoins });
  }

  logout = () => {
    console.log('logput');
    this.user = null
    // userService.logout()

  }

  get lastThreeMoves() {
    const { user } = this.state
    return user.moves.slice(0,3)
  }

  render() {
    const { user, bitcoins } = this.state;
    if (!user || !bitcoins) {
      return <div>Loading...</div>
    }
    return (
      <div>
        {user ? (
          <section className='user-bit' >
            <pre>Hello {user.name} !</pre>
            <pre>💰 Coins: {user.coins}</pre>
            {bitcoins && <pre>🪙BTC: {bitcoins}</pre>}
            <MovesList title={'Your Last 3 Moves:'} moves={this.lastThreeMoves}/>
            {/* <button onClick={this.logout}>Logout</button> */}
          </section>
        ) : (
          <div>
            <SignupPage />
          </div>
        )}
      </div>
    )
  }
}


