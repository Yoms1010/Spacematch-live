// import pdf from ""

export const topBarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/property",
    label: "Plots",
  },
  {
    imgURL: "/icons/home.svg",
    route: "/developer",
    label: "Vendor",
  },
  {
    imgURL: "/icons/home.svg",
    route: "/buyer",
    label: "Client",
  },
  {
    imgURL: "/icons/home.svg",
    route: "/sign-in",
    label: "Sign In",
  },
]


export const superAdminSidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/in",
    label: "Home",
    who: "all"
  },
  {
    imgURL: "/icons/team-leader.png",
    route: "/in/vendors",
    label: "Vendors",
    who: "SuperAdmin"
  },
  {
    imgURL: "/icons/consumer.png",
    route: "/in/clients",
    label: "Clients",
    who: "SuperAdmin"
  },
  {
    imgURL: "/icons/agreement.png",
    route: "/in/agents",
    label: "Agents",
    who: "SuperAdmin"
  },
  {
    imgURL: "/icons/location-pin.png",
    route: "/in/properties",
    label: "Properties",
    who: "Developer"
  },
  {
    imgURL: "/icons/gear.png",
    route: "/in/settings",
    label: "Settings",
    who: "all"
  },
];


export const developerSidebarLinks = [
    {
      imgURL: "/icons/home.svg",
      route: "/in",
      label: "Home",
    },
    // {
    //   imgURL: "/icons/location-pin.png",
    //   route: "/in/properties",
    //   label: "Properties",
    // },
    {
      imgURL: "/icons/image-upload.png",
      route: "/in/upload",
      label: "Upload",
    },
    // {
    //   imgURL: "/icons/danger.png",
    //   route: "/in/agreement",
    //   label: "Agreement",
    // },
    {
      imgURL: "/icons/subscription.png",
      route: "/in/subscription",
      label: "Subscription",
    },
    {
      imgURL: "/icons/transaction.svg",
      route: "/in/transactions",
      label: "Transactions",
    },
    {
      imgURL: "/icons/gear.png",
      route: "/in/settings",
      label: "Settings",
    }
  ];

  export const buyerSidebarLinks = [
    {
        imgURL: "/icons/home.svg",
        route: "/in",
        label: "Home",
    },
    {
        imgURL: "/icons/identify.png",
        route: "/in/matches",
        label: "Matches",
    },
    // {
    //     imgURL: "/icons/agreement.png",
    //     route: "/in/agents",
    //     label: "Agents",
    // },
    {
        imgURL: "/icons/subscription.png",
        route: "/in/subscription",
        label: "Subscription",
    },
    // {
    //     imgURL: "/icons/wallet.png",
    //     route: "/in/wallet",
    //     label: "Wallet",
    // },
    {
        imgURL: "/icons/transaction.svg",
        route: "/in/transactions",
        label: "Transactions",
    },
    // {
    //     imgURL: "/icons/chat.png",
    //     route: "/in/chat",
    //     label: "Chat",
    // },
    {
        imgURL: "/icons/gear.png",
        route: "/in/settings",
        label: "Settings",
    },
  ];


  export const agentSidebarLinks = [
    {
      imgURL: "/icons/home.svg",
      route: "/in",
      label: "Home",
    },
    {
        imgURL: "/icons/identify.png",
        route: "/in/matches",
        label: "Matches",
    },
    {
        imgURL: "/icons/chat.png",
        route: "/in/chat",
        label: "Chat",
    },
    {
        imgURL: "/icons/agreement.png",
        route: "/in/agreement",
        label: "Agreement",
    },
    {
      imgURL: "/icons/gear.png",
      route: "/in/settings",
      label: "Settings",
    },
  ];


export const buyerData = [
  {
    "id" : "1",
    "title": "Property Title",
    "location": "Ikeja GRA Golf Club",
    "lga": "Ikeja",
    "cost": 170000,
    "beds": 3,
    "squareMeter": 1500,
    "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "image": "/properties/land-1.jpg",
  },
  {
    "id": "2",
    "title": "Property Title",
    "location": "Lekki Peninsula",
    "lga": "Lagos Island",
    "cost": 200000,
    "beds": 4,
    "squareMeter": 3200,
    "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "image": "/properties/land-2.jpg",
  },
  {
    "id": "3",
    "title": "Property Title",
    "location": "Ajah, Lagos Island",
    "lga": "Lagos Island",
    "cost": 100000,
    "beds": 5,
    "squareMeter": 11200,
    "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "image": "/properties/land-3.jpg",
  }
]


export const nigeria = [
    {
        "state":"Abia",
        "lga": [
            "Aba North",
            "Aba South",
            "Arochukwu",
            "Bende",
            "Ikwuano",
            "Isiala-Ngwa North",
            "Isiala-Ngwa South",
            "Isuikwato",
            "Obi Nwa",
            "Ohafia",
            "Osisioma",
            "Ngwa",
            "Ugwunagbo",
            "Ukwa East",
            "Ukwa West",
            "Umuahia North",
            "Umuahia South",
            "Umu-Neochi"
        ]},
    {
        "state":"Adamawa",
        "lga": [
            "Demsa",
            "Fufore",
            "Ganaye",
            "Gireri",
            "Gombi",
            "Guyuk",
            "Hong",
            "Jada",
            "Lamurde",
            "Madagali",
            "Maiha",
            "Mayo-Belwa",
            "Michika",
            "Mubi North",
            "Mubi South",
            "Numan",
            "Shelleng",
            "Song",
            "Toungo",
            "Yola North",
            "Yola South"
        ]},
    {
    "state":"Anambra",
    "lga": [
        "Aguata",
        "Anambra East",
        "Anambra West",
        "Anaocha",
        "Awka North",
        "Awka South",
        "Ayamelum",
        "Dunukofia",
        "Ekwusigo",
        "Idemili North",
        "Idemili south",
        "Ihiala",
        "Njikoka",
        "Nnewi North",
        "Nnewi South",
        "Ogbaru",
        "Onitsha North",
        "Onitsha South",
        "Orumba North",
        "Orumba South",
        "Oyi"
    ]},
    {
    "state":"Akwa Ibom",
        "lga": [
        "Abak",
        "Eastern Obolo",
        "Eket",
        "Esit Eket",
        "Essien Udim",
        "Etim Ekpo",
        "Etinan",
        "Ibeno",
        "Ibesikpo Asutan",
        "Ibiono Ibom",
        "Ika",
        "Ikono",
        "Ikot Abasi",
        "Ikot Ekpene",
        "Ini",
        "Itu",
        "Mbo",
        "Mkpat Enin",
        "Nsit Atai",
        "Nsit Ibom",
        "Nsit Ubium",
        "Obot Akara",
        "Okobo",
        "Onna",
        "Oron",
        "Oruk Anam",
        "Udung Uko",
        "Ukanafun",
        "Uruan",
        "Urue-Offong/Oruko ",
        "Uyo"
    ]},
    {
        "state":"Bauchi",
        "lga": [
            "Alkaleri",
            "Bauchi",
            "Bogoro",
            "Damban",
            "Darazo",
            "Dass",
            "Ganjuwa",
            "Giade",
            "Itas/Gadau",
            "Jama'are",
            "Katagum",
            "Kirfi",
            "Misau",
            "Ningi",
            "Shira",
            "Tafawa-Balewa",
            "Toro",
            "Warji",
            "Zaki"
        ]},
    {
        "state":"Bayelsa",
        "lga": [
            "Brass",
            "Ekeremor",
            "Kolokuma/Opokuma",
            "Nembe",
            "Ogbia",
            "Sagbama",
            "Southern Jaw",
            "Yenegoa"
        ]
    },
    {
        "state":"Benue",
        "lga": [
            "Ado",
            "Agatu",
            "Apa",
            "Buruku",
            "Gboko",
            "Guma",
            "Gwer East",
            "Gwer West",
            "Katsina-Ala",
            "Konshisha",
            "Kwande",
            "Logo",
            "Makurdi",
            "Obi",
            "Ogbadibo",
            "Oju",
            "Okpokwu",
            "Ohimini",
            "Oturkpo",
            "Tarka",
            "Ukum",
            "Ushongo",
            "Vandeikya"
        ]},
    {
        "state":"Borno",
        "lga": [
            "Abadam",
            "Askira/Uba",
            "Bama",
            "Bayo",
            "Biu",
            "Chibok",
            "Damboa",
            "Dikwa",
            "Gubio",
            "Guzamala",
            "Gwoza",
            "Hawul",
            "Jere",
            "Kaga",
            "Kala/Balge",
            "Konduga",
            "Kukawa",
            "Kwaya Kusar",
            "Mafa",
            "Magumeri",
            "Maiduguri",
            "Marte",
            "Mobbar",
            "Monguno",
            "Ngala",
            "Nganzai",
            "Shani"
        ]},
    {
        "state":"Cross River",
        "lga": [
            "Akpabuyo",
            "Odukpani",
            "Akamkpa",
            "Biase",
            "Abi",
            "Ikom",
            "Yarkur",
            "Odubra",
            "Boki",
            "Ogoja",
            "Yala",
            "Obanliku",
            "Obudu",
            "Calabar South",
            "Etung",
            "Bekwara",
            "Bakassi",
            "Calabar Municipality"
        ]},
    {
        "state":"Delta",
        "lga": [
            "Oshimili",
            "Aniocha",
            "Aniocha South",
            "Ika South",
            "Ika North-East",
            "Ndokwa West",
            "Ndokwa East",
            "Isoko south",
            "Isoko North",
            "Bomadi",
            "Burutu",
            "Ughelli South",
            "Ughelli North",
            "Ethiope West",
            "Ethiope East",
            "Sapele",
            "Okpe",
            "Warri North",
            "Warri South",
            "Uvwie",
            "Udu",
            "Warri Central",
            "Ukwani",
            "Oshimili North",
            "Patani"
        ]},
    {
        "state":"Ebonyi",
        "lga": [
            "Edda",
            "Afikpo",
            "Onicha",
            "Ohaozara",
            "Abakaliki",
            "Ishielu",
            "lkwo",
            "Ezza",
            "Ezza South",
            "Ohaukwu",
            "Ebonyi",
            "Ivo"
        ]},
    {
        "state":"Enugu",
        "lga": [
            "Enugu South,",
            "Igbo-Eze South",
            "Enugu North",
            "Nkanu",
            "Udi Agwu",
            "Oji-River",
            "Ezeagu",
            "IgboEze North",
            "Isi-Uzo",
            "Nsukka",
            "Igbo-Ekiti",
            "Uzo-Uwani",
            "Enugu Eas",
            "Aninri",
            "Nkanu East",
            "Udenu."
        ]},
    {
        "state":"Edo",
        "lga": [
            "Esan North-East",
            "Esan Central",
            "Esan West",
            "Egor",
            "Ukpoba",
            "Central",
            "Etsako Central",
            "Igueben",
            "Oredo",
            "Ovia SouthWest",
            "Ovia South-East",
            "Orhionwon",
            "Uhunmwonde",
            "Etsako East",
            "Esan South-East"
        ]},
    {
        "state":"Ekiti",
        "lga": [
            "Ado",
            "Ekiti-East",
            "Ekiti-West",
            "Emure/Ise/Orun",
            "Ekiti South-West",
            "Ikere",
            "Irepodun",
            "Ijero,",
            "Ido/Osi",
            "Oye",
            "Ikole",
            "Moba",
            "Gbonyin",
            "Efon",
            "Ise/Orun",
            "Ilejemeje."
        ]},
    {
        "state":"FCT",
        "lga": [
            "Abaji",
            "Abuja Municipal",
            "Bwari",
            "Gwagwalada",
            "Kuje",
            "Kwali"
        ]},
    {
        "state":"Gombe",
        "lga": [
            "Akko",
            "Balanga",
            "Billiri",
            "Dukku",
            "Kaltungo",
            "Kwami",
            "Shomgom",
            "Funakaye",
            "Gombe",
            "Nafada/Bajoga",
            "Yamaltu/Delta."
        ]},
    {
        "state":"Imo",
        "lga": [
            "Aboh-Mbaise",
            "Ahiazu-Mbaise",
            "Ehime-Mbano",
            "Ezinihitte",
            "Ideato North",
            "Ideato South",
            "Ihitte/Uboma",
            "Ikeduru",
            "Isiala Mbano",
            "Isu",
            "Mbaitoli",
            "Mbaitoli",
            "Ngor-Okpala",
            "Njaba",
            "Nwangele",
            "Nkwerre",
            "Obowo",
            "Oguta",
            "Ohaji/Egbema",
            "Okigwe",
            "Orlu",
            "Orsu",
            "Oru East",
            "Oru West",
            "Owerri-Municipal",
            "Owerri North",
            "Owerri West"
        ]},
    {
        "state":"Jigawa",
        "lga": [
            "Auyo",
            "Babura",
            "Birni Kudu",
            "Biriniwa",
            "Buji",
            "Dutse",
            "Gagarawa",
            "Garki",
            "Gumel",
            "Guri",
            "Gwaram",
            "Gwiwa",
            "Hadejia",
            "Jahun",
            "Kafin Hausa",
            "Kaugama Kazaure",
            "Kiri Kasamma",
            "Kiyawa",
            "Maigatari",
            "Malam Madori",
            "Miga",
            "Ringim",
            "Roni",
            "Sule-Tankarkar",
            "Taura",
            "Yankwashi"
        ]},
    {
        "state":"Kaduna",
        "lga": [
            "Birni-Gwari",
            "Chikun",
            "Giwa",
            "Igabi",
            "Ikara",
            "jaba",
            "Jema'a",
            "Kachia",
            "Kaduna North",
            "Kaduna South",
            "Kagarko",
            "Kajuru",
            "Kaura",
            "Kauru",
            "Kubau",
            "Kudan",
            "Lere",
            "Makarfi",
            "Sabon-Gari",
            "Sanga",
            "Soba",
            "Zango-Kataf",
            "Zaria"
        ]},
    {
        "state":"Kano",
        "lga": [
            "Ajingi",
            "Albasu",
            "Bagwai",
            "Bebeji",
            "Bichi",
            "Bunkure",
            "Dala",
            "Dambatta",
            "Dawakin Kudu",
            "Dawakin Tofa",
            "Doguwa",
            "Fagge",
            "Gabasawa",
            "Garko",
            "Garum",
            "Mallam",
            "Gaya",
            "Gezawa",
            "Gwale",
            "Gwarzo",
            "Kabo",
            "Kano Municipal",
            "Karaye",
            "Kibiya",
            "Kiru",
            "kumbotso",
            "Ghari",
            "Kura",
            "Madobi",
            "Makoda",
            "Minjibir",
            "Nasarawa",
            "Rano",
            "Rimin Gado",
            "Rogo",
            "Shanono",
            "Sumaila",
            "Takali",
            "Tarauni",
            "Tofa",
            "Tsanyawa",
            "Tudun Wada",
            "Ungogo",
            "Warawa",
            "Wudil"
        ]},
    {
        "state":"Katsina",
        "lga": [
            "Bakori",
            "Batagarawa",
            "Batsari",
            "Baure",
            "Bindawa",
            "Charanchi",
            "Dandume",
            "Danja",
            "Dan Musa",
            "Daura",
            "Dutsi",
            "Dutsin-Ma",
            "Faskari",
            "Funtua",
            "Ingawa",
            "Jibia",
            "Kafur",
            "Kaita",
            "Kankara",
            "Kankia",
            "Katsina",
            "Kurfi",
            "Kusada",
            "Mai'Adua",
            "Malumfashi",
            "Mani",
            "Mashi",
            "Matazuu",
            "Musawa",
            "Rimi",
            "Sabuwa",
            "Safana",
            "Sandamu",
            "Zango"
        ]},
    {
        "state":"Kebbi",
        "lga": [
            "Aleiro",
            "Arewa-Dandi",
            "Argungu",
            "Augie",
            "Bagudo",
            "Birnin Kebbi",
            "Bunza",
            "Dandi",
            "Fakai",
            "Gwandu",
            "Jega",
            "Kalgo",
            "Koko/Besse",
            "Maiyama",
            "Ngaski",
            "Sakaba",
            "Shanga",
            "Suru",
            "Wasagu/Danko",
            "Yauri",
            "Zuru"
        ]},
    {
        "state":"Kogi",
        "lga": [
            "Adavi",
            "Ajaokuta",
            "Ankpa",
            "Bassa",
            "Dekina",
            "Ibaji",
            "Idah",
            "Igalamela-Odolu",
            "Ijumu",
            "Kabba/Bunu",
            "Kogi",
            "Lokoja",
            "Mopa-Muro",
            "Ofu",
            "Ogori/Mangongo",
            "Okehi",
            "Okene",
            "Olamabolo",
            "Omala",
            "Yagba East",
            "Yagba West"
        ]},
    {
        "state":"Kwara",
        "lga": [
            "Asa",
            "Baruten",
            "Edu",
            "Ekiti",
            "Ifelodun",
            "Ilorin East",
            "Ilorin West",
            "Irepodun",
            "Isin",
            "Kaiama",
            "Moro",
            "Offa",
            "Oke-Ero",
            "Oyun",
            "Pategi"
        ]},
    {
        "state":"Lagos",
        "lga": [
            "Agege",
            "Ajeromi-Ifelodun",
            "Alimosho",
            "Amuwo-Odofin",
            "Apapa",
            "Badagry",
            "Epe",
            "Eti-Osa",
            "Ibeju/Lekki",
            "Ifako-Ijaye",
            "Ikeja",
            "Ikorodu",
            "Kosofe",
            "Lagos Island",
            "Lagos Mainland",
            "Mushin",
            "Ojo",
            "Oshodi-Isolo",
            "Shomolu",
            "Surulere"
        ]},
    {
        "state":"Nasarawa",
        "lga": [
            "Akwanga",
            "Awe",
            "Doma",
            "Karu",
            "Keana",
            "Keffi",
            "Kokona",
            "Lafia",
            "Nasarawa",
            "Nasarawa-Eggon",
            "Obi",
            "Toto",
            "Wamba"
        ]},
    {
        "state":"Niger",
        "lga": [
            "Agaie",
            "Agwara",
            "Bida",
            "Borgu",
            "Bosso",
            "Chanchaga",
            "Edati",
            "Gbako",
            "Gurara",
            "Katcha",
            "Kontagora",
            "Lapai",
            "Lavun",
            "Magama",
            "Mariga",
            "Mashegu",
            "Mokwa",
            "Muya",
            "Pailoro",
            "Rafi",
            "Rijau",
            "Shiroro",
            "Suleja",
            "Tafa",
            "Wushishi"
        ]},
    {
        "state":"Ogun",
        "lga": [
            "Abeokuta North",
            "Abeokuta South",
            "Ado-Odo/Ota",
            "Yewa North",
            "Yewa South",
            "Ewekoro",
            "Ifo",
            "Ijebu East",
            "Ijebu North",
            "Ijebu North East",
            "Ijebu Ode",
            "Ikenne",
            "Imeko-Afon",
            "Ipokia",
            "Obafemi-Owode",
            "Ogun Waterside",
            "Odeda",
            "Odogbolu",
            "Remo North",
            "Shagamu"
        ]},
    {
        "state":"Ondo",
        "lga": [
            "Akoko North East",
            "Akoko North West",
            "Akoko South Akure East",
            "Akoko South West",
            "Akure North",
            "Akure South",
            "Ese-Odo",
            "Idanre",
            "Ifedore",
            "Ilaje",
            "Ile-Oluji",
            "Okeigbo",
            "Irele",
            "Odigbo",
            "Okitipupa",
            "Ondo East",
            "Ondo West",
            "Ose",
            "Owo"
        ]},
    {
        "state":"Osun",
        "lga": [
            "Aiyedade",
            "Aiyedire",
            "Atakumosa East",
            "Atakumosa West",
            "Boluwaduro",
            "Boripe",
            "Ede North",
            "Ede South",
            "Egbedore",
            "Ejigbo",
            "Ife Central",
            "Ife East",
            "Ife North",
            "Ife South",
            "Ifedayo",
            "Ifelodun",
            "Ila",
            "Ilesha East",
            "Ilesha West",
            "Irepodun",
            "Irewole",
            "Isokan",
            "Iwo",
            "Obokun",
            "Odo-Otin",
            "Ola-Oluwa",
            "Olorunda",
            "Oriade",
            "Orolu",
            "Osogbo"
        ]},
    {
        "state":"Oyo",
        "lga": [
            "Afijio",
            "Akinyele",
            "Atiba",
            "Atisbo",
            "Egbeda",
            "Ibadan Central",
            "Ibadan North",
            "Ibadan North West",
            "Ibadan South East",
            "Ibadan South West",
            "Ibarapa Central",
            "Ibarapa East",
            "Ibarapa North",
            "Ido",
            "Irepo",
            "Iseyin",
            "Itesiwaju",
            "Iwajowa",
            "Kajola",
            "Lagelu Ogbomosho North",
            "Ogbomosho South",
            "Ogo Oluwa",
            "Olorunsogo",
            "Oluyole",
            "Ona-Ara",
            "Orelope",
            "Ori Ire",
            "Oyo East",
            "Oyo West",
            "Saki East",
            "Saki West",
            "Surulere"
        ]},
    {
        "state":"Plateau",
        "lga": [
            "Barikin Ladi",
            "Bassa",
            "Bokkos",
            "Jos East",
            "Jos North",
            "Jos South",
            "Kanam",
            "Kanke",
            "Langtang North",
            "Langtang South",
            "Mangu",
            "Mikang",
            "Pankshin",
            "Qua'an Pan",
            "Riyom",
            "Shendam",
            "Wase"
        ]},
    {
        "state":"Rivers",
        "lga": [
            "Abua/Odual",
            "Ahoada East",
            "Ahoada West",
            "Akuku Toru",
            "Andoni",
            "Asari-Toru",
            "Bonny",
            "Degema",
            "Emohua",
            "Eleme",
            "Etche",
            "Gokana",
            "Ikwerre",
            "Khana",
            "Obio/Akpor",
            "Ogba/Egbema/Ndoni",
            "Ogu/Bolo",
            "Okrika",
            "Omumma",
            "Opobo/Nkoro",
            "Oyigbo",
            "Port-Harcourt",
            "Tai"
        ]},
    {
        "state":"Sokoto",
        "lga": [
            "Binji",
            "Bodinga",
            "Dange-shnsi",
            "Gada",
            "Goronyo",
            "Gudu",
            "Gawabawa",
            "Illela",
            "Isa",
            "Kware",
            "kebbe",
            "Rabah",
            "Sabon birni",
            "Shagari",
            "Silame",
            "Sokoto North",
            "Sokoto South",
            "Tambuwal",
            "Tqngaza",
            "Tureta",
            "Wamako",
            "Wurno",
            "Yabo"
        ]},
    {
        "state":"Taraba",
        "lga": [
            "Ardo-kola",
            "Bali",
            "Donga",
            "Gashaka",
            "Cassol",
            "Ibi",
            "Jalingo",
            "Karin-Lamido",
            "Kurmi",
            "Lau",
            "Sardauna",
            "Takum",
            "Ussa",
            "Wukari",
            "Yorro",
            "Zing"
        ]},
    {
        "state":"Yobe",
        "lga": [
            "Bade",
            "Bursari",
            "Damaturu",
            "Fika",
            "Fune",
            "Geidam",
            "Gujba",
            "Gulani",
            "Jakusko",
            "Karasuwa",
            "Karawa",
            "Machina",
            "Nangere",
            "Nguru Potiskum",
            "Tarmua",
            "Yunusari",
            "Yusufari"
        ]},
    {
        "state":"Zamfara",
        "lga": [
            "Anka",
            "Bakura",
            "Birnin Magaji",
            "Bukkuyum",
            "Bungudu",
            "Gummi",
            "Gusau",
            "Kaura",
            "Namoda",
            "Maradun",
            "Maru",
            "Shinkafi",
            "Talata Mafara",
            "Tsafe",
            "Zurmi"
        ]
    }
]



