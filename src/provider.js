import ModelTask from './model-task';

const objectToArray = (obj) => {
  return Object.keys(obj).map((id) => obj[id]);
};

const Provider = class {
  constructor({api, store, generatedId}) {
    this._api = api;
    this._store = store;
    this._generatedId = generatedId;
    this._needSync = false;
  }

  getTasks() {
    if (this._isOnline()) {
      return this._api.getTasks()
    .then((tasks) => {
      tasks.map((it) => this._store.setItem({key: it.id, item: it.toRAW()}));
      return tasks;
    });
    } else {
      const rawTaskMap = this._store.getAll();
      const rawTasks = objectToArray(rawTaskMap);
      const tasks = ModelTask.parseTasks(rawTasks);

      return Promise.resolve(tasks);
    }
  }

  createTask({task}) {
    if (this._isOnline()) {
      return this._api.createTask({task})
    .then((item) => {
      this._store.setItem({key: item.id, item: item.toRAW()});
      return task;
    });
    } else {
      task.id = this._generatedId;
      this._needSync = true;

      this._store.setItem({key: task.id, item: task});
      return Promise.resolve(ModelTask.parseTask(task));
    }
  }

  updateTask({id, data}) {
    if (this._isOnline()) {
      return this._api.updateTask({id, data})
    .then((task) => {
      this._store.setItem({key: task.id, item: task.toRAW()});
      return task;
    });
    } else {
      const task = data;
      this._needSync = true;
      this._store.setItem({key: task.id, item: task});
      return Promise.resolve(ModelTask.parseTask(task));
    }
  }

  deleteTask({id}) {
    if (this._isOnline()) {
      return this._api.deleteTask({id})
    .then(() => {
      this._store.removeItem({key: id});
    });
    } else {
      this._needSync = true;
      this._store.removeItem({key: id});
      return Promise.resolve(true);
    }
  }

  _isOnline() {
    return window.navigator.onLine;
  }
};

export {Provider};
