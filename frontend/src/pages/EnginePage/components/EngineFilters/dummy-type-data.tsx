import { DropdownStringOption, DropdownNumberOption } from '../../../../shared/types/filters.type';

export const sortOptions: DropdownStringOption[] = [
  { value: 'ASC', label: 'Marque croissante' },
  {
    value: 'DESC',
    label: 'Marque décroissante',
  },
];

export const categoryOptions = [
  {
    label: 'matériels agricoles',
    value: 1,
  },
  {
    label: 'matériels forestier',
    value: 2,
  },
  {
    label: 'matériels viticole',
    value: 3,
  },
  {
    label: 'Travaux publics',
    value: 4,
  },
];

export const typeOptions = [
  {
    label: <span>broyeurs épareuses</span>,
    title: 'broyeurs épareuses',
    options: [
      { label: <span>broyeur</span>, value: 1 },
      { label: <span>faucheuse</span>, value: 2 },
      { label: <span>epareuse</span>, value: 3 },
    ],
  },
  {
    label: <span>équipements divers</span>,
    title: 'équipements divers',
    options: [
      { label: <span>Guidage</span>, value: 4 },
      { label: <span>Drone</span>, value: 5 },
      { label: <span>balayeuse</span>, value: 6 },
      { label: <span>nettoyaur hp</span>, value: 7 },
      { label: <span>lame de déneigement</span>, value: 8 },
      { label: <span>compresseur</span>, value: 9 },
      { label: <span>nacelle</span>, value: 10 },
      { label: <span>quad</span>, value: 11 },
    ],
  },
  {
    label: <span>épandage</span>,
    title: 'épandage',
    options: [
      { label: <span>enfouisseur engrais</span>, value: 12 },
      { label: <span>epandeur engrais</span>, value: 13 },
      { label: <span>epandeur fumier</span>, value: 14 },
    ],
  },
  {
    label: <span>manutention</span>,
    title: 'manutention',
    options: [
      { label: <span>chargeur frontal</span>, value: 15 },
      { label: <span>lève palette</span>, value: 16 },
    ],
  },
  {
    label: <span>matériels de cultures spécialisés</span>,
    title: 'matériels de cultures spécialisés',
    options: [
      { label: <span>arracheuse betterave</span>, value: 17 },
      { label: <span>arracheuse pomme de terre</span>, value: 18 },
      { label: <span>broyeur de fanes</span>, value: 19 },
      { label: <span>planteuse de pomme de terre</span>, value: 20 },
      { label: <span>presse enrouleuse</span>, value: 21 },
    ],
  },
  {
    label: <span>matériels élevage</span>,
    title: 'matériels élevage',
    options: [
      { label: <span>bétaillère</span>, value: 22 },
      { label: <span>dérouleuse de balle</span>, value: 23 },
      { label: <span>désileuse</span>, value: 24 },
      { label: <span>pailleuse</span>, value: 25 },
      { label: <span>tank à lait</span>, value: 26 },
    ],
  },
  {
    label: <span>matériels irrigation</span>,
    title: 'matériels irrigation',
    options: [
      { label: <span>enrouleur</span>, value: 27 },
      { label: <span>pompe irrigation</span>, value: 28 },
    ],
  },
  {
    label: <span>matériels de fenaison</span>,
    title: 'matériels de fenaison',
    options: [
      { label: <span>andaineur</span>, value: 29 },
      { label: <span>enrubanneuse</span>, value: 30 },
      { label: <span>faucheur</span>, value: 31 },
      { label: <span>presse à balle</span>, value: 32 },
    ],
  },
  {
    label: <span>matériels de récolte</span>,
    title: 'matériels de récolte',
    options: [
      { label: <span>Moissoneuses</span>, value: 33 },
      { label: <span>Ensileuse</span>, value: 34 },
      { label: <span>Cueilleur</span>, value: 35 },
    ],
  },
  {
    label: <span>outils de sols</span>,
    title: 'outils de sols',
    options: [
      { label: <span>herse</span>, value: 36 },
      { label: <span>ecimeuse</span>, value: 37 },
      { label: <span>machine à bêcher</span>, value: 38 },
      { label: <span>cultivateur</span>, value: 39 },
    ],
  },
  {
    label: <span>pulvérisateurs</span>,
    title: 'pulvérisateurs',
    options: [
      { label: <span>atomiseur arboricole</span>, value: 40 },
      { label: <span>pulvé automoteur</span>, value: 41 },
      { label: <span>pulvé trainé</span>, value: 42 },
    ],
  },
  {
    label: <span>remorques agricoles</span>,
    title: 'remorques agricoles',
    options: [
      { label: <span>plateau fourrager</span>, value: 43 },
      { label: <span>remorque</span>, value: 44 },
      { label: <span>remorque autochargeuse</span>, value: 45 },
    ],
  },
  {
    label: <span>semoirs</span>,
    title: 'semoirs',
    options: [
      { label: <span>semoirs céréales</span>, value: 46 },
      { label: <span>semoir monograine</span>, value: 47 },
      { label: <span>semoir en ligne</span>, value: 48 },
    ],
  },
  {
    label: <span>tracteurs</span>,
    title: 'tracteurs',
    options: [
      { label: <span>tracteurs agricole</span>, value: 49 },
      { label: <span>tracteur forrestier</span>, value: 50 },
      { label: <span>tracteur fruitier</span>, value: 51 },
      { label: <span>tracteur vigneron</span>, value: 52 },
    ],
  },
];