export const VendorSubData = [
    {
        title: "Free",
        desc: "For the individual",
        cost_naira: 0,
        cost_dollars: 0,
        bg_color: "bg-slate-100",
        text_color: "text-gray-800",
        values: [
            {
                "title" : "Property Location Search",
                "access" : "Yes"
            },
            {
                "title" : "Furniture Layout Suggestions",
                "access" : "No"
            },
            {
                "title" : "Budget Calculator",
                "access" : "No"
            },
            {
                "title" : "Estimated Delivery Timelines",
                "access" : "No"
            },
            {
                "title" : "Advanced Property Filters",
                "access" : "No"
            },
            {
                "title" : "Property Comparison Tool",
                "access" : "No"
            },
            {
                "title" : "3D Property Renditions",
                "access" : "No"
            },
            {
                "title" : "Dedicated Project Manager",
                "access" : "No"
            },
            {
                "title" : "Priority Customer Support",
                "access" : "No"
            },
            {
                "title" : "Location Insights & Analysis",
                "access" : "No"
            },
            {
                "title" : "Access to Exclusive Deals",
                "access" : "No"
            },
        ]
    },
    {
        title: "Basic",
        desc: "For the individual and small teams",
        cost_naira: 74985,
        cost_dollars: 49.99,
        bg_color: "bg-gradient-to-br from-green-100 via-gray-200 to-purple-100",
        text_color: "text-gray-800",
        values: [
            {
                "title" : "Property Location Search",
                "accept" : "Yes"
            },
            {
                "title" : "Furniture Layout Suggestions",
                "accept" : "Yes"
            },
            {
                "title" : "Budget Calculator",
                "access" : "Yes"
            },
            {
                "title" : "Estimated Delivery Timelines",
                "access" : "Yes"
            },
            {
                "title" : "Advanced Property Filters",
                "access" : "Yes"
            },
            {
                "title" : "Property Comparison Tool",
                "access" : "No"
            },
            {
                "title" : "3D Property Renditions",
                "access" : "No"
            },
            {
                "title" : "Dedicated Project Manager",
                "access" : "No"
            },
            {
                "title" : "Priority Customer Support",
                "access" : "No"
            },
            {
                "title" : "Location Insights & Analysis",
                "access" : "No"
            },
            {
                "title" : "Access to Exclusive Deals",
                "access" : "No"
            },
        ]
    },
    {
        title: "Premium",
        desc: "For large team",
        cost_naira: 136485,
        cost_dollars: 90.99,
        bg_color: "bg-gradient-to-br from-main-100 via-black-1 to-gray-600",
        text_color: "text-gray-100",
        values: [
            {
                "title" : "Property Location Search",
                "accept" : "Yes"
            },
            {
                "title" : "Furniture Layout Suggestions",
                "accept" : "Yes"
            },
            {
                "title" : "Budget Calculator",
                "access" : "Yes"
            },
            {
                "title" : "Estimated Delivery Timelines",
                "access" : "Yes"
            },
            {
                "title" : "Advanced Property Filters",
                "access" : "Yes"
            },
            {
                "title" : "Property Comparison Tool",
                "access" : "No"
            },
            {
                "title" : "3D Property Renditions",
                "access" : "No"
            },
            {
                "title" : "Dedicated Project Manager",
                "access" : "No"
            },
            {
                "title" : "Priority Customer Support",
                "access" : "Yes"
            },
            {
                "title" : "Location Insights & Analysis",
                "access" : "Yes"
            },
            {
                "title" : "Access to Exclusive Deals",
                "access" : "Yes"
            },
        ]
    },
    {
        title: "Elite",
        desc: "For the individual and small teams",
        cost_naira: 254985.00,
        cost_dollars: 169.99,
        bg_color: "bg-gradient-to-br from-red-300 via-black-1 to-main-100", 
        text_color: "text-gray-100",
        values: [
            {
                "title" : "Property Location Search",
                "accept" : "Yes"
            },
            {
                "title" : "Furniture Layout Suggestions",
                "accept" : "Yes"
            },
            {
                "title" : "Budget Calculator",
                "access" : "Yes"
            },
            {
                "title" : "Estimated Delivery Timelines",
                "access" : "Yes"
            },
            {
                "title" : "Advanced Property Filters",
                "access" : "Yes"
            },
            {
                "title" : "Property Comparison Tool",
                "access" : "Yes"
            },
            {
                "title" : "3D Property Renditions",
                "access" : "Yes"
            },
            {
                "title" : "Dedicated Project Manager",
                "access" : "Yes"
            },
            {
                "title" : "Priority Customer Support",
                "access" : "Yes"
            },
            {
                "title" : "Location Insights & Analysis",
                "access" : "Yes"
            },
            {
                "title" : "Access to Exclusive Deals",
                "access" : "Yes"
            },
        ]
    }
]



