import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'

import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localStorageService'

import * as messages from '../../components/toast'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


class ConsultaLancamentos extends React.Component{

        state = {
            ano : '',
            mes : '',
            tipo : '',
            descricao: '',
            showConfirmDialog: false,
            lancamentoDeletar: {},
            lancamentos: []
        }

        constructor(){
            super();
            this.service = new LancamentoService();
        }

        buscar = () =>{
            if(!this.state.ano){
                messages.menssagemErro('O Prenchimento do campo ano é obrigátorio')
                return false;
            }

            const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

            const lancamentoFiltro = {
                ano: this.state.ano,
                mes: this.state.mes,
                tipo: this.state.tipo,
                descricao: this.state.descricao,
                usuario: usuarioLogado.id 
            }

            this.service
                .consultar(lancamentoFiltro)
                .then(resposta => {
                    const lista = resposta.data;
                    if(lista.length < 1){
                        messages.menssagemAlerta("nenhum resultado Encontrado")
                    }
                    this.setState({lancamentos: lista})
                }).catch( error =>{
                    console.log(error)
                })
        }

    editar = (id) =>{
        this.props.history.push(`/cadastro-lancamento/${id}`)
    }

    abrirConfirmacao = (lancamento) =>{
        this.setState({showConfirmDialog: true, lancamentoDeletar: lancamento})
    }

    cancelarDelecao = (lancamento) =>{
        this.setState({showConfirmDialog: false, lancamentoDeletar: {}})
    }

    deletar = () =>{
        this.service
            .deletar(this.state.lancamentoDeletar.id)
            .then(response =>{
                const lancamentos = this.state.lancamentos
                const index = lancamentos.indexOf(this.state.lancamentoDeletar) 
                lancamentos.splice(index, 1)
                this.setState({lancamentos: lancamentos, showConfirmDialog: false})    
                messages.menssagemSucesso('Lancamento deletado com sucesso!')
            }).catch(error =>{
                messages.menssagemErro('Erro ao Deletar o lançamento!')
            })
    }

    preparaFormularioCadastro = () =>{
        this.props.history.push('/cadastro-lancamento')
    }

    alterarStatus = (lancamento, status) => {
        this.service
            .alterarStatus(lancamento.id, status)
            .then(response => {
                const Lancamentos = this.state.lancamentos;
                const index = Lancamentos.indexOf(lancamento);
                if(index !== -1){
                    lancamento['status'] = status;
                    Lancamentos[index] = lancamento
                    this.setState({lancamento});
                }
                messages.menssagemSucesso("Status atualizado com sucesso")
            })
    }

    render(){
        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaTipos();

        const confirmeDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} autoFocus />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-text" />                
            </div>
        );        

        return(
            <Card title="Consulta Lancamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" 
                                    className="form-control" 
                                    id="inputAno" 
                                    value={this.state.ano}
                                    onChange={e => this.setState({ano: e.target.value})} 
                                    placeholder="Digite o Ano" />
                            </FormGroup>

                            <FormGroup htmlFor="inputMeses" label="Meses: *">
                                <SelectMenu id="inputMeses" 
                                    className="form-control" 
                                    value={this.state.meses}
                                    onChange={e => this.setState({meses: e.target.value})}
                                    lista={meses} />
                            </FormGroup>

                            <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                                <input type="text" 
                                    className="form-control" 
                                    id="inputDescricao" 
                                    value={this.state.descricao}
                                    onChange={e => this.setState({descricao: e.target.value})} 
                                    placeholder="Digite a descrição" />
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: *">
                                <SelectMenu id="inputTipo" 
                                    className="form-control"
                                    value={this.state.tipos}
                                    onChange={e => this.setState({tipos: e.target.value})} 
                                    lista={tipos} />
                            </FormGroup>

                            <button onClick={this.buscar} type="button" className="btn btn-success"><i className="pi pi-search"></i> Buscar</button>
                            <button onClick={this.preparaFormularioCadastro} type="button" className="btn btn-danger"><i className="pi pi-plus"></i> Cadastrar</button>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <LancamentosTable 
                                    lancamentos={this.state.lancamentos} 
                                    deleteAction={this.abrirConfirmacao}
                                    editarAction={this.editar}
                                    alterarStatus={this.alterarStatus}>                                    
                                </LancamentosTable>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmação" 
                        visible={this.state.showConfirmDialog} 
                        style={{ width: '50vw' }} 
                        footer={confirmeDialogFooter}
                        modal={true}
                        onHide={() => this.setState({showConfirmDialog: false})}>
                        Confirma a exclusão deste lançamento?
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);