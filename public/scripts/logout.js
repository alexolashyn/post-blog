document.getElementById("logout-button").addEventListener("click", () => {
    fetch('/api/auth/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => { 
            window.location.href = '/api/auth/login';
        })
        .catch(error => {
            console.error(error);
        });
});