class library {

    constructor(name, author, type) {
        this.name = name
        this.author = author
        this.type = type
    }

    validation(msg) {
        let message = document.getElementById('message')
        let html
        if (this.name.length < 5 || this.author.length < 5) {
            html = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Holy User!</strong> ${msg}.<br>At least type 5 word in Both Field 
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`

            message.innerHTML = html

            return false
        } else {
            html = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Holy User!</strong> Success
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`
            message.innerHTML = html
            return true
        }


    }



    static showdata() {
        let jsobj
        let html
        let getnotes = localStorage.getItem('book')
        if (getnotes == null) {
            jsobj = []
        } else {
            jsobj = JSON.parse(getnotes)
        }
        html = ''
        Array.from(jsobj).forEach(function (element, index) {
            html += `<tr class="searching">
                        <td>${index}</td>
                        <td class="bookname">${element.name}</td>
                        <td>${element.author}</td>
                        <td>${element.type}</td>
                        <td><button id=${index} onClick="deleteNote(this.id)" class="btn btn-primary"> Delete Notes</button></td>
                    </tr>`
        })

        let show = document.getElementById('tbody')
        show.innerHTML = html
    }

    add() {
        let obj
        let check = localStorage.getItem('book')
        if (check == null) {
            obj = []
        } else {
            obj = JSON.parse(check)
        }
        let objlit = {
            name: this.name,
            author: this.author,
            type: this.type
        }
        obj.push(objlit)
        localStorage.setItem('book', JSON.stringify(obj))

        let jsbook = document.getElementById('bookname')
        let jsauthor = document.getElementById('author')

        jsbook.value = ""
        jsauthor.value = ""
        library.showdata()
    }

    static search() {
        let search = document.getElementById('search')
        search.addEventListener('input', function () {
            let val = search.value.toLowerCase()

            let find = document.getElementsByClassName('searching')
            let obj
            let check = localStorage.getItem('book')
            if (check == null) {
                obj = []
            } else {
                obj = JSON.parse(check)
            }
            Array.from(find).forEach(function (element) {
                let word = element.getElementsByClassName('bookname')[0].innerText

                if (word.includes(val)) {
                    element.style.display = ""
                } else {
                    element.style.display = "none"
                }
            })

        })
    }
}
library.search()

function deleteNote(index) {

    let getnotes = localStorage.getItem('book')

    jsobj = JSON.parse(getnotes)

    jsobj.splice(index, 1)
    localStorage.setItem('book', JSON.stringify(jsobj))
    library.showdata()

}


library.showdata()

let findbtn = document.getElementById('libraryForm')
findbtn.addEventListener('submit', clickbtn)

function clickbtn(e) {

    let jsbook = document.getElementById('bookname').value.toLowerCase()
    let jsauthor = document.getElementById('author').value.toLowerCase()

    let jspython = document.getElementById('Python');
    let jsjavaScript = document.getElementById('JavaScript')
    let jsc = document.getElementById('C')

    let type

    if (jspython.checked) {
        type = jspython.value
    } else if (jsjavaScript.checked) {
        type = jsjavaScript.value
    } else if (jsc.checked) {
        type = jsc.value
    }

    let books = new library(jsbook, jsauthor, type)

    if (books.validation()) {
        books.add()

    } else {
        books.validation('Enter correct data ')
    }
    // library.showdata()

    e.preventDefault()
}