export const ClientSubData = [
    {
        title: "Free",
        desc: "For the individual and small teams",
        cost: 0,
        bg_color: "bg-slate-100",
        text_color: "text-gray-800",
        values: [
            {
                "title" : "Access to Property Listings",
                "access" : "Yes"
            },
            {
                "title" : "Furniture Layout Suggestions",
                "access" : "No"
            },
            {
                "title" : "Budget Estimator",
                "access" : "No"
            },
            {
                "title" : "Delivery/Construction Timeline Estimates",
                "access" : "No"
            },
            {
                "title" : "Advanced Property Filters",
                "access" : "No"
            },
            {
                "title" : "Property Comparison Tool",
                "access" : "No"
            },
            {
                "title" : "3D/Virtual Property Renditions",
                "access" : "No"
            },
            {
                "title" : "Dedicated Project Manager",
                "access" : "No"
            },
            {
                "title" : "Virtual Tour Builder",
                "access" : "No"
            },
            {
                "title" : "Vendor & Builder Discounts",
                "access" : "No"
            },
            {
                "title" : "Access to Buyer/Vendor Marketplace",
                "access" : "No"
            },
        ]
    },
    {
        title: "Basic",
        desc: "For the individual and small teams",
        cost: 8500,
        bg_color: "bg-gradient-to-br from-green-100 via-gray-200 to-purple-100",
        text_color: "text-gray-800",
        values: [
            {
                "title" : "Access to Property Listings",
                "access" : "Yes"
            },
            {
                "title" : "Furniture Layout Suggestions",
                "access" : "Yes"
            },
            {
                "title" : "Budget Estimator",
                "access" : "Yes"
            },
            {
                "title" : "Delivery/Construction Timeline Estimates",
                "access" : "Yes"
            },
            {
                "title" : "Advanced Property Filters",
                "access" : "Yes"
            },
            {
                "title" : "Property Comparison Tool",
                "access" : "No"
            },
            {
                "title" : "3D/Virtual Property Renditions",
                "access" : "No"
            },
            {
                "title" : "Dedicated Project Manager",
                "access" : "No"
            },
            {
                "title" : "Virtual Tour Builder",
                "access" : "No"
            },
            {
                "title" : "Vendor & Builder Discounts",
                "access" : "No"
            },
            {
                "title" : "Access to Buyer/Vendor Marketplace",
                "access" : "No"
            },
        ]
    },
    {
        title: "Premium",
        desc: "For the individual and small teams",
        cost: 42000,
        bg_color: "bg-gradient-to-br from-main-100 via-black-1 to-gray-600",
        text_color: "text-gray-100",
        values: [
                {
                    "title" : "Access to Property Listings",
                    "access" : "Yes"
                },
                {
                    "title" : "Furniture Layout Suggestions",
                    "access" : "Yes"
                },
                {
                    "title" : "Budget Estimator",
                    "access" : "Yes"
                },
                {
                    "title" : "Delivery/Construction Timeline Estimates",
                    "access" : "Yes"
                },
                {
                    "title" : "Advanced Property Filters",
                    "access" : "Yes"
                },
                {
                    "title" : "Property Comparison Tool",
                    "access" : "Yes"
                },
                {
                    "title" : "3D/Virtual Property Renditions",
                    "access" : "Yes"
                },
                {
                    "title" : "Dedicated Project Manager",
                    "access" : "Yes"
                },
                {
                    "title" : "Virtual Tour Builder",
                    "access" : "Yes"
                },
                {
                    "title" : "Vendor & Builder Discounts",
                    "access" : "Yes"
                },
                {
                    "title" : "Access to Buyer/Vendor Marketplace",
                    "access" : "Yes"
                },
            ]
    },
];


export const calculateSizes = (isSmall: any, isMobile: any, isTablet: any) => {
    return {
      deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
      deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
      cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
      reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
      ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
      targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
    };
  };


export const solutions = [
    {
        title: "Prefab Homes ",
        italic_title: "Starting from ₦20 million (less than the cost of a new SUV)",
        desc: "One-floor, fully furnished modular homes delivered in under 2 months. No foundation required, ideal for launching an Airbnb or quick personal housing solution.",
        img: "bg-[url(/solutions/sol-1.jpeg)]",
    },
    {
        title: "Traditional Buildings",
        italic_title: "Starting from ₦30 million",
        desc: "Custom-built using conventional methods and modern finishes, perfect for permanent residences, offices, or commercial spaces.",
        img: "bg-[url(/solutions/real2.jpg)]",
    },
    {
        title: "Prefab Block of Flats",
        italic_title: "Starting from ₦40 million.",
        desc: "Pre-designed multi-unit apartments optimized for fast construction and high rental returns, perfect for co-investors seeking long-term income.",
        img: "bg-[url(/solutions/real3.webp)]",
    }
]

