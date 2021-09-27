

exports.getToken = (req,res) => {
    return res.json({csrfToken: req.csrfToken()});
}