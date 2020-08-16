import axios from 'axios'

export const register = newUser => {
    return axios.post('users/register', {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        user_mail: newUser.user_mail,
        password: newUser.password       

    }).then(res => {
        console.log("registered")
    }).catch((err) => {
        console.log('Error occurred during registration -'+ err)
    })
}



export const login = user=> {
        return axios.post('users/login', {
            user_mail: user.user_mail,
            password: user.password
        }).then(res=>{
            sessionStorage.setItem('userToken', res.data)
            return res.data
        }).catch((err) => {
            console.log(err)
        })
}

export const fetchUserJira = user=> {
    return axios.post('users/jiras', {
        user_mail: user.user_mail,
    }).then(res=>{
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}

export const fetchJiraDetails = (jid)=> {
    return axios.get(`users/jira/${jid}`).then(res => {
        return res.data;
    }).catch((err)=>{
        console.log('Error occurred while calling get'+err)
    });
}