export const countryCode = [
    {
        "name": "Andorra",
        "code": "AD",
        "emoji": "🇦🇩",
        "unicode": "U+1F1E6 U+1F1E9",
        "image": "https://country-code-au6g.vercel.app/AD.svg",
        "dial_code": "+376"
    },
    {
        "name": "United Arab Emirates",
        "code": "AE",
        "emoji": "🇦🇪",
        "unicode": "U+1F1E6 U+1F1EA",
        "image": "https://country-code-au6g.vercel.app/AE.svg",
        "dial_code": "+971"
    },
    {
        "name": "Afghanistan",
        "code": "AF",
        "emoji": "🇦🇫",
        "unicode": "U+1F1E6 U+1F1EB",
        "image": "https://country-code-au6g.vercel.app/AF.svg",
        "dial_code": "+93"
    },
    {
        "name": "Antigua & Barbuda",
        "code": "AG",
        "emoji": "🇦🇬",
        "unicode": "U+1F1E6 U+1F1EC",
        "image": "https://country-code-au6g.vercel.app/AG.svg",
        "dial_code": "+1268"
    },
    {
        "name": "Anguilla",
        "code": "AI",
        "emoji": "🇦🇮",
        "unicode": "U+1F1E6 U+1F1EE",
        "image": "https://country-code-au6g.vercel.app/AI.svg",
        "dial_code": "+1264"
    },
    {
        "name": "Albania",
        "code": "AL",
        "emoji": "🇦🇱",
        "unicode": "U+1F1E6 U+1F1F1",
        "image": "https://country-code-au6g.vercel.app/AL.svg",
        "dial_code": "+355"
    },
    {
        "name": "Armenia",
        "code": "AM",
        "emoji": "🇦🇲",
        "unicode": "U+1F1E6 U+1F1F2",
        "image": "https://country-code-au6g.vercel.app/AM.svg",
        "dial_code": "+374"
    },
    {
        "name": "Angola",
        "code": "AO",
        "emoji": "🇦🇴",
        "unicode": "U+1F1E6 U+1F1F4",
        "image": "https://country-code-au6g.vercel.app/AO.svg",
        "dial_code": "+244"
    },
    {
        "name": "Antarctica",
        "code": "AQ",
        "emoji": "🇦🇶",
        "unicode": "U+1F1E6 U+1F1F6",
        "image": "https://country-code-au6g.vercel.app/AQ.svg",
        "dial_code": "+672"
    },
    {
        "name": "Argentina",
        "code": "AR",
        "emoji": "🇦🇷",
        "unicode": "U+1F1E6 U+1F1F7",
        "image": "https://country-code-au6g.vercel.app/AR.svg",
        "dial_code": "+54"
    },
    {
        "name": "American Samoa",
        "code": "AS",
        "emoji": "🇦🇸",
        "unicode": "U+1F1E6 U+1F1F8",
        "image": "https://country-code-au6g.vercel.app/AS.svg",
        "dial_code": "+1684"
    },
    {
        "name": "Austria",
        "code": "AT",
        "emoji": "🇦🇹",
        "unicode": "U+1F1E6 U+1F1F9",
        "image": "https://country-code-au6g.vercel.app/AT.svg",
        "dial_code": "+43"
    },
    {
        "name": "Australia",
        "code": "AU",
        "emoji": "🇦🇺",
        "unicode": "U+1F1E6 U+1F1FA",
        "image": "https://country-code-au6g.vercel.app/AU.svg",
        "dial_code": "+61"
    },
    {
        "name": "Aruba",
        "code": "AW",
        "emoji": "🇦🇼",
        "unicode": "U+1F1E6 U+1F1FC",
        "image": "https://country-code-au6g.vercel.app/AW.svg",
        "dial_code": "+297"
    },
    {
        "name": "Åland Islands",
        "code": "AX",
        "emoji": "🇦🇽",
        "unicode": "U+1F1E6 U+1F1FD",
        "image": "https://country-code-au6g.vercel.app/AX.svg",
        "dial_code": "+358"
    },
    {
        "name": "Azerbaijan",
        "code": "AZ",
        "emoji": "🇦🇿",
        "unicode": "U+1F1E6 U+1F1FF",
        "image": "https://country-code-au6g.vercel.app/AZ.svg",
        "dial_code": "+994"
    },
    {
        "name": "Bosnia & Herzegovina",
        "code": "BA",
        "emoji": "🇧🇦",
        "unicode": "U+1F1E7 U+1F1E6",
        "image": "https://country-code-au6g.vercel.app/BA.svg",
        "dial_code": "+387"
    },
    {
        "name": "Barbados",
        "code": "BB",
        "emoji": "🇧🇧",
        "unicode": "U+1F1E7 U+1F1E7",
        "image": "https://country-code-au6g.vercel.app/BB.svg",
        "dial_code": "+1246"
    },
    {
        "name": "Bangladesh",
        "code": "BD",
        "emoji": "🇧🇩",
        "unicode": "U+1F1E7 U+1F1E9",
        "image": "https://country-code-au6g.vercel.app/BD.svg",
        "dial_code": "+880"
    },
    {
        "name": "Belgium",
        "code": "BE",
        "emoji": "🇧🇪",
        "unicode": "U+1F1E7 U+1F1EA",
        "image": "https://country-code-au6g.vercel.app/BE.svg",
        "dial_code": "+32"
    },
    {
        "name": "Burkina Faso",
        "code": "BF",
        "emoji": "🇧🇫",
        "unicode": "U+1F1E7 U+1F1EB",
        "image": "https://country-code-au6g.vercel.app/BF.svg",
        "dial_code": "+226"
    },
    {
        "name": "Bulgaria",
        "code": "BG",
        "emoji": "🇧🇬",
        "unicode": "U+1F1E7 U+1F1EC",
        "image": "https://country-code-au6g.vercel.app/BG.svg",
        "dial_code": "+359"
    },
    {
        "name": "Bahrain",
        "code": "BH",
        "emoji": "🇧🇭",
        "unicode": "U+1F1E7 U+1F1ED",
        "image": "https://country-code-au6g.vercel.app/BH.svg",
        "dial_code": "+973"
    },
    {
        "name": "Burundi",
        "code": "BI",
        "emoji": "🇧🇮",
        "unicode": "U+1F1E7 U+1F1EE",
        "image": "https://country-code-au6g.vercel.app/BI.svg",
        "dial_code": "+257"
    },
    {
        "name": "Benin",
        "code": "BJ",
        "emoji": "🇧🇯",
        "unicode": "U+1F1E7 U+1F1EF",
        "image": "https://country-code-au6g.vercel.app/BJ.svg",
        "dial_code": "+229"
    },
    {
        "name": "St. Barthélemy",
        "code": "BL",
        "emoji": "🇧🇱",
        "unicode": "U+1F1E7 U+1F1F1",
        "image": "https://country-code-au6g.vercel.app/BL.svg",
        "dial_code": "+590"
    },
    {
        "name": "Bermuda",
        "code": "BM",
        "emoji": "🇧🇲",
        "unicode": "U+1F1E7 U+1F1F2",
        "image": "https://country-code-au6g.vercel.app/BM.svg",
        "dial_code": "+1441"
    },
    {
        "name": "Brunei",
        "code": "BN",
        "emoji": "🇧🇳",
        "unicode": "U+1F1E7 U+1F1F3",
        "image": "https://country-code-au6g.vercel.app/BN.svg",
        "dial_code": "+673"
    },
    {
        "name": "Bolivia",
        "code": "BO",
        "emoji": "🇧🇴",
        "unicode": "U+1F1E7 U+1F1F4",
        "image": "https://country-code-au6g.vercel.app/BO.svg",
        "dial_code": "+591"
    },
    {
        "name": "Brazil",
        "code": "BR",
        "emoji": "🇧🇷",
        "unicode": "U+1F1E7 U+1F1F7",
        "image": "https://country-code-au6g.vercel.app/BR.svg",
        "dial_code": "+55"
    },
    {
        "name": "Bahamas",
        "code": "BS",
        "emoji": "🇧🇸",
        "unicode": "U+1F1E7 U+1F1F8",
        "image": "https://country-code-au6g.vercel.app/BS.svg",
        "dial_code": "+1242"
    },
    {
        "name": "Bhutan",
        "code": "BT",
        "emoji": "🇧🇹",
        "unicode": "U+1F1E7 U+1F1F9",
        "image": "https://country-code-au6g.vercel.app/BT.svg",
        "dial_code": "+975"
    },
    {
        "name": "Botswana",
        "code": "BW",
        "emoji": "🇧🇼",
        "unicode": "U+1F1E7 U+1F1FC",
        "image": "https://country-code-au6g.vercel.app/BW.svg",
        "dial_code": "+267"
    },
    {
        "name": "Belarus",
        "code": "BY",
        "emoji": "🇧🇾",
        "unicode": "U+1F1E7 U+1F1FE",
        "image": "https://country-code-au6g.vercel.app/BY.svg",
        "dial_code": "+375"
    },
    {
        "name": "Belize",
        "code": "BZ",
        "emoji": "🇧🇿",
        "unicode": "U+1F1E7 U+1F1FF",
        "image": "https://country-code-au6g.vercel.app/BZ.svg",
        "dial_code": "+501"
    },
    {
        "name": "Canada",
        "code": "CA",
        "emoji": "🇨🇦",
        "unicode": "U+1F1E8 U+1F1E6",
        "image": "https://country-code-au6g.vercel.app/CA.svg",
        "dial_code": "+1"
    },
    {
        "name": "Cocos (Keeling) Islands",
        "code": "CC",
        "emoji": "🇨🇨",
        "unicode": "U+1F1E8 U+1F1E8",
        "image": "https://country-code-au6g.vercel.app/CC.svg",
        "dial_code": "+61"
    },
    {
        "name": "Congo - Kinshasa",
        "code": "CD",
        "emoji": "🇨🇩",
        "unicode": "U+1F1E8 U+1F1E9",
        "image": "https://country-code-au6g.vercel.app/CD.svg",
        "dial_code": "+243"
    },
    {
        "name": "Central African Republic",
        "code": "CF",
        "emoji": "🇨🇫",
        "unicode": "U+1F1E8 U+1F1EB",
        "image": "https://country-code-au6g.vercel.app/CF.svg",
        "dial_code": "+236"
    },
    {
        "name": "Congo - Brazzaville",
        "code": "CG",
        "emoji": "🇨🇬",
        "unicode": "U+1F1E8 U+1F1EC",
        "image": "https://country-code-au6g.vercel.app/CG.svg",
        "dial_code": "+242"
    },
    {
        "name": "Switzerland",
        "code": "CH",
        "emoji": "🇨🇭",
        "unicode": "U+1F1E8 U+1F1ED",
        "image": "https://country-code-au6g.vercel.app/CH.svg",
        "dial_code": "+41"
    },
    {
        "name": "Côte d’Ivoire",
        "code": "CI",
        "emoji": "🇨🇮",
        "unicode": "U+1F1E8 U+1F1EE",
        "image": "https://country-code-au6g.vercel.app/CI.svg",
        "dial_code": "+225"
    },
    {
        "name": "Cook Islands",
        "code": "CK",
        "emoji": "🇨🇰",
        "unicode": "U+1F1E8 U+1F1F0",
        "image": "https://country-code-au6g.vercel.app/CK.svg",
        "dial_code": "+682"
    },
    {
        "name": "Chile",
        "code": "CL",
        "emoji": "🇨🇱",
        "unicode": "U+1F1E8 U+1F1F1",
        "image": "https://country-code-au6g.vercel.app/CL.svg",
        "dial_code": "+56"
    },
    {
        "name": "Cameroon",
        "code": "CM",
        "emoji": "🇨🇲",
        "unicode": "U+1F1E8 U+1F1F2",
        "image": "https://country-code-au6g.vercel.app/CM.svg",
        "dial_code": "+237"
    },
    {
        "name": "China",
        "code": "CN",
        "emoji": "🇨🇳",
        "unicode": "U+1F1E8 U+1F1F3",
        "image": "https://country-code-au6g.vercel.app/CN.svg",
        "dial_code": "+86"
    },
    {
        "name": "Colombia",
        "code": "CO",
        "emoji": "🇨🇴",
        "unicode": "U+1F1E8 U+1F1F4",
        "image": "https://country-code-au6g.vercel.app/CO.svg",
        "dial_code": "+57"
    },
    {
        "name": "Costa Rica",
        "code": "CR",
        "emoji": "🇨🇷",
        "unicode": "U+1F1E8 U+1F1F7",
        "image": "https://country-code-au6g.vercel.app/CR.svg",
        "dial_code": "+506"
    },
    {
        "name": "Cuba",
        "code": "CU",
        "emoji": "🇨🇺",
        "unicode": "U+1F1E8 U+1F1FA",
        "image": "https://country-code-au6g.vercel.app/CU.svg",
        "dial_code": "+53"
    },
    {
        "name": "Cape Verde",
        "code": "CV",
        "emoji": "🇨🇻",
        "unicode": "U+1F1E8 U+1F1FB",
        "image": "https://country-code-au6g.vercel.app/CV.svg",
        "dial_code": "+238"
    },
    {
        "name": "Christmas Island",
        "code": "CX",
        "emoji": "🇨🇽",
        "unicode": "U+1F1E8 U+1F1FD",
        "image": "https://country-code-au6g.vercel.app/CX.svg",
        "dial_code": "+61"
    },
    {
        "name": "Cyprus",
        "code": "CY",
        "emoji": "🇨🇾",
        "unicode": "U+1F1E8 U+1F1FE",
        "image": "https://country-code-au6g.vercel.app/CY.svg",
        "dial_code": "+357"
    },
    {
        "name": "Czechia",
        "code": "CZ",
        "emoji": "🇨🇿",
        "unicode": "U+1F1E8 U+1F1FF",
        "image": "https://country-code-au6g.vercel.app/CZ.svg",
        "dial_code": "+420"
    },
    {
        "name": "Germany",
        "code": "DE",
        "emoji": "🇩🇪",
        "unicode": "U+1F1E9 U+1F1EA",
        "image": "https://country-code-au6g.vercel.app/DE.svg",
        "dial_code": "+49"
    },
    {
        "name": "Djibouti",
        "code": "DJ",
        "emoji": "🇩🇯",
        "unicode": "U+1F1E9 U+1F1EF",
        "image": "https://country-code-au6g.vercel.app/DJ.svg",
        "dial_code": "+253"
    },
    {
        "name": "Denmark",
        "code": "DK",
        "emoji": "🇩🇰",
        "unicode": "U+1F1E9 U+1F1F0",
        "image": "https://country-code-au6g.vercel.app/DK.svg",
        "dial_code": "+45"
    },
    {
        "name": "Dominica",
        "code": "DM",
        "emoji": "🇩🇲",
        "unicode": "U+1F1E9 U+1F1F2",
        "image": "https://country-code-au6g.vercel.app/DM.svg",
        "dial_code": "+1767"
    },
    {
        "name": "Dominican Republic",
        "code": "DO",
        "emoji": "🇩🇴",
        "unicode": "U+1F1E9 U+1F1F4",
        "image": "https://country-code-au6g.vercel.app/DO.svg",
        "dial_code": "+1849"
    },
    {
        "name": "Algeria",
        "code": "DZ",
        "emoji": "🇩🇿",
        "unicode": "U+1F1E9 U+1F1FF",
        "image": "https://country-code-au6g.vercel.app/DZ.svg",
        "dial_code": "+213"
    },
    {
        "name": "Ecuador",
        "code": "EC",
        "emoji": "🇪🇨",
        "unicode": "U+1F1EA U+1F1E8",
        "image": "https://country-code-au6g.vercel.app/EC.svg",
        "dial_code": "+593"
    },
    {
        "name": "Estonia",
        "code": "EE",
        "emoji": "🇪🇪",
        "unicode": "U+1F1EA U+1F1EA",
        "image": "https://country-code-au6g.vercel.app/EE.svg",
        "dial_code": "+372"
    },
    {
        "name": "Egypt",
        "code": "EG",
        "emoji": "🇪🇬",
        "unicode": "U+1F1EA U+1F1EC",
        "image": "https://country-code-au6g.vercel.app/EG.svg",
        "dial_code": "+20"
    },
    {
        "name": "Eritrea",
        "code": "ER",
        "emoji": "🇪🇷",
        "unicode": "U+1F1EA U+1F1F7",
        "image": "https://country-code-au6g.vercel.app/ER.svg",
        "dial_code": "+291"
    },
    {
        "name": "Spain",
        "code": "ES",
        "emoji": "🇪🇸",
        "unicode": "U+1F1EA U+1F1F8",
        "image": "https://country-code-au6g.vercel.app/ES.svg",
        "dial_code": "+34"
    },
    {
        "name": "Ethiopia",
        "code": "ET",
        "emoji": "🇪🇹",
        "unicode": "U+1F1EA U+1F1F9",
        "image": "https://country-code-au6g.vercel.app/ET.svg",
        "dial_code": "+251"
    },
    {
        "name": "Finland",
        "code": "FI",
        "emoji": "🇫🇮",
        "unicode": "U+1F1EB U+1F1EE",
        "image": "https://country-code-au6g.vercel.app/FI.svg",
        "dial_code": "+358"
    },
    {
        "name": "Fiji",
        "code": "FJ",
        "emoji": "🇫🇯",
        "unicode": "U+1F1EB U+1F1EF",
        "image": "https://country-code-au6g.vercel.app/FJ.svg",
        "dial_code": "+679"
    },
    {
        "name": "Falkland Islands",
        "code": "FK",
        "emoji": "🇫🇰",
        "unicode": "U+1F1EB U+1F1F0",
        "image": "https://country-code-au6g.vercel.app/FK.svg",
        "dial_code": "+500"
    },
    {
        "name": "Micronesia",
        "code": "FM",
        "emoji": "🇫🇲",
        "unicode": "U+1F1EB U+1F1F2",
        "image": "https://country-code-au6g.vercel.app/FM.svg",
        "dial_code": "+691"
    },
    {
        "name": "Faroe Islands",
        "code": "FO",
        "emoji": "🇫🇴",
        "unicode": "U+1F1EB U+1F1F4",
        "image": "https://country-code-au6g.vercel.app/FO.svg",
        "dial_code": "+298"
    },
    {
        "name": "France",
        "code": "FR",
        "emoji": "🇫🇷",
        "unicode": "U+1F1EB U+1F1F7",
        "image": "https://country-code-au6g.vercel.app/FR.svg",
        "dial_code": "+33"
    },
    {
        "name": "Gabon",
        "code": "GA",
        "emoji": "🇬🇦",
        "unicode": "U+1F1EC U+1F1E6",
        "image": "https://country-code-au6g.vercel.app/GA.svg",
        "dial_code": "+241"
    },
    {
        "name": "United Kingdom",
        "code": "GB",
        "emoji": "🇬🇧",
        "unicode": "U+1F1EC U+1F1E7",
        "image": "https://country-code-au6g.vercel.app/GB.svg",
        "dial_code": "+44"
    },
    {
        "name": "Grenada",
        "code": "GD",
        "emoji": "🇬🇩",
        "unicode": "U+1F1EC U+1F1E9",
        "image": "https://country-code-au6g.vercel.app/GD.svg",
        "dial_code": "+1473"
    },
    {
        "name": "Georgia",
        "code": "GE",
        "emoji": "🇬🇪",
        "unicode": "U+1F1EC U+1F1EA",
        "image": "https://country-code-au6g.vercel.app/GE.svg",
        "dial_code": "+995"
    },
    {
        "name": "French Guiana",
        "code": "GF",
        "emoji": "🇬🇫",
        "unicode": "U+1F1EC U+1F1EB",
        "image": "https://country-code-au6g.vercel.app/GF.svg",
        "dial_code": "+594"
    },
    {
        "name": "Guernsey",
        "code": "GG",
        "emoji": "🇬🇬",
        "unicode": "U+1F1EC U+1F1EC",
        "image": "https://country-code-au6g.vercel.app/GG.svg",
        "dial_code": "+44"
    },
    {
        "name": "Ghana",
        "code": "GH",
        "emoji": "🇬🇭",
        "unicode": "U+1F1EC U+1F1ED",
        "image": "https://country-code-au6g.vercel.app/GH.svg",
        "dial_code": "+233"
    },
    {
        "name": "Gibraltar",
        "code": "GI",
        "emoji": "🇬🇮",
        "unicode": "U+1F1EC U+1F1EE",
        "image": "https://country-code-au6g.vercel.app/GI.svg",
        "dial_code": "+350"
    },
    {
        "name": "Greenland",
        "code": "GL",
        "emoji": "🇬🇱",
        "unicode": "U+1F1EC U+1F1F1",
        "image": "https://country-code-au6g.vercel.app/GL.svg",
        "dial_code": "+299"
    },
    {
        "name": "Gambia",
        "code": "GM",
        "emoji": "🇬🇲",
        "unicode": "U+1F1EC U+1F1F2",
        "image": "https://country-code-au6g.vercel.app/GM.svg",
        "dial_code": "+220"
    },
    {
        "name": "Guinea",
        "code": "GN",
        "emoji": "🇬🇳",
        "unicode": "U+1F1EC U+1F1F3",
        "image": "https://country-code-au6g.vercel.app/GN.svg",
        "dial_code": "+224"
    },
    {
        "name": "Guadeloupe",
        "code": "GP",
        "emoji": "🇬🇵",
        "unicode": "U+1F1EC U+1F1F5",
        "image": "https://country-code-au6g.vercel.app/GP.svg",
        "dial_code": "+590"
    },
    {
        "name": "Equatorial Guinea",
        "code": "GQ",
        "emoji": "🇬🇶",
        "unicode": "U+1F1EC U+1F1F6",
        "image": "https://country-code-au6g.vercel.app/GQ.svg",
        "dial_code": "+240"
    },
    {
        "name": "Greece",
        "code": "GR",
        "emoji": "🇬🇷",
        "unicode": "U+1F1EC U+1F1F7",
        "image": "https://country-code-au6g.vercel.app/GR.svg",
        "dial_code": "+30"
    },
    {
        "name": "South Georgia & South Sandwich Islands",
        "code": "GS",
        "emoji": "🇬🇸",
        "unicode": "U+1F1EC U+1F1F8",
        "image": "https://country-code-au6g.vercel.app/GS.svg",
        "dial_code": "+500"
    },
    {
        "name": "Guatemala",
        "code": "GT",
        "emoji": "🇬🇹",
        "unicode": "U+1F1EC U+1F1F9",
        "image": "https://country-code-au6g.vercel.app/GT.svg",
        "dial_code": "+502"
    },
    {
        "name": "Guam",
        "code": "GU",
        "emoji": "🇬🇺",
        "unicode": "U+1F1EC U+1F1FA",
        "image": "https://country-code-au6g.vercel.app/GU.svg",
        "dial_code": "+1671"
    },
    {
        "name": "Guinea-Bissau",
        "code": "GW",
        "emoji": "🇬🇼",
        "unicode": "U+1F1EC U+1F1FC",
        "image": "https://country-code-au6g.vercel.app/GW.svg",
        "dial_code": "+245"
    },
    {
        "name": "Guyana",
        "code": "GY",
        "emoji": "🇬🇾",
        "unicode": "U+1F1EC U+1F1FE",
        "image": "https://country-code-au6g.vercel.app/GY.svg",
        "dial_code": "+595"
    },
    {
        "name": "Hong Kong SAR China",
        "code": "HK",
        "emoji": "🇭🇰",
        "unicode": "U+1F1ED U+1F1F0",
        "image": "https://country-code-au6g.vercel.app/HK.svg",
        "dial_code": "+852"
    },
    {
        "name": "Honduras",
        "code": "HN",
        "emoji": "🇭🇳",
        "unicode": "U+1F1ED U+1F1F3",
        "image": "https://country-code-au6g.vercel.app/HN.svg",
        "dial_code": "+504"
    },
    {
        "name": "Croatia",
        "code": "HR",
        "emoji": "🇭🇷",
        "unicode": "U+1F1ED U+1F1F7",
        "image": "https://country-code-au6g.vercel.app/HR.svg",
        "dial_code": "+385"
    },
    {
        "name": "Haiti",
        "code": "HT",
        "emoji": "🇭🇹",
        "unicode": "U+1F1ED U+1F1F9",
        "image": "https://country-code-au6g.vercel.app/HT.svg",
        "dial_code": "+509"
    },
    {
        "name": "Hungary",
        "code": "HU",
        "emoji": "🇭🇺",
        "unicode": "U+1F1ED U+1F1FA",
        "image": "https://country-code-au6g.vercel.app/HU.svg",
        "dial_code": "+36"
    },
    {
        "name": "Indonesia",
        "code": "ID",
        "emoji": "🇮🇩",
        "unicode": "U+1F1EE U+1F1E9",
        "image": "https://country-code-au6g.vercel.app/ID.svg",
        "dial_code": "+62"
    },
    {
        "name": "Ireland",
        "code": "IE",
        "emoji": "🇮🇪",
        "unicode": "U+1F1EE U+1F1EA",
        "image": "https://country-code-au6g.vercel.app/IE.svg",
        "dial_code": "+353"
    },
    {
        "name": "Israel",
        "code": "IL",
        "emoji": "🇮🇱",
        "unicode": "U+1F1EE U+1F1F1",
        "image": "https://country-code-au6g.vercel.app/IL.svg",
        "dial_code": "+972"
    },
    {
        "name": "Isle of Man",
        "code": "IM",
        "emoji": "🇮🇲",
        "unicode": "U+1F1EE U+1F1F2",
        "image": "https://country-code-au6g.vercel.app/IM.svg",
        "dial_code": "+44"
    },
    {
        "name": "India",
        "code": "IN",
        "emoji": "🇮🇳",
        "unicode": "U+1F1EE U+1F1F3",
        "image": "https://country-code-au6g.vercel.app/IN.svg",
        "dial_code": "+91"
    },
    {
        "name": "British Indian Ocean Territory",
        "code": "IO",
        "emoji": "🇮🇴",
        "unicode": "U+1F1EE U+1F1F4",
        "image": "https://country-code-au6g.vercel.app/IO.svg",
        "dial_code": "+246"
    },
    {
        "name": "Iraq",
        "code": "IQ",
        "emoji": "🇮🇶",
        "unicode": "U+1F1EE U+1F1F6",
        "image": "https://country-code-au6g.vercel.app/IQ.svg",
        "dial_code": "+964"
    },
    {
        "name": "Iran",
        "code": "IR",
        "emoji": "🇮🇷",
        "unicode": "U+1F1EE U+1F1F7",
        "image": "https://country-code-au6g.vercel.app/IR.svg",
        "dial_code": "+98"
    },
    {
        "name": "Iceland",
        "code": "IS",
        "emoji": "🇮🇸",
        "unicode": "U+1F1EE U+1F1F8",
        "image": "https://country-code-au6g.vercel.app/IS.svg",
        "dial_code": "+354"
    },
    {
        "name": "Italy",
        "code": "IT",
        "emoji": "🇮🇹",
        "unicode": "U+1F1EE U+1F1F9",
        "image": "https://country-code-au6g.vercel.app/IT.svg",
        "dial_code": "+39"
    },
    {
        "name": "Jersey",
        "code": "JE",
        "emoji": "🇯🇪",
        "unicode": "U+1F1EF U+1F1EA",
        "image": "https://country-code-au6g.vercel.app/JE.svg",
        "dial_code": "+44"
    },
    {
        "name": "Jamaica",
        "code": "JM",
        "emoji": "🇯🇲",
        "unicode": "U+1F1EF U+1F1F2",
        "image": "https://country-code-au6g.vercel.app/JM.svg",
        "dial_code": "+1876"
    },
    {
        "name": "Jordan",
        "code": "JO",
        "emoji": "🇯🇴",
        "unicode": "U+1F1EF U+1F1F4",
        "image": "https://country-code-au6g.vercel.app/JO.svg",
        "dial_code": "+962"
    },
    {
        "name": "Japan",
        "code": "JP",
        "emoji": "🇯🇵",
        "unicode": "U+1F1EF U+1F1F5",
        "image": "https://country-code-au6g.vercel.app/JP.svg",
        "dial_code": "+81"
    },
    {
        "name": "Kenya",
        "code": "KE",
        "emoji": "🇰🇪",
        "unicode": "U+1F1F0 U+1F1EA",
        "image": "https://country-code-au6g.vercel.app/KE.svg",
        "dial_code": "+254"
    },
    {
        "name": "Kyrgyzstan",
        "code": "KG",
        "emoji": "🇰🇬",
        "unicode": "U+1F1F0 U+1F1EC",
        "image": "https://country-code-au6g.vercel.app/KG.svg",
        "dial_code": "+996"
    },
    {
        "name": "Cambodia",
        "code": "KH",
        "emoji": "🇰🇭",
        "unicode": "U+1F1F0 U+1F1ED",
        "image": "https://country-code-au6g.vercel.app/KH.svg",
        "dial_code": "+855"
    },
    {
        "name": "Kiribati",
        "code": "KI",
        "emoji": "🇰🇮",
        "unicode": "U+1F1F0 U+1F1EE",
        "image": "https://country-code-au6g.vercel.app/KI.svg",
        "dial_code": "+686"
    },
    {
        "name": "Comoros",
        "code": "KM",
        "emoji": "🇰🇲",
        "unicode": "U+1F1F0 U+1F1F2",
        "image": "https://country-code-au6g.vercel.app/KM.svg",
        "dial_code": "+269"
    },
    {
        "name": "St. Kitts & Nevis",
        "code": "KN",
        "emoji": "🇰🇳",
        "unicode": "U+1F1F0 U+1F1F3",
        "image": "https://country-code-au6g.vercel.app/KN.svg",
        "dial_code": "+1869"
    },
    {
        "name": "North Korea",
        "code": "KP",
        "emoji": "🇰🇵",
        "unicode": "U+1F1F0 U+1F1F5",
        "image": "https://country-code-au6g.vercel.app/KP.svg",
        "dial_code": "+850"
    },
    {
        "name": "South Korea",
        "code": "KR",
        "emoji": "🇰🇷",
        "unicode": "U+1F1F0 U+1F1F7",
        "image": "https://country-code-au6g.vercel.app/KR.svg",
        "dial_code": "+82"
    },
    {
        "name": "Kuwait",
        "code": "KW",
        "emoji": "🇰🇼",
        "unicode": "U+1F1F0 U+1F1FC",
        "image": "https://country-code-au6g.vercel.app/KW.svg",
        "dial_code": "+965"
    },
    {
        "name": "Cayman Islands",
        "code": "KY",
        "emoji": "🇰🇾",
        "unicode": "U+1F1F0 U+1F1FE",
        "image": "https://country-code-au6g.vercel.app/KY.svg",
        "dial_code": "+ 345"
    },
    {
        "name": "Kazakhstan",
        "code": "KZ",
        "emoji": "🇰🇿",
        "unicode": "U+1F1F0 U+1F1FF",
        "image": "https://country-code-au6g.vercel.app/KZ.svg",
        "dial_code": "+77"
    },
    {
        "name": "Laos",
        "code": "LA",
        "emoji": "🇱🇦",
        "unicode": "U+1F1F1 U+1F1E6",
        "image": "https://country-code-au6g.vercel.app/LA.svg",
        "dial_code": "+856"
    },
    {
        "name": "Lebanon",
        "code": "LB",
        "emoji": "🇱🇧",
        "unicode": "U+1F1F1 U+1F1E7",
        "image": "https://country-code-au6g.vercel.app/LB.svg",
        "dial_code": "+961"
    },
    {
        "name": "St. Lucia",
        "code": "LC",
        "emoji": "🇱🇨",
        "unicode": "U+1F1F1 U+1F1E8",
        "image": "https://country-code-au6g.vercel.app/LC.svg",
        "dial_code": "+1758"
    },
    {
        "name": "Liechtenstein",
        "code": "LI",
        "emoji": "🇱🇮",
        "unicode": "U+1F1F1 U+1F1EE",
        "image": "https://country-code-au6g.vercel.app/LI.svg",
        "dial_code": "+423"
    },
    {
        "name": "Sri Lanka",
        "code": "LK",
        "emoji": "🇱🇰",
        "unicode": "U+1F1F1 U+1F1F0",
        "image": "https://country-code-au6g.vercel.app/LK.svg",
        "dial_code": "+94"
    },
    {
        "name": "Liberia",
        "code": "LR",
        "emoji": "🇱🇷",
        "unicode": "U+1F1F1 U+1F1F7",
        "image": "https://country-code-au6g.vercel.app/LR.svg",
        "dial_code": "+231"
    },
    {
        "name": "Lesotho",
        "code": "LS",
        "emoji": "🇱🇸",
        "unicode": "U+1F1F1 U+1F1F8",
        "image": "https://country-code-au6g.vercel.app/LS.svg",
        "dial_code": "+266"
    },
    {
        "name": "Lithuania",
        "code": "LT",
        "emoji": "🇱🇹",
        "unicode": "U+1F1F1 U+1F1F9",
        "image": "https://country-code-au6g.vercel.app/LT.svg",
        "dial_code": "+370"
    },
    {
        "name": "Luxembourg",
        "code": "LU",
        "emoji": "🇱🇺",
        "unicode": "U+1F1F1 U+1F1FA",
        "image": "https://country-code-au6g.vercel.app/LU.svg",
        "dial_code": "+352"
    },
    {
        "name": "Latvia",
        "code": "LV",
        "emoji": "🇱🇻",
        "unicode": "U+1F1F1 U+1F1FB",
        "image": "https://country-code-au6g.vercel.app/LV.svg",
        "dial_code": "+371"
    },
    {
        "name": "Libya",
        "code": "LY",
        "emoji": "🇱🇾",
        "unicode": "U+1F1F1 U+1F1FE",
        "image": "https://country-code-au6g.vercel.app/LY.svg",
        "dial_code": "+218"
    },
    {
        "name": "Morocco",
        "code": "MA",
        "emoji": "🇲🇦",
        "unicode": "U+1F1F2 U+1F1E6",
        "image": "https://country-code-au6g.vercel.app/MA.svg",
        "dial_code": "+212"
    },
    {
        "name": "Monaco",
        "code": "MC",
        "emoji": "🇲🇨",
        "unicode": "U+1F1F2 U+1F1E8",
        "image": "https://country-code-au6g.vercel.app/MC.svg",
        "dial_code": "+377"
    },
    {
        "name": "Moldova",
        "code": "MD",
        "emoji": "🇲🇩",
        "unicode": "U+1F1F2 U+1F1E9",
        "image": "https://country-code-au6g.vercel.app/MD.svg",
        "dial_code": "+373"
    },
    {
        "name": "Montenegro",
        "code": "ME",
        "emoji": "🇲🇪",
        "unicode": "U+1F1F2 U+1F1EA",
        "image": "https://country-code-au6g.vercel.app/ME.svg",
        "dial_code": "+382"
    },
    {
        "name": "St. Martin",
        "code": "MF",
        "emoji": "🇲🇫",
        "unicode": "U+1F1F2 U+1F1EB",
        "image": "https://country-code-au6g.vercel.app/MF.svg",
        "dial_code": "+590"
    },
    {
        "name": "Madagascar",
        "code": "MG",
        "emoji": "🇲🇬",
        "unicode": "U+1F1F2 U+1F1EC",
        "image": "https://country-code-au6g.vercel.app/MG.svg",
        "dial_code": "+261"
    },
    {
        "name": "Marshall Islands",
        "code": "MH",
        "emoji": "🇲🇭",
        "unicode": "U+1F1F2 U+1F1ED",
        "image": "https://country-code-au6g.vercel.app/MH.svg",
        "dial_code": "+692"
    },
    {
        "name": "North Macedonia",
        "code": "MK",
        "emoji": "🇲🇰",
        "unicode": "U+1F1F2 U+1F1F0",
        "image": "https://country-code-au6g.vercel.app/MK.svg",
        "dial_code": "+389"
    },
    {
        "name": "Mali",
        "code": "ML",
        "emoji": "🇲🇱",
        "unicode": "U+1F1F2 U+1F1F1",
        "image": "https://country-code-au6g.vercel.app/ML.svg",
        "dial_code": "+223"
    },
    {
        "name": "Myanmar (Burma)",
        "code": "MM",
        "emoji": "🇲🇲",
        "unicode": "U+1F1F2 U+1F1F2",
        "image": "https://country-code-au6g.vercel.app/MM.svg",
        "dial_code": "+95"
    },
    {
        "name": "Mongolia",
        "code": "MN",
        "emoji": "🇲🇳",
        "unicode": "U+1F1F2 U+1F1F3",
        "image": "https://country-code-au6g.vercel.app/MN.svg",
        "dial_code": "+976"
    },
    {
        "name": "Macao SAR China",
        "code": "MO",
        "emoji": "🇲🇴",
        "unicode": "U+1F1F2 U+1F1F4",
        "image": "https://country-code-au6g.vercel.app/MO.svg",
        "dial_code": "+853"
    },
    {
        "name": "Northern Mariana Islands",
        "code": "MP",
        "emoji": "🇲🇵",
        "unicode": "U+1F1F2 U+1F1F5",
        "image": "https://country-code-au6g.vercel.app/MP.svg",
        "dial_code": "+1670"
    },
    {
        "name": "Martinique",
        "code": "MQ",
        "emoji": "🇲🇶",
        "unicode": "U+1F1F2 U+1F1F6",
        "image": "https://country-code-au6g.vercel.app/MQ.svg",
        "dial_code": "+596"
    },
    {
        "name": "Mauritania",
        "code": "MR",
        "emoji": "🇲🇷",
        "unicode": "U+1F1F2 U+1F1F7",
        "image": "https://country-code-au6g.vercel.app/MR.svg",
        "dial_code": "+222"
    },
    {
        "name": "Montserrat",
        "code": "MS",
        "emoji": "🇲🇸",
        "unicode": "U+1F1F2 U+1F1F8",
        "image": "https://country-code-au6g.vercel.app/MS.svg",
        "dial_code": "+1664"
    },
    {
        "name": "Malta",
        "code": "MT",
        "emoji": "🇲🇹",
        "unicode": "U+1F1F2 U+1F1F9",
        "image": "https://country-code-au6g.vercel.app/MT.svg",
        "dial_code": "+356"
    },
    {
        "name": "Mauritius",
        "code": "MU",
        "emoji": "🇲🇺",
        "unicode": "U+1F1F2 U+1F1FA",
        "image": "https://country-code-au6g.vercel.app/MU.svg",
        "dial_code": "+230"
    },
    {
        "name": "Maldives",
        "code": "MV",
        "emoji": "🇲🇻",
        "unicode": "U+1F1F2 U+1F1FB",
        "image": "https://country-code-au6g.vercel.app/MV.svg",
        "dial_code": "+960"
    },
    {
        "name": "Malawi",
        "code": "MW",
        "emoji": "🇲🇼",
        "unicode": "U+1F1F2 U+1F1FC",
        "image": "https://country-code-au6g.vercel.app/MW.svg",
        "dial_code": "+265"
    },
    {
        "name": "Mexico",
        "code": "MX",
        "emoji": "🇲🇽",
        "unicode": "U+1F1F2 U+1F1FD",
        "image": "https://country-code-au6g.vercel.app/MX.svg",
        "dial_code": "+52"
    },
    {
        "name": "Malaysia",
        "code": "MY",
        "emoji": "🇲🇾",
        "unicode": "U+1F1F2 U+1F1FE",
        "image": "https://country-code-au6g.vercel.app/MY.svg",
        "dial_code": "+60"
    },
    {
        "name": "Mozambique",
        "code": "MZ",
        "emoji": "🇲🇿",
        "unicode": "U+1F1F2 U+1F1FF",
        "image": "https://country-code-au6g.vercel.app/MZ.svg",
        "dial_code": "+258"
    },
    {
        "name": "Namibia",
        "code": "NA",
        "emoji": "🇳🇦",
        "unicode": "U+1F1F3 U+1F1E6",
        "image": "https://country-code-au6g.vercel.app/NA.svg",
        "dial_code": "+264"
    },
    {
        "name": "New Caledonia",
        "code": "NC",
        "emoji": "🇳🇨",
        "unicode": "U+1F1F3 U+1F1E8",
        "image": "https://country-code-au6g.vercel.app/NC.svg",
        "dial_code": "+687"
    },
    {
        "name": "Niger",
        "code": "NE",
        "emoji": "🇳🇪",
        "unicode": "U+1F1F3 U+1F1EA",
        "image": "https://country-code-au6g.vercel.app/NE.svg",
        "dial_code": "+227"
    },
    {
        "name": "Norfolk Island",
        "code": "NF",
        "emoji": "🇳🇫",
        "unicode": "U+1F1F3 U+1F1EB",
        "image": "https://country-code-au6g.vercel.app/NF.svg",
        "dial_code": "+672"
    },
    {
        "name": "Nigeria",
        "code": "NG",
        "emoji": "🇳🇬",
        "unicode": "U+1F1F3 U+1F1EC",
        "image": "https://country-code-au6g.vercel.app/NG.svg",
        "dial_code": "+234"
    },
    {
        "name": "Nicaragua",
        "code": "NI",
        "emoji": "🇳🇮",
        "unicode": "U+1F1F3 U+1F1EE",
        "image": "https://country-code-au6g.vercel.app/NI.svg",
        "dial_code": "+505"
    },
    {
        "name": "Netherlands",
        "code": "NL",
        "emoji": "🇳🇱",
        "unicode": "U+1F1F3 U+1F1F1",
        "image": "https://country-code-au6g.vercel.app/NL.svg",
        "dial_code": "+31"
    },
    {
        "name": "Norway",
        "code": "NO",
        "emoji": "🇳🇴",
        "unicode": "U+1F1F3 U+1F1F4",
        "image": "https://country-code-au6g.vercel.app/NO.svg",
        "dial_code": "+47"
    },
    {
        "name": "Nepal",
        "code": "NP",
        "emoji": "🇳🇵",
        "unicode": "U+1F1F3 U+1F1F5",
        "image": "https://country-code-au6g.vercel.app/NP.svg",
        "dial_code": "+977"
    },
    {
        "name": "Nauru",
        "code": "NR",
        "emoji": "🇳🇷",
        "unicode": "U+1F1F3 U+1F1F7",
        "image": "https://country-code-au6g.vercel.app/NR.svg",
        "dial_code": "+674"
    },
    {
        "name": "Niue",
        "code": "NU",
        "emoji": "🇳🇺",
        "unicode": "U+1F1F3 U+1F1FA",
        "image": "https://country-code-au6g.vercel.app/NU.svg",
        "dial_code": "+683"
    },
    {
        "name": "New Zealand",
        "code": "NZ",
        "emoji": "🇳🇿",
        "unicode": "U+1F1F3 U+1F1FF",
        "image": "https://country-code-au6g.vercel.app/NZ.svg",
        "dial_code": "+64"
    },
    {
        "name": "Oman",
        "code": "OM",
        "emoji": "🇴🇲",
        "unicode": "U+1F1F4 U+1F1F2",
        "image": "https://country-code-au6g.vercel.app/OM.svg",
        "dial_code": "+968"
    },
    {
        "name": "Panama",
        "code": "PA",
        "emoji": "🇵🇦",
        "unicode": "U+1F1F5 U+1F1E6",
        "image": "https://country-code-au6g.vercel.app/PA.svg",
        "dial_code": "+507"
    },
    {
        "name": "Peru",
        "code": "PE",
        "emoji": "🇵🇪",
        "unicode": "U+1F1F5 U+1F1EA",
        "image": "https://country-code-au6g.vercel.app/PE.svg",
        "dial_code": "+51"
    },
    {
        "name": "French Polynesia",
        "code": "PF",
        "emoji": "🇵🇫",
        "unicode": "U+1F1F5 U+1F1EB",
        "image": "https://country-code-au6g.vercel.app/PF.svg",
        "dial_code": "+689"
    },
    {
        "name": "Papua New Guinea",
        "code": "PG",
        "emoji": "🇵🇬",
        "unicode": "U+1F1F5 U+1F1EC",
        "image": "https://country-code-au6g.vercel.app/PG.svg",
        "dial_code": "+675"
    },
    {
        "name": "Philippines",
        "code": "PH",
        "emoji": "🇵🇭",
        "unicode": "U+1F1F5 U+1F1ED",
        "image": "https://country-code-au6g.vercel.app/PH.svg",
        "dial_code": "+63"
    },
    {
        "name": "Pakistan",
        "code": "PK",
        "emoji": "🇵🇰",
        "unicode": "U+1F1F5 U+1F1F0",
        "image": "https://country-code-au6g.vercel.app/PK.svg",
        "dial_code": "+92"
    },
    {
        "name": "Poland",
        "code": "PL",
        "emoji": "🇵🇱",
        "unicode": "U+1F1F5 U+1F1F1",
        "image": "https://country-code-au6g.vercel.app/PL.svg",
        "dial_code": "+48"
    },
    {
        "name": "St. Pierre & Miquelon",
        "code": "PM",
        "emoji": "🇵🇲",
        "unicode": "U+1F1F5 U+1F1F2",
        "image": "https://country-code-au6g.vercel.app/PM.svg",
        "dial_code": "+508"
    },
    {
        "name": "Pitcairn Islands",
        "code": "PN",
        "emoji": "🇵🇳",
        "unicode": "U+1F1F5 U+1F1F3",
        "image": "https://country-code-au6g.vercel.app/PN.svg",
        "dial_code": "+872"
    },
    {
        "name": "Puerto Rico",
        "code": "PR",
        "emoji": "🇵🇷",
        "unicode": "U+1F1F5 U+1F1F7",
        "image": "https://country-code-au6g.vercel.app/PR.svg",
        "dial_code": "+1939"
    },
    {
        "name": "Palestinian Territories",
        "code": "PS",
        "emoji": "🇵🇸",
        "unicode": "U+1F1F5 U+1F1F8",
        "image": "https://country-code-au6g.vercel.app/PS.svg",
        "dial_code": "+970"
    },
    {
        "name": "Portugal",
        "code": "PT",
        "emoji": "🇵🇹",
        "unicode": "U+1F1F5 U+1F1F9",
        "image": "https://country-code-au6g.vercel.app/PT.svg",
        "dial_code": "+351"
    },
    {
        "name": "Palau",
        "code": "PW",
        "emoji": "🇵🇼",
        "unicode": "U+1F1F5 U+1F1FC",
        "image": "https://country-code-au6g.vercel.app/PW.svg",
        "dial_code": "+680"
    },
    {
        "name": "Paraguay",
        "code": "PY",
        "emoji": "🇵🇾",
        "unicode": "U+1F1F5 U+1F1FE",
        "image": "https://country-code-au6g.vercel.app/PY.svg",
        "dial_code": "+595"
    },
    {
        "name": "Qatar",
        "code": "QA",
        "emoji": "🇶🇦",
        "unicode": "U+1F1F6 U+1F1E6",
        "image": "https://country-code-au6g.vercel.app/QA.svg",
        "dial_code": "+974"
    },
    {
        "name": "Réunion",
        "code": "RE",
        "emoji": "🇷🇪",
        "unicode": "U+1F1F7 U+1F1EA",
        "image": "https://country-code-au6g.vercel.app/RE.svg",
        "dial_code": "+262"
    },
    {
        "name": "Romania",
        "code": "RO",
        "emoji": "🇷🇴",
        "unicode": "U+1F1F7 U+1F1F4",
        "image": "https://country-code-au6g.vercel.app/RO.svg",
        "dial_code": "+40"
    },
    {
        "name": "Serbia",
        "code": "RS",
        "emoji": "🇷🇸",
        "unicode": "U+1F1F7 U+1F1F8",
        "image": "https://country-code-au6g.vercel.app/RS.svg",
        "dial_code": "+381"
    },
    {
        "name": "Russia",
        "code": "RU",
        "emoji": "🇷🇺",
        "unicode": "U+1F1F7 U+1F1FA",
        "image": "https://country-code-au6g.vercel.app/RU.svg",
        "dial_code": "+7"
    },
    {
        "name": "Rwanda",
        "code": "RW",
        "emoji": "🇷🇼",
        "unicode": "U+1F1F7 U+1F1FC",
        "image": "https://country-code-au6g.vercel.app/RW.svg",
        "dial_code": "+250"
    },
    {
        "name": "Saudi Arabia",
        "code": "SA",
        "emoji": "🇸🇦",
        "unicode": "U+1F1F8 U+1F1E6",
        "image": "https://country-code-au6g.vercel.app/SA.svg",
        "dial_code": "+966"
    },
    {
        "name": "Solomon Islands",
        "code": "SB",
        "emoji": "🇸🇧",
        "unicode": "U+1F1F8 U+1F1E7",
        "image": "https://country-code-au6g.vercel.app/SB.svg",
        "dial_code": "+677"
    },
    {
        "name": "Seychelles",
        "code": "SC",
        "emoji": "🇸🇨",
        "unicode": "U+1F1F8 U+1F1E8",
        "image": "https://country-code-au6g.vercel.app/SC.svg",
        "dial_code": "+248"
    },
    {
        "name": "Sudan",
        "code": "SD",
        "emoji": "🇸🇩",
        "unicode": "U+1F1F8 U+1F1E9",
        "image": "https://country-code-au6g.vercel.app/SD.svg",
        "dial_code": "+249"
    },
    {
        "name": "Sweden",
        "code": "SE",
        "emoji": "🇸🇪",
        "unicode": "U+1F1F8 U+1F1EA",
        "image": "https://country-code-au6g.vercel.app/SE.svg",
        "dial_code": "+46"
    },
    {
        "name": "Singapore",
        "code": "SG",
        "emoji": "🇸🇬",
        "unicode": "U+1F1F8 U+1F1EC",
        "image": "https://country-code-au6g.vercel.app/SG.svg",
        "dial_code": "+65"
    },
    {
        "name": "St. Helena",
        "code": "SH",
        "emoji": "🇸🇭",
        "unicode": "U+1F1F8 U+1F1ED",
        "image": "https://country-code-au6g.vercel.app/SH.svg",
        "dial_code": "+290"
    },
    {
        "name": "Slovenia",
        "code": "SI",
        "emoji": "🇸🇮",
        "unicode": "U+1F1F8 U+1F1EE",
        "image": "https://country-code-au6g.vercel.app/SI.svg",
        "dial_code": "+386"
    },
    {
        "name": "Svalbard & Jan Mayen",
        "code": "SJ",
        "emoji": "🇸🇯",
        "unicode": "U+1F1F8 U+1F1EF",
        "image": "https://country-code-au6g.vercel.app/SJ.svg",
        "dial_code": "+47"
    },
    {
        "name": "Slovakia",
        "code": "SK",
        "emoji": "🇸🇰",
        "unicode": "U+1F1F8 U+1F1F0",
        "image": "https://country-code-au6g.vercel.app/SK.svg",
        "dial_code": "+421"
    },
    {
        "name": "Sierra Leone",
        "code": "SL",
        "emoji": "🇸🇱",
        "unicode": "U+1F1F8 U+1F1F1",
        "image": "https://country-code-au6g.vercel.app/SL.svg",
        "dial_code": "+232"
    },
    {
        "name": "San Marino",
        "code": "SM",
        "emoji": "🇸🇲",
        "unicode": "U+1F1F8 U+1F1F2",
        "image": "https://country-code-au6g.vercel.app/SM.svg",
        "dial_code": "+378"
    },
    {
        "name": "Senegal",
        "code": "SN",
        "emoji": "🇸🇳",
        "unicode": "U+1F1F8 U+1F1F3",
        "image": "https://country-code-au6g.vercel.app/SN.svg",
        "dial_code": "+221"
    },
    {
        "name": "Somalia",
        "code": "SO",
        "emoji": "🇸🇴",
        "unicode": "U+1F1F8 U+1F1F4",
        "image": "https://country-code-au6g.vercel.app/SO.svg",
        "dial_code": "+252"
    },
    {
        "name": "Suriname",
        "code": "SR",
        "emoji": "🇸🇷",
        "unicode": "U+1F1F8 U+1F1F7",
        "image": "https://country-code-au6g.vercel.app/SR.svg",
        "dial_code": "+597"
    },
    {
        "name": "South Sudan",
        "code": "SS",
        "emoji": "🇸🇸",
        "unicode": "U+1F1F8 U+1F1F8",
        "image": "https://country-code-au6g.vercel.app/SS.svg",
        "dial_code": "+211"
    },
    {
        "name": "São Tomé & Príncipe",
        "code": "ST",
        "emoji": "🇸🇹",
        "unicode": "U+1F1F8 U+1F1F9",
        "image": "https://country-code-au6g.vercel.app/ST.svg",
        "dial_code": "+239"
    },
    {
        "name": "El Salvador",
        "code": "SV",
        "emoji": "🇸🇻",
        "unicode": "U+1F1F8 U+1F1FB",
        "image": "https://country-code-au6g.vercel.app/SV.svg",
        "dial_code": "+503"
    },
    {
        "name": "Syria",
        "code": "SY",
        "emoji": "🇸🇾",
        "unicode": "U+1F1F8 U+1F1FE",
        "image": "https://country-code-au6g.vercel.app/SY.svg",
        "dial_code": "+963"
    },
    {
        "name": "Eswatini",
        "code": "SZ",
        "emoji": "🇸🇿",
        "unicode": "U+1F1F8 U+1F1FF",
        "image": "https://country-code-au6g.vercel.app/SZ.svg",
        "dial_code": "+268"
    },
    {
        "name": "Turks & Caicos Islands",
        "code": "TC",
        "emoji": "🇹🇨",
        "unicode": "U+1F1F9 U+1F1E8",
        "image": "https://country-code-au6g.vercel.app/TC.svg",
        "dial_code": "+1649"
    },
    {
        "name": "Chad",
        "code": "TD",
        "emoji": "🇹🇩",
        "unicode": "U+1F1F9 U+1F1E9",
        "image": "https://country-code-au6g.vercel.app/TD.svg",
        "dial_code": "+235"
    },
    {
        "name": "Togo",
        "code": "TG",
        "emoji": "🇹🇬",
        "unicode": "U+1F1F9 U+1F1EC",
        "image": "https://country-code-au6g.vercel.app/TG.svg",
        "dial_code": "+228"
    },
    {
        "name": "Thailand",
        "code": "TH",
        "emoji": "🇹🇭",
        "unicode": "U+1F1F9 U+1F1ED",
        "image": "https://country-code-au6g.vercel.app/TH.svg",
        "dial_code": "+66"
    },
    {
        "name": "Tajikistan",
        "code": "TJ",
        "emoji": "🇹🇯",
        "unicode": "U+1F1F9 U+1F1EF",
        "image": "https://country-code-au6g.vercel.app/TJ.svg",
        "dial_code": "+992"
    },
    {
        "name": "Tokelau",
        "code": "TK",
        "emoji": "🇹🇰",
        "unicode": "U+1F1F9 U+1F1F0",
        "image": "https://country-code-au6g.vercel.app/TK.svg",
        "dial_code": "+690"
    },
    {
        "name": "Timor-Leste",
        "code": "TL",
        "emoji": "🇹🇱",
        "unicode": "U+1F1F9 U+1F1F1",
        "image": "https://country-code-au6g.vercel.app/TL.svg",
        "dial_code": "+670"
    },
    {
        "name": "Turkmenistan",
        "code": "TM",
        "emoji": "🇹🇲",
        "unicode": "U+1F1F9 U+1F1F2",
        "image": "https://country-code-au6g.vercel.app/TM.svg",
        "dial_code": "+993"
    },
    {
        "name": "Tunisia",
        "code": "TN",
        "emoji": "🇹🇳",
        "unicode": "U+1F1F9 U+1F1F3",
        "image": "https://country-code-au6g.vercel.app/TN.svg",
        "dial_code": "+216"
    },
    {
        "name": "Tonga",
        "code": "TO",
        "emoji": "🇹🇴",
        "unicode": "U+1F1F9 U+1F1F4",
        "image": "https://country-code-au6g.vercel.app/TO.svg",
        "dial_code": "+676"
    },
    {
        "name": "Turkey",
        "code": "TR",
        "emoji": "🇹🇷",
        "unicode": "U+1F1F9 U+1F1F7",
        "image": "https://country-code-au6g.vercel.app/TR.svg",
        "dial_code": "+90"
    },
    {
        "name": "Trinidad & Tobago",
        "code": "TT",
        "emoji": "🇹🇹",
        "unicode": "U+1F1F9 U+1F1F9",
        "image": "https://country-code-au6g.vercel.app/TT.svg",
        "dial_code": "+1868"
    },
    {
        "name": "Tuvalu",
        "code": "TV",
        "emoji": "🇹🇻",
        "unicode": "U+1F1F9 U+1F1FB",
        "image": "https://country-code-au6g.vercel.app/TV.svg",
        "dial_code": "+688"
    },
    {
        "name": "Taiwan",
        "code": "TW",
        "emoji": "🇹🇼",
        "unicode": "U+1F1F9 U+1F1FC",
        "image": "https://country-code-au6g.vercel.app/TW.svg",
        "dial_code": "+886"
    },
    {
        "name": "Tanzania",
        "code": "TZ",
        "emoji": "🇹🇿",
        "unicode": "U+1F1F9 U+1F1FF",
        "image": "https://country-code-au6g.vercel.app/TZ.svg",
        "dial_code": "+255"
    },
    {
        "name": "Ukraine",
        "code": "UA",
        "emoji": "🇺🇦",
        "unicode": "U+1F1FA U+1F1E6",
        "image": "https://country-code-au6g.vercel.app/UA.svg",
        "dial_code": "+380"
    },
    {
        "name": "Uganda",
        "code": "UG",
        "emoji": "🇺🇬",
        "unicode": "U+1F1FA U+1F1EC",
        "image": "https://country-code-au6g.vercel.app/UG.svg",
        "dial_code": "+256"
    },
    {
        "name": "United States",
        "code": "US",
        "emoji": "🇺🇸",
        "unicode": "U+1F1FA U+1F1F8",
        "image": "https://country-code-au6g.vercel.app/US.svg",
        "dial_code": "+1"
    },
    {
        "name": "Uruguay",
        "code": "UY",
        "emoji": "🇺🇾",
        "unicode": "U+1F1FA U+1F1FE",
        "image": "https://country-code-au6g.vercel.app/UY.svg",
        "dial_code": "+598"
    },
    {
        "name": "Uzbekistan",
        "code": "UZ",
        "emoji": "🇺🇿",
        "unicode": "U+1F1FA U+1F1FF",
        "image": "https://country-code-au6g.vercel.app/UZ.svg",
        "dial_code": "+998"
    },
    {
        "name": "Vatican City",
        "code": "VA",
        "emoji": "🇻🇦",
        "unicode": "U+1F1FB U+1F1E6",
        "image": "https://country-code-au6g.vercel.app/VA.svg",
        "dial_code": "+379"
    },
    {
        "name": "St. Vincent & Grenadines",
        "code": "VC",
        "emoji": "🇻🇨",
        "unicode": "U+1F1FB U+1F1E8",
        "image": "https://country-code-au6g.vercel.app/VC.svg",
        "dial_code": "+1784"
    },
    {
        "name": "Venezuela",
        "code": "VE",
        "emoji": "🇻🇪",
        "unicode": "U+1F1FB U+1F1EA",
        "image": "https://country-code-au6g.vercel.app/VE.svg",
        "dial_code": "+58"
    },
    {
        "name": "British Virgin Islands",
        "code": "VG",
        "emoji": "🇻🇬",
        "unicode": "U+1F1FB U+1F1EC",
        "image": "https://country-code-au6g.vercel.app/VG.svg",
        "dial_code": "+1284"
    },
    {
        "name": "U.S. Virgin Islands",
        "code": "VI",
        "emoji": "🇻🇮",
        "unicode": "U+1F1FB U+1F1EE",
        "image": "https://country-code-au6g.vercel.app/VI.svg",
        "dial_code": "+1340"
    },
    {
        "name": "Vietnam",
        "code": "VN",
        "emoji": "🇻🇳",
        "unicode": "U+1F1FB U+1F1F3",
        "image": "https://country-code-au6g.vercel.app/VN.svg",
        "dial_code": "+84"
    },
    {
        "name": "Vanuatu",
        "code": "VU",
        "emoji": "🇻🇺",
        "unicode": "U+1F1FB U+1F1FA",
        "image": "https://country-code-au6g.vercel.app/VU.svg",
        "dial_code": "+678"
    },
    {
        "name": "Wallis & Futuna",
        "code": "WF",
        "emoji": "🇼🇫",
        "unicode": "U+1F1FC U+1F1EB",
        "image": "https://country-code-au6g.vercel.app/WF.svg",
        "dial_code": "+681"
    },
    {
        "name": "Samoa",
        "code": "WS",
        "emoji": "🇼🇸",
        "unicode": "U+1F1FC U+1F1F8",
        "image": "https://country-code-au6g.vercel.app/WS.svg",
        "dial_code": "+685"
    },
    {
        "name": "Yemen",
        "code": "YE",
        "emoji": "🇾🇪",
        "unicode": "U+1F1FE U+1F1EA",
        "image": "https://country-code-au6g.vercel.app/YE.svg",
        "dial_code": "+967"
    },
    {
        "name": "Mayotte",
        "code": "YT",
        "emoji": "🇾🇹",
        "unicode": "U+1F1FE U+1F1F9",
        "image": "https://country-code-au6g.vercel.app/YT.svg",
        "dial_code": "+262"
    },
    {
        "name": "South Africa",
        "code": "ZA",
        "emoji": "🇿🇦",
        "unicode": "U+1F1FF U+1F1E6",
        "image": "https://country-code-au6g.vercel.app/ZA.svg",
        "dial_code": "+27"
    },
    {
        "name": "Zambia",
        "code": "ZM",
        "emoji": "🇿🇲",
        "unicode": "U+1F1FF U+1F1F2",
        "image": "https://country-code-au6g.vercel.app/ZM.svg",
        "dial_code": "+260"
    },
    {
        "name": "Zimbabwe",
        "code": "ZW",
        "emoji": "🇿🇼",
        "unicode": "U+1F1FF U+1F1FC",
        "image": "https://country-code-au6g.vercel.app/ZW.svg",
        "dial_code": "+263"
    }
]


