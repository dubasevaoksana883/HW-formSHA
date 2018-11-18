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
    var arrBtn = [
        document.querySelector("#ent"),
        document.querySelector("#reg")
    ]
    arrBtn.forEach(elem=>{
        elem.style.display = "none"
    })
    var form = document.querySelector(".form")
    var main_form = document.querySelector(".main_form")
    main_form.style.background = "#4280f4"
    arrTag.forEach(elem=>{
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
    var subBtn = document.querySelector("#idBtn")
    subBtn.addEventListener("click", submitForm)
}
document.querySelector("#reg").addEventListener("click", showRegForm)
var users = []
function submitForm(event){
    var user = {
        name: document.querySelector("#idLog").value,
        email: document.querySelector("#idEmail").value,
        key:  document.querySelector("#idPas").value ?
            Sha256.hash ( document.querySelector("#idPas").value ):
            null,
        avatar: document.querySelector("#idAva").value,
    }
    function massage(text){
        var lastMas = document.querySelector("#mas")
        if (lastMas){
            lastMas.parentNode.removeChild(lastMas)
        }
         var p = document.querySelector(".form").appendChild(
            document.createElement("p")
         )
         p.innerText = text
         p.style.color = "red"
         p.id = "mas"
    }
    function checkForm (){
        if (user.name && user.email && user.key){
            massage("")
            return true
        }
        massage("Заполните обязательные поля")
        return false
    }
    function checkUser (){
        var check = users.some( x => x.name === user.name &&
               x.email === user.email )
        if (check){
            massage("Пользователь уже зарегестрирован")
            return false
        }
        return true
    }
    checkForm() ? checkUser() ? users.push(user) : null : null
}
