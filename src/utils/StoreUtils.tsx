import createNextState from 'immer'

// @ts-    
export const createReducer = (initialState, actionsMap) => {
    return (state = initialState, action: { type: string | number; }) => {
        return createNextState(state, (draft) => {
            const caseReducer = actionsMap[action.type];
            if (caseReducer) {
                return caseReducer(draft, action);
            }
            return draft;
        });
    };
};