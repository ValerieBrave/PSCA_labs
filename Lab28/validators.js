exports.validator_1 = function(params, _, raw) {
    console.log('validator1')
    if(!Array.isArray(params)) throw new Error('Гони массив')
    params.forEach(el => {
        if(!isFinite(el)) throw new Error('Обманывать ПЛОХО')
    })
    return params
}

exports.validator_2 = function(params, _, raw) {
    console.log('validator2')
    if(!Array.isArray(params)) throw new Error('Гони массив')
    if(params.length != 2) throw new Error('Ни больше ни меньше двух!')
    params.forEach(el => {
        if(!isFinite(el)) throw new Error('Обманывать ПЛОХО')
    })
    if(params[1]== 0) throw new Error('На ноль делить собрался?')
    return params
}