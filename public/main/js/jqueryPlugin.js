$('#wizard-example').steps({
    headerTag: 'h3',
    bodyTag: 'section',
    autoFocus: true,
    titleTemplate: '<span class="wizard-index">#index#</span> #title#',
    onStepChanging: function (event, currentIndex, newIndex) {
        console.log('event: ', event)
        console.log('currentIndex: ', currentIndex)
        console.log('newIndex: ', newIndex)
        if (currentIndex < newIndex) {
            var form = document.getElementById('form1'),
                form2 = document.getElementById('form2');

            if (currentIndex === 0) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                    form.classList.add('was-validated');
                } else {
                    return true;
                }
            } else if (currentIndex === 1) {
                if (form2.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                    form2.classList.add('was-validated');
                } else {
                    return true
                }

            } else {
                return true;
            }
            
        } else {
            return `<span class="wizard-index">#index#</span>`;
        }
    }
});