// correct numbers are displayed, but readability discreased

for(var i = 1; i <= 6; i++) {
    document.getElementById('button-' + i)
        .addEventListener('click', (function (msg) {
            return function() {
                alert(msg);
            };
        })(i));
}