const mockProperties = [
  {
    id: 1,
    title: 'Prime Land in Victoria Island',
    location: 'Victoria Island, Lagos',
    size: 1000,
    price: 250000,
    docsVerified: true,
    image: 'https://placehold.co/600x400/D1D5DB/1F2937?text=Victoria+Island+Land',
  },
  {
    id: 2,
    title: 'Residential Plot in Ikeja',
    location: 'Ikeja, Lagos',
    size: 750,
    price: 150000,
    docsVerified: true,
    image: 'https://placehold.co/600x400/D1D5DB/1F2937?text=Ikeja+Plot',
  },
  {
    id: 3,
    title: 'Rural Land in Odeda',
    location: 'Odeda, Ogun',
    size: 2000,
    price: 50000,
    docsVerified: false,
    image: 'https://placehold.co/600x400/D1D5DB/1F2937?text=Odeda+Land',
  },
  {
    id: 4,
    title: 'Commercial Land in Bwari',
    location: 'Bwari, Abuja',
    size: 1500,
    price: 180000,
    docsVerified: true,
    image: 'https://placehold.co/600x400/D1D5DB/1F2937?text=Bwari+Plot',
  },
  {
    id: 5,
    title: 'Family Plot in Surulere',
    location: 'Surulere, Lagos',
    size: 500,
    price: 120000,
    docsVerified: true,
    image: 'https://placehold.co/600x400/D1D5DB/1F2937?text=Surulere+Plot',
  },
];


