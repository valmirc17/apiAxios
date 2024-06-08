//Utilizando o Axios
//Enviando uma requisição GET para API, para listar todos os hogos


//Capturar botão de Criar Jogo
const createBtn = document.getElementById("createBtn")

createBtn.addEventListener("click", createMovie)

//Capturar botão de Edição
const updateBtn = document.getElementById("updateBtn")

updateBtn.addEventListener("click", updateMovie)

axios.get("http://localhost:5000/filmes").
then(response => {
    const filmes = response.data
    const listFilmes = document.getElementById("filmes")
    filmes.forEach(filme => {
        let item = document.createElement("li")

        //setando o Atributo ID para cada game
        item.setAttribute("data-id", filme._id)
        item.setAttribute("data-titulo", filme.titulo)
        item.setAttribute("data-ano", filme.ano)
        item.setAttribute("data-categoria", filme.categoria)

        //const id = listItem.getAttibute("data-id")

        item.innerHTML = `<h4> ${filme.titulo}</h4>
        <p>Ano: ${filme.ano}</p>
        <p>Categoria: ${filme.categoria}</p>
        <p>id: ${filme._id}</p>`
        
        var deleteBTN = document.createElement("button")
        deleteBTN.innerHTML = "Deletar"
        deleteBTN.classList.add("btn", "btn-danger", "mb-3", "mx-2")
        //quando clickar no botão
        deleteBTN.addEventListener("click", function(){
            deleteFilme(item)
        })

        var editBTN = document.createElement("button")
        editBTN.innerHTML = "Editar"
        editBTN.classList.add("btn", "btn-warning", "mb-3")
        editBTN.addEventListener("click", function(){
            loadForm(item)
        })

        listFilmes.appendChild(item)
        item.appendChild(deleteBTN)
        item.appendChild(editBTN)

    })
})


//Função para deletar um game
function deleteFilme(listItem){

    const id = listItem.getAttribute("data-id")
    axios.delete(`http://localhost:5000/filmes/${id}`).
    then(response => {
        window.alert("Game deletado com sucesso:", response.data)
        listItem.remove()
    })
    .catch(error =>{
        window.alert("Erro ao deletar o Game", error)
    })

}

    function createMovie(){

        const form = document.getElementById("createForm")
        form.addEventListener("submit" , function(event){
            event.preventDefault() //Evita o envio padrão do formulário
        })

        const tituloInput = document.getElementById("titulo")
        const anoInput = document.getElementById("ano")
        const categoriaInput = document.getElementById("categoria")

        const filme = {
            titulo : tituloInput.value,
            ano: anoInput.value,
            categoria: categoriaInput.value
        }

        console.log(filme)

        //Enviando as informações do game para API
axios.post("http://localhost:5000/filmes", filme).then(response =>{

if (response.status ==201){
    alert("Filme Cadastrado com sucesso!")
    location.reload()
}
}).catch(error => {
    console.log(error)
})

    }


    //Função para carregar o formiulário de edição

    function loadForm(listItem){
        const id = listItem.getAttribute("data-id")
        const titulo = listItem.getAttribute("data-titulo")
        const ano = listItem.getAttribute("data-ano")
        const categoria = listItem.getAttribute("data-categoria")
        document.getElementById("idEdit").value = id
        document.getElementById("tituloEdit").value = titulo
        document.getElementById("anoEdit").value = ano
        document.getElementById("categoriaEdit").value = categoria

    }


    function updateMovie(){

        
        const form = document.getElementById("editForm")
        form.addEventListener("submit", function(event){
            event.preventDefault()
        })


        const idInput = document.getElementById("idEdit")
        const tituloInput = document.getElementById("tituloEdit")
        const anoInput = document.getElementById("anoEdit")
        const categoriaInput = document.getElementById("categoriaEdit")
        
        const filme = {
        titulo: tituloInput.value,
        categoria: categoriaInput.value,
        ano: anoInput.value
        }

        var id = idInput.value

        axios.put(`http://localhost:5000/filmes/${id}`, filme).then(response => {
            if(response.status == 200){
                alert("Filme Atualizado com sucesso")
                location.reload()
            }
        }).catch(error => {
            console.log(error)
        })

    }

