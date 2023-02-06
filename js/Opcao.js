export class Opcao {
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