import toastr from 'toastr'

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

export function mostrarMensagem(titulo, menssagem, tipo){
    toastr[tipo](menssagem, titulo)
}

export function menssagemErro(menssagem){
    mostrarMensagem('Erro', menssagem, 'error')
}


export function menssagemSucesso(menssagem){
    mostrarMensagem('Sucesso', menssagem, 'success')
}

export function menssagemAlerta(menssagem){
    mostrarMensagem('Alerta', menssagem, 'warning')
}