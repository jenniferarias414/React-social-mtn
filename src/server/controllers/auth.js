export const login = async (req, res) => {
    console.log('login')
    res.sendStatus(200)
}

export const register = async (req, res) => {
    console.log('register')
    res.sendStatus(200)
}

// module.exports = {
//     login: async (req, res) => {
//         console.log('login')
//         res.sendStatus(200)
//     },
//     register: async (req, res) => {
//         console.log('register')
//         res.sendStatus(200)
//     },
//  use with create-react-app}