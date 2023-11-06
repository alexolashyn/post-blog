document.querySelectorAll(".update-button").forEach(function (button) {
    button.addEventListener("click", function () {
        const postId = button.getAttribute("postId");
        const updateModal = document.getElementById(`update-modal-${postId}`);
        updateModal.style.display = "block";
    });
});

document.querySelectorAll(".close").forEach(function (closeButton) {
    closeButton.addEventListener("click", function () {
        const postId = closeButton.getAttribute("postId");
        const updateModal = document.getElementById(`update-modal-${postId}`);
        updateModal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        document.querySelectorAll(".modal").forEach(function (updateModal) {
            if (event.target === updateModal) {
                updateModal.style.display = "none";
            }
        });
    });
});

document.querySelectorAll(".update-form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const postId = form.getAttribute("postId");
        const title = form.querySelector("input[name='title']").value;
        const description = form.querySelector("textarea[name='description']").value;
        const formData = { title, description };

        fetch(`/api/blog/update-post/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.status === 200) {
                    location.reload();
                } else {
                    console.log(response);
                }
            })
            .catch(error => {
                console.log('Error:', error);
            });
    });
});

document.querySelectorAll(".delete-button").forEach(function (deleteButton) {
    deleteButton.addEventListener("click", function () {
        const postId = deleteButton.getAttribute("postId");
        fetch(`/api/blog/delete-post/${postId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.status === 200) {
                    location.reload();
                } else {
                    console.log(response.message);
                }
            })
            .catch(error => {
                console.log('Error:', error);
            });
    });
});

document.getElementById("create-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("create-title-input").value;
    const description = document.getElementById("create-description-input").value;
    const formData = { title, description };

    fetch(`/api/blog/create-post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
    })
        .then(response => {
            if (response.status === 200) {
                location.reload();
            } else {
                console.log(response);
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
});

document.getElementById("create-button").addEventListener("click", function () {
    const createModal = document.getElementById("create-modal");
    createModal.style.display = "block";
});

document.getElementById("close-button").addEventListener("click", function () {
    const createModal = document.getElementById("create-modal");
    createModal.style.display = "none";
});