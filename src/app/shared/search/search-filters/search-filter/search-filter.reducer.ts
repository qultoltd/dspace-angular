import {
  SearchFilterAction,
  SearchFilterActionTypes,
  SearchFilterInitializeAction,
} from './search-filter.actions';

/**
 * Interface that represents the state for a single filters
 */
export interface SearchFilterState {
  filterCollapsed: boolean;
  minimized: boolean;
  page: number;
}

/**
 * Interface that represents the state for all available filters
 */
export interface SearchFiltersState {
  [name: string]: SearchFilterState;
}

const initialState: SearchFiltersState = Object.create(null);

/**
 * Performs a search filter action on the current state
 * @param {SearchFiltersState} state The state before the action is performed
 * @param {SearchFilterAction} action The action that should be performed
 * @returns {SearchFiltersState} The state after the action is performed
 */
export function filterReducer(state: SearchFiltersState = initialState, action: SearchFilterAction): SearchFiltersState {

  switch (action.type) {

    case SearchFilterActionTypes.INITIALIZE: {
      const initAction = (action as SearchFilterInitializeAction);
      return Object.assign({}, state, {
        [action.filterName]: {
          filterCollapsed: !initAction.initiallyExpanded,
          minimized: false,
          page: 1,
        } as SearchFilterState,
      });
    }

    case SearchFilterActionTypes.COLLAPSE: {
      return Object.assign({}, state, {
        [action.filterName]: {
          filterCollapsed: true,
          minimized: state[action.filterName].minimized,
          page: state[action.filterName].page,
        } as SearchFilterState,
      });
    }

    case SearchFilterActionTypes.EXPAND: {
      return Object.assign({}, state, {
        [action.filterName]: {
          filterCollapsed: false,
          minimized: state[action.filterName].minimized,
          page: state[action.filterName].page,
        } as SearchFilterState,
      });
    }

    case SearchFilterActionTypes.DECREMENT_PAGE: {
      const page = state[action.filterName].page - 1;
      return Object.assign({}, state, {
        [action.filterName]: {
          filterCollapsed: state[action.filterName].filterCollapsed,
          minimized: state[action.filterName].minimized,
          page: (page >= 1 ? page : 1),
        } as SearchFilterState,
      });
    }

    case SearchFilterActionTypes.INCREMENT_PAGE: {
      return Object.assign({}, state, {
        [action.filterName]: {
          filterCollapsed: state[action.filterName].filterCollapsed,
          minimized: state[action.filterName].minimized,
          page: state[action.filterName].page + 1,
        } as SearchFilterState,
      });
    }

    case SearchFilterActionTypes.MINIMIZE_ALL: {
      return  Object.assign({}, ...Object.entries(state).map(([key, value]) => ({ [key]: { ...value, minimized: true } })));
    }

    case SearchFilterActionTypes.RESET_PAGE: {
      return Object.assign({}, state, {
        [action.filterName]: {
          filterCollapsed: state[action.filterName].filterCollapsed,
          minimized: false,
          page: 1,
        } as SearchFilterState,
      });
    }

    case SearchFilterActionTypes.TOGGLE: {
      return Object.assign({}, state, {
        [action.filterName]: {
          filterCollapsed: !state[action.filterName].filterCollapsed,
          minimized: state[action.filterName].minimized,
          page: state[action.filterName].page,
        } as SearchFilterState,
      });
    }

    default: {
      return state;
    }
  }
}
