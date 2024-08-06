function calcularPromedio() {
    const golesInput = prompt('Introduce los goles anotados en cada partido (separados por comas):');
    if (golesInput === null) {
      alert('Operación cancelada.');
      return;
    }
    const golesArray = golesInput.split(',').map(gole => parseFloat(gole.trim()));
    const todosSonNumeros = golesArray.every(gole => !isNaN(gole));
    if (!todosSonNumeros || golesArray.length === 0) {
      alert('Por favor, ingresa solo números separados por comas.');
      return;
    }
    let sumaGoles = 0;
    for (let i = 0; i < golesArray.length; i++) {
      sumaGoles += golesArray[i];
    }
    const promedio = sumaGoles / golesArray.length;
    alert(`El promedio de goles por partido es: ${promedio.toFixed(2)}`);
  } 