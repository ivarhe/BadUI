
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('birdButton');
    const formContainer = document.getElementById('formContainer');

    button.addEventListener('click', () => {
        if (formContainer.classList.contains('hidden')) {
            formContainer.classList.remove('hidden');
        } else {
            formContainer.classList.add('hidden');
        }
    });
});
