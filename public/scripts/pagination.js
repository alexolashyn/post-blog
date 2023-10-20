function previousPage() {
    const currentPage = parseInt(document.getElementById("page").value);
    const result = currentPage - 1;
    document.getElementById("page").value = result >= 1 ? result : currentPage;
}

function nextPage() {
    const currentPage = parseInt(document.getElementById("page").value);
    const allPages = parseInt(document.getElementById("next-button").value);
    const result = currentPage + 1;
    document.getElementById("page").value = result <= allPages ? result : currentPage;
}

document.getElementById("previous-button").addEventListener("click", () => {
    previousPage();
    document.getElementById("pagination").submit();
});

document.getElementById("next-button").addEventListener("click", () => {
    nextPage();
    document.getElementById("pagination").submit();
});