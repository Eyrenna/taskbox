// A simple redux store/actions/reducer implementation.
// A true app would be more complex and separated into different files.
import { createStore } from 'redux';

//----------------------------ACCIONES-----------------------------------
// The actions are the "names" of the changes that can happen to the store
/*Las acciones son objetos planos que describimos en un type, normalmente, como una string constante
  que describe QUÉ pasa en esa acción*/
export const actions = {
  ARCHIVE_TASK: 'ARCHIVE_TASK',
  PIN_TASK: 'PIN_TASK',
};

//-----------------------CREADORES DE ACCIONES---------------------------
// The action creators bundle actions with the data required to execute them
export const archiveTask = id => ({ type: actions.ARCHIVE_TASK, id });
export const pinTask = id => ({ type: actions.PIN_TASK, id });

//-----------------------------REDUCERS---------------------------------
/*Los reducers describen CÓMO ha cambiado el estado. El reducer es una función pura que toma el estado anterior 
y una acción, y devuelve en nuevo estado.*/
// All our reducers simply change the state of a single task.
function taskStateReducer(taskState) { //reducer simple
  return (state, action) => {
    return {
      ...state,
      tasks: state.tasks.map(task =>
        task.id === action.id ? { ...task, state: taskState } : task
      ),
    };
  };
}

// The reducer describes how the contents of the store change for each action
export const reducer = (state, action) => { //reducer "combinado"
  switch (action.type) {
    case actions.ARCHIVE_TASK:
      return taskStateReducer('TASK_ARCHIVED')(state, action);
    case actions.PIN_TASK:
      return taskStateReducer('TASK_PINNED')(state, action);
    default:
      return state;
  }
};

/*El Store es el objeto que los reúne. El store tiene las siguientes responsabilidades:

  - Contiene el estado de la aplicación;
  - Permite el acceso al estado via 'getState()';
  - Permite que el estado sea actualizado via 'dispatch(action)';
  - Registra los listeners via 'subscribe(listener)';
  - Maneja la anuliación del registro de los listeners via el retorno de la función de 'subscribe(listener)'.
Es importante destacar que sólo tendrás un store en una aplicación Redux. Cuando desees dividir la lógica 
para el manejo de datos, usarás composición de reductores en lugar de muchos stores*/

// The initial state of our store when the app loads.
// Usually you would fetch this from a server
const defaultTasks = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' },
];

// We export the constructed redux store
export default createStore(reducer, { tasks: defaultTasks });