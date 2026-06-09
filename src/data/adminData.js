const ADMIN_EMAIL = 'admin1@gmail.com'
const PRODUCTS_VERSION = 5
const CATEGORIES_VERSION = 1

const defaultCategories = [
  { id: 1, nameId: 'Mining', nameEn: 'Mining' },
  { id: 2, nameId: 'Oil & Gas', nameEn: 'Oil & Gas' },
]

const defaultProducts = [
  {
    id: 1, icon: 'pipe',
    name: { id: 'Pipe Products', en: 'Pipe Products' },
    category: { id: 'Mining', en: 'Mining' },
    description: {
      id: 'Menyediakan berbagai jenis pipa berkualitas tinggi untuk kebutuhan industri pertambangan, migas, dan konstruksi. Seluruh produk memenuhi standar internasional dan tersedia dalam berbagai ukuran serta spesifikasi.\n\nProduk Pipa Unggulan:\n- Pipa Seamless (Carbon Steel, Stainless Steel, Alloy Steel)\n- Pipa ERW (Electric Resistance Welded)\n- Pipa Spiral (SAWH)\n- Pipa Galvanis (Hot Dip Galvanized)\n- Pipa SCH 10 hingga SCH 160\n- Pipa ukuran 1/2" hingga 48"\n\nStandar Internasional:\n- ASTM A53, A106, A333, A335\n- API 5L Grade B, X42 - X70\n- JIS G3454, G3456\n\nAplikasi:\n- Sistem perpipaan migas dan pertambangan\n- Konstruksi bangunan dan infrastruktur\n- Sistem pemadam kebakaran\n- Pipa air dan steam\n- Industri pengolahan kimia',
      en: 'Providing various types of high-quality pipes for mining, oil & gas, and construction industries. All products meet international standards and are available in various sizes and specifications.\n\nPremium Pipe Products:\n- Seamless Pipe (Carbon Steel, Stainless Steel, Alloy Steel)\n- ERW Pipe (Electric Resistance Welded)\n- Spiral Pipe (SAWH)\n- Galvanized Pipe (Hot Dip Galvanized)\n- SCH 10 through SCH 160\n- Pipe sizes 1/2" through 48"\n\nInternational Standards:\n- ASTM A53, A106, A333, A335\n- API 5L Grade B, X42 - X70\n- JIS G3454, G3456\n\nApplications:\n- Oil & gas and mining piping systems\n- Building and infrastructure construction\n- Fire protection systems\n- Water and steam pipes\n- Chemical processing industry',
    },
    features: [
      { id: 'Tahan korosi dan tekanan tinggi', en: 'Corrosion and high pressure resistant' },
      { id: 'Sertifikasi ISO 9001:2015', en: 'ISO 9001:2015 certified' },
      { id: 'Tersedia dalam berbagai diameter dan schedule', en: 'Available in various diameters and schedules' },
    ],
    specs: [
      { key: { id: 'Material', en: 'Material' }, value: { id: 'Carbon Steel, Stainless Steel, Galvanis', en: 'Carbon Steel, Stainless Steel, Galvanized' } },
      { key: { id: 'Diameter', en: 'Diameter' }, value: { id: '1/2" - 48"', en: '1/2" - 48"' } },
      { key: { id: 'Standar', en: 'Standard' }, value: { id: 'ASTM A53, API 5L, ASTM A106', en: 'ASTM A53, API 5L, ASTM A106' } },
      { key: { id: 'Schedule', en: 'Schedule' }, value: { id: 'Sch 10 - Sch 160', en: 'Sch 10 - Sch 160' } },
    ],
    image: '',
  },
  {
    id: 2, icon: 'valve',
    name: { id: 'Valve Products', en: 'Valve Products' },
    category: { id: 'Mining', en: 'Mining' },
    description: {
      id: 'Supplier valve industri dari merek-merek terpercaya untuk sistem perpipaan bertekanan tinggi. Tersedia dalam berbagai tipe, material, dan kelas tekanan untuk memenuhi kebutuhan operasional Anda.\n\nTipe Valve:\n- Gate Valve (Cast Steel, Forged Steel)\n- Globe Valve (Screwed, Flanged)\n- Ball Valve (Full Bore, Reduced Bore)\n- Check Valve (Swing, Lift, Dual Plate)\n- Butterfly Valve (Wafer, Lug, Double Offset)\n- Plug Valve (Lubricated, Non-Lubricated)\n\nMaterial:\n- Carbon Steel, Stainless Steel, Alloy Steel\n- Cast Iron, Ductile Iron, Bronze\n\nKelas Tekanan:\n- Class 150 hingga Class 2500\n- PN 10 hingga PN 420\n\nAplikasi:\n- Industri migas dan pertambangan\n- Pembangkit listrik\n- Pengolahan air dan limbah\n- Industri kimia dan petrokimia',
      en: 'Industrial valve supplier from trusted brands for high-pressure piping systems. Available in various types, materials, and pressure classes to meet your operational needs.\n\nValve Types:\n- Gate Valve (Cast Steel, Forged Steel)\n- Globe Valve (Screwed, Flanged)\n- Ball Valve (Full Bore, Reduced Bore)\n- Check Valve (Swing, Lift, Dual Plate)\n- Butterfly Valve (Wafer, Lug, Double Offset)\n- Plug Valve (Lubricated, Non-Lubricated)\n\nMaterials:\n- Carbon Steel, Stainless Steel, Alloy Steel\n- Cast Iron, Ductile Iron, Bronze\n\nPressure Classes:\n- Class 150 through Class 2500\n- PN 10 through PN 420\n\nApplications:\n- Oil & gas and mining industry\n- Power generation plants\n- Water and wastewater treatment\n- Chemical and petrochemical industry',
    },
    features: [
      { id: 'Merek internasional terpercaya', en: 'Trusted international brands' },
      { id: 'Ketahanan tekanan tinggi', en: 'High pressure resistance' },
      { id: 'Garansi produk 1 tahun', en: '1 year product warranty' },
    ],
    specs: [
      { key: { id: 'Tipe', en: 'Type' }, value: { id: 'Gate, Globe, Ball, Check, Butterfly', en: 'Gate, Globe, Ball, Check, Butterfly' } },
      { key: { id: 'Material', en: 'Material' }, value: { id: 'Cast Steel, Forged Steel, Stainless Steel', en: 'Cast Steel, Forged Steel, Stainless Steel' } },
      { key: { id: 'Tekanan', en: 'Pressure' }, value: { id: 'Class 150 - Class 2500', en: 'Class 150 - Class 2500' } },
      { key: { id: 'Sambungan', en: 'Connection' }, value: { id: 'Flanged, Threaded, Socket Weld', en: 'Flanged, Threaded, Socket Weld' } },
    ],
    image: '',
  },
  {
    id: 3, icon: 'pipe',
    name: { id: 'Fittings & Flanges', en: 'Fittings & Flanges' },
    category: { id: 'Mining', en: 'Mining' },
    description: {
      id: 'Berbagai macam fitting dan flange untuk sistem perpipaan industri. Seluruh produk dibuat dari material berkualitas tinggi dengan toleransi presisi untuk menjamin sambungan yang kuat dan aman.\n\nTipe Fittings:\n- Elbow (45°, 90°, 180° Long & Short Radius)\n- Tee (Equal, Reducing)\n- Reducer (Concentric, Eccentric)\n- Cap, Stub End, Coupling\n- Nipple, Swage Nipple, Olet\n\nTipe Flange:\n- Weld Neck, Slip On, Blind, Socket Weld\n- Lap Joint, Threaded, Orifice\n\nStandar:\n- ANSI B16.5, B16.9, B16.11\n- JIS B2220, B2312\n\nMaterial:\n- Carbon Steel, Stainless Steel, Alloy Steel\n- A350 LF2, A182 F11/F22/F304/F316\n\nAplikasi:\n- Sistem perpipaan tekanan tinggi\n- Proses pengolahan migas\n- Konstruksi lepas pantai\n- Industri manufaktur',
      en: 'A wide range of fittings and flanges for industrial piping systems. All products are manufactured from high-quality materials with precision tolerances to ensure strong and safe connections.\n\nFitting Types:\n- Elbow (45°, 90°, 180° Long & Short Radius)\n- Tee (Equal, Reducing)\n- Reducer (Concentric, Eccentric)\n- Cap, Stub End, Coupling\n- Nipple, Swage Nipple, Olet\n\nFlange Types:\n- Weld Neck, Slip On, Blind, Socket Weld\n- Lap Joint, Threaded, Orifice\n\nStandards:\n- ANSI B16.5, B16.9, B16.11\n- JIS B2220, B2312\n\nMaterials:\n- Carbon Steel, Stainless Steel, Alloy Steel\n- A350 LF2, A182 F11/F22/F304/F316\n\nApplications:\n- High-pressure piping systems\n- Oil & gas processing\n- Offshore construction\n- Manufacturing industry',
    },
    features: [
      { id: 'Presisi tinggi dengan toleransi ketat', en: 'High precision with tight tolerances' },
      { id: 'Tahan terhadap lingkungan ekstrem', en: 'Resistant to extreme environments' },
      { id: 'Bervariasi tipe dan ukuran', en: 'Variety of types and sizes' },
    ],
    specs: [
      { key: { id: 'Tipe', en: 'Type' }, value: { id: 'Elbow, Tee, Reducer, Flanges', en: 'Elbow, Tee, Reducer, Flanges' } },
      { key: { id: 'Material', en: 'Material' }, value: { id: 'Carbon Steel, Stainless Steel, Galvanis', en: 'Carbon Steel, Stainless Steel, Galvanized' } },
      { key: { id: 'Ukuran', en: 'Size' }, value: { id: '1/2" - 48"', en: '1/2" - 48"' } },
      { key: { id: 'Standar', en: 'Standard' }, value: { id: 'ASTM A234, ANSI B16.5, B16.9', en: 'ASTM A234, ANSI B16.5, B16.9' } },
    ],
    image: '',
  },
  {
    id: 4, icon: 'bolt',
    name: { id: 'Studs, Bolts & Nuts', en: 'Studs, Bolts & Nuts' },
    category: { id: 'Mining', en: 'Mining' },
    description: {
      id: 'Menyediakan berbagai jenis baut, mur, dan stud berkualitas tinggi untuk kebutuhan industri konstruksi, permesinan, dan migas. Seluruh produk diproduksi dengan standar kekuatan presisi untuk menjamin keamanan sambungan.\n\nTipe Produk:\n- Hex Bolt & Heavy Hex Bolt\n- Stud Bolt (Full Thread, Double End)\n- Anchor Bolt (J-Type, L-Type, Sleeve)\n- Eye Bolt, U-Bolt, Socket Screw\n- Structural Bolt (A325, A490)\n- Hex Nut, Jam Nut, Lock Nut, Wing Nut\n\nGrade & Material:\n- Grade 5, Grade 8, B7, B8, L7\n- ASTM A193, A194, A307, A320\n- Stainless Steel 304/316, Carbon Steel\n\nLapisan:\n- Hot Dip Galvanized (HDG)\n- Electroplating (Zinc, Cadmium)\n- Black Oxide, Phosphate, Dacromet\n\nAplikasi:\n- Konstruksi baja dan gedung\n- Industri perminyakan dan gas\n- Peralatan permesinan\n- Infrastruktur jembatan dan jalan',
      en: 'Providing various types of high-quality bolts, nuts, and studs for construction, machinery, and oil & gas industries. All products are manufactured to precise strength standards to ensure connection safety.\n\nProduct Types:\n- Hex Bolt & Heavy Hex Bolt\n- Stud Bolt (Full Thread, Double End)\n- Anchor Bolt (J-Type, L-Type, Sleeve)\n- Eye Bolt, U-Bolt, Socket Screw\n- Structural Bolt (A325, A490)\n- Hex Nut, Jam Nut, Lock Nut, Wing Nut\n\nGrade & Material:\n- Grade 5, Grade 8, B7, B8, L7\n- ASTM A193, A194, A307, A320\n- Stainless Steel 304/316, Carbon Steel\n\nCoatings:\n- Hot Dip Galvanized (HDG)\n- Electroplating (Zinc, Cadmium)\n- Black Oxide, Phosphate, Dacromet\n\nApplications:\n- Steel construction and buildings\n- Oil & gas industry\n- Machinery equipment\n- Bridge and road infrastructure',
    },
    features: [
      { id: 'Kekuatan tarik tinggi', en: 'High tensile strength' },
      { id: 'Tahan karat dan cuaca', en: 'Rust and weather resistant' },
      { id: 'Sesuai standar ASTM dan ISO', en: 'Complies with ASTM and ISO standards' },
    ],
    specs: [
      { key: { id: 'Tipe', en: 'Type' }, value: { id: 'Hex Bolt, Stud Bolt, Anchor Bolt, Nuts', en: 'Hex Bolt, Stud Bolt, Anchor Bolt, Nuts' } },
      { key: { id: 'Grade', en: 'Grade' }, value: { id: 'Grade 5, Grade 8, B7, B8, L7', en: 'Grade 5, Grade 8, B7, B8, L7' } },
      { key: { id: 'Ukuran', en: 'Size' }, value: { id: 'M6 - M100', en: 'M6 - M100' } },
      { key: { id: 'Lapisan', en: 'Coating' }, value: { id: 'HDG, Electroplating, Black Oxide', en: 'HDG, Electroplating, Black Oxide' } },
    ],
    image: '',
  },
  {
    id: 5, icon: 'generator',
    name: { id: 'Power Generators', en: 'Power Generators' },
    category: { id: 'Mining', en: 'Mining' },
    description: {
      id: 'Solusi daya handal untuk industri pertambangan dan konstruksi dengan generator berkualitas tinggi. Tersedia dalam berbagai kapasitas, konfigurasi, dan merk ternama dunia.\n\nKapasitas:\n- Generator 10 kVA - 2000 kVA\n- Custom power solution untuk kebutuhan spesifik\n\nTipe Generator:\n- Open Set (standar industri)\n- Silent Type (peredam suara)\n- Containerized (mobile & weatherproof)\n- Synchronized Paralleling System\n\nFitur Unggulan:\n- ATS (Automatic Transfer Switch)\n- AMF (Automatic Main Failure)\n- Remote Monitoring System\n- Fuel efficiency optimizer\n\nBrand Unggulan:\n- Cummins, Perkins, Doosan\n- Yanmar, Mitsubishi\n\nAplikasi:\n- Pertambangan dan quarry\n- Konstruksi gedung dan infrastruktur\n- Rumah sakit dan data center\n- Event dan proyek lapangan',
      en: 'Reliable power solutions for mining and construction industries with high-quality generators. Available in various capacities, configurations, and world-renowned brands.\n\nCapacities:\n- Generator 10 kVA - 2000 kVA\n- Custom power solution for specific needs\n\nGenerator Types:\n- Open Set (industrial standard)\n- Silent Type (noise-reduced)\n- Containerized (mobile & weatherproof)\n- Synchronized Paralleling System\n\nKey Features:\n- ATS (Automatic Transfer Switch)\n- AMF (Automatic Main Failure)\n- Remote Monitoring System\n- Fuel efficiency optimizer\n\nLeading Brands:\n- Cummins, Perkins, Doosan\n- Yanmar, Mitsubishi\n\nApplications:\n- Mining and quarry operations\n- Building and infrastructure construction\n- Hospitals and data centers\n- Events and field projects',
    },
    features: [
      { id: 'Efisiensi bahan bakar tinggi', en: 'High fuel efficiency' },
      { id: 'Perawatan mudah dan murah', en: 'Easy and affordable maintenance' },
      { id: 'Sistem kontrol otomatis (ATS/AMF)', en: 'Automatic control system (ATS/AMF)' },
    ],
    specs: [
      { key: { id: 'Kapasitas', en: 'Capacity' }, value: { id: '10 kVA - 2000 kVA', en: '10 kVA - 2000 kVA' } },
      { key: { id: 'Bahan Bakar', en: 'Fuel' }, value: { id: 'Solar, Gas, Dual Fuel', en: 'Diesel, Gas, Dual Fuel' } },
      { key: { id: 'Merek', en: 'Brand' }, value: { id: 'Cummins, Perkins, Doosan, Yanmar', en: 'Cummins, Perkins, Doosan, Yanmar' } },
      { key: { id: 'Tipe', en: 'Type' }, value: { id: 'Open Set, Silent, Containerized', en: 'Open Set, Silent, Containerized' } },
    ],
    image: '',
  },
  {
    id: 6, icon: 'safety',
    name: { id: 'Safety Equipment / HSE', en: 'Safety Equipment / HSE' },
    category: { id: 'Mining', en: 'Mining' },
    description: {
      id: 'Perlengkapan keselamatan kerja (HSE) lengkap untuk melindungi tenaga kerja di lingkungan industri pertambangan, migas, dan konstruksi. Seluruh produk bersertifikat dan memenuhi standar keselamatan internasional.\n\nKategori Produk:\n- Head Protection: Safety Helmet (Full Brim, Cap Style)\n- Eye Protection: Safety Glasses, Goggles, Face Shield\n- Hand Protection: Safety Gloves (Cut, Chemical, Heat Resistant)\n- Body Protection: Coverall, Vest, Raincoat, FR Clothing\n- Foot Protection: Safety Shoes (Steel Toe, Composite Toe)\n- Fall Protection: Harness, Lanyard, Lifeline\n- Respirator: Masker, Cartridge, SCBA\n\nMerek Ternama:\n- 3M, Honeywell, MSA\n- Uvex, North, Willson\n\nSertifikasi:\n- OSHA, ANSI, EN, SNI\n- ISO 45001, SMK3\n\nAplikasi:\n- Pertambangan batubara dan mineral\n- Industri migas dan petrokimia\n- Proyek konstruksi\n- Manufaktur dan fabrikasi',
      en: 'Complete workplace safety equipment (HSE) to protect workers in mining, oil & gas, and construction industries. All products are certified and meet international safety standards.\n\nProduct Categories:\n- Head Protection: Safety Helmet (Full Brim, Cap Style)\n- Eye Protection: Safety Glasses, Goggles, Face Shield\n- Hand Protection: Safety Gloves (Cut, Chemical, Heat Resistant)\n- Body Protection: Coverall, Vest, Raincoat, FR Clothing\n- Foot Protection: Safety Shoes (Steel Toe, Composite Toe)\n- Fall Protection: Harness, Lanyard, Lifeline\n- Respirator: Mask, Cartridge, SCBA\n\nLeading Brands:\n- 3M, Honeywell, MSA\n- Uvex, North, Willson\n\nCertifications:\n- OSHA, ANSI, EN, SNI\n- ISO 45001, OHSAS\n\nApplications:\n- Coal and mineral mining\n- Oil & gas and petrochemical industry\n- Construction projects\n- Manufacturing and fabrication',
    },
    features: [
      { id: 'Bersertifikat SNI dan internasional', en: 'SNI and international certified' },
      { id: 'Merek ternama dan terpercaya', en: 'Well-known and trusted brands' },
      { id: 'Tersedia dalam berbagai ukuran', en: 'Available in various sizes' },
    ],
    specs: [
      { key: { id: 'Kategori', en: 'Category' }, value: { id: 'Head, Eye, Hand, Body, Fall Protection', en: 'Head, Eye, Hand, Body, Fall Protection' } },
      { key: { id: 'Standar', en: 'Standard' }, value: { id: 'OSHA, ANSI, EN, SNI', en: 'OSHA, ANSI, EN, SNI' } },
      { key: { id: 'Merek', en: 'Brand' }, value: { id: '3M, Honeywell, MSA', en: '3M, Honeywell, MSA' } },
      { key: { id: 'Sertifikasi', en: 'Certification' }, value: { id: 'ISO 45001, SMK3', en: 'ISO 45001, OHSAS' } },
    ],
    image: '',
  },
  {
    id: 7, icon: 'tool',
    name: { id: 'Electrical', en: 'Electrical' },
    category: { id: 'Mining', en: 'Mining' },
    description: {
      id: 'Solusi elektrikal dan instrumentasi lengkap untuk kebutuhan industri pertambangan, migas, dan konstruksi. Produk dari merek-merek terkemuka dunia dengan kualitas dan keandalan terjamin.\n\nKategori Produk:\n- Kabel Listrik (LV, MV, Armored, Flexible)\n- Panel Listrik (MDP, SDP, MCC, ATS)\n- Switchgear dan Circuit Breaker\n- Kontaktor, Relay, dan Starter Motor\n- PLC, VFD, dan HMI\n- Sensor dan Instrumentasi\n- Lighting dan Accessories\n\nMerek Unggulan:\n- Schneider Electric, ABB, Siemens\n- LS Electric, Fuji Electric\n\nStandar:\n- IEC, SNI, PUIL\n- ISO 9001, CE, UL\n\nLayanan:\n- Konsultasi dan desain sistem\n- Instalasi dan commissioning\n- Pemeliharaan dan perbaikan\n\nAplikasi:\n- Sistem distribusi daya industri\n- Kontrol proses otomatisasi\n- Pertambangan dan pengolahan mineral\n- Gedung komersial dan infrastruktur',
      en: 'Complete electrical and instrumentation solutions for mining, oil & gas, and construction industries. Products from world-renowned brands with guaranteed quality and reliability.\n\nProduct Categories:\n- Power Cables (LV, MV, Armored, Flexible)\n- Electrical Panels (MDP, SDP, MCC, ATS)\n- Switchgear and Circuit Breakers\n- Contactors, Relays, and Motor Starters\n- PLC, VFD, and HMI\n- Sensors and Instrumentation\n- Lighting and Accessories\n\nLeading Brands:\n- Schneider Electric, ABB, Siemens\n- LS Electric, Fuji Electric\n\nStandards:\n- IEC, SNI, PUIL\n- ISO 9001, CE, UL\n\nServices:\n- System consultation and design\n- Installation and commissioning\n- Maintenance and repair\n\nApplications:\n- Industrial power distribution systems\n- Process automation control\n- Mining and mineral processing\n- Commercial buildings and infrastructure',
    },
    features: [
      { id: 'Komponen berkualitas tinggi', en: 'High quality components' },
      { id: 'Garansi produk resmi', en: 'Official product warranty' },
      { id: 'Dukungan teknis lengkap', en: 'Full technical support' },
    ],
    specs: [
      { key: { id: 'Kategori', en: 'Category' }, value: { id: 'Kabel, Panel, MCB, Kontaktor, Relay', en: 'Cable, Panel, MCB, Contactor, Relay' } },
      { key: { id: 'Tegangan', en: 'Voltage' }, value: { id: 'Low Voltage - Medium Voltage', en: 'Low Voltage - Medium Voltage' } },
      { key: { id: 'Standar', en: 'Standard' }, value: { id: 'IEC, SNI, PUIL', en: 'IEC, SNI, PUIL' } },
      { key: { id: 'Merek', en: 'Brand' }, value: { id: 'Schneider, ABB, Siemens', en: 'Schneider, ABB, Siemens' } },
    ],
    image: '',
  },
  {
    id: 8, icon: 'tool',
    name: { id: 'Welding Equipment', en: 'Welding Equipment' },
    category: { id: 'Mining', en: 'Mining' },
    description: {
      id: 'Peralatan las lengkap untuk kebutuhan fabrikasi, konstruksi, dan perbaikan industri. Tersedia mesin las teknologi inverter terbaru, consumables, dan aksesoris pendukung dari merek-merek terpercaya.\n\nTipe Mesin Las:\n- MMA (Manual Metal Arc / Stick Welder)\n- TIG (Tungsten Inert Gas) AC/DC\n- MIG/MAG (Gas Metal Arc Welder)\n- Plasma Cutter\n- Spot Welder\n- Submerged Arc Welder\n\nDaya Mesin:\n- 200A hingga 600A\n- Inverter Technology (hemat listrik)\n- Portable dan industrial grade\n\nConsumables:\n- Elektroda (E6013, E7018, E7016, E308)\n- Kawat Las (ER70S-6, ER308, ER309)\n- Gas CO2, Argon, Mixed Gas\n- Grinding Wheel, Wire Brush, Holder\n\nMerek Unggulan:\n- Lincoln Electric, Miller, Esab\n- Redbo, Westco\n\nAplikasi:\n- Fabrikasi baja dan konstruksi\n- Perbaikan alat berat\n- Industri minyak dan gas\n- Pipa dan tangki tekanan\n- Galangan kapal',
      en: 'Complete welding equipment for fabrication, construction, and industrial repair needs. Available latest inverter technology welding machines, consumables, and supporting accessories from trusted brands.\n\nWelding Machine Types:\n- MMA (Manual Metal Arc / Stick Welder)\n- TIG (Tungsten Inert Gas) AC/DC\n- MIG/MAG (Gas Metal Arc Welder)\n- Plasma Cutter\n- Spot Welder\n- Submerged Arc Welder\n\nMachine Power:\n- 200A to 600A\n- Inverter Technology (power efficient)\n- Portable and industrial grade\n\nConsumables:\n- Electrodes (E6013, E7018, E7016, E308)\n- Welding Wire (ER70S-6, ER308, ER309)\n- CO2, Argon, Mixed Gas\n- Grinding Wheel, Wire Brush, Holder\n\nLeading Brands:\n- Lincoln Electric, Miller, Esab\n- Redbo, Westco\n\nApplications:\n- Steel fabrication and construction\n- Heavy equipment repair\n- Oil and gas industry\n- Pipe and pressure vessel\n- Shipyard',
    },
    features: [
      { id: 'Mesin las inverter teknologi terbaru', en: 'Latest inverter welding technology' },
      { id: 'Hemat listrik dan portabel', en: 'Power efficient and portable' },
      { id: 'Tersedia consumables lengkap', en: 'Complete consumables available' },
    ],
    specs: [
      { key: { id: 'Tipe Mesin', en: 'Machine Type' }, value: { id: 'MMA, TIG, MIG, Plasma Cutter', en: 'MMA, TIG, MIG, Plasma Cutter' } },
      { key: { id: 'Daya', en: 'Power' }, value: { id: '200A - 600A', en: '200A - 600A' } },
      { key: { id: 'Merek', en: 'Brand' }, value: { id: 'Lincoln, Miller, Esab, Redbo', en: 'Lincoln, Miller, Esab, Redbo' } },
      { key: { id: 'Consumables', en: 'Consumables' }, value: { id: 'Elektroda, Kawat Las, Gas CO2/Argon', en: 'Electrode, Welding Wire, CO2/Argon Gas' } },
    ],
    image: '',
  },
  {
    id: 9, icon: 'oilgas',
    name: { id: 'Wet Gas Compressor (WGC)', en: 'Wet Gas Compressor (WGC)' },
    category: { id: 'Oil & Gas', en: 'Oil & Gas' },
    description: {
      id: 'After extensive research and development, we are thrilled to introduce the Wet Gas Compressor. The WGC is the only small-frame electric direct drive reciprocating compressor that is capable of processing liquids – including liquid slugs – through itself. The WGC pictured is 30hp and has a 5 inch cylinder, with a maximum differential pressure of 200 psi and flow approximately 1.5x that of our CHC1050. Several power, flow and pressure configurations are available.\n\nStandard Features :\n- Highly efficient electric drive reciprocating compressor\n- Rates up to 360 mscf/d @ 30psi suction\n- Maximum ∆P up to 480psi\n- 150% more capacity than our largest HCG\n- 100% turndown capability\n- Easily processes liquids: slugs and entrained fluids\n- Ideally suited for casing gas and VRU applications\n- Optimized power utilization\n- No hydraulic system to maintain\n- Extremely robust intake and discharge valve design\n- Compression element can be serviced on site\n- No additional lifting equipment required for overhaul\n- Superior user interface – web browser HMI\n- All other features of HCG Compressor\n- Liquid handling capability – can process 100% liquids intermittently, at reduced capacity, and up to 5% of displacement at full speed\n- Capable of handling both steady entrained liquids and large slugs\n- Simple and reliable\n- Few moving parts\n- No pneumatic valves, separator or liquid pumps\n- Low speed, long stroke compression cycle\n- Low cost – easy to replace wear parts\n- Seals mounted in single piece seal cartridge for quick replacement\n- High shut in pressure rating – 1100 psi standard, 1500 (ANSI 600) optional – typically no ESD required\n- VFD speed control and auto start/stop\n- Easy and inexpensive to install and move\n- NACE (MRO175) materials standard\n\nOptions/Configurations:\n- Electric heat trace\n- Inlet or discharge cooler\n- Air conditioning\n- Optional satellite reporting system\n- 3" cylinder (550 psi ΔP)\n- 4" cylinder (310 psi ΔP)\n- 1500 psi shut in pressure',
      en: 'After extensive research and development, we are thrilled to introduce the Wet Gas Compressor. The WGC is the only small-frame electric direct drive reciprocating compressor that is capable of processing liquids – including liquid slugs – through itself. The WGC pictured is 30hp and has a 5 inch cylinder, with a maximum differential pressure of 200 psi and flow approximately 1.5x that of our CHC1050. Several power, flow and pressure configurations are available.\n\nStandard Features :\n- Highly efficient electric drive reciprocating compressor\n- Rates up to 360 mscf/d @ 30psi suction\n- Maximum ∆P up to 480psi\n- 150% more capacity than our largest HCG\n- 100% turndown capability\n- Easily processes liquids: slugs and entrained fluids\n- Ideally suited for casing gas and VRU applications\n- Optimized power utilization\n- No hydraulic system to maintain\n- Extremely robust intake and discharge valve design\n- Compression element can be serviced on site\n- No additional lifting equipment required for overhaul\n- Superior user interface – web browser HMI\n- All other features of HCG Compressor\n- Liquid handling capability – can process 100% liquids intermittently, at reduced capacity, and up to 5% of displacement at full speed\n- Capable of handling both steady entrained liquids and large slugs\n- Simple and reliable\n- Few moving parts\n- No pneumatic valves, separator or liquid pumps\n- Low speed, long stroke compression cycle\n- Low cost – easy to replace wear parts\n- Seals mounted in single piece seal cartridge for quick replacement\n- High shut in pressure rating – 1100 psi standard, 1500 (ANSI 600) optional – typically no ESD required\n- VFD speed control and auto start/stop\n- Easy and inexpensive to install and move\n- NACE (MRO175) materials standard\n\nOptions/Configurations:\n- Electric heat trace\n- Inlet or discharge cooler\n- Air conditioning\n- Optional satellite reporting system\n- 3" cylinder (550 psi ΔP)\n- 4" cylinder (310 psi ΔP)\n- 1500 psi shut in pressure',
    },
    features: [
      { id: 'Teknologi twin-screw canggih', en: 'Advanced twin-screw technology' },
      { id: 'Mampu tangani kandungan cairan hingga 99%', en: 'Handles liquid content up to 99%' },
      { id: 'Perawatan rendah dan handal', en: 'Low maintenance and reliable' },
    ],
    specs: [
      { key: { id: 'Tipe', en: 'Type' }, value: { id: 'Twin-Screw Compressor', en: 'Twin-Screw Compressor' } },
      { key: { id: 'Kapasitas', en: 'Capacity' }, value: { id: '0.5 - 20 MMSCFD', en: '0.5 - 20 MMSCFD' } },
      { key: { id: 'Tekanan', en: 'Pressure' }, value: { id: '50 - 1500 PSI', en: '50 - 1500 PSI' } },
      { key: { id: 'Aplikasi', en: 'Application' }, value: { id: 'Gas Gathering, Flare Gas Recovery', en: 'Gas Gathering, Flare Gas Recovery' } },
    ],
    image: '',
  },
  {
    id: 10, icon: 'oilgas',
    name: { id: 'Multiphase Transfer Pump (MPTP)', en: 'Multiphase Transfer Pump (MPTP)' },
    category: { id: 'Oil & Gas', en: 'Oil & Gas' },
    description: {
      id: 'Teknologi Multiphase Transfer Pump (MPTP) canggih untuk mentransfer campuran minyak, gas, air, dan padatan dari sumur ke fasilitas pemrosesan tanpa perlu pemisahan terlebih dahulu. Solusi efisien yang mengurangi biaya infrastruktur dan meningkatkan produksi.\n\nTipe MPTP:\n- Helico-Axial Pump (multi-stage)\n- Twin-Screw Pump (positive displacement)\n\nKapasitas:\n- 100 hingga 50,000 BPD (Barrels Per Day)\n- GVF (Gas Volume Fraction) 0 - 100%\n\nFitur Unggulan:\n- Eliminasi kebutuhan separator di lapangan\n- Mampu menangani GVF tinggi hingga 100%\n- Menurunkan back pressure di sumur\n- Meningkatkan recovery minyak hingga 15-30%\n- Desain compact untuk area terbatas\n- Operasi otomatis dengan remote monitoring\n\nMaterial:\n- Stainless Steel, Duplex, Super Duplex\n- Carbon Steel dengan cladding\n\nAplikasi:\n- Wellhead transfer jarak jauh\n- Subsea multiphase boosting\n- Enhanced Oil Recovery (EOR)\n- Flare gas recovery system\n- Platform lepas pantai',
      en: 'Advanced Multiphase Transfer Pump (MPTP) technology for transferring mixtures of oil, gas, water, and solids from wells to processing facilities without prior separation. An efficient solution that reduces infrastructure costs and increases production.\n\nMPTP Types:\n- Helico-Axial Pump (multi-stage)\n- Twin-Screw Pump (positive displacement)\n\nCapacity:\n- 100 to 50,000 BPD (Barrels Per Day)\n- GVF (Gas Volume Fraction) 0 - 100%\n\nKey Features:\n- Eliminates need for field separator\n- Handles high GVF up to 100%\n- Reduces well back pressure\n- Increases oil recovery by 15-30%\n- Compact design for limited areas\n- Automatic operation with remote monitoring\n\nMaterials:\n- Stainless Steel, Duplex, Super Duplex\n- Carbon Steel with cladding\n\nApplications:\n- Long-distance wellhead transfer\n- Subsea multiphase boosting\n- Enhanced Oil Recovery (EOR)\n- Flare gas recovery system\n- Offshore platforms',
    },
    features: [
      { id: 'Eliminasi kebutuhan separator', en: 'Eliminates need for separator' },
      { id: 'Meningkatkan produksi sumur', en: 'Increases well production' },
      { id: 'Efisiensi operasional tinggi', en: 'High operational efficiency' },
    ],
    specs: [
      { key: { id: 'Tipe', en: 'Type' }, value: { id: 'Helico-Axial, Twin-Screw', en: 'Helico-Axial, Twin-Screw' } },
      { key: { id: 'Kapasitas', en: 'Capacity' }, value: { id: '100 - 50,000 BPD', en: '100 - 50,000 BPD' } },
      { key: { id: 'GVF', en: 'GVF' }, value: { id: '0 - 100%', en: '0 - 100%' } },
      { key: { id: 'Aplikasi', en: 'Application' }, value: { id: 'Wellhead Transfer, Subsea', en: 'Wellhead Transfer, Subsea' } },
    ],
    image: '',
  },
  {
    id: 11, icon: 'oilgas',
    name: { id: 'Hydraulic Casing Gas (HCG)', en: 'Hydraulic Casing Gas (HCG)' },
    category: { id: 'Oil & Gas', en: 'Oil & Gas' },
    description: {
      id: 'Sistem Hydraulic Casing Gas (HCG) untuk pengelolaan gas casing pada sumur migas secara efisien dan ramah lingkungan. Teknologi ejector hidrolik yang memanfaatkan energi dari fluida bertekanan untuk mengkompresi dan mengalirkan gas casing tanpa kompresor mekanis.\n\nKomponen Sistem:\n- Hydraulic Ejector (main unit)\n- Power Fluid Pump\n- Separator dan Control Panel\n- Piping dan Instrumentasi\n\nSpesifikasi Teknis:\n- Tekanan Kerja: 100 - 2000 PSI\n- Material: Stainless Steel, Duplex\n- Kapasitas gas: hingga 15 MMSCFD\n\nKeunggulan:\n- Zero emission — ramah lingkungan\n- Tidak ada bagian bergerak (no moving parts)\n- Biaya operasi dan perawatan rendah\n- Meningkatkan produksi minyak dengan mengurangi back pressure\n- Instalasi mudah dan cepat\n- Operasi manual dan otomatis\n\nAplikasi:\n- Casing gas management di sumur produksi\n- Wellhead compression\n- VRU (Vapor Recovery Unit)\n- Enhanced Oil Recovery (EOR)\n- Lapangan migas marginal',
      en: 'Hydraulic Casing Gas (HCG) system for efficient and environmentally friendly casing gas management in oil and gas wells. Hydraulic ejector technology that utilizes energy from pressurized fluid to compress and transfer casing gas without mechanical compressors.\n\nSystem Components:\n- Hydraulic Ejector (main unit)\n- Power Fluid Pump\n- Separator and Control Panel\n- Piping and Instrumentation\n\nTechnical Specifications:\n- Working Pressure: 100 - 2000 PSI\n- Material: Stainless Steel, Duplex\n- Gas capacity: up to 15 MMSCFD\n\nAdvantages:\n- Zero emission — environmentally friendly\n- No moving parts\n- Low operating and maintenance cost\n- Increases oil production by reducing back pressure\n- Easy and quick installation\n- Manual and automatic operation\n\nApplications:\n- Casing gas management in production wells\n- Wellhead compression\n- VRU (Vapor Recovery Unit)\n- Enhanced Oil Recovery (EOR)\n- Marginal oil and gas fields',
    },
    features: [
      { id: 'Ramah lingkungan (zero emission)', en: 'Eco-friendly (zero emission)' },
      { id: 'Meningkatkan recovery minyak', en: 'Increases oil recovery' },
      { id: 'Sistem kontrol otomatis', en: 'Automatic control system' },
    ],
    specs: [
      { key: { id: 'Tipe', en: 'Type' }, value: { id: 'Hydraulic Ejector System', en: 'Hydraulic Ejector System' } },
      { key: { id: 'Tekanan Kerja', en: 'Working Pressure' }, value: { id: '100 - 2000 PSI', en: '100 - 2000 PSI' } },
      { key: { id: 'Material', en: 'Material' }, value: { id: 'Stainless Steel, Duplex', en: 'Stainless Steel, Duplex' } },
      { key: { id: 'Aplikasi', en: 'Application' }, value: { id: 'Casting Gas Management, Wellhead', en: 'Casting Gas Management, Wellhead' } },
    ],
    image: '',
  },
]

