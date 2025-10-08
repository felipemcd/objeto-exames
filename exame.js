var Weight = /** @class */ (function () {
    function Weight(pesos) {
        this.pesos = pesos;
    }
    Weight.prototype.getPesos = function () {
        return this.pesos;
    };
    Weight.prototype.getTotalPeso = function () {
        return this.pesos.reduce(function (acc, p) { return acc + p; }, 0);
    };
    return Weight;
}());
var Answer = /** @class */ (function () {
    function Answer(nome, respostas) {
        this.nome = nome;
        this.respostas = respostas;
    }
    Answer.prototype.getNome = function () {
        return this.nome;
    };
    Answer.prototype.getRespostas = function () {
        return this.respostas;
    };
    return Answer;
}());
var Exam = /** @class */ (function () {
    function Exam(answer, weight) {
        this.exams = [];
        this.answer = answer;
        this.weight = weight;
    }
    Exam.prototype.add = function (exam) {
        this.exams.push(exam);
    };
    Exam.prototype.calcularNota = function (aluno) {
        var respostasOficiais = this.answer.getRespostas();
        var respostasAluno = aluno.getRespostas();
        var pesos = this.weight.getPesos();
        var total = 0;
        var totalPeso = this.weight.getTotalPeso();
        for (var i = 0; i < respostasOficiais.length; i++) {
            if (respostasAluno[i] === respostasOficiais[i]) {
                total += pesos[i];
            }
        }
        return (total / totalPeso) * 10;
    };
    Exam.prototype.avg = function () {
        var _this = this;
        var notas = this.exams.map(function (a) { return _this.calcularNota(a); });
        this.exams.forEach(function (aluno, idx) {
            console.log("Aluno: ".concat(aluno.getNome(), " - Nota: ").concat(notas[idx].toFixed(1)));
        });
        var soma = notas.reduce(function (acc, n) { return acc + n; }, 0);
        var media = soma / notas.length;
        return media;
    };
    Exam.prototype.min = function (count) {
        var _this = this;
        var resultados = this.exams.map(function (a) { return [a.getNome(), _this.calcularNota(a)]; });
        return resultados.sort(function (a, b) { return a[1] - b[1]; }).slice(0, count);
    };
    Exam.prototype.max = function (count) {
        var _this = this;
        var resultados = this.exams.map(function (a) { return [a.getNome(), _this.calcularNota(a)]; });
        return resultados.sort(function (a, b) { return b[1] - a[1]; }).slice(0, count);
    };
    Exam.prototype.lt = function (limit) {
        var _this = this;
        return this.exams
            .map(function (a) { return [a.getNome(), _this.calcularNota(a)]; })
            .filter(function (_a) {
            var _ = _a[0], nota = _a[1];
            return nota < limit;
        });
    };
    Exam.prototype.gt = function (limit) {
        var _this = this;
        return this.exams
            .map(function (a) { return [a.getNome(), _this.calcularNota(a)]; })
            .filter(function (_a) {
            var _ = _a[0], nota = _a[1];
            return nota > limit;
        });
    };
    return Exam;
}());
var pesos = new Weight([2, 2, 2, 2, 2]);
var gabarito = new Answer("Gabarito", ["a", "b", "a", "c", "d"]);
var prova = new Exam(gabarito, pesos);
prova.add(new Answer("Chico", ["c", "e", "a", "b", "b"]));
prova.add(new Answer("Maria", ["a", "b", "a", "c", "d"]));
prova.add(new Answer("Felipe", ["a", "b", "b", "c", "d"]));
console.log("=== RESULTADOS DA PROVA ===");
console.log(" Menores notas:");
prova.min(1).forEach(function (_a) {
    var nome = _a[0], nota = _a[1];
    return console.log(" - ".concat(nome, ": ").concat(nota));
});
console.log("\n Maiores notas:");
prova.max(2).forEach(function (_a) {
    var nome = _a[0], nota = _a[1];
    return console.log(" - ".concat(nome, ": ").concat(nota));
});
console.log("\n Notas menores que 5:");
prova.lt(5).forEach(function (_a) {
    var nome = _a[0], nota = _a[1];
    return console.log(" - ".concat(nome, ": ").concat(nota));
});
console.log("\n Notas maiores que 7:");
prova.gt(7).forEach(function (_a) {
    var nome = _a[0], nota = _a[1];
    return console.log(" - ".concat(nome, ": ").concat(nota));
});
console.log("\n Média das notas:", prova.avg().toFixed(2));
