const initialState = {
  toggleView: false,
  toggleTheme: false,
};

const TOGGLED_VIEW = "TOGGLED_VIEW";
const TOGGLED_THEME = "TOGGLED_THEME";

export function toggledView(bool) {
  return {
    type: TOGGLED_VIEW,
    payload: bool,
  };
}

export function toggledTheme(bool) {
  return {
    type: TOGGLED_THEME,
    payload: bool,
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLED_VIEW:
      return {
        ...state,
        toggleView: action.payload,
      };
    case TOGGLED_THEME:
      return {
        ...state,
        toggleTheme: action.payload,
      };
    default:
      return state;
  }
}