export const countryCodes = [
    { code: '+376', name: 'Andorra' }, { code: '+971', name: 'United Arab Emirates' }, { code: '+93', name: 'Afghanistan' }, { code: '+1268', name: 'Antigua & Barbuda' },
    { code: '+1264', name: 'Anguilla' }, { code: '+355', name: 'Albania' }, { code: '+374', name: 'Armenia' }, { code: '+244', name: 'Angola' },
    { code: '+672', name: 'Antarctica' }, { code: '+54', name: 'Argentina' }, { code: '+1684', name: 'American Samoa' }, { code: '+43', name: 'Austria' },
    { code: '+61', name: 'Australia' }, { code: '+297', name: 'Aruba' }, { code: '+358', name: 'Åland Islands' }, { code: '+994', name: 'Azerbaijan' },
    { code: '+387', name: 'Bosnia & Herzegovina' }, { code: '+1246', name: 'Barbados' }, { code: '+880', name: 'Bangladesh' }, { code: '+32', name: 'Belgium' },
    { code: '+226', name: 'Burkina Faso' }, { code: '+359', name: 'Bulgaria' }, { code: '+973', name: 'Bahrain' }, { code: '+257', name: 'Burundi' },
    { code: '+229', name: 'Benin' }, { code: '+590', name: 'St. Barthélemy' }, { code: '+1441', name: 'Bermuda' }, { code: '+673', name: 'Brunei' },
    { code: '+591', name: 'Bolivia' }, { code: '+55', name: 'Brazil' }, { code: '+1242', name: 'Bahamas' }, { code: '+975', name: 'Bhutan' },
    { code: '+267', name: 'Botswana' }, { code: '+375', name: 'Belarus' }, { code: '+501', name: 'Belize' }, { code: '+1', name: 'Canada' },
    { code: '+61', name: 'Cocos (Keeling) Islands' }, { code: '+243', name: 'Congo - Kinshasa' }, { code: '+236', name: 'Central African Republic' }, { code: '+242', name: 'Congo - Brazzaville' },
    { code: '+41', name: 'Switzerland' }, { code: '+225', name: 'Côte d’Ivoire' }, { code: '+682', name: 'Cook Islands' }, { code: '+56', name: 'Chile' },
    { code: '+237', name: 'Cameroon' }, { code: '+86', name: 'China' }, { code: '+57', name: 'Colombia' }, { code: '+506', name: 'Costa Rica' },
    { code: '+53', name: 'Cuba' }, { code: '+238', name: 'Cape Verde' }, { code: '+61', name: 'Christmas Island' }, { code: '+357', name: 'Cyprus' },
    { code: '+420', name: 'Czechia' }, { code: '+49', name: 'Germany' }, { code: '+253', name: 'Djibouti' }, { code: '+45', name: 'Denmark' },
    { code: '+1767', name: 'Dominica' }, { code: '+1849', name: 'Dominican Republic' }, { code: '+213', name: 'Algeria' }, { code: '+593', name: 'Ecuador' },
    { code: '+372', name: 'Estonia' }, { code: '+20', name: 'Egypt' }, { code: '+291', name: 'Eritrea' }, { code: '+34', name: 'Spain' },
    { code: '+251', name: 'Ethiopia' }, { code: '+358', name: 'Finland' }, { code: '+679', name: 'Fiji' }, { code: '+500', name: 'Falkland Islands' },
    { code: '+691', name: 'Micronesia' }, { code: '+298', name: 'Faroe Islands' }, { code: '+33', name: 'France' }, { code: '+241', name: 'Gabon' },
    { code: '+44', name: 'United Kingdom' }, { code: '+1473', name: 'Grenada' }, { code: '+995', name: 'Georgia' }, { code: '+594', name: 'French Guiana' },
    { code: '+44', name: 'Guernsey' }, { code: '+233', name: 'Ghana' }, { code: '+350', name: 'Gibraltar' }, { code: '+299', name: 'Greenland' },
    { code: '+220', name: 'Gambia' }, { code: '+224', name: 'Guinea' }, { code: '+590', name: 'Guadeloupe' }, { code: '+240', name: 'Equatorial Guinea' },
    { code: '+30', name: 'Greece' }, { code: '+500', name: 'South Georgia & South Sandwich Islands' }, { code: '+502', name: 'Guatemala' }, { code: '+1671', name: 'Guam' },
    { code: '+245', name: 'Guinea-Bissau' }, { code: '+595', name: 'Guyana' }, { code: '+852', name: 'Hong Kong SAR China' }, { code: '+504', name: 'Honduras' },
    { code: '+385', name: 'Croatia' }, { code: '+509', name: 'Haiti' }, { code: '+36', name: 'Hungary' }, { code: '+62', name: 'Indonesia' },
    { code: '+353', name: 'Ireland' }, { code: '+972', name: 'Israel' }, { code: '+44', name: 'Isle of Man' }, { code: '+91', name: 'India' },
    { code: '+246', name: 'British Indian Ocean Territory' }, { code: '+964', name: 'Iraq' }, { code: '+98', name: 'Iran' }, { code: '+354', name: 'Iceland' },
    { code: '+39', name: 'Italy' }, { code: '+44', name: 'Jersey' }, { code: '+1876', name: 'Jamaica' }, { code: '+962', name: 'Jordan' },
    { code: '+81', name: 'Japan' }, { code: '+254', name: 'Kenya' }, { code: '+996', name: 'Kyrgyzstan' }, { code: '+855', name: 'Cambodia' },
    { code: '+686', name: 'Kiribati' }, { code: '+269', name: 'Comoros' }, { code: '+1869', name: 'St. Kitts & Nevis' }, { code: '+850', name: 'North Korea' },
    { code: '+82', name: 'South Korea' }, { code: '+965', name: 'Kuwait' }, { code: '+345', name: 'Cayman Islands' }, { code: '+77', name: 'Kazakhstan' },
    { code: '+856', name: 'Laos' }, { code: '+961', name: 'Lebanon' }, { code: '+1758', name: 'St. Lucia' }, { code: '+423', name: 'Liechtenstein' },
    { code: '+94', name: 'Sri Lanka' }, { code: '+231', name: 'Liberia' }, { code: '+266', name: 'Lesotho' }, { code: '+370', name: 'Lithuania' },
    { code: '+352', name: 'Luxembourg' }, { code: '+371', name: 'Latvia' }, { code: '+218', name: 'Libya' }, { code: '+212', name: 'Morocco' },
    { code: '+377', name: 'Monaco' }, { code: '+373', name: 'Moldova' }, { code: '+382', name: 'Montenegro' }, { code: '+590', name: 'St. Martin' },
    { code: '+261', name: 'Madagascar' }, { code: '+692', name: 'Marshall Islands' }, { code: '+389', name: 'North Macedonia' }, { code: '+223', name: 'Mali' },
    { code: '+95', name: 'Myanmar (Burma)' }, { code: '+976', name: 'Mongolia' }, { code: '+853', name: 'Macao SAR China' }, { code: '+1670', name: 'Northern Mariana Islands' },
    { code: '+596', name: 'Martinique' }, { code: '+222', name: 'Mauritania' }, { code: '+1664', name: 'Montserrat' }, { code: '+356', name: 'Malta' },
    { code: '+230', name: 'Mauritius' }, { code: '+960', name: 'Maldives' }, { code: '+265', name: 'Malawi' }, { code: '+52', name: 'Mexico' },
    { code: '+60', name: 'Malaysia' }, { code: '+258', name: 'Mozambique' }, { code: '+264', name: 'Namibia' }, { code: '+687', name: 'New Caledonia' },
    { code: '+227', name: 'Niger' }, { code: '+672', name: 'Norfolk Island' }, { code: '+234', name: 'Nigeria' }, { code: '+505', name: 'Nicaragua' },
    { code: '+31', name: 'Netherlands' }, { code: '+47', name: 'Norway' }, { code: '+977', name: 'Nepal' }, { code: '+674', name: 'Nauru' },
    { code: '+683', name: 'Niue' }, { code: '+64', name: 'New Zealand' }, { code: '+968', name: 'Oman' }, { code: '+507', name: 'Panama' },
    { code: '+51', name: 'Peru' }, { code: '+689', name: 'French Polynesia' }, { code: '+675', name: 'Papua New Guinea' }, { code: '+63', name: 'Philippines' },
    { code: '+92', name: 'Pakistan' }, { code: '+48', name: 'Poland' }, { code: '+508', name: 'St. Pierre & Miquelon' }, { code: '+872', name: 'Pitcairn Islands' },
    { code: '+1939', name: 'Puerto Rico' }, { code: '+970', name: 'Palestinian Territories' }, { code: '+351', name: 'Portugal' }, { code: '+680', name: 'Palau' },
    { code: '+595', name: 'Paraguay' }, { code: '+974', name: 'Qatar' }, { code: '+262', name: 'Réunion' }, { code: '+40', name: 'Romania' },
    { code: '+381', name: 'Serbia' }, { code: '+7', name: 'Russia' }, { code: '+250', name: 'Rwanda' }, { code: '+966', name: 'Saudi Arabia' },
    { code: '+677', name: 'Solomon Islands' }, { code: '+248', name: 'Seychelles' }, { code: '+249', name: 'Sudan' }, { code: '+46', name: 'Sweden' },
    { code: '+65', name: 'Singapore' }, { code: '+290', name: 'St. Helena' }, { code: '+386', name: 'Slovenia' }, { code: '+47', name: 'Svalbard & Jan Mayen' },
    { code: '+421', name: 'Slovakia' }, { code: '+232', name: 'Sierra Leone' }, { code: '+378', name: 'San Marino' }, { code: '+221', name: 'Senegal' },
    { code: '+252', name: 'Somalia' }, { code: '+597', name: 'Suriname' }, { code: '+211', name: 'South Sudan' }, { code: '+239', name: 'São Tomé & Príncipe' },
    { code: '+503', name: 'El Salvador' }, { code: '+963', name: 'Syria' }, { code: '+268', name: 'Eswatini' }, { code: '+1649', name: 'Turks & Caicos Islands' },
    { code: '+235', name: 'Chad' }, { code: '+228', name: 'Togo' }, { code: '+66', name: 'Thailand' }, { code: '+992', name: 'Tajikistan' },
    { code: '+690', name: 'Tokelau' }, { code: '+670', name: 'Timor-Leste' }, { code: '+993', name: 'Turkmenistan' }, { code: '+216', name: 'Tunisia' },
    { code: '+676', name: 'Tonga' }, { code: '+90', name: 'Turkey' }, { code: '+1868', name: 'Trinidad & Tobago' }, { code: '+688', name: 'Tuvalu' },
    { code: '+886', name: 'Taiwan' }, { code: '+255', name: 'Tanzania' }, { code: '+380', name: 'Ukraine' }, { code: '+256', name: 'Uganda' },
    { code: '+1', name: 'United States' }, { code: '+598', name: 'Uruguay' }, { code: '+998', name: 'Uzbekistan' }, { code: '+379', name: 'Vatican City' },
    { code: '+1784', name: 'St. Vincent & Grenadines' }, { code: '+58', name: 'Venezuela' }, { code: '+1284', name: 'British Virgin Islands' }, { code: '+1340', name: 'U.S. Virgin Islands' },
    { code: '+84', name: 'Vietnam' }, { code: '+678', name: 'Vanuatu' }, { code: '+681', name: 'Wallis & Futuna' }, { code: '+685', name: 'Samoa' },
    { code: '+967', name: 'Yemen' }, { code: '+262', name: 'Mayotte' }, { code: '+27', name: 'South Africa' }, { code: '+260', name: 'Zambia' },
    { code: '+263', name: 'Zimbabwe' }
  ];

  
