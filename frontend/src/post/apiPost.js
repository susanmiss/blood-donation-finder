export const create = (userId, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(post)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


    export const listByHospital = (hospitalId) => {
        return fetch(`${process.env.REACT_APP_API_URL}/post/posts/by/${hospitalId}`, { 
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
    }