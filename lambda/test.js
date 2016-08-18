var api = require('./index');

const lambdaContextSpy = {
  done: function(e, result) {
    console.log(result)
  }
}

const requestObject = {
  context: {
    path: '/vehicles-for-agency/{agencyId}',
    method: 'GET',
  },
  pathParams: {
    agencyId: 1
  }
};

api.router(requestObject, lambdaContextSpy)
