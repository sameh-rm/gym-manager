import { sidenavActionTypes } from "./sidenav.actionTypes";
import { sidebarItems } from "./sidebar_items";

const initState = {
  sidebarItems: sidebarItems,
  location: "/",
};
const expandItem = (sidebarItems, selectedItem) => {
  return sidebarItems.map((item) =>
    item.title === selectedItem
      ? { ...item, expanded: !item.expanded }
      : { ...item, expanded: false }
  );
};

const selectItemByUrl = (sidebarItems, url) => {
  return sidebarItems.map((item) => {
    if (item.url === url) {
      return { ...item, selected: true };
    } else {
      console.log(url);
      if (item.subitems) {
        return {
          ...item,
          subitems: item.subitems.map((subitem) =>
            subitem.url === url
              ? { ...subitem, selected: true }
              : { ...subitem, selected: false }
          ),
        };
      }
      return { ...item, selected: false };
    }
  });
};
const selectItem = (sidebarItems, selectedItem) => {
  return sidebarItems.map((item) =>
    item.title === selectedItem
      ? { ...item, selected: true }
      : { ...item, selected: false }
  );
};

const selectSubItem = (sidebarItems, payload) => {
  return sidebarItems.map((item) =>
    item.title === payload.parentItem
      ? {
          ...item,
          subitems: item.subitems.map((subitem) =>
            subitem.title === payload.selectedSubItem
              ? { ...subitem, selected: true }
              : { ...subitem, selected: false }
          ),
        }
      : {
          ...item,
          selected: false,

          subitems: item.subitems
            ? item.subitems.map((subitem) => {
                const x = {
                  ...subitem,
                  selected: false,
                };
                return x;
              })
            : undefined,
        }
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
      return {
        ...state,
        sidebarItems: expandItem(state.sidebarItems, action.payload),
      };
    case sidenavActionTypes.SELECT_ITEM:
      return {
        ...state,
        sidebarItems: selectItem(state.sidebarItems, action.payload),
      };
    case sidenavActionTypes.SELECT_SUBITEM:
      return {
        ...state,

        sidebarItems: selectSubItem(state.sidebarItems, action.payload),
      };
    case sidenavActionTypes.SELECT_ITEM_BY_URL:
      return {
        ...state,
        location: action.payload,
        sidebarItems: selectItemByUrl(state.sidebarItems, action.payload),
      };
    case sidenavActionTypes.SET_ITEM_HEIGHT:
      return {
        ...state,
        sidebarItems: setItemHeight(state.sidebarItems, action.payload),
      };

    case sidenavActionTypes.COLLAPSE:
      return {
        ...state,
        collapse: !state.collapse,
      };
    default:
      return state;
  }
};
