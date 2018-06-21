// unexpected outcome, "7" is displayed regardless of which button was clicked
// https://stackoverflow.com/questions/762011/whats-the-difference-between-using-let-and-var-to-declare-a-variable-in-jav

for(var i = 1; i <= 6; i++) {
    document.getElementById('button-' + i)
        .addEventListener('click', function () {
            alert(i);
        }
);
}
