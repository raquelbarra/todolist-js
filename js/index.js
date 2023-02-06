class Opcao {
    atividade;
    dataAtividade;
    tagPrioridade;
    finalizar = false;
    constructor(atividade, dataAtividade, tagPrioridade) {
        this.atividade = atividade;
        this.dataAtividade = dataAtividade;
        this.tagPrioridade = tagPrioridade;
    }
}

const arrayOpcoes = ['Altíssima', 'Alta', 'Normal', 'Baixa'];
let listaAtividades = baixarLista();
const formulario = document.createElement('form');
const inputAtividade = document.createElement('input');
const inputDataAtividade = document.createElement('input');
const selectTagsPrioridade = document.createElement('select');
const botao = document.createElement('button');

function construirFormularioNovo(){
    const divNovaAtividade = document.querySelector('.nova-atividade');
    selectTagsPrioridade.required = true;
    inputAtividade.id = 'input-atividade';
    inputAtividade.type = 'text';
    inputAtividade.placeholder = 'Informe a Atividade';
    inputAtividade.required = true;
    inputDataAtividade.id = 'input-data-atividade';
    inputDataAtividade.type = 'date';
    inputDataAtividade.required = true;
    botao.textContent = 'Adicionar';
    botao.type = 'submit';
    formulario.appendChild(inputAtividade);
    formulario.appendChild(inputDataAtividade);
    formulario.appendChild(selectTagsPrioridade);
    formulario.appendChild(botao);
    divNovaAtividade.appendChild(formulario);
}

function construirFormularioEditar(atividade,formularioAtualizar,inputAtividadeAtualizar,inputDataAtividadeAtualizar,selectTagsPrioridadeAtualizar,botaoAtualizar,botaoCancelar,boxEditarAtividade){
    selectTagsPrioridadeAtualizar.required = true;
    inputAtividadeAtualizar.id = 'input-atividade';
    inputAtividadeAtualizar.type = 'text';
    inputAtividadeAtualizar.placeholder = 'Informe a Atividade';
    inputAtividadeAtualizar.required = true;
    inputDataAtividadeAtualizar.id = 'input-data-atividade';
    inputDataAtividadeAtualizar.type = 'date';
    inputDataAtividadeAtualizar.required = true;
    botaoAtualizar.textContent = 'Atualizar';
    botaoCancelar.textContent = 'Cancelar';
    botaoAtualizar.type = 'submit';
    botaoCancelar.type = 'submit';
    formularioAtualizar.appendChild(inputAtividadeAtualizar);
    formularioAtualizar.appendChild(inputDataAtividadeAtualizar);
    formularioAtualizar.appendChild(selectTagsPrioridadeAtualizar);
    formularioAtualizar.appendChild(botaoAtualizar);
    formularioAtualizar.appendChild(botaoCancelar);
    boxEditarAtividade.appendChild(formularioAtualizar);

    inputAtividadeAtualizar.value = atividade.atividade;
    inputDataAtividadeAtualizar.setAttribute("value",atividade.dataAtividade);
    selectTagsPrioridadeAtualizar.innerHTML = '';
    arrayOpcoes.forEach((opcao) => {
            const optionTagPropriedade = document.createElement('option');
            optionTagPropriedade.value = opcao;
            optionTagPropriedade.textContent = opcao;
            selectTagsPrioridadeAtualizar.appendChild(optionTagPropriedade);
    });
    selectTagsPrioridadeAtualizar.value = atividade.tagPrioridade
}

function getOpcoes(){
    arrayOpcoes.map((opcao, index) => {
        const optionTagPropriedade = document.createElement('option');
        optionTagPropriedade.value = opcao;
        optionTagPropriedade.textContent = opcao;
        selectTagsPrioridade.appendChild(optionTagPropriedade);
    });
}

function adicionarAtividade(){
    let valorInputAtividade = inputAtividade.value;
    let valorInputDataAtividade = inputDataAtividade.value;
    let valorSelectTagsPrioridade = selectTagsPrioridade.value;

    let formularioEhValido = valorInputAtividade != '' && valorInputDataAtividade != '' && valorSelectTagsPrioridade != '';
    if(!formularioEhValido) {
        alert('Preencher todos os campos');
        return undefined
    }
    return new Opcao(valorInputAtividade, valorInputDataAtividade, valorSelectTagsPrioridade);
}


function main(){
    atualizar();
    construirFormularioNovo();
    getOpcoes();

    click(botao, ()=>{
        const novaOpcao = adicionarAtividade();
        if(!novaOpcao){
            return 
        }
        listaAtividades.push(novaOpcao);
        salvarLista();
        atualizar();
        inputAtividade.value = "";
        inputDataAtividade.value = "";
        selectTagsPrioridade.value = arrayOpcoes[0];
    });
}

function salvarLista() {
    let listaString = JSON.stringify(listaAtividades);
    localStorage.setItem('lista', listaString);
}

function baixarLista() {
    let listaString = localStorage.getItem('lista');
    return JSON.parse(listaString) || [];
}

