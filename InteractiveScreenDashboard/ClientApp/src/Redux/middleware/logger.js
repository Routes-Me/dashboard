const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching Action : ', action.type);
    let result = next(action);
    console.log('next state to update : ', store.getState());
    console.groupEnd();
    return result;
};

export default logger;