export function getProductById(id) {
  return getProducts().find(p => p.id === Number(id)) || null
}

export const iconOptions = [
  { value: 'pipe', label: 'Pipe' },
  { value: 'valve', label: 'Valve' },
  { value: 'bolt', label: 'Bolt' },
  { value: 'generator', label: 'Generator' },
  { value: 'safety', label: 'Safety' },
  { value: 'tool', label: 'Tool' },
  { value: 'oilgas', label: 'Oil & Gas' },
]

function seed() {
  const stored = localStorage.getItem('yusano_products')
  const version = Number(localStorage.getItem('yusano_products_version'))
  if (!stored || version < PRODUCTS_VERSION) {
    localStorage.setItem('yusano_products', JSON.stringify(defaultProducts))
    localStorage.setItem('yusano_products_version', String(PRODUCTS_VERSION))
  }
}

export function getProducts() {
  seed()
  return JSON.parse(localStorage.getItem('yusano_products') || '[]')
}

export function saveProducts(products) {
  localStorage.setItem('yusano_products', JSON.stringify(products))
}

export function getMessages() {
  return JSON.parse(localStorage.getItem('yusano_messages') || '[]')
}

export function saveMessages(messages) {
  localStorage.setItem('yusano_messages', JSON.stringify(messages))
}

