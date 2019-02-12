const initialData = {
  todos: {
    '1': { id: 1, name: 'Hello world!', date: '2019-02-03', order: 0 },
    '2': { id: 2, name: 'Genesis 6', date: '2019-02-03', order: 1 },
    '3': { id: 3, name: '3rd todo', date: '2019-02-02', order: 0 }
  },
  todoLists: {
    '2019-02-03': {
      date: '2019-02-03',
      todoIds: [1, 2]
    },
    '2019-02-02': {
      date: '2019-02-02',
      todoIds: [3]
    }
  }
}

export default initialData
