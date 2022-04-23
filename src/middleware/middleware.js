const headerCheck = async (req, res, next) => {
    const header = req.headers.isfreeappuser || req.headers.isFreeAppUser //some client send header as it is and some with lowercase so thi checks both our conditions
    if(header){
        if(header === "true")
        req['isFreeAppUser'] = true //we can do 'req.isFreeAppUser = true' as well. same thing
        // req['isFreeAppUser'] = JSON.parse(header) // This way also we can write line 5
        if(header === "false")
        req['isFreeAppUser'] = false //in [] notation the value is considered to be a variable that's why we write the 'isFreeAppUser' with single/double quote to make it a string 
    next()
    }
    else res.send({msg: "An usefull header is missing"})
}

module.exports = {headerCheck}