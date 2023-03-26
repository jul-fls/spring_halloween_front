document.addEventListener('DOMContentLoaded', () => {
    const loginTab = document.getElementById('login-tab')
    const registerTab = document.getElementById('register-tab')
    const loginForm = document.getElementById('login-form')
    const registerForm = document.getElementById('register-form')
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('bg-blue-500', 'text-white')
        registerTab.classList.remove('bg-blue-500', 'text-white')
        registerTab.classList.add('text-blue-500')
        loginForm.classList.remove('hidden')
        registerForm.classList.add('hidden')
    })
    registerTab.addEventListener('click', () => {
        registerTab.classList.add('bg-blue-500', 'text-white')
        loginTab.classList.remove('bg-blue-500', 'text-white')
        loginTab.classList.add('text-blue-500')
        registerForm.classList.remove('hidden')
        loginForm.classList.add('hidden')
    })
    loginForm.addEventListener('submit', e => {
        e.preventDefault()
        const email = document.getElementById('login-email').value
        const password = document.getElementById('login-password').value
        // Ajoutez ici le code pour soumettre les données de connexion via AJAX
    })
    registerForm.addEventListener('submit', e => {
        e.preventDefault()
        const email = document.getElementById('register-email').value
        const password = document.getElementById('register-password').value
        const confirmPassword = document.getElementById('register-confirm-password').value

        if (password !== confirmPassword) {
          alert('Les mots de passe ne correspondent pas.')
          return
        }
        // Ajoutez ici le code pour soumettre les données d'inscription via AJAX
    })
})  