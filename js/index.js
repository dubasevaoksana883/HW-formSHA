var arrTag = [
        {
             tagName: "h1",
             innerText: "Регистрация",
        },
        {
            tagName: "h3",
            innerText: "Введите имя пользователя",
        },
        {
            tagName: "input",
            id: "idLog",
        },
        {
            tagName: "h3",
            innerText: "Введите email",
        },
        {
            tagName: "input",
            id: "idEmail",
            type: "email",
        },
        {
            tagName: "h3",
            innerText: "Введите пароль",
        },
        {
            tagName: "input",
            id: "idPas",
            type: "password",
        },
        {
            tagName: "h3",
            innerText: "Добавьте ссылку на аватар",
        },
        {
            tagName: "input",
            id: "idAva",
            callback: function(event){
                var ava = document.querySelector("img")
                ava.src = this.value
            }
        },
        {
           tagName: "img",
           style: `
                width: 64px;
                height: 64px;
           `,
           src: "http://la.by/sites/default/files/pictures/avatar.png",
        },
        {
            tagName: "button",
            innerText: "Отправить",
            id: "idBtn",
            className: "btn",
        }

]
function showRegForm (event){
    delOld()
    createTags(arrTag)
    var subBtn = document.querySelector("#idBtn")
    subBtn.addEventListener("click", submitForm)
}
function createTags(arr){
    var main_form = document.querySelector(".main_form")
    main_form.style.background = "#4280f4"
    var form = document.querySelector(".form")
    arr.forEach(elem=>{
        for (var prop in elem){
            if (prop === "tagName"){
                var tag = form.appendChild(
                    document.createElement(elem[prop])
                )
            }
            if ( prop === "callback"){
                tag.addEventListener("change", elem[prop])
            } else tag[prop] = elem[prop]
        }
    })
}
function delOld(){
    massage("")
    var img = document.querySelector("img")
    img ? img.parentNode.removeChild(img) : null
    var arrBtn = [
        document.querySelector("#ent"),
        document.querySelector("#reg")
    ]
    arrBtn.forEach(elem=>{
        elem.style.display = "none"
    })
}
document.querySelector("#reg").addEventListener("click", showRegForm)
function massage(text, color = "black"){
    var lastMas = document.querySelector("#mas")
    if (lastMas){
          lastMas.parentNode.removeChild(lastMas)
    }
    var p = document.querySelector(".form").appendChild(
          document.createElement("p")
    )
    p.innerText = text
    p.style.color = color
    p.id = "mas"
}
var users = []
function submitForm(event){
    var user = {
        name: document.querySelector("#idLog").value,
        email: document.querySelector("#idEmail").value,
        key:  document.querySelector("#idPas").value ?
            Sha256.hash ( document.querySelector("#idPas").value ):
            null,
        avatar: document.querySelector("#idAva").value ||
            "http://la.by/sites/default/files/pictures/avatar.png"
    }
    function checkForm (){
        if (user.name && user.email && user.key){
            massage("")
            return true
        }
        massage("Заполните обязательные поля", "red")
        return false
    }
    function checkUser (){
        var check = users.some( x => x.name === user.name &&
               x.email === user.email )
        if (check){
            massage("Пользователь уже зарегестрирован", "red")
            return false
        }
        return true
    }
    function regEnd (){
        users.push(user)
        cleanForm()
        massage(` Пользователь
         ${users[users.length -1].name}
         зарегестрирован`, "white")
    }
    checkForm() ? checkUser() ?  regEnd() : null : null
}
function showEntForm(event){
    delOld()
    var h1 = document.querySelector(".form").appendChild(
        document.createElement("h1")
    )
    h1.innerText = "Вход"
    var res = arrTag.filter( el => el.innerText ===
         "Введите имя пользователя" || el.innerText ===
         "Введите пароль" || el.id === "idLog" || el.id ===
         "idPas" || el.id === "idBtn")
    createTags(res)
    var btn = document.querySelector("#idBtn")
    btn.addEventListener("click", entForm)
}
function cleanForm(){
    var formArr = Array.from(document.querySelectorAll(".form > *" ))
    formArr.forEach (function( el){
         if ( el.id === "reg" || el.id === "ent" ||
              el.localName === "img"){
              el.style.display = "block"
         } else {
              el.parentNode.removeChild(el)
         }
    })
}
function entForm(event){
    function testUser(){
        return users.some(el => el.name ===
            document.querySelector("#idLog").value && el.key ===
            Sha256.hash ( document.querySelector("#idPas").value ))
    }
    function searchUser(){
        return users.filter(el => el.name ===
            document.querySelector("#idLog").value && el.key ===
            Sha256.hash ( document.querySelector("#idPas").value ))[0]
    }
    if (testUser()){
        var user = searchUser()
        cleanForm()
        var img = document.querySelector(".form").appendChild(
            document.createElement("img")
        )
        img.style = `width: 64px; height: 64px;`
        img.src = user.avatar
        massage(`${user.name}`, "white")
    } else {
        massage("Неверный логин или пароль \n Регистрация?", "red")
    }
}
document.querySelector("#ent").addEventListener("click", showEntForm)
