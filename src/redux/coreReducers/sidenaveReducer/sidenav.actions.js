import { sidenavActionTypes } from "./sidenav.actionTypes";

export const setItemHeigt = (selectedItem) => ({
  type: sidenavActionTypes.SET_ITEM_HEIGHT,
  payload: selectedItem,
});

export const selectItem = (selectedItem) => {
  return {
    type: sidenavActionTypes.SELECT_ITEM,
    payload: selectedItem,
  };
};
export const selectSubItem = (parentItem, selectedSubItem) => ({
  type: sidenavActionTypes.SELECT_SUBITEM,
  payload: { parentItem, selectedSubItem },
});

export const selectItemByUrl = (url) => {
  return {
    type: sidenavActionTypes.SELECT_ITEM_BY_URL,
    payload: url,
  };
};
export const navCollapse = () => ({
  type: sidenavActionTypes.COLLAPSE,
});
export const expandItem = (selectedItem) => ({
  type: sidenavActionTypes.EXPAND_ITEM,
  payload: selectedItem,
});
