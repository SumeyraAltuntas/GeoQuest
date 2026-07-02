export interface Lake {
  name: string;
  area: string;
  country: string;
  continent: string;
  type: string;
  fact: string;
}

export const LAKES: Lake[] = [
  // ===== AFRICA (12) =====
  { name: "Lake Victoria", area: "68,870 km²", country: "Kenya / Tanzania / Uganda", continent: "Africa", type: "Freshwater", fact: "Largest lake in Africa and the world's largest tropical lake" },
  { name: "Lake Tanganyika", area: "32,900 km²", country: "Tanzania / Congo / Zambia / Burundi", continent: "Africa", type: "Freshwater", fact: "Second deepest lake in the world at 1,470 meters" },
  { name: "Lake Malawi", area: "29,600 km²", country: "Malawi / Tanzania / Mozambique", continent: "Africa", type: "Freshwater", fact: "Contains more fish species than any other lake on Earth" },
  { name: "Lake Chad", area: "13,000 km²", country: "Chad / Niger / Nigeria / Cameroon", continent: "Africa", type: "Freshwater", fact: "Has shrunk by 90% since the 1960s due to drought and overuse" },
  { name: "Lake Turkana", area: "6,405 km²", country: "Kenya / Ethiopia", continent: "Africa", type: "Freshwater", fact: "World's largest permanent desert lake" },
  { name: "Lake Volta", area: "8,502 km²", country: "Ghana", continent: "Africa", type: "Freshwater", fact: "One of the world's largest artificial lakes by surface area" },
  { name: "Lake Kariba", area: "5,580 km²", country: "Zimbabwe / Zambia", continent: "Africa", type: "Freshwater", fact: "One of the largest man-made lakes in the world by volume" },
  { name: "Lake Albert", area: "5,300 km²", country: "Uganda / Congo", continent: "Africa", type: "Freshwater", fact: "Part of the Albertine Rift and named after Prince Albert of Britain" },
  { name: "Lake Tana", area: "3,600 km²", country: "Ethiopia", continent: "Africa", type: "Freshwater", fact: "Source of the Blue Nile and home to ancient island monasteries" },
  { name: "Lake Kivu", area: "2,700 km²", country: "Rwanda / Congo", continent: "Africa", type: "Freshwater", fact: "Contains large amounts of dissolved methane gas in its depths" },
  { name: "Lake Mweru", area: "4,920 km²", country: "Zambia / Congo", continent: "Africa", type: "Freshwater", fact: "Sits on the border between Zambia and the Democratic Republic of Congo" },
  { name: "Lake Edward", area: "2,325 km²", country: "Uganda / Congo", continent: "Africa", type: "Freshwater", fact: "Located in the western branch of the Great Rift Valley" },

  // ===== ASIA (13) =====
  { name: "Caspian Sea", area: "371,000 km²", country: "Kazakhstan / Russia / Azerbaijan / Iran / Turkmenistan", continent: "Asia", type: "Saltwater", fact: "Largest lake in the world by surface area" },
  { name: "Lake Baikal", area: "31,500 km²", country: "Russia", continent: "Asia", type: "Freshwater", fact: "World's deepest lake at 1,642 meters and oldest at 25 million years" },
  { name: "Lake Balkhash", area: "16,400 km²", country: "Kazakhstan", continent: "Asia", type: "Freshwater", fact: "Unique lake that is freshwater in the west and saltwater in the east" },
  { name: "Aral Sea", area: "8,000 km²", country: "Kazakhstan / Uzbekistan", continent: "Asia", type: "Saltwater", fact: "Once the world's fourth largest lake, it shrank by 90% due to irrigation projects" },
  { name: "Issyk-Kul", area: "6,236 km²", country: "Kyrgyzstan", continent: "Asia", type: "Saltwater", fact: "One of the largest mountain lakes in the world and never freezes" },
  { name: "Qinghai Lake", area: "4,317 km²", country: "China", continent: "Asia", type: "Saltwater", fact: "Largest lake in China and an important bird habitat" },
  { name: "Lake Van", area: "3,755 km²", country: "Turkey", continent: "Asia", type: "Saltwater", fact: "Largest lake in Turkey and one of the world's largest endorheic lakes" },
  { name: "Lake Urmia", area: "5,000 km²", country: "Iran", continent: "Asia", type: "Saltwater", fact: "One of the world's largest saltwater lakes, known for its pink color from algae" },
  { name: "Tonle Sap", area: "2,700 km²", country: "Cambodia", continent: "Asia", type: "Freshwater", fact: "Southeast Asia's largest freshwater lake, expanding six times in size during monsoon" },
  { name: "Dead Sea", area: "605 km²", country: "Jordan / Israel", continent: "Asia", type: "Saltwater", fact: "Lowest point on Earth's surface at 430 meters below sea level" },
  { name: "Lake Sevan", area: "1,242 km²", country: "Armenia", continent: "Asia", type: "Freshwater", fact: "One of the largest freshwater high-altitude lakes in the world" },
  { name: "Nam Co", area: "1,920 km²", country: "China", continent: "Asia", type: "Saltwater", fact: "Highest large lake in the world at 4,718 meters above sea level" },
  { name: "Lake Biwa", area: "670 km²", country: "Japan", continent: "Asia", fact: "Oldest lake in Japan at over 4 million years old", type: "Freshwater" },

  // ===== EUROPE (12) =====
  { name: "Lake Ladoga", area: "17,700 km²", country: "Russia", continent: "Europe", type: "Freshwater", fact: "Largest lake in Europe and a vital supply route during World War II" },
  { name: "Lake Onega", area: "9,720 km²", country: "Russia", continent: "Europe", type: "Freshwater", fact: "Second largest lake in Europe, home to the famous Kizhi island monastery" },
  { name: "Lake Vänern", area: "5,650 km²", country: "Sweden", continent: "Europe", type: "Freshwater", fact: "Largest lake in Sweden and the European Union" },
  { name: "Lake Saimaa", area: "4,400 km²", country: "Finland", continent: "Europe", type: "Freshwater", fact: "Largest lake in Finland and home to the endangered Saimaa ringed seal" },
  { name: "Lake Peipus", area: "3,555 km²", country: "Estonia / Russia", continent: "Europe", type: "Freshwater", fact: "Fourth largest lake in Europe, forming the border between Estonia and Russia" },
  { name: "Lake Vättern", area: "1,912 km²", country: "Sweden", continent: "Europe", type: "Freshwater", fact: "Second largest lake in Sweden, known for its exceptionally clear water" },
  { name: "Lake Geneva", area: "580 km²", country: "Switzerland / France", continent: "Europe", type: "Freshwater", fact: "Largest lake in the Alps and home to the famous Jet d'Eau fountain" },
  { name: "Lake Balaton", area: "594 km²", country: "Hungary", continent: "Europe", type: "Freshwater", fact: "Largest freshwater lake in Central Europe, known as the Hungarian Sea" },
  { name: "Lake Constance", area: "536 km²", country: "Germany / Austria / Switzerland", continent: "Europe", type: "Freshwater", fact: "Third largest lake in Central Europe, bordering three countries" },
  { name: "Loch Ness", area: "56 km²", country: "United Kingdom", continent: "Europe", type: "Freshwater", fact: "Famous for the legend of the Loch Ness Monster and holds more water than all English and Welsh lakes combined" },
  { name: "Lake Mjøsa", area: "362 km²", country: "Norway", continent: "Europe", type: "Freshwater", fact: "Largest lake in Norway, located north of Oslo" },
  { name: "Lake Mälaren", area: "1,140 km²", country: "Sweden", continent: "Europe", type: "Freshwater", fact: "Third largest lake in Sweden, Stockholm is built on its islands" },

  // ===== NORTH AMERICA (12) =====
  { name: "Lake Superior", area: "82,103 km²", country: "USA / Canada", continent: "North America", type: "Freshwater", fact: "Largest freshwater lake in the world by surface area" },
  { name: "Lake Huron", area: "59,570 km²", country: "USA / Canada", continent: "North America", type: "Freshwater", fact: "Second largest of the Great Lakes, connected to Lake Michigan" },
  { name: "Lake Michigan", area: "57,800 km²", country: "USA", continent: "North America", type: "Freshwater", fact: "Only one of the Great Lakes located entirely within the United States" },
  { name: "Lake Erie", area: "25,700 km²", country: "USA / Canada", continent: "North America", type: "Freshwater", fact: "Shallowest and smallest by volume of the Great Lakes" },
  { name: "Lake Ontario", area: "18,960 km²", country: "USA / Canada", continent: "North America", type: "Freshwater", fact: "Smallest of the Great Lakes by surface area" },
  { name: "Lake Winnipeg", area: "24,514 km²", country: "Canada", continent: "North America", type: "Freshwater", fact: "Tenth largest freshwater lake in the world" },
  { name: "Great Salt Lake", area: "4,400 km²", country: "USA", continent: "North America", type: "Saltwater", fact: "Largest saltwater lake in the Western Hemisphere" },
  { name: "Lake Nicaragua", area: "8,264 km²", country: "Nicaragua", continent: "North America", type: "Freshwater", fact: "Largest lake in Central America and home to the only freshwater sharks" },
  { name: "Lake Athabasca", area: "7,935 km²", country: "Canada", continent: "North America", type: "Freshwater", fact: "Straddles the border of Alberta and Saskatchewan in Canada" },
  { name: "Reindeer Lake", area: "6,650 km²", country: "Canada", continent: "North America", type: "Freshwater", fact: "Ninth largest lake in Canada, located in Saskatchewan and Manitoba" },
  { name: "Lake of the Woods", area: "4,472 km²", country: "USA / Canada", continent: "North America", type: "Freshwater", fact: "Has over 14,000 islands and touches three Canadian and US jurisdictions" },
  { name: "Lake Champlain", area: "1,130 km²", country: "USA / Canada", continent: "North America", type: "Freshwater", fact: "Forms part of the border between New York and Vermont, USA" },

  // ===== SOUTH AMERICA (12) =====
  { name: "Lake Titicaca", area: "8,372 km²", country: "Peru / Bolivia", continent: "South America", type: "Freshwater", fact: "Highest navigable lake in the world at 3,812 meters above sea level" },
  { name: "Lake Maracaibo", area: "13,210 km²", country: "Venezuela", continent: "South America", type: "Saltwater", fact: "One of the oldest lakes in the world at approximately 20–36 million years old" },
  { name: "Lagoa dos Patos", area: "9,850 km²", country: "Brazil", continent: "South America", type: "Freshwater", fact: "Largest lagoon in South America, located in southern Brazil" },
  { name: "Lake Poopó", area: "1,000 km²", country: "Bolivia", continent: "South America", type: "Saltwater", fact: "Shallow Bolivian lake that completely dried up in 2015 due to climate change" },
  { name: "General Carrera Lake", area: "1,850 km²", country: "Chile / Argentina", continent: "South America", type: "Freshwater", fact: "Largest lake in Chile, famous for the Marble Caves on its shores" },
  { name: "Lake Argentino", area: "1,466 km²", country: "Argentina", continent: "South America", type: "Freshwater", fact: "Largest lake in Argentina, located in Los Glaciares National Park" },
  { name: "Mirim Lagoon", area: "2,965 km²", country: "Brazil / Uruguay", continent: "South America", type: "Freshwater", fact: "Second largest lagoon in South America, shared by Brazil and Uruguay" },
  { name: "Lake Viedma", area: "1,088 km²", country: "Argentina", continent: "South America", type: "Freshwater", fact: "Located in Patagonia near the Viedma Glacier" },
  { name: "Lago Llanquihue", area: "860 km²", country: "Chile", continent: "South America", type: "Freshwater", fact: "Second largest lake in Chile, with views of the Osorno and Calbuco volcanoes" },
  { name: "Lake Fagnano", area: "590 km²", country: "Argentina / Chile", continent: "South America", type: "Freshwater", fact: "Largest lake in Tierra del Fuego, straddling the Argentine-Chilean border" },
  { name: "Lake Nahuel Huapi", area: "531 km²", country: "Argentina", continent: "South America", type: "Freshwater", fact: "Located in Patagonia and the centerpiece of Argentina's first national park" },
  { name: "Lake Colhué Huapi", area: "803 km²", country: "Argentina", continent: "South America", type: "Saltwater", fact: "A shallow saltwater lake in Patagonia that has been shrinking over recent decades" },

  // ===== OCEANIA (12) =====
  { name: "Lake Eyre", area: "9,500 km²", country: "Australia", continent: "Oceania", type: "Saltwater", fact: "Largest lake in Australia, usually dry but fills with water every few years" },
  { name: "Lake Torrens", area: "5,745 km²", country: "Australia", continent: "Oceania", type: "Saltwater", fact: "A usually dry saltwater lake in South Australia shaped like a crescent" },
  { name: "Lake Carnegie", area: "5,714 km²", country: "Australia", continent: "Oceania", type: "Saltwater", fact: "A seasonal saltwater lake in Western Australia, usually completely dry" },
  { name: "Lake Gairdner", area: "4,351 km²", country: "Australia", continent: "Oceania", type: "Saltwater", fact: "A large salt lake in South Australia used for land speed record attempts" },
  { name: "Lake Mackay", area: "3,494 km²", country: "Australia", continent: "Oceania", type: "Saltwater", fact: "Remote salt lake in Western Australia, one of the largest in the country" },
  { name: "Lake Argyle", area: "1,000 km²", country: "Australia", continent: "Oceania", type: "Freshwater", fact: "Australia's largest freshwater reservoir, created by the Ord River Dam" },
  { name: "Lake Disappointment", area: "880 km²", country: "Australia", continent: "Oceania", type: "Saltwater", fact: "Named by explorer Frank Hann who was disappointed to find salt water instead of fresh" },
  { name: "Lake Taupo", area: "616 km²", country: "New Zealand", continent: "Oceania", type: "Freshwater", fact: "Largest lake in New Zealand, formed by a supervolcanic eruption 26,500 years ago" },
  { name: "Lake Te Anau", area: "344 km²", country: "New Zealand", continent: "Oceania", type: "Freshwater", fact: "Largest lake in New Zealand's South Island, gateway to Fiordland" },
  { name: "Lake Wakatipu", area: "291 km²", country: "New Zealand", continent: "Oceania", type: "Freshwater", fact: "Third largest lake in New Zealand, shaped like a lightning bolt" },
  { name: "Lake Wanaka", area: "192 km²", country: "New Zealand", continent: "Oceania", type: "Freshwater", fact: "Fourth largest lake in New Zealand, famous for the lone willow tree in its waters" },
  { name: "Lake Rotorua", area: "80 km²", country: "New Zealand", continent: "Oceania", type: "Freshwater", fact: "Located in a volcanic caldera and famous for its geothermal activity and Maori culture" },
];
