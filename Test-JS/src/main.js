
const alumnes = [
    {id: 1, nom: 'Joan', nota: 8.5},
    {id: 1, nom: 'Pedro', nota: 4.4},
    {id: 1, nom: 'Luis', nota: 5.3}
]

console.log("llista d'alumnes")
console.table(alumnes)

const aprovats = alumnes.filter(a => a.nota >= 5);

console.log("llista d'aprovats")
console.table(aprovats)

aprovats.forEach(ap => console.log("ap:", ap.nom))

const label = document.getElementById("label");
let num = 0;

setInterval(()=> {
    num++;
    label.textContent = num;
},1000);

const {nom , nota} = alumnes[1];
console.log(`L'alumne ${nom} te una nota de ${nota}`);