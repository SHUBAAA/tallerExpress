function validarRut(rut) {
    rut = rut.replace(/[^0-9kK]/g, '');
    if (rut.length < 2) {
        return false;
    }
    var dv = rut.charAt(rut.length - 1);
    var rutBody = rut.slice(0, -1);
    var suma = 0;
    var multiplicador = 2;
    for (var i = rutBody.length - 1; i >= 0; i--) {
        suma += parseInt(rutBody.charAt(i)) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    var resto = suma % 11;
    var dvCalculado = 11 - resto === 10 ? 'K' : (11 - resto).toString();
    return dv === dvCalculado;
}

export default validarRut