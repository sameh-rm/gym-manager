import { sidenavActionTypes } from "./sidenav.actionTypes";
import { sidebarItems } from "./sidebar_items";

const initState = {
  sidebarItems: sidebarItems,
};
const expandItem = (sidebarItems, selectedItem) => {
  console.log("selected Item", selectedItem);
  return sidebarItems.map((item) =>
    item.title === selectedItem
      ? { ...item, expanded: !item.expanded }
      : { ...item, expanded: false }
  );
};

const selectItem = (sidebarItems, selectedItem) => {
  return sidebarItems.map((item) =>
    item.title === selectedItem
      ? { ...item, selected: true }
      : { ...item, selected: false }
  );
};

const setItemHeight = (sidebarItems, selectedItem) => {
  const sideItems = sidebarItems.map((item) =>
    item.title === selectedItem.title
      ? { ...item, height: selectedItem.height, expanded: false }
      : item
  );

  return sideItems;
};

export const sidenavReducer = (state = initState, action) => {
  switch (action.type) {
    case sidenavActionTypes.EXPAND_ITEM:
      return { sidebarItems: expandItem(state.sidebarItems, action.payload) };
    case sidenavActionTypes.SELECT_ITEM:
      return { sidebarItems: selectItem(state.sidebarItems, action.payload) };
    case sidenavActionTypes.SET_ITEM_HEIGHT:
      return {
        sidebarItems: setItemHeight(state.sidebarItems, action.payload),
      };
    default:
      return state;
  }
};
