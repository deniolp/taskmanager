const Provider = class {
  constructor({api, store}) {
    this._api = api;
    this._store = store;
  }

  getTasks() {
    return this._api.getTasks()
    .then((tasks) => {
      tasks.map((it) => this._store.setItem({key: it.id, item: it.toRAW()}));
      return tasks;
    });
  }

  createTask({task}) {
    return this._api.createTask({task})
    .then((item) => {
      this._store.setItem({key: item.id, item: item.toRAW()});
      return task;
    });
  }

  updateTask({id, data}) {
    return this._api.updateTask({id, data})
    .then((task) => {
      this._store.setItem({key: task.id, item: task.toRAW()});
      return task;
    });
  }

  deleteTask({id}) {
    return this._api.deleteTask({id})
    .then(() => {
      this._store.removeItem({key: id});
    });
  }
};

export {Provider};
