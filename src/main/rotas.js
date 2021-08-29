import React from 'react'

import Login from '../views/login'
import Home from '../views/home'
import CadastroUsuario from '../views/cadastroUsuario'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import CadastroLancamento from '../views/lancamentos/cadastro-lancamento'
import LandingPage from '../views/landingPage'
import { AuthConsumer } from './provedorDeAutenticacao'

import {Route, Switch, HashRouter, Redirect} from 'react-router-dom'

function RotaAutenticada({component: Component, isUsuarioAutenticado, ...props}){ //{...nome} = spread Operator
    return(                    
        <Route exact {...props} render={(componentProps) => {
            if(isUsuarioAutenticado){
                return(
                    <Component {...componentProps} />
                )
            }else{
                return (
                    <Redirect to={{pathname: '/login', state: {from: componentProps.location}}}/>
                )
            }
        }} />            
    )
}

function Rotas(props){
    return(
        <HashRouter>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/login" component={Login} />  
                <Route exact path="/cadastroUsuario" component={CadastroUsuario}  /> 

                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />                                  
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos}  />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamento/:id?" component={CadastroLancamento}  />
            </Switch>
        </HashRouter>
    )
}



export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado}/>) }
    </AuthConsumer>
)