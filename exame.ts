class Weight {
  private pesos: number[];

  constructor(pesos: number[])   {
    this.pesos = pesos;
   }

  getPesos(): number[]  {
    return this.pesos;
   }

  getTotalPeso(): number {
    return this.pesos.reduce((acc, p) => acc + p, 0);
  }
}

class Answer {
  private nome: string;
  private respostas: string[];

  constructor(nome: string, respostas: string[]) {
    this.nome = nome;
    this.respostas = respostas;
  }

  getNome(): string {
    return this.nome;
  }

  getRespostas(): string[] {
    return this.respostas;
  }
}

class Exam {
  private weight: Weight;
  private answer: Answer; 
  private exams: Answer[] = []; 

  constructor(answer: Answer, weight: Weight) {
    this.answer = answer;
    this.weight = weight;
  }

  add(exam: Answer): void {
    this.exams.push(exam);
  }

  private calcularNota(aluno: Answer): number {
    const respostasOficiais = this.answer.getRespostas();
    const respostasAluno = aluno.getRespostas();
    const pesos = this.weight.getPesos();

    let total = 0;
    let totalPeso = this.weight.getTotalPeso();

    for (let i = 0; i < respostasOficiais.length; i++) {
      if (respostasAluno[i] === respostasOficiais[i]) {
        total += pesos[i];
      }
    }

    return (total / totalPeso) * 10;
  }

  avg(): number {

    const notas = this.exams.map(a => this.calcularNota(a));

    this.exams.forEach((aluno, idx) => {
      console.log(`Aluno: ${aluno.getNome()} - Nota: ${notas[idx].toFixed(1)}`);
    });

    const soma = notas.reduce((acc, n) => acc + n, 0);
    const media = soma / notas.length;
    return media;
  }
  min(count: number): Array<[string, number]> {
    const resultados = this.exams.map(a => [a.getNome(), this.calcularNota(a)] as [string, number]);
    return resultados.sort((a, b) => a[1] - b[1]).slice(0, count);
  }

  max(count: number): Array<[string, number]> {
    const resultados = this.exams.map(a => [a.getNome(), this.calcularNota(a)] as [string, number]);
    return resultados.sort((a, b) => b[1] - a[1]).slice(0, count);
  }

  lt(limit: number): Array<[string, number]> {
    return this.exams
      .map(a => [a.getNome(), this.calcularNota(a)] as [string, number])
      .filter(([_, nota]) => nota < limit);
  }

  gt(limit: number): Array<[string, number]> {
    return this.exams
      .map(a => [a.getNome(), this.calcularNota(a)] as [string, number])
      .filter(([_, nota]) => nota > limit);
  }
}



const pesos = new Weight([2, 2, 2, 2, 2]);
const gabarito = new Answer("Gabarito", ["a", "b", "a", "c", "d"]);

const prova = new Exam(gabarito, pesos);

prova.add(new Answer("Chico", ["c", "e", "a", "b", "b"])); 
prova.add(new Answer("Maria", ["a", "b", "a", "c", "d"])); 
prova.add(new Answer("Felipe", ["a", "b", "b", "c", "d"])); 

prova.avg();

console.log("Menores notas:", prova.min(1));
console.log("Maiores notas:", prova.max(2));
console.log("Notas menores que 5:", prova.lt(5));
console.log("Notas maiores que 7:", prova.gt(7));
console.log("Média das notas:", prova.avg());

