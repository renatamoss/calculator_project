const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]')

let novoNumero = true; //zera o display
let numeroAnterior; //número anterior ao operador
let operador;


//calcular
//parseFloat: transforma string em número
//replace troca ',' por '.'
const operacaoPendente = () => operador !== undefined;

const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',', '.'));
        novoNumero = true;
        if (operador == '+') {
            atualizarDisplay(numeroAnterior + numeroAtual);
        } else if (operador == '-') {
            atualizarDisplay(numeroAnterior - numeroAtual);
        } else if (operador == '*') {
            atualizarDisplay(numeroAnterior * numeroAtual);
        } else if (operador == '/') {
            atualizarDisplay(numeroAnterior / numeroAtual);
        }
    }
}

//atualizar o display
//se número novo(zera antes) senão concatena com número anterior
//toLocaleString: retorna o símbolo usado no decimal BR ','
//forEach: método q executa a função callback(numero.addEventListener) para cada elemento numero(varre a array)
//callback: função (inserirNumero) passada como um argumento de outra(numero)
//addEventListener: configura p/ função numero o evento 'click' 
const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else {
        display.textContent += texto.toLocaleString('BR');
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

numeros.forEach(numero => numero.addEventListener('click', inserirNumero));

//seleciona operador
//só executa se não for novo número
//valor da variável operador: função callback operador após evento click 
//valor da variável numeroAnterior: guarda o que está no display, transforma string em número e troca ',' por '.'
const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',', '.'));
    }
}

operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

//igual
const ativarIgual = () => {
    calcular();
    operador = undefined;
    novoNumero = true;
}

document.getElementById('igual').addEventListener('click', ativarIgual);

//tecla CE limpar display
const limparDisplay = () => display.textContent = '';

document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

//tecla C limpar cálculo(memória)
const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}

document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

//tecla << backspace
//slice: método string: retorna conforme parâmetro()
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);

document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

//inverter sinal
const inverterSinal = () => display.textContent = display.textContent * -1;

document.getElementById('inverter').addEventListener('click', inverterSinal);

//decimal vírgula
//indexOf: método string: busca no conteúdo o caracter retorna posição caso contrário -1
//length: método string: busca no conteúdo comprimento string 
const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizarDisplay(',');
        } else {
            atualizarDisplay('0,');
        }
    }
}

document.getElementById('decimal').addEventListener('click', inserirDecimal);

//mapeamento para entrada dos números do teclado
//criando objeto:
const mapaTeclado = {
    '0': 'tecla0',
    '1': 'tecla1',
    '2': 'tecla2',
    '3': 'tecla3',
    '4': 'tecla4',
    '5': 'tecla5',
    '6': 'tecla6',
    '7': 'tecla7',
    '8': 'tecla8',
    '9': 'tecla9',
    '/': 'splitOperator',
    '*': 'operatorMultiply',
    '-': 'operatorSubtract',
    '+': 'operatorAdd',
    '=': 'igual',
    'Enter': 'igual',
    'Backspace': 'backspace',
    'c': 'clearDisplay',
    'Escape': 'cleanCalculation',
    ',': 'decimal'
}

//evento na tecla key
//evento keydown: é disparado quando uma tecla é pressionada
//teclaPermitida: Object.keys(mapaTeclado).indexOf: varre objeto para retornar somente tecla permitida
//se (mapaTeclado[tecla]) for teclaPermitida dispara click()
const mapearTEclado = (evento) => {
    const tecla = evento.key;

    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;

    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
}
document.addEventListener('keydown', mapearTEclado);

//dark_mode
const button_dark_mode = document.getElementById('button_dark_mode');
const container = document.getElementById('container');
const title_calculator = document.getElementById('title_calculator');
const title_by = document.getElementById('title_by');

const alterarCor = () => {

    if (container.style.backgroundColor != 'black') {
        container.style.backgroundColor = 'black';

        title_calculator.style.color = 'white';
        title_by.style.color = 'white';

        button_dark_mode.innerText = 'White Mode'
    } else {
        container.style.backgroundColor = 'white';

        title_calculator.style.color = 'black';
        title_by.style.color = 'black';    

        button_dark_mode.innerText = 'Dark Mode'   
    }
}

document.getElementById('button_dark_mode').addEventListener('click', alterarCor);