export function addMessage(msg) {
  const msgs = getMessages()
  msgs.unshift({ id: Date.now(), date: new Date().toISOString(), read: false, ...msg })
  saveMessages(msgs)
  return msgs
}

export function markRead(id) {
  const msgs = getMessages().map(m => m.id === id ? { ...m, read: true } : m)
  saveMessages(msgs)
  return msgs
}

export function removeMessage(id) {
  const msgs = getMessages().filter(m => m.id !== id)
  saveMessages(msgs)
  return msgs
}

function seedCategories() {
  const stored = localStorage.getItem('yusano_categories')
  const version = Number(localStorage.getItem('yusano_categories_version'))
  if (!stored || version < CATEGORIES_VERSION) {
    localStorage.setItem('yusano_categories', JSON.stringify(defaultCategories))
    localStorage.setItem('yusano_categories_version', String(CATEGORIES_VERSION))
  }
}

export function getCategories() {
  seedCategories()
  return JSON.parse(localStorage.getItem('yusano_categories') || '[]')
}

export function saveCategories(categories) {
  localStorage.setItem('yusano_categories', JSON.stringify(categories))
}

export function changePassword(currentPassword, newPassword) {
  const storedHash = localStorage.getItem('yusano_hash')
  if (btoa(currentPassword) !== storedHash) return false
  localStorage.setItem('yusano_hash', btoa(newPassword))
  return true
}

export function login(email, password) {
  if (email !== ADMIN_EMAIL) return false
  const storedHash = localStorage.getItem('yusano_hash')
  const validHash = storedHash || btoa('admin123')
  if (!storedHash) localStorage.setItem('yusano_hash', validHash)
  if (btoa(password) === validHash) {
    localStorage.setItem('yusano_auth', JSON.stringify({ email, loggedIn: Date.now() }))
    return true
  }
  return false
}

export function logout() {
  localStorage.removeItem('yusano_auth')
}

export function isLoggedIn() {
  try {
    const a = JSON.parse(localStorage.getItem('yusano_auth') || '{}')
    return a.loggedIn && a.email === ADMIN_EMAIL
  } catch { return false }
}

export const ADMIN_EMAIL_CONST = ADMIN_EMAIL

