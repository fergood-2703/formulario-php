document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.querySelector('.contact-form');
    const successMessage = document.getElementById('success-message');

    // 1. Manejo del envío del formulario (Validaciones)
    form.addEventListener('submit', function(event) {
        let esValido = true;
        
        // Funciones auxiliares visuales
        const setError = (input) => {
            input.closest('.form-group').classList.add('error');
        };

        const setSuccess = (input) => {
            input.closest('.form-group').classList.remove('error');
        };

        // --- VALIDACIONES ---

        // Nombre
        const nombre = document.getElementById('nombre');
        if (nombre.value.trim() === '') {
            setError(nombre);
            esValido = false;
        } else {
            setSuccess(nombre);
        }

        // Apellido
        const apellido = document.getElementById('apellido');
        if (apellido.value.trim() === '') {
            setError(apellido);
            esValido = false;
        } else {
            setSuccess(apellido);
        }

        // Email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '' || !emailRegex.test(email.value)) {
            setError(email);
            esValido = false;
        } else {
            setSuccess(email);
        }

        // Radio Buttons (Consulta)
        const consultaMarcada = document.querySelector('input[name="tipo-consulta"]:checked');
        const grupoConsulta = document.querySelector('.radio-group').closest('.form-group');
        
        if (!consultaMarcada) {
            grupoConsulta.classList.add('error');
            esValido = false;
        } else {
            grupoConsulta.classList.remove('error');
        }

        // Mensaje
        const mensaje = document.getElementById('mensaje');
        if (mensaje.value.trim() === '') {
            setError(mensaje);
            esValido = false;
        } else {
            setSuccess(mensaje);
        }

        // Checkbox (Consentimiento)
        const consentimiento = document.getElementById('consentimiento');
        // El checkbox está dentro de .checkbox-wrapper, y este dentro de .form-group
        const grupoCheckbox = consentimiento.closest('.form-group');
        
        if (!consentimiento.checked) {
            grupoCheckbox.classList.add('error');
            esValido = false;
        } else {
            grupoCheckbox.classList.remove('error');
        }

        // Si hay errores, DETENER el envío
        if (!esValido) {
            event.preventDefault();
        }
    });

    // 2. Manejo del Mensaje de Éxito (Si vuelve de PHP)
    const params = new URLSearchParams(window.location.search);
    if (params.get('status') === 'success') {
        successMessage.classList.remove('hidden');
        successMessage.style.display = 'block';
        
        // Limpiar la URL para que no salga el mensaje si recarga
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Opcional: Ocultar después de 5 segundos
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
});