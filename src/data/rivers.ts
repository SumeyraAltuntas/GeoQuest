export interface River {
  name: string;
  length: string;
  country: string;
  continent: string;
  fact: string;
  city: string;
}

export const RIVERS: River[] = [
  // Africa
  { name: "Nile", length: "6,650 km", country: "Egypt / Uganda / Sudan", continent: "Africa", fact: "Longest river in the world", city: "Cairo" },
  { name: "Congo", length: "4,700 km", country: "Congo (DRC)", continent: "Africa", fact: "Deepest river in the world", city: "Kinshasa" },
  { name: "Niger", length: "4,200 km", country: "Nigeria / Mali / Niger", continent: "Africa", fact: "Third longest river in Africa", city: "Bamako" },
  { name: "Zambezi", length: "2,574 km", country: "Zambia / Mozambique", continent: "Africa", fact: "Home of Victoria Falls", city: "Livingstone" },
  { name: "Nile (Blue)", length: "1,450 km", country: "Ethiopia / Sudan", continent: "Africa", fact: "Major tributary of the Nile", city: "Khartoum" },
  { name: "Orange River", length: "2,200 km", country: "South Africa / Namibia", continent: "Africa", fact: "Longest river in South Africa", city: "Upington" },
  { name: "Limpopo", length: "1,750 km", country: "South Africa / Mozambique / Botswana", continent: "Africa", fact: "Flows in a great arc through southeastern Africa", city: "Xai-Xai" },
  { name: "Senegal River", length: "1,086 km", country: "Senegal / Mali / Mauritania", continent: "Africa", fact: "Forms the border between Senegal and Mauritania", city: "Saint-Louis" },
  { name: "Volta", length: "1,600 km", country: "Ghana / Burkina Faso", continent: "Africa", fact: "Feeds Lake Volta, one of the largest artificial lakes in the world", city: "Akosombo" },
  { name: "Okavango", length: "1,600 km", country: "Botswana / Namibia / Angola", continent: "Africa", fact: "Ends in the Kalahari Desert forming a vast inland delta", city: "Maun" },
  { name: "Ubangi", length: "1,060 km", country: "Central African Republic / Congo (DRC)", continent: "Africa", fact: "Largest right-bank tributary of the Congo River", city: "Bangui" },
  { name: "Kasai", length: "2,153 km", country: "Angola / Congo (DRC)", continent: "Africa", fact: "One of the largest tributaries of the Congo by volume", city: "Ilebo" },
  { name: "Jubba", length: "1,004 km", country: "Somalia / Ethiopia", continent: "Africa", fact: "One of the only two permanent rivers in Somalia", city: "Kismaayo" },

  // Asia
  { name: "Yangtze", length: "6,300 km", country: "China", continent: "Asia", fact: "Longest river in Asia", city: "Shanghai" },
  { name: "Yenisei", length: "5,539 km", country: "Russia / Mongolia", continent: "Asia", fact: "Flows into the Arctic Ocean", city: "Krasnoyarsk" },
  { name: "Yellow River", length: "5,464 km", country: "China", continent: "Asia", fact: "Cradle of Chinese civilization", city: "Lanzhou" },
  { name: "Mekong", length: "4,350 km", country: "China / Vietnam / Laos", continent: "Asia", fact: "Flows through six countries", city: "Phnom Penh" },
  { name: "Lena", length: "4,400 km", country: "Russia", continent: "Asia", fact: "Flows entirely within Russia to the Arctic", city: "Yakutsk" },
  { name: "Ob", length: "3,650 km", country: "Russia", continent: "Asia", fact: "One of the great Siberian rivers", city: "Novosibirsk" },
  { name: "Indus", length: "3,180 km", country: "Pakistan / India / China", continent: "Asia", fact: "Gave its name to India", city: "Hyderabad" },
  { name: "Brahmaputra", length: "2,900 km", country: "India / China / Bangladesh", continent: "Asia", fact: "One of the largest rivers by discharge", city: "Guwahati" },
  { name: "Euphrates", length: "2,800 km", country: "Iraq / Turkey / Syria", continent: "Asia", fact: "Longest river in Western Asia", city: "Basra" },
  { name: "Ganges", length: "2,525 km", country: "India / Bangladesh", continent: "Asia", fact: "Sacred river in Hinduism", city: "Varanasi" },
  { name: "Irrawaddy", length: "2,170 km", country: "Myanmar", continent: "Asia", fact: "Most important river of Myanmar", city: "Mandalay" },
  { name: "Tigris", length: "1,850 km", country: "Iraq / Turkey", continent: "Asia", fact: "Cradle of Mesopotamian civilization", city: "Baghdad" },
  { name: "Salween", length: "2,815 km", country: "China / Myanmar / Thailand", continent: "Asia", fact: "One of the longest free-flowing rivers in Southeast Asia", city: "Mawlamyine" },
  { name: "Amur", length: "2,824 km", country: "Russia / China", continent: "Asia", fact: "Forms the border between Russia and China for nearly 1,600 km", city: "Khabarovsk" },
  { name: "Chao Phraya", length: "372 km", country: "Thailand", continent: "Asia", fact: "Lifeblood of Thailand and its rice-growing heartland", city: "Bangkok" },

  // Europe
  { name: "Volga", length: "3,530 km", country: "Russia", continent: "Europe", fact: "Longest river in Europe", city: "Volgograd" },
  { name: "Danube", length: "2,860 km", country: "Germany / Austria / Hungary", continent: "Europe", fact: "Flows through 10 countries", city: "Budapest" },
  { name: "Ural", length: "2,428 km", country: "Russia / Kazakhstan", continent: "Europe", fact: "Traditional boundary between Europe and Asia", city: "Orenburg" },
  { name: "Dnieper", length: "2,201 km", country: "Russia / Belarus / Ukraine", continent: "Europe", fact: "Fourth longest river in Europe", city: "Kyiv" },
  { name: "Don", length: "1,870 km", country: "Russia", continent: "Europe", fact: "One of the major rivers of Russia", city: "Rostov-on-Don" },
  { name: "Rhine", length: "1,230 km", country: "Switzerland / Germany / Netherlands", continent: "Europe", fact: "Major European trade route", city: "Cologne" },
  { name: "Elbe", length: "1,091 km", country: "Czech Republic / Germany", continent: "Europe", fact: "Flows into the North Sea", city: "Hamburg" },
  { name: "Vistula", length: "1,047 km", country: "Poland", continent: "Europe", fact: "Longest river in Poland", city: "Warsaw" },
  { name: "Loire", length: "1,012 km", country: "France", continent: "Europe", fact: "Longest river in France", city: "Nantes" },
  { name: "Tagus", length: "1,007 km", country: "Spain / Portugal", continent: "Europe", fact: "Longest river on the Iberian Peninsula", city: "Lisbon" },
  { name: "Tisza", length: "966 km", country: "Ukraine / Hungary / Serbia", continent: "Europe", fact: "Longest tributary of the Danube", city: "Szeged" },
  { name: "Ebro", length: "930 km", country: "Spain", continent: "Europe", fact: "Largest river by discharge in Spain", city: "Zaragoza" },
  { name: "Douro", length: "897 km", country: "Spain / Portugal", continent: "Europe", fact: "Famous for the Port wine region", city: "Porto" },
  { name: "Oder", length: "854 km", country: "Czech Republic / Poland / Germany", continent: "Europe", fact: "Forms part of the Poland-Germany border", city: "Wroclaw" },
  { name: "Rhone", length: "812 km", country: "Switzerland / France", continent: "Europe", fact: "Flows into the Mediterranean Sea", city: "Lyon" },
  { name: "Seine", length: "777 km", country: "France", continent: "Europe", fact: "Flows through Paris", city: "Paris" },
  { name: "Po", length: "652 km", country: "Italy", continent: "Europe", fact: "Longest river in Italy", city: "Turin" },
  { name: "Garonne", length: "602 km", country: "Spain / France", continent: "Europe", fact: "Major river of southwestern France", city: "Toulouse" },
  { name: "Thames", length: "346 km", country: "United Kingdom", continent: "Europe", fact: "Flows through London", city: "London" },
  { name: "Tiber", length: "405 km", country: "Italy", continent: "Europe", fact: "Rome was founded on its banks in 753 BC", city: "Rome" },

  // North America
  { name: "Mississippi", length: "6,275 km", country: "United States", continent: "North America", fact: "Major North American waterway", city: "New Orleans" },
  { name: "Rio Grande", length: "3,051 km", country: "United States / Mexico", continent: "North America", fact: "Forms the US-Mexico border", city: "El Paso" },
  { name: "Colorado River", length: "2,330 km", country: "United States / Mexico", continent: "North America", fact: "Carved the Grand Canyon", city: "Las Vegas" },
  { name: "Yukon", length: "3,185 km", country: "Canada / United States", continent: "North America", fact: "Flows through the heart of Alaska and the Klondike Gold Rush region", city: "Dawson City" },
  { name: "Columbia", length: "2,000 km", country: "United States / Canada", continent: "North America", fact: "Produces more hydroelectric power than any other North American river", city: "Portland" },
  { name: "Missouri", length: "3,768 km", country: "United States", continent: "North America", fact: "Longest river in North America by itself", city: "Kansas City" },
  { name: "Ohio", length: "1,579 km", country: "United States", continent: "North America", fact: "Largest tributary of the Mississippi by volume", city: "Pittsburgh" },
  { name: "Saint Lawrence", length: "3,058 km", country: "Canada / United States", continent: "North America", fact: "Connects the Great Lakes to the Atlantic Ocean", city: "Montreal" },
  { name: "Arkansas River", length: "2,364 km", country: "United States", continent: "North America", fact: "Sixth longest river in the United States", city: "Tulsa" },
  { name: "Fraser", length: "1,375 km", country: "Canada", continent: "North America", fact: "Largest salmon-producing river in the world", city: "Vancouver" },
  { name: "Mackenzie", length: "4,241 km", country: "Canada", continent: "North America", fact: "Longest river system in Canada", city: "Inuvik" },
  { name: "Nelson", length: "2,575 km", country: "Canada", continent: "North America", fact: "Drains Lake Winnipeg into Hudson Bay", city: "Norway House" },

  // South America
  { name: "Amazon", length: "6,400 km", country: "Brazil / Peru", continent: "South America", fact: "Largest river by volume", city: "Manaus" },
  { name: "Parana", length: "4,880 km", country: "Brazil / Argentina", continent: "South America", fact: "Second longest river in South America", city: "Buenos Aires" },
  { name: "Orinoco", length: "2,140 km", country: "Venezuela / Colombia", continent: "South America", fact: "Third largest river by discharge", city: "Ciudad Bolivar" },
  { name: "Sao Francisco", length: "2,914 km", country: "Brazil", continent: "South America", fact: "Known as the river of national unity in Brazil", city: "Petrolina" },
  { name: "Tocantins", length: "2,450 km", country: "Brazil", continent: "South America", fact: "Hosts the Tucurui Dam, one of the largest in the world", city: "Maraba" },
  { name: "Magdalena", length: "1,528 km", country: "Colombia", continent: "South America", fact: "Principal river of Colombia and a vital transport artery", city: "Barranquilla" },
  { name: "Uruguay River", length: "1,838 km", country: "Uruguay / Argentina / Brazil", continent: "South America", fact: "Uruguay takes its name from this river", city: "Salto" },
  { name: "Pilcomayo", length: "1,590 km", country: "Argentina / Paraguay / Bolivia", continent: "South America", fact: "Forms the border between Argentina and Paraguay", city: "Asuncion" },
  { name: "Madeira", length: "3,380 km", country: "Brazil / Bolivia", continent: "South America", fact: "Largest tributary of the Amazon by volume", city: "Porto Velho" },
  { name: "Putumayo", length: "1,610 km", country: "Colombia / Peru / Brazil", continent: "South America", fact: "Flows through some of the most remote rainforest on Earth", city: "Puerto Leguizamo" },
  { name: "Paraguay River", length: "2,621 km", country: "Paraguay / Brazil / Argentina", continent: "South America", fact: "Divides Paraguay into two distinct geographic regions", city: "Concepcion" },
  { name: "Negro", length: "2,250 km", country: "Brazil / Colombia / Venezuela", continent: "South America", fact: "Its dark waters meet the Amazon in the famous Meeting of the Waters", city: "Manaus" },

  // Oceania
  { name: "Murray River", length: "2,508 km", country: "Australia", continent: "Oceania", fact: "Longest river in Australia", city: "Adelaide" },
  { name: "Darling", length: "1,472 km", country: "Australia", continent: "Oceania", fact: "Longest tributary of the Murray and part of Australia's largest river system", city: "Bourke" },
  { name: "Murrumbidgee", length: "1,485 km", country: "Australia", continent: "Oceania", fact: "One of the most important agricultural rivers in Australia", city: "Wagga Wagga" },
  { name: "Lachlan", length: "1,339 km", country: "Australia", continent: "Oceania", fact: "Named by explorer George Evans in 1815", city: "Forbes" },
  { name: "Cooper Creek", length: "1,420 km", country: "Australia", continent: "Oceania", fact: "One of the great desert rivers that disappears into Lake Eyre", city: "Windorah" },
  { name: "Flinders River", length: "1,004 km", country: "Australia", continent: "Oceania", fact: "Longest river in Queensland flowing into the Gulf of Carpentaria", city: "Hughenden" },
  { name: "Fitzroy River", length: "733 km", country: "Australia", continent: "Oceania", fact: "Drains the largest river catchment flowing to the Great Barrier Reef", city: "Rockhampton" },
  { name: "Swan River", length: "72 km", country: "Australia", continent: "Oceania", fact: "Named after the black swans first seen by Dutch explorers", city: "Perth" },
  { name: "Yarra", length: "242 km", country: "Australia", continent: "Oceania", fact: "Melbourne was founded at the point where the river was shallow enough to cross", city: "Melbourne" },
  { name: "Waikato", length: "425 km", country: "New Zealand", continent: "Oceania", fact: "Longest river in New Zealand", city: "Hamilton" },
  { name: "Clutha", length: "338 km", country: "New Zealand", continent: "Oceania", fact: "Largest river by volume in New Zealand", city: "Balclutha" },
  { name: "Sepik", length: "1,126 km", country: "Papua New Guinea", continent: "Oceania", fact: "Largest uncontaminated freshwater wetland in the Asia-Pacific region", city: "Ambunti" },
  { name: "Fly River", length: "1,060 km", country: "Papua New Guinea", continent: "Oceania", fact: "One of the few rivers large enough for ocean-going vessels in the Pacific Islands", city: "Kiunga" },
];
