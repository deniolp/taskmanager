const Provider = class {
  constructor({api}) {
    this._api = api;
  }

  getTasks() {
    return this._api.getTasks();
  }

  createTask({task}) {
    return this._api.createTask({task});
  }

  updateTask({id, data}) {
    return this._api.updateTask({id, data});
  }

  deleteTask({id}) {
    return this._api.deleteTask({id});
  }
};

export {Provider};
