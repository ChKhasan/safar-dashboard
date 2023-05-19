export default function ({ store, redirect, route }) {
  const publicPages = ["galleries1"];
  const authpage = publicPages.includes(route.name);
  const token = localStorage.getItem("auth_token");
  // if (!store.state.authenticated && authpage) redirect("/admin/login");
  console.log(route.name);
  if (!token) redirect("/admin/login");
}
