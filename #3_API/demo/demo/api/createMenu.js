export default function createMenu(items, option = { type: "contextmenu" }) {
  const menu = new nw.Menu(option);
  items.forEach((item) => {
    if (item.submenu) item.submenu = createMenu(item.submenu);
    menu.append(new nw.MenuItem(item));
  });
  return menu;
}
