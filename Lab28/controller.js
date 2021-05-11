exports.controller = {
    sum(params, raw) {
        let rc = 0
        params.forEach(element => {
            rc += element
        })
        return rc
    },
    mul(params, raw) {
        let rc = 1
        params.forEach(element => {
            rc *= element
        })
        return rc
    },
    div(params, raw) {
        return params[0]/params[1]
    },
    proc(params, raw) {
        return params[0]/params[1]*100
    }
}