const getting = (req, res) => {
    res.render("test", {});
};

const posting = (req, res) => {
    const a = prompt();
    console.log(a);
}

module.exports = {
    getting,
    posting
}