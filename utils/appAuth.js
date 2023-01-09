
/**
 * Middleware que valida que el usuario este logeado para algunas transacciones
 * esto tambien puede ser validado en cada endPoint necesario
 */
const appAuth = (request, response, next) => {
    if (!request.session.userid) {
      response.redirect('/api/users/login');
    } else {
      next();
    }
  };
  
module.exports = appAuth;