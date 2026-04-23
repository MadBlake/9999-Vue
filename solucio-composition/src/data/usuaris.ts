export interface Usuari {
  id: number
  nom: string
  cognom: string
  email: string
  ciutat: string
  rol: string
}

export const USUARIS: Usuari[] = [
  { id: 1, nom: 'Anna',    cognom: 'Puig',  email: 'anna@exemple.cat',    ciutat: 'Barcelona', rol: 'Admin' },
  { id: 2, nom: 'Bernat',  cognom: 'Cases', email: 'bernat@exemple.cat',  ciutat: 'Girona',    rol: 'Editor' },
  { id: 3, nom: 'Carles',  cognom: 'Miró',  email: 'carles@exemple.cat',  ciutat: 'Lleida',    rol: 'Viewer' },
  { id: 4, nom: 'Dora',    cognom: 'Font',  email: 'dora@exemple.cat',    ciutat: 'Tarragona', rol: 'Editor' },
  { id: 5, nom: 'Eduard',  cognom: 'Mas',   email: 'eduard@exemple.cat',  ciutat: 'Manresa',   rol: 'Viewer' },
  { id: 6, nom: 'Fina',    cognom: 'Costa', email: 'fina@exemple.cat',    ciutat: 'Mataró',    rol: 'Admin' },
]
