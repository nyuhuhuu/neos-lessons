// expected behaviour

for (let i = 1; i <= 6; i++) {
    document.getElementById('button-' + i)
        .addEventListener('click', function() {
            alert(i);
        });
}
