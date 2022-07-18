let calc = {
    value1: '',
    value2: '',
    sign: '',
    result_on_display: '',
    memory: '',
}


let finalResult = (input_number_1, input_number_2) => {

    switch (calc.sign) {
        case '-':
            result_on_display = input_number_1 - input_number_2;
            break;
        case '+':
            result_on_display = input_number_1 + input_number_2;
            break;
        case '*':
            result_on_display = input_number_1 * input_number_2;
            break;
        case '/':
            if (input_number_2 === 0) {
                result_on_display = 'Помилка, спробуйте ще раз';
            } else {
                result_on_display = input_number_1 / input_number_2;
            }

            break;
    }

    return result_on_display;
}



let clearCalc = () => {
    calc.value1 = '';
    calc.value2 = '';
    calc.sign = '';
    calc.result_on_display = '';
}

let show = (value, el) => {
    el.value = value;
}

window.addEventListener('DOMContentLoaded', () => {
    let btn = document.querySelector('.keys');
    let display = document.querySelector('.result');
    let element_m_show = document.createElement('div');

    btn.addEventListener('click', function (e) {
        if (e.target.classList.contains('black')) {

            if (calc.value2 === '' && calc.sign === '') {
                if (display.value == calc.result_on_display && calc.value2 == '' && calc.sign == '') {
                    calc.value1 = '';
                    calc.result_on_display = '';
                }

                calc.value1 += e.target.value;

                if (e.target.value === '.') {
                    calc.value1 = '0.';
                }

                show(calc.value1, display);
            }

            if (calc.value1 !== '' && calc.sign !== '') {
                calc.value2 += e.target.value;

                if (e.target.value === '.') {
                    calc.value2 = '0.';
                }
                
                show(calc.value2, display);
            }

            if (e.target.value === 'C') {
                display.value = '';
                clearCalc();
            }

        }

        if (e.target.classList.contains('pink')) {
            calc.sign = e.target.value;
        }

        if (e.target.value === '=') {
            calc.result_on_display = finalResult(Number(calc.value1), Number(calc.value2), calc.sign);
            calc.value1 = calc.result_on_display;
            calc.value2 = '';
            calc.sign = '';
            show(calc.result_on_display, display);
        }

        if (e.target.value === 'm+') {
            calc.memory = display.value;
            element_m_show.style.color = 'black';
            element_m_show.style.position = 'relative';
            element_m_show.style.left = '8px';
            element_m_show.style.bottom = '25px';
            element_m_show.style.fontWeight = 'bolder';
            element_m_show.innerHTML = 'm';
            display.after(element_m_show);
        }

        if (e.target.value === 'mrc') {
            show(calc.memory, display);
            if(display.value !== '') {
                calc.result_on_display = '';
                calc.value1 = '';
                calc.value2 = '';
            }
        }

        if (e.target.value === 'm-') {
            calc.memory = '';
            element_m_show.remove();
        }
    })
})