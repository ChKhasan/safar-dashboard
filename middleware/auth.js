export default function ({ store, redirect, route }) {
  const publicPages = ["/admin/login"];
  const authpage = !publicPages.includes(route.path);
  if (!store.state.authenticated && authpage) redirect("/admin/login");
}
