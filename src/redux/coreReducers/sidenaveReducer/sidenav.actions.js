import { sidenavActionTypes } from "./sidenav.actionTypes";

export const setItemHeigt = (selectedItem) => ({
  type: sidenavActionTypes.SET_ITEM_HEIGHT,
  payload: selectedItem,
});

export const selectItem = (selectedItem) => ({
  type: sidenavActionTypes.SELECT_ITEM,
  payload: selectedItem,
});
export const expandItem = (selectedItem) => ({
  type: sidenavActionTypes.EXPAND_ITEM,
  payload: selectedItem,
});