function atualizar(){
    let divListaDeAtividades = document.querySelector('.lista-de-atividades');
    limparListaDeAtividades(divListaDeAtividades);

    let contador = listaAtividades.length;
    let tituloLista = document.createElement("h2");
    tituloLista.innerText = `Lista (${contador})`;

    divListaDeAtividades.appendChild(tituloLista);

    listaAtividades.forEach((element, index) => {
        divListaDeAtividades.appendChild(addAtividade(element, index))
        let botaoE = document.querySelector(`button[id=Editar${index}]`);
        let botaoEx = document.querySelector(`button[id=Excluir${index}]`);
        let checkbox = document.querySelector(`input[id=checkbox${index}]`);
        let li = document.querySelector(`li[id=atividade${index}]`);
        editarAtividade(botaoE)
        removeAtividade(botaoEx)
        finalizarAtividade(checkbox, li)
    });
}

function editarAtividade(ele){
    click(ele, ()=>{
        const atividade = listaAtividades[ele.value];
        const formularioAtualizar = document.createElement('form');
        const inputAtividadeAtualizar = document.createElement('input');
        const inputDataAtividadeAtualizar = document.createElement('input');
        const selectTagsPrioridadeAtualizar = document.createElement('select');
        const botaoAtualizar = document.createElement('button');
        const botaoCancelar = document.createElement('button');

        const boxEditarAtividade = document.querySelector(`.editar-atividade`);
        const boxNovaAtividade = document.querySelector(`.nova-atividade`);
        const boxListaAtividade = document.querySelector(`.lista-de-atividades`);
        
        boxEditarAtividade.classList.remove('none');
        boxNovaAtividade.classList.add('none');
        boxListaAtividade.classList.add('none');

        construirFormularioEditar(atividade,formularioAtualizar,inputAtividadeAtualizar,inputDataAtividadeAtualizar,selectTagsPrioridadeAtualizar,botaoAtualizar,botaoCancelar,boxEditarAtividade);
        
        click(botaoCancelar, ()=>{
            boxEditarAtividade.classList.add('none');
            boxNovaAtividade.classList.remove('none');
            boxListaAtividade.classList.remove('none');
            formularioAtualizar.remove();
            atualizar();
        })

        click(botaoAtualizar, ()=>{

            const novaAtividade = inputAtividadeAtualizar.value;
            const novaData = inputDataAtividadeAtualizar.value;
            const novaOpcao = selectTagsPrioridadeAtualizar.value;

            const formularioEhValido = novaAtividade != '' && novaData != '' && novaOpcao != '';
            if(!formularioEhValido) {
                alert('Preencher todos os campos');
                return;
            }

            
            listaAtividades[ele.value].atividade = novaAtividade;
            listaAtividades[ele.value].dataAtividade = novaData;
            listaAtividades[ele.value].tagPrioridade = novaOpcao;

            salvarLista();

            boxEditarAtividade.classList.add('none');
            boxNovaAtividade.classList.remove('none');
            boxListaAtividade.classList.remove('none');

            formularioAtualizar.remove();
            atualizar();
        })
    })
}

function removeAtividade(ele){
    click(ele, ()=>{
        listaAtividades.splice(ele.value, 1)
        salvarLista();
        atualizar();
    })   
}

function finalizarAtividade(ele, li){
    ele.addEventListener('change', function() {
        if (this.checked) {
            listaAtividades[ele.value].finalizar = true;
            li.classList.add("done");
        } else {
            listaAtividades[ele.value].finalizar = false;
            li.classList.remove("done");
        }
        salvarLista();
        atualizar();
    });
}


function addAtividade(element, index){
    const ID = `checkbox${index}`
    const atividades = document.createElement('ul');
    const descricaoAtividade = document.createElement('li');
    const divDescricaoAtividade = document.createElement('div');
    const inputMarcacao = document.createElement('input');
    const tituloAtividade = document.createElement('label');
    const prioridadeAtividade = document.createElement('p');
    const dataAtividade = document.createElement('p');
    const divBotoesDeAcao = document.createElement('div');
    const botaoEditar = document.createElement('button');
    const botaoExcluir = document.createElement('button');

    inputMarcacao.type = "checkbox";
    inputMarcacao.name = "checkbox";
    inputMarcacao.value = index;
    inputMarcacao.id = ID;
    inputMarcacao.checked = element.finalizar

    if(inputMarcacao.checked){
        descricaoAtividade.classList.add('done');
    }

    descricaoAtividade.id = `atividade${index}`;
    tituloAtividade.setAttribute("for",ID);
    tituloAtividade.innerText = element.atividade;
    prioridadeAtividade.innerText =  element.tagPrioridade;
    
    let data = new Date(element.dataAtividade);
    let dataFormatada = ((data.getDate() + 1 )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear(); 
    
    dataAtividade.innerText = dataFormatada ;

    botaoEditar.textContent = "Editar";
    botaoEditar.id = `Editar${index}`;
    botaoEditar.value = index;
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.id = `Excluir${index}`;
    botaoExcluir.value = index;

    divDescricaoAtividade.appendChild(inputMarcacao);
    divDescricaoAtividade.appendChild(tituloAtividade);

    divBotoesDeAcao.appendChild(botaoEditar);
    divBotoesDeAcao.appendChild(botaoExcluir);
    
    descricaoAtividade.appendChild(divDescricaoAtividade);
    descricaoAtividade.appendChild(prioridadeAtividade);
    descricaoAtividade.appendChild(dataAtividade);
    descricaoAtividade.appendChild(divBotoesDeAcao);
    

    atividades.appendChild(descricaoAtividade);
    
    return atividades;
}

function limparListaDeAtividades(divListaDeAtividades){
    divListaDeAtividades.innerHTML = "";
}

function click(ele, callback){
    ele.addEventListener('click', function (e) {
        e.preventDefault();
        callback();
    })
}



main();