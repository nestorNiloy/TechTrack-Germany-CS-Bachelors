// ============================================================
// PROGRAM DATA — replace/extend with real entries from DAAD etc.
// ============================================================
//
// SCHEMA
// id             : unique string
// university     : string
// program        : string (official program name)
// city           : string
// lat, lng       : numbers (decimal degrees)
// type           : "dual" | "fulltime"
// company        : string | null   (dual-study partner company, if fixed)
// tuitionFree    : boolean
// tuitionPerSem  : number | null   (EUR, null if tuitionFree)
// language       : string (e.g. "German", "English", "German/English")
// reputation     : "top" | "good" | "reasonable"
// jobMarket      : "high" | "medium" | "low"
// website        : string (URL to official program page)
// nearestCities  : array of { name, distanceKm, travelMinHbf }
//                  travelMinHbf = typical train time to that city's
//                  Hauptbahnhof from the nearest station to campus.
//
// NOTE: the entries below are illustrative placeholders (marked
// SAMPLE) so the app can be tested end-to-end. Swap them for
// verified data before publishing.

const PROGRAMS = [
  // ===== VERIFIED (fetched directly from official program pages) =====
  {
    id: "th-rosenheim-aai",
    university: "TH Rosenheim",
    program: "Applied Artificial Intelligence (B.Sc.)",
    city: "Rosenheim",
    lat: 47.8561,
    lng: 12.1281,
    type: "dual",
    company: "Varies — practical semester placement",
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English",
    reputation: "good",
    jobMarket: "high",
    website: "https://www.th-rosenheim.de/en/studies-and-further-education/courses-of-study/bachelors-degree-programmes/applied-artificial-intelligence",
    nearestCities: [
      { name: "Munich", distanceKm: 55, travelMinHbf: 45 },
      { name: "Salzburg (AT)", distanceKm: 80, travelMinHbf: 60 }
    ]
  },
  {
    id: "uni-passau-ai",
    university: "University of Passau",
    program: "Artificial Intelligence (B.Sc.)",
    city: "Passau",
    lat: 48.5748,
    lng: 13.4562,
    type: "fulltime",
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English",
    reputation: "good",
    jobMarket: "high",
    website: "https://www.uni-passau.de/en/bsc-artificial-intelligence",
    nearestCities: [
      { name: "Linz (AT)", distanceKm: 95, travelMinHbf: 70 },
      { name: "Regensburg", distanceKm: 120, travelMinHbf: 75 }
    ]
  },
  {
    id: "oth-aw-dtm",
    university: "OTH Amberg-Weiden",
    program: "Digital Technology and Management (B.Sc.)",
    city: "Weiden",
    lat: 49.6764,
    lng: 12.1544,
    type: "dual",
    company: "Varies — dual-study track available alongside full-time",
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English (German path also available)",
    reputation: "reasonable",
    jobMarket: "medium",
    website: "https://www.oth-aw.de/en/studies/study-offers/study-programmes/bachelor/digital-technology-management/",
    nearestCities: [
      { name: "Nuremberg", distanceKm: 75, travelMinHbf: 60 },
      { name: "Regensburg", distanceKm: 80, travelMinHbf: 65 }
    ]
  },
  {
    id: "thi-csai",
    university: "TH Ingolstadt",
    program: "Computer Science and Artificial Intelligence (B.Sc.)",
    city: "Ingolstadt",
    lat: 48.7665,
    lng: 11.4257,
    type: "fulltime",
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "German/English",
    reputation: "good",
    jobMarket: "high",
    website: "https://www.thi.de/studium/studienangebote/details/computer-science-and-artificial-intelligence-bsc/",
    nearestCities: [
      { name: "Munich", distanceKm: 75, travelMinHbf: 45 },
      { name: "Nuremberg", distanceKm: 90, travelMinHbf: 55 }
    ]
  },
  {
    id: "htw-berlin-csb",
    university: "HTW Berlin",
    program: "Cyber Security and Business (B.Sc.)",
    city: "Berlin",
    lat: 52.4569,
    lng: 13.5253,
    type: "fulltime",
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English",
    reputation: "good",
    jobMarket: "high",
    website: "https://cyber-security-business.htw-berlin.de/",
    nearestCities: [
      { name: "Potsdam", distanceKm: 30, travelMinHbf: 25 },
      { name: "Leipzig", distanceKm: 190, travelMinHbf: 75 }
    ]
  },
  {
    id: "uni-bayreuth-dsai",
    university: "University of Bayreuth",
    program: "Data, Science and AI (B.Sc./B.A.)",
    city: "Bayreuth",
    lat: 49.9282,
    lng: 11.5892,
    type: "fulltime",
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English",
    reputation: "good",
    jobMarket: "medium",
    website: "https://www.uni-bayreuth.de/en/bachelor/data-science-and-ai",
    nearestCities: [
      { name: "Nuremberg", distanceKm: 75, travelMinHbf: 55 },
      { name: "Erlangen", distanceKm: 70, travelMinHbf: 50 }
    ]
  },
  {
    id: "tu-chemnitz-fids",
    university: "TU Chemnitz",
    program: "Foundations in Data Science (B.Sc.)",
    city: "Chemnitz",
    lat: 50.8144,
    lng: 12.9257,
    type: "fulltime",
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English (German coursework compulsory)",
    reputation: "good",
    jobMarket: "medium",
    website: "https://www.tu-chemnitz.de/mathematik/fids/",
    nearestCities: [
      { name: "Dresden", distanceKm: 75, travelMinHbf: 50 },
      { name: "Leipzig", distanceKm: 80, travelMinHbf: 55 }
    ]
  },
  {
    id: "th-deggendorf-ai",
    university: "TH Deggendorf (DIT)",
    program: "Artificial Intelligence (B.Sc.)",
    city: "Deggendorf",
    lat: 48.8358,
    lng: 12.9591,
    type: "fulltime",
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English (German A2 required by graduation)",
    reputation: "good",
    jobMarket: "high",
    website: "https://www.th-deg.de/ain-b-en",
    nearestCities: [
      { name: "Regensburg", distanceKm: 65, travelMinHbf: 50 },
      { name: "Passau", distanceKm: 55, travelMinHbf: 45 }
    ]
  },
  {
    id: "dhbw-mosbach-newstudy",
    university: "DHBW Mosbach",
    program: "Informatik — \"New Study\" online dual-study (B.Sc.)",
    city: "Mosbach",
    lat: 49.3542,
    lng: 9.1515,
    type: "dual",
    company: "Varies — 3-month theory / 3-month in-company rhythm, mostly remote",
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English",
    reputation: "reasonable",
    jobMarket: "medium",
    website: "https://www.mosbach.dhbw.de/newstudy/",
    nearestCities: [
      { name: "Heidelberg", distanceKm: 45, travelMinHbf: 40 },
      { name: "Heilbronn", distanceKm: 35, travelMinHbf: 35 }
    ]
  },
  {
    id: "tha-iis",
    university: "TH Augsburg (THA)",
    program: "International Information Systems (B.Sc.)",
    city: "Augsburg",
    lat: 48.3705,
    lng: 10.8978,
    type: "fulltime", // built-in internship semester (5th), not formally dual
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English (German electives from 4th semester)",
    reputation: "good",
    jobMarket: "high",
    website: "https://www.tha.de/en/Computer-Science/International-Information-Systems-BSc.html",
    nearestCities: [
      { name: "Munich", distanceKm: 60, travelMinHbf: 35 },
      { name: "Ulm", distanceKm: 85, travelMinHbf: 55 }
    ]
  },
  {
    id: "rhein-waal-infotronic",
    university: "Rhine-Waal University of Applied Sciences",
    program: "Infotronic Systems Engineering (B.Sc.)",
    city: "Kamp-Lintfort",
    lat: 51.5057,
    lng: 6.5417,
    type: "fulltime",
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English",
    reputation: "reasonable",
    jobMarket: "medium",
    website: "https://www.hochschule-rhein-waal.de/en/faculties/communication-and-environment/degree-programmes/bachelor-degree-programmes/infotronic",
    nearestCities: [
      { name: "Duisburg", distanceKm: 30, travelMinHbf: 35 },
      { name: "Düsseldorf", distanceKm: 55, travelMinHbf: 55 }
    ]
  },
  {
    id: "haw-hamburg-ie",
    university: "HAW Hamburg",
    program: "Information Engineering (B.Sc.)",
    city: "Hamburg",
    lat: 53.5497,
    lng: 10.0087,
    type: "fulltime", // mandatory 20-week industrial placement, not formally dual
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English",
    reputation: "good",
    jobMarket: "high",
    website: "https://www.haw-hamburg.de/en/study/degree-courses-a-z/study-courses-in-detail/course/courses/show/information-engineering/Studieninteressierte/",
    nearestCities: [
      { name: "Bremen", distanceKm: 95, travelMinHbf: 55 },
      { name: "Hannover", distanceKm: 150, travelMinHbf: 80 },
      { name: "Berlin", distanceKm: 255, travelMinHbf: 100 }
    ]
  },
  {
    id: "fau-ai",
    university: "FAU Erlangen-Nürnberg",
    program: "Artificial Intelligence (B.Sc.)",
    city: "Erlangen",
    lat: 49.5897,
    lng: 11.0113,
    type: "fulltime", // 12-semester part-time track also officially offered
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English",
    reputation: "good",
    jobMarket: "high",
    website: "https://www.ai.study.fau.eu/",
    nearestCities: [
      { name: "Nuremberg", distanceKm: 20, travelMinHbf: 15 },
      { name: "Bamberg", distanceKm: 55, travelMinHbf: 40 }
    ]
  },
  {
    id: "constructor-acs-online",
    university: "Constructor University (Bremen)",
    program: "Applied Computer Science (B.Sc., Online)",
    city: "Bremen (fully online — no campus attendance required)",
    lat: 53.1885,
    lng: 8.6522,
    type: "fulltime",
    company: null,
    tuitionFree: false,
    tuitionPerSem: 2500, // €5,000/year
    language: "English",
    reputation: "good",
    jobMarket: "medium",
    website: "https://constructor.university/programs/online-programs/applied-computer-science",
    nearestCities: [] // online program — commute/travel-time concept doesn't apply
  },
  {
    id: "th-aschaffenburg-sdi",
    university: "TH Aschaffenburg",
    program: "Software Design International (B.Sc.)",
    city: "Aschaffenburg",
    lat: 49.9769,
    lng: 9.1508,
    type: "fulltime",
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English",
    reputation: "reasonable",
    jobMarket: "medium",
    website: "http://www.th-ab.de/sdi",
    nearestCities: [
      { name: "Frankfurt am Main", distanceKm: 40, travelMinHbf: 35 },
      { name: "Würzburg", distanceKm: 65, travelMinHbf: 50 }
    ]
  },
  {
    id: "tuhh-engineering-science",
    university: "TU Hamburg (TUHH)",
    program: "Engineering Science (B.Sc.)",
    city: "Hamburg",
    lat: 53.4633,
    lng: 9.9689,
    type: "dual", // dual-studies explicitly offered alongside full-time
    company: "Varies",
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English (German in 3 of 9 specializations)",
    reputation: "top",
    jobMarket: "high",
    website: "https://www.tuhh.de/tuhh/studium/vor-dem-studium/studienangebot/bachelorstudiengaenge/engineering-science.html",
    nearestCities: [
      { name: "Bremen", distanceKm: 95, travelMinHbf: 55 },
      { name: "Lübeck", distanceKm: 65, travelMinHbf: 45 }
    ]
  },
  {
    id: "tum-heilbronn-bmds",
    university: "TUM Campus Heilbronn",
    program: "Management & Data Science (B.Sc.)",
    city: "Heilbronn",
    lat: 49.1427,
    lng: 9.2109,
    type: "fulltime",
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English",
    reputation: "top",
    jobMarket: "high",
    website: "https://www.mgt.tum.de/programs/undergraduate-programs/bachelor-management-data-science/",
    nearestCities: [
      { name: "Stuttgart", distanceKm: 45, travelMinHbf: 40 },
      { name: "Mannheim", distanceKm: 55, travelMinHbf: 45 }
    ]
  },
  {
    id: "saarland-uni-cs",
    university: "Saarland University",
    program: "Computer Science (B.Sc.)",
    city: "Saarbrücken",
    lat: 49.2578,
    lng: 7.0426,
    type: "fulltime",
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English",
    reputation: "top",
    jobMarket: "high",
    website: "https://saarland-informatics-campus.de/en/computerscience-course/",
    nearestCities: [
      { name: "Trier", distanceKm: 90, travelMinHbf: 65 },
      { name: "Kaiserslautern", distanceKm: 70, travelMinHbf: 50 },
      { name: "Luxembourg (LU)", distanceKm: 70, travelMinHbf: 60 }
    ]
  },
  {
    id: "hswt-applied-informatics",
    university: "HSWT Weihenstephan-Triesdorf",
    program: "Applied Informatics (B.Sc.)",
    city: "Freising",
    lat: 48.4009,
    lng: 11.7215,
    type: "fulltime", // 5th semester practical placement
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English (B2)",
    reputation: "reasonable",
    jobMarket: "medium",
    website: "https://www.hswt.de/en/study/study-offer/bachelor/applied-informatics",
    nearestCities: [
      { name: "Munich", distanceKm: 30, travelMinHbf: 25 },
      { name: "Landshut", distanceKm: 35, travelMinHbf: 30 }
    ]
  },
  {
    id: "fh-swf-bba",
    university: "FH Südwestfalen (Soest)",
    program: "Business Administration with Informatics (B.A.)",
    city: "Soest",
    lat: 51.5744,
    lng: 8.1064,
    type: "fulltime",
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English",
    reputation: "reasonable",
    jobMarket: "medium",
    website: "https://www.fh-swf.de/de/studienangebot/studiengaenge/business_administration_with_informatics_b_a_/Index.php",
    nearestCities: [
      { name: "Dortmund", distanceKm: 40, travelMinHbf: 40 },
      { name: "Paderborn", distanceKm: 55, travelMinHbf: 45 }
    ]
  },
  {
    id: "srh-berlin-cs",
    university: "SRH University Berlin",
    program: "Computer Science (B.Sc.) — also offered in Heidelberg, Leipzig, Munich, Stuttgart",
    city: "Berlin",
    lat: 52.5200,
    lng: 13.4050,
    type: "fulltime",
    company: null,
    tuitionFree: false,
    tuitionPerSem: 4740, // €790/month, Berlin/Heidelberg rate; Leipzig/Munich/Stuttgart slightly lower
    language: "English",
    reputation: "reasonable",
    jobMarket: "medium",
    website: "https://www.srh-university.de/en/plp/bsc-computer-science/",
    nearestCities: [
      { name: "Potsdam", distanceKm: 30, travelMinHbf: 25 },
      { name: "Leipzig", distanceKm: 190, travelMinHbf: 75 }
    ]
  },
  {
    id: "th-deggendorf-health-informatics",
    university: "TH Deggendorf (DIT) — European Campus Rottal-Inn",
    program: "Health Informatics (B.Sc.)",
    city: "Pfarrkirchen",
    lat: 48.4344,
    lng: 12.9425,
    type: "fulltime", // 18-week internship semester 5
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English",
    reputation: "reasonable",
    jobMarket: "medium",
    website: "https://www.th-deg.de/hi-b-en",
    nearestCities: [
      { name: "Landshut", distanceKm: 45, travelMinHbf: 40 },
      { name: "Passau", distanceKm: 50, travelMinHbf: 45 }
    ]
  },
  {
    id: "thi-autonomous-vehicle-eng",
    university: "TH Ingolstadt",
    program: "Autonomous Vehicle Engineering (B.Eng.)",
    city: "Ingolstadt",
    lat: 48.7665,
    lng: 11.4257,
    type: "dual", // joint model or vocational-experience track available
    company: "Varies — dual cooperation partners",
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English",
    reputation: "good",
    jobMarket: "high",
    website: "https://www.thi.de/en/electrical-engineering-and-information-technology/degree-programmes/autonomous-vehicle-engineering-beng/",
    nearestCities: [
      { name: "Munich", distanceKm: 75, travelMinHbf: 45 },
      { name: "Nuremberg", distanceKm: 90, travelMinHbf: 55 }
    ]
  },
  {
    id: "srh-berlin-webdev",
    university: "SRH University Berlin",
    program: "Web Development (B.Sc.)",
    city: "Berlin",
    lat: 52.5200,
    lng: 13.4050,
    type: "fulltime", // dual option also available
    company: "Dual option available",
    tuitionFree: false,
    tuitionPerSem: 4740, // €790/month
    language: "English",
    reputation: "reasonable",
    jobMarket: "medium",
    website: "https://www.srh-university.de/en/plp/bsc-web-development/",
    nearestCities: [
      { name: "Potsdam", distanceKm: 30, travelMinHbf: 25 },
      { name: "Leipzig", distanceKm: 190, travelMinHbf: 75 }
    ]
  },
  {
    id: "th-koeln-digital-games",
    university: "TH Köln (Cologne Game Lab)",
    program: "Digital Games (B.A.)",
    city: "Cologne (Mülheim campus)",
    lat: 50.9584,
    lng: 6.9723,
    type: "fulltime",
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English",
    reputation: "good",
    jobMarket: "medium",
    website: "https://www.th-koeln.de/en/academics/digital-games-bachelors-program_7333.php",
    nearestCities: [
      { name: "Düsseldorf", distanceKm: 40, travelMinHbf: 30 },
      { name: "Bonn", distanceKm: 30, travelMinHbf: 30 }
    ]
  },
  {
    id: "hda-animation-game",
    university: "Hochschule Darmstadt (h_da) — Mediencampus",
    program: "Animation and Game (B.A.)",
    city: "Dieburg",
    lat: 49.9077,
    lng: 8.8375,
    type: "fulltime",
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English",
    reputation: "good",
    jobMarket: "medium",
    website: "https://mediencampus.h-da.de/studieren/studienangebot/bachelor/ba-animation-game/profile",
    nearestCities: [
      { name: "Frankfurt am Main", distanceKm: 35, travelMinHbf: 40 },
      { name: "Darmstadt", distanceKm: 15, travelMinHbf: 20 }
    ]
  },
  {
    id: "hda-avr-design",
    university: "Hochschule Darmstadt (h_da) — Mediencampus",
    program: "Augmented and Virtual Reality Design (B.A.)",
    city: "Dieburg",
    lat: 49.9077,
    lng: 8.8375,
    type: "fulltime",
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English",
    reputation: "good",
    jobMarket: "medium",
    website: "https://avrd.mediencampus.h-da.de/",
    nearestCities: [
      { name: "Frankfurt am Main", distanceKm: 35, travelMinHbf: 40 },
      { name: "Darmstadt", distanceKm: 15, travelMinHbf: 20 }
    ]
  },
  {
    id: "fau-autonomy-technologies",
    university: "FAU Erlangen-Nürnberg",
    program: "Autonomy Technologies (B.Sc./M.Sc.)",
    city: "Erlangen",
    lat: 49.5897,
    lng: 11.0113,
    type: "fulltime",
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English",
    reputation: "good",
    jobMarket: "high",
    website: "https://www.at.study.fau.eu/",
    nearestCities: [
      { name: "Nuremberg", distanceKm: 20, travelMinHbf: 15 },
      { name: "Bamberg", distanceKm: 55, travelMinHbf: 40 }
    ]
  },
  {
    id: "th-deggendorf-eai",
    university: "TH Deggendorf (DIT)",
    program: "Electronics Engineering for Artificial Intelligence — International (B.Eng.)",
    city: "Deggendorf",
    lat: 48.8358,
    lng: 12.9591,
    type: "fulltime",
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English (semesters 1-3, with integrated German A2-B2); German from semester 4",
    reputation: "good",
    jobMarket: "high",
    website: "https://www.th-deg.de/eai-b-en",
    nearestCities: [
      { name: "Regensburg", distanceKm: 65, travelMinHbf: 50 },
      { name: "Passau", distanceKm: 55, travelMinHbf: 45 }
    ]
  },
  {
    id: "hof-university-cs",
    university: "Hof University",
    program: "Computer Science (International) (B.Sc.)",
    city: "Hof",
    lat: 50.3125,
    lng: 11.9161,
    type: "fulltime",
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "English (semesters 1-2), transitioning to German",
    reputation: "good",
    jobMarket: "medium",
    website: "https://www.hof-university.com/studying-at-hof-university/our-degree-programs/computer-science-international-bsc.html",
    nearestCities: [
      { name: "Bayreuth", distanceKm: 45, travelMinHbf: 45 },
      { name: "Plauen", distanceKm: 30, travelMinHbf: 30 }
    ]
  },
  {
    id: "uni-regensburg-fids",
    university: "University of Regensburg (FIDS)",
    program: "Computer Science / Data Science (B.Sc.)",
    city: "Regensburg",
    lat: 49.0195,
    lng: 12.0974,
    type: "fulltime",
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "German (primary; international student support available)",
    reputation: "good",
    jobMarket: "high",
    website: "https://www.uni-regensburg.de/informatics-data-science/",
    nearestCities: [
      { name: "Nuremberg", distanceKm: 90, travelMinHbf: 60 },
      { name: "Passau", distanceKm: 120, travelMinHbf: 75 }
    ]
  },
  {
    id: "ovgu-magdeburg-biba",
    university: "Otto von Guericke University Magdeburg",
    program: "Bilingual Bachelor Computer Science — BiBa (B.Sc.)",
    city: "Magdeburg",
    lat: 52.1394,
    lng: 11.6407,
    type: "fulltime",
    company: null,
    tuitionFree: true,
    tuitionPerSem: null,
    language: "Bilingual — choose German-start or English-start track, fluent in both by year 3",
    reputation: "good",
    jobMarket: "medium",
    website: "https://www.fin.ovgu.de/inf/en/Study/Before+you+start+your+studies/Study+courses/Bachelor+courses/BiBa+Computer+Science.html",
    nearestCities: [
      { name: "Berlin", distanceKm: 150, travelMinHbf: 80 },
      { name: "Braunschweig", distanceKm: 90, travelMinHbf: 60 }
    ]
  },
  {
    id: "coburg-automation-robotics",
    university: "Coburg University of Applied Sciences",
    program: "Automation and Robotics (B.Eng.)",
    city: "Coburg",
    lat: 50.2632,
    lng: 10.9634,
    type: "fulltime",
    company: null,
    tuitionFree: true, // EU students; €1,500/sem for non-EU
    tuitionPerSem: null,
    language: "English → German (starts fully remote in semester 1)",
    reputation: "reasonable",
    jobMarket: "medium",
    website: "https://www.hs-coburg.de/en/study/bachelor-degree-programs/bachelors-degree-programs-in-engineering-and-computer-science/automation-and-robotics/",
    nearestCities: [
      { name: "Bamberg", distanceKm: 40, travelMinHbf: 40 },
      { name: "Erfurt", distanceKm: 90, travelMinHbf: 65 }
    ]
  },

];
