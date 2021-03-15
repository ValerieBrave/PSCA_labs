module.exports = {
    reject: (context, opt)=> {
        return `<button style="width: 30%; height: 7vh; background-color: white;"
        onclick="document.location='/'"
        >Reject</button>`
    }
}