// import { storageService } from './async-storage.service'
import { storageService } from './StorageService.js'
// import { httpService } from './http.service'


const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const USER_KEY = 'user'

export const userService = {
    getUsers,
    getById,
    remove,
    update,
    createMove,
    changeScore,
    login,
    signup,
    logout,
    getLoggedinUser,
    transferCoins

}
function initializeUserService() {
    (async () => {
        await userService.signup({ fullname: 'Puki', username: 'puki', coins: 100, moves: [] })
        await userService.signup({ fullname: 'Master Adminov', username: 'admin', coins: 150, moves: [] })
        await userService.signup({ fullname: 'Muki G', username: 'muki', coins: 200, moves: [] })
    })()
}

//   initializeUserService()
const users = [
    {
        name: "Puki",
        coins: 100,
        moves: [
            {
                toId: "d99e3u2ih329",
                to: "Moshiko",
                at: 2652712571,
                amount: 2
            }
        ]
    },
    {
        name: "Muki",
        coins: 200,
        moves: []
    },
    {
        name: "Shuki",
        coins: 150,
        moves: []
    }
]

function getUsers() {
    return users
}

function createMove(contact, amount) {
    const newMove={
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount
    }
    return newMove
}

function transferCoins(amount, contact){
    const loggedInUser = storageService.load(USER_KEY )
    console.log('loggedInUser',loggedInUser)
    const newMove = createMove(contact, amount)
    loggedInUser.moves.unshift(newMove)
    loggedInUser.coins -= amount
    update(loggedInUser)
    return loggedInUser
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

 function update(user) {
  
     storageService.store(USER_KEY , user)

    // user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    console.log('userCred', userCred)
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        return saveLocalUser(user)
    }
}
async function signup(userName) {
console.log('userName',userName)
    const user = {
        // id: u101,
        name: userName,
        coins: 100,
        moves: [],
    }
    storageService.store(USER_KEY, user)
    // const user = await storageService.post('user', newUser)
    // const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.coins = user.coins + by || by
    await update(user)
    return user.coins
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.name, coins: user.coins, moves: user.moves }
    sessionStorage.setItem(USER_KEY, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    const loggedInUser = storageService.load(USER_KEY)
    if (loggedInUser) return loggedInUser
    return {
      name: 'Ochoa Hyde',
      coins: 100,
      moves: [],
    }
}