export const faqData = [
  {
    title: 'General Questions',
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z',
    faqs: [
      {
        question: 'What is Space Match and how does it work?',
        answer: 'Space Match is an innovative platform that provides three core solutions: FlexiHabitat for smart prefab homes, TerraTribe for co-ownership matching, and RootsManor for transparent brick-and-mortar home building. We connect you with verified vendors, partners, and services to streamline your home ownership or construction journey.',
      },
      {
        question: 'How do I get started with one of your solutions?',
        answer: 'Simply navigate to our solutions page and click "Start Here" on the option that best fits your needs. Our guided process will walk you through each step, from initial selection to project completion. You can switch between solutions as needed.',
      },
      {
        question: 'What kind of support is available during the process?',
        answer: 'For each project, you will be assigned a dedicated project manager. All communication is conducted through our secure internal chat system, ensuring a transparent and verifiable record of all discussions and decisions.',
      },
      {
        question: 'How do you ensure the security and privacy of my data?',
        answer: 'We use industry-standard encryption and security protocols to protect your personal and financial information. Payment processing is handled by a secure, third-party payment gateway, and we do not store your card details on our servers. Your information is only shared with partners and vendors with your explicit consent.',
      },
      {
        question: 'How are your partners and vendors vetted?',
        answer: 'All our partners, including architects, contractors, and legal advisors, undergo a rigorous vetting process that includes background checks, license verification, and a review of past projects to ensure they meet our high standards for quality and reliability.',
      },
    ],
  },
  {
    title: 'FlexiHabitat',
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c-1.38 0-2.5 1.12-2.5 2.5S10.62 11 12 11s2.5-1.12 2.5-2.5S13.38 6 12 6zm-2 14c-2.67 0-8-1.34-8-4v-1c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v1c0 2.66-5.33 4-8 4z',
    faqs: [
      {
        question: 'What is included in the standard price of a space capsule?',
        answer: 'The standard price includes the cost of the home from the vendor and the standard shipment cost. It does not include additional services like civil works, landscaping, electrical/water connections, or furniture. These can be added as optional features at an additional cost.',
      },
      {
        question: 'Can I customize the interior layout and finishes?',
        answer: 'Yes, our FlexiHabitat homes come with a range of customization options. You can select different finishes, colors, and add smart features and appliances to personalize your space. A detailed configurator is available during the ordering process.',
      },
      {
        question: 'How long does the manufacturing and delivery process take?',
        answer: 'Manufacturing typically takes 4-6 weeks, and standard shipment to the local port takes an additional 2-3 weeks. The final delivery and on-site setup depend on your location and the complexity of the civil works, but we provide an estimated timeline upfront.',
      },
      {
        question: 'Are the homes mobile?',
        answer: 'Yes, the FlexiHabitat homes are designed as prefabricated units that can be moved. While they are built to be a permanent structure, their modular design allows for relocation should your needs change.',
      },
    ],
  },
  {
    title: 'TerraTribe',
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.38 0 2.5 1.12 2.5 2.5S13.38 11 12 11s-2.5-1.12-2.5-2.5S10.62 6 12 6zm-2 14c-2.67 0-8-1.34-8-4v-1c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v1c0 2.66-5.33 4-8 4z',
    faqs: [
      {
        question: 'How does the co-ownership matching process work?',
        answer: 'Our intelligent matchmaker algorithm connects you with individuals or groups who share your preferences for location, budget, lifestyle, and property type. You can browse and filter matches, but a subscription is required to connect and chat with them.',
      },
      {
        question: 'What if I don\'t find a suitable match?',
        answer: 'Our matching algorithm continuously searches for new partners who fit your criteria. If a match is not found immediately, you will be notified as soon as a new potential partner joins the platform. You can also adjust your preferences to broaden your search.',
      },
      {
        question: 'How do you handle disputes between co-owners?',
        answer: 'Disputes are first handled through good faith negotiation. If this fails, our co-ownership agreement mandates a formal mediation process. Our optional mediation service provides professional facilitators to guide structured discussions. Should all else fail, disputes are escalated to binding arbitration as per the agreement.',
      },
      {
        question: 'How are payments and financial contributions managed?',
        answer: 'All financial contributions are made to a Special Purpose Vehicle (SPV), a separate legal entity that holds the co-owned property. This ensures a transparent and secure financial process. Payments are released based on agreed-upon milestones and shared consent of the co-owners.',
      },
    ],
  },
  {
    title: 'RootsManor',
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9.5 11c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm5.5 0c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zM12 17c-2.33 0-4.32-1.5-5.12-3.5h10.24c-.81 2-2.8 3.5-5.12 3.5z',
    faqs: [
      {
        question: 'How does the milestone-based payment system work?',
        answer: 'Payments are tied to specific project milestones. Funds are only released to contractors once they have delivered and satisfied the requirements of each project stage, ensuring trust, control, and craftsmanship from start to finish. This gives you complete control over your project budget.',
      },
      {
        question: 'Can I choose my own contractor and vendors?',
        answer: 'Yes, our platform provides a curated list of vetted contractors and vendors, but you have the freedom to select your preferred professionals. We also provide a procurement dashboard to help you manage material purchases from various vendors directly.',
      },
      {
        question: 'How do I track the project progress remotely?',
        answer: 'Your project dashboard provides a real-time progress bar, milestone notifications, and the ability to view photo and video uploads from the project site at each stage. This ensures you are always informed about your project\'s status, no matter where you are.',
      },
      {
        question: 'How is communication with the project manager handled?',
        answer: 'All communication with your dedicated project manager is handled through our internal chat system. This ensures that all project-related discussions, updates, and agreements are recorded and transparent for all stakeholders. For this reason, phone calls and direct number exchanges are not permitted.',
      },
    ],
  },
];
