export interface Mountain {
  name: string;
  height: string;
  range: string;
  country: string;
  continent: string;
  fact: string;
}

export const MOUNTAINS: Mountain[] = [
  // ===== ASIA (18) =====
  { name: "Mount Everest", height: "8,849m", range: "Himalayas", country: "Nepal / China", continent: "Asia", fact: "Tallest mountain on Earth" },
  { name: "K2", height: "8,611m", range: "Karakoram", country: "Pakistan / China", continent: "Asia", fact: "Known as the Savage Mountain" },
  { name: "Kangchenjunga", height: "8,586m", range: "Himalayas", country: "Nepal / India", continent: "Asia", fact: "Third highest peak in the world" },
  { name: "Lhotse", height: "8,516m", range: "Himalayas", country: "Nepal / China", continent: "Asia", fact: "Connected to Everest via the South Col" },
  { name: "Makalu", height: "8,485m", range: "Himalayas", country: "Nepal / China", continent: "Asia", fact: "Shaped like a four-sided pyramid" },
  { name: "Cho Oyu", height: "8,188m", range: "Himalayas", country: "Nepal / China", continent: "Asia", fact: "Considered the easiest 8,000m peak" },
  { name: "Manaslu", height: "8,163m", range: "Himalayas", country: "Nepal", continent: "Asia", fact: "Mountain of the Spirit" },
  { name: "Annapurna", height: "8,091m", range: "Himalayas", country: "Nepal", continent: "Asia", fact: "Most dangerous 8,000m peak by fatality rate" },
  { name: "Mount Fuji", height: "3,776m", range: "Fuji Volcanic Zone", country: "Japan", continent: "Asia", fact: "Sacred symbol of Japan" },
  { name: "Mount Ararat", height: "5,137m", range: "Armenian Highlands", country: "Turkey", continent: "Asia", fact: "Traditional resting place of Noah's Ark" },
  { name: "Mount Damavand", height: "5,610m", range: "Alborz", country: "Iran", continent: "Asia", fact: "Highest volcano in Asia" },
  { name: "Nanga Parbat", height: "8,126m", range: "Himalayas", country: "Pakistan", continent: "Asia", fact: "Known as the Killer Mountain due to its dangerous climbing history" },
  { name: "Dhaulagiri", height: "8,167m", range: "Himalayas", country: "Nepal", continent: "Asia", fact: "Its name means White Mountain in Sanskrit" },
  { name: "Gasherbrum I", height: "8,080m", range: "Karakoram", country: "Pakistan / China", continent: "Asia", fact: "Also called Hidden Peak because it is not visible from nearby" },
  { name: "Mount Kinabalu", height: "4,095m", range: "Crocker Range", country: "Malaysia", continent: "Asia", fact: "Highest peak in Southeast Asia between the Himalayas and New Guinea" },
  { name: "Mount Hua", height: "2,155m", range: "Qinling", country: "China", continent: "Asia", fact: "Famous for its plank walk considered one of the most dangerous hiking trails in the world" },
  { name: "Tirich Mir", height: "7,708m", range: "Hindu Kush", country: "Pakistan", continent: "Asia", fact: "Highest peak of the Hindu Kush mountain range" },
  { name: "Mount Kailash", height: "6,638m", range: "Transhimalayas", country: "China", continent: "Asia", fact: "Considered sacred by four religions and has never been climbed" },

  // ===== EUROPE (15) =====
  { name: "Mont Blanc", height: "4,808m", range: "Alps", country: "France / Italy", continent: "Europe", fact: "Highest peak in the Alps" },
  { name: "Matterhorn", height: "4,478m", range: "Alps", country: "Switzerland / Italy", continent: "Europe", fact: "One of the most iconic mountain shapes" },
  { name: "Mount Elbrus", height: "5,642m", range: "Caucasus", country: "Russia", continent: "Europe", fact: "Highest peak in Europe" },
  { name: "Mount Olympus", height: "2,917m", range: "Olympus Range", country: "Greece", continent: "Europe", fact: "Home of the Greek gods in mythology" },
  { name: "Mount Etna", height: "3,357m", range: "Sicily", country: "Italy", continent: "Europe", fact: "One of the most active volcanoes in the world" },
  { name: "Ben Nevis", height: "1,345m", range: "Grampian Mountains", country: "United Kingdom", continent: "Europe", fact: "Highest peak in the British Isles" },
  { name: "Mount Vesuvius", height: "1,281m", range: "Campanian", country: "Italy", continent: "Europe", fact: "Destroyed Pompeii in 79 AD" },
  { name: "Zugspitze", height: "2,962m", range: "Alps", country: "Germany", continent: "Europe", fact: "Highest peak in Germany" },
  { name: "Grossglockner", height: "3,798m", range: "Alps", country: "Austria", continent: "Europe", fact: "Highest peak in Austria and home to the longest glacier in the Eastern Alps" },
  { name: "Galdhopiggen", height: "2,469m", range: "Jotunheimen", country: "Norway", continent: "Europe", fact: "Highest peak in Scandinavia" },
  { name: "Mulhacen", height: "3,479m", range: "Sierra Nevada", country: "Spain", continent: "Europe", fact: "Highest peak on the Iberian Peninsula" },
  { name: "Musala", height: "2,925m", range: "Rila", country: "Bulgaria", continent: "Europe", fact: "Highest peak on the Balkan Peninsula" },
  { name: "Rysy", height: "2,499m", range: "Tatras", country: "Poland / Slovakia", continent: "Europe", fact: "Highest peak in Poland" },
  { name: "Kebnekaise", height: "2,097m", range: "Scandinavian Mountains", country: "Sweden", continent: "Europe", fact: "Highest peak in Sweden whose summit is shrinking due to glacial melting" },
  { name: "Triglav", height: "2,864m", range: "Julian Alps", country: "Slovenia", continent: "Europe", fact: "Appears on the Slovenian national flag and coat of arms" },

  // ===== AFRICA (12) =====
  { name: "Mount Kilimanjaro", height: "5,895m", range: "Eastern Rift", country: "Tanzania", continent: "Africa", fact: "Highest peak in Africa, a free-standing volcano" },
  { name: "Mount Kenya", height: "5,199m", range: "Eastern Rift", country: "Kenya", continent: "Africa", fact: "Second highest peak in Africa" },
  { name: "Toubkal", height: "4,167m", range: "Atlas", country: "Morocco", continent: "Africa", fact: "Highest peak in North Africa and the Atlas Mountains" },
  { name: "Mount Stanley", height: "5,109m", range: "Rwenzori", country: "Uganda / Congo (DRC)", continent: "Africa", fact: "Highest peak in the Rwenzori range" },
  { name: "Table Mountain", height: "1,085m", range: "Cape Fold Belt", country: "South Africa", continent: "Africa", fact: "Flat-topped landmark of Cape Town" },
  { name: "Ras Dashen", height: "4,550m", range: "Simien Mountains", country: "Ethiopia", continent: "Africa", fact: "Highest peak in Ethiopia and one of the highest in Africa" },
  { name: "Mount Meru", height: "4,566m", range: "Eastern Rift", country: "Tanzania", continent: "Africa", fact: "Often used as acclimatization before climbing Kilimanjaro" },
  { name: "Mount Cameroon", height: "4,040m", range: "Cameroon Line", country: "Cameroon", continent: "Africa", fact: "Highest peak in West Africa and an active volcano" },
  { name: "Mafadi", height: "3,450m", range: "Drakensberg", country: "South Africa / Lesotho", continent: "Africa", fact: "Highest peak in South Africa" },
  { name: "Thabana Ntlenyana", height: "3,482m", range: "Drakensberg", country: "Lesotho", continent: "Africa", fact: "Highest peak in Lesotho and in all of southern Africa" },
  { name: "Mount Elgon", height: "4,321m", range: "Eastern Rift", country: "Uganda / Kenya", continent: "Africa", fact: "Has the largest volcanic base of any mountain in the world" },
  { name: "Emi Koussi", height: "3,445m", range: "Tibesti", country: "Chad", continent: "Africa", fact: "Highest peak in the Sahara Desert and a massive shield volcano" },

  // ===== NORTH AMERICA (12) =====
  { name: "Denali", height: "6,190m", range: "Alaska Range", country: "United States", continent: "North America", fact: "Highest peak in North America" },
  { name: "Mount Logan", height: "5,959m", range: "Saint Elias", country: "Canada", continent: "North America", fact: "Highest peak in Canada" },
  { name: "Pico de Orizaba", height: "5,636m", range: "Trans-Mexican", country: "Mexico", continent: "North America", fact: "Highest peak in Mexico" },
  { name: "Mount Rainier", height: "4,392m", range: "Cascades", country: "United States", continent: "North America", fact: "Most glaciated peak in the contiguous US" },
  { name: "Mount St. Helens", height: "2,549m", range: "Cascades", country: "United States", continent: "North America", fact: "Famous for its 1980 eruption" },
  { name: "Mount Whitney", height: "4,421m", range: "Sierra Nevada", country: "United States", continent: "North America", fact: "Highest peak in the contiguous United States" },
  { name: "Mount Elbert", height: "4,401m", range: "Rocky Mountains", country: "United States", continent: "North America", fact: "Highest peak in the Rocky Mountains" },
  { name: "Grand Teton", height: "4,199m", range: "Teton Range", country: "United States", continent: "North America", fact: "Named by French trappers meaning large breast" },
  { name: "Mount Hood", height: "3,429m", range: "Cascades", country: "United States", continent: "North America", fact: "Most climbed glaciated peak in North America" },
  { name: "Popocatepetl", height: "5,426m", range: "Trans-Mexican", country: "Mexico", continent: "North America", fact: "One of the most active volcanoes in Mexico with frequent eruptions" },
  { name: "Mount Robson", height: "3,954m", range: "Rocky Mountains", country: "Canada", continent: "North America", fact: "Highest peak in the Canadian Rockies" },
  { name: "Mount Shasta", height: "4,322m", range: "Cascades", country: "United States", continent: "North America", fact: "A potentially active stratovolcano with hot springs near its summit" },

  // ===== SOUTH AMERICA (12) =====
  { name: "Aconcagua", height: "6,961m", range: "Andes", country: "Argentina", continent: "South America", fact: "Highest peak in South America" },
  { name: "Huascarán", height: "6,768m", range: "Andes", country: "Peru", continent: "South America", fact: "Highest peak in Peru" },
  { name: "Chimborazo", height: "6,263m", range: "Andes", country: "Ecuador", continent: "South America", fact: "Farthest point from Earth's center" },
  { name: "Cotopaxi", height: "5,897m", range: "Andes", country: "Ecuador", continent: "South America", fact: "One of the highest active volcanoes" },
  { name: "Mount Fitz Roy", height: "3,405m", range: "Andes", country: "Argentina", continent: "South America", fact: "Iconic Patagonian peak" },
  { name: "Ojos del Salado", height: "6,893m", range: "Andes", country: "Chile / Argentina", continent: "South America", fact: "Highest volcano in the world" },
  { name: "Yerupajá", height: "6,634m", range: "Cordillera Huayhuash", country: "Peru", continent: "South America", fact: "Second highest peak in Peru and one of the most difficult climbs in the Andes" },
  { name: "Illimani", height: "6,438m", range: "Andes", country: "Bolivia", continent: "South America", fact: "Guardian mountain of La Paz visible from the entire city" },
  { name: "Sajama", height: "6,542m", range: "Andes", country: "Bolivia", continent: "South America", fact: "Highest peak in Bolivia" },
  { name: "Cerro Torre", height: "3,128m", range: "Andes", country: "Argentina", continent: "South America", fact: "Considered one of the most technically difficult mountains to climb in the world" },
  { name: "Pico Bolívar", height: "4,978m", range: "Andes", country: "Venezuela", continent: "South America", fact: "Highest peak in Venezuela named after the liberator Simon Bolivar" },
  { name: "Tupungato", height: "6,570m", range: "Andes", country: "Chile / Argentina", continent: "South America", fact: "An active stratovolcano on the border of Chile and Argentina" },

  // ===== OCEANIA (12) =====
  { name: "Mount Kosciuszko", height: "2,228m", range: "Great Dividing Range", country: "Australia", continent: "Oceania", fact: "Highest peak in mainland Australia" },
  { name: "Aoraki / Mount Cook", height: "3,724m", range: "Southern Alps", country: "New Zealand", continent: "Oceania", fact: "Highest peak in New Zealand" },
  { name: "Puncak Jaya", height: "4,884m", range: "Sudirman Range", country: "Indonesia", continent: "Oceania", fact: "Highest peak in Oceania and the highest island peak in the world" },
  { name: "Mount Wilhelm", height: "4,509m", range: "Bismarck Range", country: "Papua New Guinea", continent: "Oceania", fact: "Highest peak in Papua New Guinea" },
  { name: "Mount Giluwe", height: "4,368m", range: "Highlands", country: "Papua New Guinea", continent: "Oceania", fact: "Highest volcanic peak in Oceania" },
  { name: "Mauna Loa", height: "4,169m", range: "Hawaiian Islands", country: "United States", continent: "Oceania", fact: "Largest shield volcano on Earth by volume" },
  { name: "Mount Taranaki", height: "2,518m", range: "Taranaki", country: "New Zealand", continent: "Oceania", fact: "One of the most symmetrical volcanic cones in the world" },
  { name: "Mount Ruapehu", height: "2,797m", range: "Tararua Range", country: "New Zealand", continent: "Oceania", fact: "Highest peak in the North Island of New Zealand and an active volcano" },
  { name: "Mount Hagen", height: "3,778m", range: "Hagen Range", country: "Papua New Guinea", continent: "Oceania", fact: "Located in the most densely populated highlands of Papua New Guinea" },
  { name: "Mount Balbi", height: "2,715m", range: "Emperor Range", country: "Papua New Guinea", continent: "Oceania", fact: "Highest peak on Bougainville Island and an active volcano" },
  { name: "Mount Bangeta", height: "4,121m", range: "Bismarck Range", country: "Papua New Guinea", continent: "Oceania", fact: "One of the least climbed high peaks in the world due to its remote location" },
  { name: "Mount Aspiring", height: "3,033m", range: "Southern Alps", country: "New Zealand", continent: "Oceania", fact: "Known as the Matterhorn of the South due to its pyramidal shape" },
];
