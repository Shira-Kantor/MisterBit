import { userService } from '../../services/UserService';


const INITIAL_STATE = {
    loggedInUser: userService.getLoggedinUser()
  }

export function userReducer(state = INITIAL_STATE, action = {}) {

    switch (action.type) {
        case 'SPEND_BALANCE':
            const { loggedInUser } = state
            return {
                ...state,
                loggedInUser: { ...loggedInUser,
                     amount: loggedInUser.amount - action.amount }
            }
        case 'SET_USER':{
            return {...state, loggedInUser: {...action.user}}
        }

        default:
            return state;
    }
}