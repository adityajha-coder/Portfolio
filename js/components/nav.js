export function renderNav(data) {
    const navName = document.getElementById('nav-name');
    if (navName) {
        navName.innerText = data.name.toUpperCase();
    }
}
