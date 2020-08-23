const initialState = {
  toggleView: false,
  toggleDark: true,
};

const TOGGLED_VIEW = "TOGGLED_VIEW";
const TOGGLED_DARK_THEME = "TOGGLED_DARK_THEME";

export function toggledView(bool) {
  return {
    type: TOGGLED_VIEW,
    payload: bool,
  };
}

export function toggledDarkTheme(bool) {
  return {
    type: TOGGLED_DARK_THEME,
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
    case TOGGLED_DARK_THEME:
      return {
        ...state,
        toggleDark: action.payload,
      };
    default:
      return state;
  }
}
