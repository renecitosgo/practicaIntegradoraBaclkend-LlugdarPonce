function filterSensitiveData(user, sensitiveFields = [ "password" ]) {
    const filteredUser = {...user }
    for(const field of sensitiveFields)
        delete filteredUser[field]
        return filteredUser
}

module.exports = filterSensitiveData
