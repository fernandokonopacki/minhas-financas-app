import React from 'react'
import { withRouter } from 'react-router-dom'

class LandingPage extends React.Component{

    goToHomePage = () => {
        this.props.history.push("/home")
    }

    render(){
        return(
            <div className="container text-cente">
                <h2>Bem Vindo ao Sistema Minhas Financas</h2>
                Este é seu sistema para controle de finaças pessoais,
                cloque no botão abaixo para acessar o sistem: <br />< br />

                <div className="offset-md-4 col-md-4">
                    <button style={{width: '100%'}} 
                        onClick={this.goToHomePage}
                       className="btn btn-success"
                       >
                        <i className="pi pi-sign-in"></i> Acessar
                    </button>
                </div>
            </div>
        )
    }
}

export default withRouter(LandingPage)