import {
  AvatarOption,
  RegionalCultureZone,
  Badge,
  SilaMateri,
  LevelData,
  SikapGameItem,
  PairMatchPair,
  PuzzleSymbol,
  MisiKebaikan,
  BenarSalahItem,
  RodaTantanganItem,
  EvaluasiQuestion
} from '../types';

export const AVATARS: AvatarOption[] = [
  {
    id: 'budi',
    name: 'Budi',
    region: 'Jawa Tengah & DI Yogyakarta',
    island: 'Pulau Jawa',
    emoji: '👦🏽',
    avatarBg: 'bg-amber-100 border-amber-400 text-amber-900',
    description: 'Santun, rendah hati, dan gemar bergotong royong bersama teman.',
    pakaianAdat: 'Beskap & Blangkon Batik Parang',
    rumahAdat: 'Rumah Joglo',
    alatMusik: 'Gamelan & Kendang',
    salamKhas: 'Sugeng Rawuh!',
    nilaiKhas: 'Gugur Gunung & Andhap Asor',
    motifDaerah: 'Batik Parang & Kawung'
  },
  {
    id: 'siti',
    name: 'Siti',
    region: 'Sumatra Barat (Minangkabau)',
    island: 'Pulau Sumatra',
    emoji: '👧🏽',
    avatarBg: 'bg-rose-100 border-rose-400 text-rose-900',
    description: 'Ramah, berbudi pekerti luhur, dan cerdas bertutur kata santun.',
    pakaianAdat: 'Baju Kurung Basiba & Selendang Songket Emas',
    rumahAdat: 'Rumah Gadang Bergonjong',
    alatMusik: 'Saluang & Talempong',
    salamKhas: 'Tarimo Kasih & Horas!',
    nilaiKhas: 'Musyawarah Mufakat & Alang Tulung',
    motifDaerah: 'Songket Pandai Sikek'
  },
  {
    id: 'wayan',
    name: 'Wayan',
    region: 'Bali (Pulau Dewata)',
    island: 'Pulau Bali',
    emoji: '👦🏻',
    avatarBg: 'bg-emerald-100 border-emerald-400 text-emerald-900',
    description: 'Kreatif, gemar melukis dan menari, serta menjaga keselarasan alam.',
    pakaianAdat: 'Baju Safari Putih, Kamen & Udeng Bali',
    rumahAdat: 'Bale Gapura Candi Bentar',
    alatMusik: 'Rindik Bambu & Gamelan Gong Kebyar',
    salamKhas: 'Om Swastiastu!',
    nilaiKhas: 'Tri Hita Karana & Tradisi Ngayah',
    motifDaerah: 'Kain Poleng & Endek Bali'
  },
  {
    id: 'meilani',
    name: 'Meilani',
    region: 'DKI Jakarta (Betawi)',
    island: 'Pulau Jawa',
    emoji: '👧🏻',
    avatarBg: 'bg-sky-100 border-sky-400 text-sky-900',
    description: 'Ceria, berani berpendapat, dan selalu terbuka menyambut kawan baru.',
    pakaianAdat: 'Kebaya Encim Ceria & Kain Tumpal Betawi',
    rumahAdat: 'Rumah Kebaya',
    alatMusik: 'Gambang Kromong & Tanjidor',
    salamKhas: 'Halo Saudare Semuanye!',
    nilaiKhas: 'Saling Menghargai Keberagaman',
    motifDaerah: 'Batik Tumpal Betawi Pucuk Rebung'
  },
  {
    id: 'edo',
    name: 'Edo',
    region: 'Papua Pegunungan (Bumi Cenderawasih)',
    island: 'Pulau Papua',
    emoji: '👦🏾',
    avatarBg: 'bg-orange-100 border-orange-400 text-orange-900',
    description: 'Pemberani, suka bernyanyi, dan setia menjaga persaudaraan tulus.',
    pakaianAdat: 'Rompi Kulit Kayu, Noken Rajut & Mahkota Kasuari',
    rumahAdat: 'Rumah Honai',
    alatMusik: 'Tifa Papua Berukir Kayu',
    salamKhas: 'Amolongo & Salam Damai!',
    nilaiKhas: 'Tradisi Bakar Batu (Persatuan & Syukur)',
    motifDaerah: 'Ukiran Asmat & Simbol Cenderawasih'
  },
  {
    id: 'dayu',
    name: 'Dayu',
    region: 'Kalimantan Timur (Borneo Khatulistiwa)',
    island: 'Pulau Kalimantan',
    emoji: '👧🏽',
    avatarBg: 'bg-teal-100 border-teal-400 text-teal-900',
    description: 'Penyayang hutan tropis, gemar menanam, dan menjunjung keadilan.',
    pakaianAdat: 'Baju Adat Ta\'a Bertabur Manik & Seraung Dayak',
    rumahAdat: 'Rumah Betang Panjang',
    alatMusik: 'Sampe Petik Petualang',
    salamKhas: 'Adil Ka\' Talino, Bacuramin Ka\' Saruga!',
    nilaiKhas: 'Handep (Gotong Royong Rumah Betang)',
    motifDaerah: 'Ukiran Dayak Batang Garing'
  },
  {
    id: 'laode',
    name: 'La Ode',
    region: 'Sulawesi Selatan (Makassar & Toraja)',
    island: 'Pulau Sulawesi',
    emoji: '👦🏽',
    avatarBg: 'bg-indigo-100 border-indigo-400 text-indigo-900',
    description: 'Tangguh seperti pelaut Pinisi, berprinsip kokoh, dan setia kawan.',
    pakaianAdat: 'Baju Bodo Sutra Tenun & Passapu Tradisional',
    rumahAdat: 'Rumah Tongkonan Beratap Melengkung',
    alatMusik: 'Kolintang & Gandrang Perkusi',
    salamKhas: 'Tabe\' & Salam Pancasila!',
    nilaiKhas: 'Siri\' na Pacce (Harga Diri Membela Kebaikan)',
    motifDaerah: 'Tenun Sutra Lagosi & Motif Paqteddong'
  },
  {
    id: 'tiara',
    name: 'Tiara',
    region: 'Maluku & Nusa Tenggara Timur',
    island: 'Kepulauan Maluku & NTT',
    emoji: '👧🏽',
    avatarBg: 'bg-purple-100 border-purple-400 text-purple-900',
    description: 'Penyayang kerukunan, bersuara merdu, dan penuh kasih sayang.',
    pakaianAdat: 'Baju Cele Merah & Kain Tenun Ikat Rote',
    rumahAdat: 'Rumah Baileo & Mbaru Niang',
    alatMusik: 'Sasando Rote Daun Lontar & Tifa Totobuang',
    salamKhas: 'Tabea & Salve Kawan!',
    nilaiKhas: 'Pela Gandong (Persaudaraan Lintas Agama)',
    motifDaerah: 'Tenun Ikat Sumba & Maluku'
  }
];

export const NUSANTARA_CULTURE_REGIONS: RegionalCultureZone[] = [
  {
    id: 'sumatra',
    islandName: 'Sumatra',
    title: 'Ranah Minang & Bumi Melayu',
    accentColor: 'text-rose-600',
    bgGradient: 'from-rose-500 to-amber-600',
    borderColor: 'border-rose-300',
    icon: '🏛️',
    rumahAdat: {
      nama: 'Rumah Gadang',
      filosofi: 'Atap melengkung runcing seperti tanduk kerbau (*gonjong*) melambangkan kemenangan dan musyawarah.',
      icon: '🏛️'
    },
    pakaianAdat: {
      nama: 'Baju Kurung Basiba & Songket Emas',
      deskripsi: 'Sarat benang emas yang melambangkan kemuliaan budi dan kehormatan keluarga.'
    },
    alatMusik: {
      nama: 'Saluang & Talempong',
      caraMain: 'Ditiup dan dipukul berirama ceria dalam pesta rakyat.',
      icon: '🎺'
    },
    tarianTradisional: 'Tari Piring & Tari Saman yang kompak serasi.',
    salamKhas: 'Horas! Tarimo Kasih!',
    tradisiGotongRoyong: {
      nama: 'Alang Tulung',
      penjelasan: 'Saling tolong-menolong saat mendirikan rumah dan membajak sawah.'
    },
    kaitanPancasila: 'Mencerminkan Sila ke-2 (Kemanusiaan) & Sila ke-4 (Musyawarah Mufakat).',
    funFact: 'Rumah Gadang dirancang tahan gempa tanpa menggunakan paku besi sama sekali lho!'
  },
  {
    id: 'jawa',
    islandName: 'Jawa & Madura',
    title: 'Bumi Gamelan & Keraton Luhur',
    accentColor: 'text-amber-600',
    bgGradient: 'from-amber-500 to-red-600',
    borderColor: 'border-amber-300',
    icon: '🛕',
    rumahAdat: {
      nama: 'Rumah Joglo',
      filosofi: 'Pilar utama (*soko guru*) menopang pendopo terbuka sebagai lambang keterbukaan menyambut sesama.',
      icon: '🛕'
    },
    pakaianAdat: {
      nama: 'Kebaya, Beskap & Blangkon',
      deskripsi: 'Dilengkapi kain batik tulis dengan filosofi doa keselamatan dan kesabaran.'
    },
    alatMusik: {
      nama: 'Gamelan & Angklung Bambu',
      caraMain: 'Dipukul dan digoyangkan bersama menciptakan harmoni nada merdu.',
      icon: '🪕'
    },
    tarianTradisional: 'Tari Gambyong & Kesenian Wayang Kulit mendidik.',
    salamKhas: 'Sugeng Rawuh! Rahayu!',
    tradisiGotongRoyong: {
      nama: 'Gugur Gunung',
      penjelasan: 'Seluruh warga desa serempak kerja bakti membersihkan saluran air dan fasilitas umum.'
    },
    kaitanPancasila: 'Mencerminkan Sila ke-3 (Persatuan Indonesia) & Sila ke-5 (Keadilan Sosial).',
    funFact: 'Angklung dari Jawa Barat telah diakui UNESCO sebagai warisan budaya mahakarya dunia!'
  },
  {
    id: 'bali_nusa',
    islandName: 'Bali & Nusa Tenggara',
    title: 'Kepulauan Dewata & Nusa Indah',
    accentColor: 'text-emerald-600',
    bgGradient: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-300',
    icon: '⛩️',
    rumahAdat: {
      nama: 'Bale Gapura Candi Bentar & Mbaru Niang',
      filosofi: 'Gerbang terbelah dua yang melambangkan penyambutan tanpa sekat dan kesucian hati.',
      icon: '⛩️'
    },
    pakaianAdat: {
      nama: 'Pakaian Safari Udeng & Kain Tenun Ikat',
      deskripsi: 'Ikat kepala udeng melambangkan pemikiran luhur yang terikat pada kebajikan.',
      },
    alatMusik: {
      nama: 'Sasando Daun Lontar & Rindik',
      caraMain: 'Dipetik dawainya dengan wadah resonansi daun lontar asli Pulau Rote.',
      icon: '🎻'
    },
    tarianTradisional: 'Tari Pendet menyambut tamu & Tari Caci Manggarai.',
    salamKhas: 'Om Swastiastu! Salve!',
    tradisiGotongRoyong: {
      nama: 'Ngayah & Subak',
      penjelasan: 'Bekerja bersama secara sukarela untuk upacara adat dan pembagian irigasi sawah adil.'
    },
    kaitanPancasila: 'Mencerminkan Sila ke-1 (Ketuhanan yang Harmonis) & Sila ke-5 (Keadilan Air Subak).',
    funFact: 'Alat musik Sasando dibuat dari daun pohon lontar yang dikeringkan dengan penuh ketelitian!'
  },
  {
    id: 'kalimantan',
    islandName: 'Kalimantan',
    title: 'Borneo Zamrud Khatulistiwa',
    accentColor: 'text-teal-600',
    bgGradient: 'from-teal-500 to-emerald-600',
    borderColor: 'border-teal-300',
    icon: '🏕️',
    rumahAdat: {
      nama: 'Rumah Betang Panjang',
      filosofi: 'Rumah panggung kayu ulin panjang tempat puluhan keluarga hidup serumah rukun damai.',
      icon: '🏕️'
    },
    pakaianAdat: {
      nama: 'Baju Ta\'a & King Baba Manik',
      deskripsi: 'Dihiasi manik warna-warni dan topi seraung anyaman pelindung matahari.'
    },
    alatMusik: {
      nama: 'Sampe Dayak Petik',
      caraMain: 'Dipetik lembut dengan melodi syahdu yang menggambarkan ketenangan rimba raya.',
      icon: '🎸'
    },
    tarianTradisional: 'Tari Burung Enggang yang anggun dan lincah.',
    salamKhas: 'Adil Ka\' Talino, Bacuramin Ka\' Saruga!',
    tradisiGotongRoyong: {
      nama: 'Handep',
      penjelasan: 'Bahu-membahu bergiliran memanen padi dan mendirikan lumbung bersama.'
    },
    kaitanPancasila: 'Mencerminkan Sila ke-3 (Persatuan Serumah) & Sila ke-5 (Gotong Royong Adil).',
    funFact: 'Rumah Betang Dayak panjangnya bisa mencapai 150 meter dan menampung lebih dari 100 jiwa rukun!'
  },
  {
    id: 'sulawesi',
    islandName: 'Sulawesi',
    title: 'Bumi Pinisi & Toraja Megah',
    accentColor: 'text-indigo-600',
    bgGradient: 'from-indigo-500 to-blue-600',
    borderColor: 'border-indigo-300',
    icon: '⛵',
    rumahAdat: {
      nama: 'Rumah Tongkonan',
      filosofi: 'Atap berbentuk perahu menghadap utara melambangkan asal-usul nenek moyang pelaut ulung.',
      icon: '⛵'
    },
    pakaianAdat: {
      nama: 'Baju Bodo Sutra Bugis',
      deskripsi: 'Salah satu busana tertua di dunia berbahan kain tenun serat kapas sutra alam.'
    },
    alatMusik: {
      nama: 'Kolintang Kayu & Gandrang',
      caraMain: 'Bilah kayu dipukul menghasilkan alunan nada riang bersemangat.',
      icon: '🎹'
    },
    tarianTradisional: 'Tari Pakarena dengan kipas gemulai & Tari Ma\'gellu.',
    salamKhas: 'Tabe\'! Salama\'!',
    tradisiGotongRoyong: {
      nama: 'Mapalus & Siri\' na Pacce',
      penjelasan: 'Kompak saling menolong dan saling menjaga kehormatan serta kebaikan bersama.'
    },
    kaitanPancasila: 'Mencerminkan Sila ke-2 (Rasa Kemanusiaan) & Sila ke-3 (Persatuan Pelaut Bangsa).',
    funFact: 'Kapal Pinisi dari Bulukumba Sulawesi Selatan dibuat tangan para pandai kayu tanpa paku modern dan sanggup mengarungi samudera luas!'
  },
  {
    id: 'papua_maluku',
    islandName: 'Maluku & Papua',
    title: 'Bumi Cenderawasih & Mutiara Timur',
    accentColor: 'text-orange-600',
    bgGradient: 'from-orange-500 to-amber-600',
    borderColor: 'border-orange-300',
    icon: '🛖',
    rumahAdat: {
      nama: 'Rumah Honai & Baileo',
      filosofi: 'Bentuk bundar beratap jerami tanpa jendela menahan hawa dingin dan menjaga keakraban keluarga.',
      icon: '🛖'
    },
    pakaianAdat: {
      nama: 'Baju Kurung Kulit Kayu & Noken Rajut',
      deskripsi: 'Noken adalah tas anyam serat pohon yang melambangkan ketulusan kasih ibu dan kerja keras.'
    },
    alatMusik: {
      nama: 'Tifa Berukir & Totobuang',
      caraMain: 'Ditabuh dengan tangan menghasilkan detak ritme semangat persaudaraan.',
      icon: '🥁'
    },
    tarianTradisional: 'Tari Sajojo, Tari Yospan & Tari Cakalele.',
    salamKhas: 'Amolongo! Tabea Kawan!',
    tradisiGotongRoyong: {
      nama: 'Bakar Batu & Pela Gandong',
      penjelasan: 'Memasak bersama di lubang batu panas lalu dibagikan ke seluruh suku sebagai wujud syukur dan damai.'
    },
    kaitanPancasila: 'Mencerminkan Sila ke-1 (Rasa Syukur kepada Tuhan) & Sila ke-3 (Perdamaian Antar Suku).',
    funFact: 'Tas Noken Papua telah diakui oleh UNESCO sebagai Warisan Budaya Takbenda Dunia!'
  }
];

export const ALL_BADGES: Badge[] = [
  {
    id: 'badge-1',
    levelNumber: 1,
    name: 'Sahabat Toleransi',
    silaNumber: 1,
    description: 'Berhasil menuntaskan petualangan di Desa Kerukunan dan menghormati keberagaman ibadah.',
    icon: '⭐',
    unlocked: false
  },
  {
    id: 'badge-2',
    levelNumber: 2,
    name: 'Pahlawan Kemanusiaan',
    silaNumber: 2,
    description: 'Berhasil di Kota Empati dengan membantu teman kesulitan dan bersikap sopan santun.',
    icon: '🤝',
    unlocked: false
  },
  {
    id: 'badge-3',
    levelNumber: 3,
    name: 'Penjaga Persatuan',
    silaNumber: 3,
    description: 'Berhasil di Pulau Persatuan dengan bekerja sama rukun dan cinta budaya nusantara.',
    icon: '🌳',
    unlocked: false
  },
  {
    id: 'badge-4',
    levelNumber: 4,
    name: 'Pemimpin Bijaksana',
    silaNumber: 4,
    description: 'Berhasil di Balai Musyawarah dengan mendengarkan pendapat dan bermusyawarah mufakat.',
    icon: '🐃',
    unlocked: false
  },
  {
    id: 'badge-5',
    levelNumber: 5,
    name: 'Pembawa Keadilan',
    silaNumber: 5,
    description: 'Berhasil di Negeri Keadilan dengan membagi tugas adil dan menyeimbangkan hak serta kewajiban.',
    icon: '🌾',
    unlocked: false
  },
  {
    id: 'badge-duta',
    levelNumber: 6,
    name: 'Duta Pancasila Sejati',
    silaNumber: 0,
    description: 'Menyelesaikan seluruh petualangan dan evaluasi akhir di Pulau Pancasila.',
    icon: '🏆',
    unlocked: false
  }
];

export const SILA_MATERI: SilaMateri[] = [
  {
    number: 1,
    bunyi: 'Ketuhanan Yang Maha Esa',
    lambang: '⭐',
    lambangDeskripsi: 'Bintang Emas berlatar hitam',
    warnaTema: 'from-amber-400 to-yellow-500',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    penjelasan:
      'Sila pertama mengajarkan bahwa bangsa Indonesia percaya kepada Tuhan Yang Maha Esa. Kita harus beribadah sesuai agama masing-masing, tidak mengganggu orang lain yang sedang beribadah, dan saling menghormati antarumat beragama.',
    maknaSimbol:
      'Bintang bersudut lima melambangkan cahaya rohani dari Tuhan kepada setiap manusia di bumi.',
    penerapanRumah: [
      {
        title: 'Berdoa Bersama Keluarga',
        desc: 'Berdoa sebelum makan, belajar, dan sebelum tidur bersama ayah, ibu, dan saudara.',
        icon: '🙏'
      },
      {
        title: 'Menjaga Ketertiban Ibadah',
        desc: 'Tidak berisik atau memutar musik terlalu keras saat anggota keluarga lain sedang beribadah di rumah.',
        icon: '🕊️'
      }
    ],
    penerapanSekolah: [
      {
        title: 'Menghormati Teman Beribadah',
        desc: 'Memberikan kesempatan dan waktu kepada teman yang berbeda agama saat waktu ibadahnya tiba.',
        icon: '⛪'
      },
      {
        title: 'Berteman Tanpa Pilih Kasih',
        desc: 'Tetap rukun dan akrab bermain bersama seluruh teman di kelas tanpa membedakan agamanya.',
        icon: '🤝'
      }
    ],
    penerapanMasyarakat: [
      {
        title: 'Toleransi Antar Tetangga',
        desc: 'Mengucapkan selamat hari raya kepada tetangga yang merayakan dan saling menjaga keamanan tempat ibadah.',
        icon: '🕌'
      },
      {
        title: 'Tidak Memaksakan Keyakinan',
        desc: 'Menghormati hak setiap orang untuk memeluk dan menjalankan ibadah sesuai agamanya masing-masing.',
        icon: '✨'
      }
    ],
    refleksi: {
      pertanyaan: 'Saat kamu sedang bermain bola di taman sekolah, temanmu minta izin untuk shalat / beribadah. Apa tindakan terbaikmu?',
      pilihan: [
        {
          teks: 'Mengizinkannya dan menunggunya dengan tertib tanpa mengganggu.',
          benar: true,
          penjelasan: 'Tepat sekali! Menghargai kewajiban ibadah teman mencerminkan pengamalan Sila ke-1.'
        },
        {
          teks: 'Melarangnya pergi karena permainan sedang seru.',
          benar: false,
          penjelasan: 'Kita tidak boleh menghalangi teman menjalankan ibadahnya, karena ibadah adalah kewajiban kepada Tuhan.'
        },
        {
          teks: 'Mengejek teman tersebut karena pergi lebih dulu.',
          benar: false,
          penjelasan: 'Mengejek teman yang beribadah melanggar nilai toleransi dan saling menghormati.'
        }
      ]
    }
  },
  {
    number: 2,
    bunyi: 'Kemanusiaan yang Adil dan Beradab',
    lambang: '⛓️',
    lambangDeskripsi: 'Rantai Emas berlatar merah',
    warnaTema: 'from-rose-500 to-red-600',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    penjelasan:
      'Sila kedua mengajarkan kita untuk mengasihi sesama manusia, bersikap santun, menolong yang lemah, tidak menyakiti atau mengejek (stop perundungan), dan selalu memiliki rasa empati.',
    maknaSimbol:
      'Mata rantai bulat melambangkan wanita dan persegi melambangkan pria yang saling berkaitan erat dan bahu-membahu membela kebenaran.',
    penerapanRumah: [
      {
        title: 'Membantu Orang Tua',
        desc: 'Membantu ibu merapikan tempat tidur atau menjaga adik kecil dengan penuh kasih sayang.',
        icon: '🏡'
      },
      {
        title: 'Berbicara Santun',
        desc: 'Menggunakan kata "tolong", "maaf", dan "terima kasih" kepada orang tua serta saudara di rumah.',
        icon: '🗣️'
      }
    ],
    penerapanSekolah: [
      {
        title: 'Menolong Teman yang Terjatuh',
        desc: 'Segera membantu teman yang terluka atau kesulitan membawa barang bawaan ke UKS atau kelas.',
        icon: '🩹'
      },
      {
        title: 'Stop Perundungan (No Bullying)',
        desc: 'Tidak pernah mengolok-olok kekurangan teman dan membela teman yang diganggu.',
        icon: '🛡️'
      }
    ],
    penerapanMasyarakat: [
      {
        title: 'Berbagi dengan yang Membutuhkan',
        desc: 'Menyumbangkan pakaian layak pakai atau makanan kepada korban bencana alam.',
        icon: '📦'
      },
      {
        title: 'Menghormati Orang yang Lebih Tua',
        desc: 'Memberikan tempat duduk di angkutan umum kepada lansia atau ibu hamil.',
        icon: '👵'
      }
    ],
    refleksi: {
      pertanyaan: 'Kamu melihat seorang teman baru di kelas duduk sendirian dan bekal makanannya tumpah. Apa yang kamu lakukan?',
      pilihan: [
        {
          teks: 'Mendekatinya, membantunya membersihkan, dan berbagi bekal makan siang.',
          benar: true,
          penjelasan: 'Luar biasa! Empati dan menolong sesama yang tertimpa musibah adalah wujud nyata Sila ke-2.'
        },
        {
          teks: 'Menertawakannya dari kejauhan bersama teman lain.',
          benar: false,
          penjelasan: 'Menertawakan orang yang kesusahan sangat bertentangan dengan adab dan kemanusiaan.'
        },
        {
          teks: 'Pura-pura tidak melihat dan langsung pergi bermain.',
          benar: false,
          penjelasan: 'Sebagai manusia beradab, kita peduli dan tanggap menolong sesama yang membutuhkan.'
        }
      ]
    }
  },
  {
    number: 3,
    bunyi: 'Persatuan Indonesia',
    lambang: '🌳',
    lambangDeskripsi: 'Pohon Beringin berlatar putih',
    warnaTema: 'from-emerald-500 to-green-600',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    penjelasan:
      'Sila ketiga mengajarkan cinta tanah air Indonesia, menjaga persatuan di tengah keberagaman suku, bahasa, adat dan budaya (Bhinneka Tunggal Ika), serta bangga memakai produk Indonesia.',
    maknaSimbol:
      'Pohon beringin yang rindang memiliki akar gantung menjalar, melambangkan Indonesia sebagai tempat berteduh aman bagi segenap rakyat dari berbagai suku.',
    penerapanRumah: [
      {
        title: 'Menjaga Kerukunan Keluarga',
        desc: 'Tidak bertengkar dengan adik atau kakak, serta menyelesaikan perbedaan secara damai.',
        icon: '👨‍👩‍👧‍👦'
      },
      {
        title: 'Mengenal Budaya Daerah',
        desc: 'Belajar makanan tradisional, lagu daerah, dan bahasa daerah bersama keluarga.',
        icon: '🍲'
      }
    ],
    penerapanSekolah: [
      {
        title: 'Bekerja Sama dalam Kelompok',
        desc: 'Kompak membersihkan kelas (piket kelas) dan mengerjakan tugas kelompok bersama tanpa membeda-bedakan suku.',
        icon: '🧹'
      },
      {
        title: 'Menggunakan Bahasa Indonesia Baik',
        desc: 'Menggunakan Bahasa Indonesia sebagai bahasa persatuan saat berkomunikasi dengan teman dari berbagai daerah.',
        icon: '🇮🇩'
      }
    ],
    penerapanMasyarakat: [
      {
        title: 'Ikut Kerja Bakti Lingkungan',
        desc: 'Bersama tetangga membersihkan selokan dan lingkungan sekitar agar bersih dan bebas banjir.',
        icon: '🏞️'
      },
      {
        title: 'Mencintai Produk Buatan Indonesia',
        desc: 'Bangga membeli tas, sepatu, dan pakaian batik hasil kerajinan masyarakat Indonesia.',
        icon: '🛍️'
      }
    ],
    refleksi: {
      pertanyaan: 'Saat pembagian kelompok belajar, kamu satu kelompok dengan teman yang logat bicaranya berbeda dan pakaian daerahnya berbeda. Sikapmu?',
      pilihan: [
        {
          teks: 'Menyambutnya dengan gembira, saling menghormati, dan bekerja sama menyelesaikan tugas.',
          benar: true,
          penjelasan: 'Hebat! Menghargai keberagaman suku dan menjaga persatuan adalah inti Sila ke-3.'
        },
        {
          teks: 'Meminta guru untuk memindahkanmu ke kelompok teman satu suku saja.',
          benar: false,
          penjelasan: 'Memilih teman hanya dari suku sendiri dapat memecah belah persatuan bangsa.'
        },
        {
          teks: 'Menirukan logat bicaranya untuk bahan lelucon.',
          benar: false,
          penjelasan: 'Mengejek logat daerah orang lain dapat menyinggung perasaan dan merusak persatuan.'
        }
      ]
    }
  },
  {
    number: 4,
    bunyi: 'Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan',
    lambang: '🐃',
    lambangDeskripsi: 'Kepala Banteng berlatar merah',
    warnaTema: 'from-amber-600 to-orange-700',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    penjelasan:
      'Sila keempat mengajarkan kita untuk menyelesaikan masalah dengan musyawarah (berdiskusi bersama), saling mendengarkan saran teman, tidak memaksakan kehendak sendiri, dan menerima keputusan bersama dengan lapang dada.',
    maknaSimbol:
      'Banteng adalah hewan sosial yang suka berkumpul, melambangkan musyawarah rakyat berkumpul bersama untuk mencapai mufakat.',
    penerapanRumah: [
      {
        title: 'Musyawarah Rencana Liburan',
        desc: 'Berdiskusi bersama ayah, ibu, dan adik untuk menentukan tempat liburan atau pembagian tugas rumah.',
        icon: '🗺️'
      },
      {
        title: 'Mendengarkan Nasihat',
        desc: 'Mendengarkan penjelasan orang tua saat terjadi perbedaan pendapat tanpa marah-marah.',
        icon: '👂'
      }
    ],
    penerapanSekolah: [
      {
        title: 'Pemilihan Ketua Kelas Bersama',
        desc: 'Mengikuti musyawarah atau pemungutan suara pemilihan ketua kelas secara tertib dan jujur.',
        icon: '🗳️'
      },
      {
        title: 'Menghargai Pendapat Teman',
        desc: 'Tidak memotong pembicaraan teman yang sedang menyampaikan ide dalam diskusi kelompok.',
        icon: '💡'
      }
    ],
    penerapanMasyarakat: [
      {
        title: 'Menghadiri Rapat RT / Warga',
        desc: 'Mengikuti dan menghargai keputusan musyawarah warga untuk kebaikan lingkungan bersama.',
        icon: '🏘️'
      },
      {
        title: 'Menerima Hasil Musyawarah',
        desc: 'Melaksanakan keputusan bersama dengan ikhlas dan tanggung jawab walau pendapat kita tidak terpilih.',
        icon: '👍'
      }
    ],
    refleksi: {
      pertanyaan: 'Saat kelompokmu berdiskusi menentukan judul drama, usulanmu tidak dipilih oleh mayoritas teman. Apa sikap terbaikmu?',
      pilihan: [
        {
          teks: 'Menerima keputusan bersama dengan lapang dada dan tetap bersemangat latihan.',
          benar: true,
          penjelasan: 'Pintar! Menghargai hasil musyawarah adalah cerminan jiwa bijaksana Sila ke-4.'
        },
        {
          teks: 'Marah, mogok latihan, dan tidak mau berbicara dengan anggota kelompok.',
          benar: false,
          penjelasan: 'Mogok dan memaksakan kehendak bertentangan dengan prinsip demokrasi dan musyawarah.'
        },
        {
          teks: 'Memaksa teman-teman memilih ide kita karena merasa ide kita paling hebat.',
          benar: false,
          penjelasan: 'Kita tidak boleh memaksakan kehendak pribadi kepada orang lain.'
        }
      ]
    }
  },
  {
    number: 5,
    bunyi: 'Keadilan Sosial bagi Seluruh Rakyat Indonesia',
    lambang: '🌾',
    lambangDeskripsi: 'Padi dan Kapas berlatar putih',
    warnaTema: 'from-blue-500 to-indigo-600',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    penjelasan:
      'Sila kelima mengajarkan kita untuk bersikap adil kepada siapa saja, menghargai hasil karya orang lain, suka berhemat (tidak boros), seimbang menjalankan hak dan kewajiban, serta gemar bergotong royong.',
    maknaSimbol:
      'Padi melambangkan makanan pokok (pangan) dan kapas melambangkan pakaian (sandang), sebagai kebutuhan utama rakyat yang adil dan makmur.',
    penerapanRumah: [
      {
        title: 'Berbagi Makanan Secara Adil',
        desc: 'Membagi kue atau buah dengan adik dan kakak sama rata tanpa merasa ingin menang sendiri.',
        icon: '🍰'
      },
      {
        title: 'Hemat dan Menabung',
        desc: 'Tidak boros menghabiskan uang jajan, menyisihkan sebagian uang untuk ditabung di celengan.',
        icon: '🪙'
      }
    ],
    penerapanSekolah: [
      {
        title: 'Menjalankan Kewajiban Piket',
        desc: 'Menjalankan tugas piket kelas sebelum menuntut hak mendapatkan kelas yang bersih dan nyaman.',
        icon: '🪣'
      },
      {
        title: 'Menghargai Karya Teman',
        desc: 'Memberikan pujian tulus atas hasil lukisan atau karya kerajinan teman sekelas.',
        icon: '🎨'
      }
    ],
    penerapanMasyarakat: [
      {
        title: 'Menjaga Fasilitas Umum',
        desc: 'Tidak merusak mainan di taman bermain kota agar semua anak bisa menikmatinya bersama.',
        icon: '🛝'
      },
      {
        title: 'Tidak Pilih Kasih dalam Berteman',
        desc: 'Bersikap adil kepada semua tetangga tanpa memandang status kaya maupun sederhana.',
        icon: '⚖️'
      }
    ],
    refleksi: {
      pertanyaan: 'Ibu membelikan satu kotak donat isi 6 untuk kamu dan kedua adikmu (total 3 anak). Berapa donat yang kamu ambil?',
      pilihan: [
        {
          teks: 'Mengambil 2 donat dan memberikan 2 donat untuk masing-masing adik.',
          benar: true,
          penjelasan: 'Benar sekali! Pembagian yang adil dan seimbang menunjukkan penerapan Sila ke-5.'
        },
        {
          teks: 'Mengambil 4 donat sendiri karena kamu anak yang paling tua.',
          benar: false,
          penjelasan: 'Sebagai kakak, kita tidak boleh serakah dan harus adil kepada adik-adik.'
        },
        {
          teks: 'Menyembunyikan semua donat di kamar agar tidak diminta adik.',
          benar: false,
          penjelasan: 'Tindakan ini tidak adil dan merugikan hak anggota keluarga lainnya.'
        }
      ]
    }
  }
];

export const LEVELS_DATA: LevelData[] = [
  {
    id: 1,
    name: 'Desa Kerukunan',
    silaNumber: 1,
    silaTitle: 'Ketuhanan Yang Maha Esa',
    locationTitle: 'Desa Kerukunan yang Teduh',
    description: 'Petualangan dimulai di Desa Kerukunan. Di sini warga hidup damai berdampingan dengan tempat ibadah yang berdekatan. Bantu warga desa menjaga toleransi dan saling menghormati!',
    badgeReward: {
      id: 'badge-1',
      name: 'Sahabat Toleransi',
      description: 'Lencana kehormatan karena mampu menghargai perbedaan agama dan menjaga kerukunan.',
      icon: '⭐'
    },
    islandName: 'Pulau Sumatra & Jawa',
    coords: { x: 18, y: 35 },
    challenges: [
      {
        id: 'c1-1',
        title: 'Tantangan 1: Suara Lonceng dan Adzan',
        narrative: 'Di desa ini terdapat masjid, gereja, pura, dan vihara yang saling berdekatan. Hari ini hari Minggu, saat umat Kristiani beribadah.',
        characterName: 'Pak RT Slamet',
        characterEmoji: '🧔🏽',
        question: 'Anak-anak desa sedang bermain sepeda di depan gereja yang sedang melaksanakan kebaktian. Apa saran yang tepat?',
        options: [
          {
            text: 'Membunyikan bel sepeda sekencang-kencangnya agar seru.',
            correct: false,
            feedback: 'Bising di depan tempat ibadah dapat mengganggu kekhusyukan umat yang sedang berdoa.'
          },
          {
            text: 'Meminta anak-anak bermain sepeda di lapangan desa agar tidak membuat bising ibadah.',
            correct: true,
            feedback: 'Bagus sekali! Memberi ketenangan kepada orang yang beribadah menunjukkan toleransi tinggi.'
          },
          {
            text: 'Menyuruh gereja menutup jendela rapat-rapat.',
            correct: false,
            feedback: 'Kita yang harus sadar diri dan sopan menjaga ketertiban lingkungan tempat ibadah.'
          }
        ]
      },
      {
        id: 'c1-2',
        title: 'Tantangan 2: Menghormati Teman yang Berpuasa',
        narrative: 'Lani dan Ahmad sedang berada di kantin sekolah desa. Ahmad sedang menjalankan ibadah puasa.',
        characterName: 'Lani',
        characterEmoji: '👧🏻',
        question: 'Lani membawa kue bolu yang sangat harum. Apa sikap terbaik Lani kepada Ahmad?',
        options: [
          {
            text: 'Menyuapkan kue ke mulut Ahmad sambil memaksa mencicipi.',
            correct: false,
            feedback: 'Memaksa orang lain membatalkan ibadahnya adalah perbuatan yang tidak terpuji.'
          },
          {
            text: 'Mengejek Ahmad karena tidak bisa ikut makan siang bersama.',
            correct: false,
            feedback: 'Mengejek ibadah teman melanggar prinsip kerukunan beragama.'
          },
          {
            text: 'Makan dengan sopan dan tidak sengaja menawarkan atau memamerkan makanan di depan Ahmad.',
            correct: true,
            feedback: 'Hebat! Menghargai teman yang berpuasa dengan tidak memamerkan makanan adalah cerminan empati toleransi.'
          }
        ]
      },
      {
        id: 'c1-3',
        title: 'Tantangan 3: Bantuan Menjelang Hari Raya',
        narrative: 'Warga desa beragama Hindu sedang bersiap merayakan Hari Raya Nyepi. Lingkungan perlu dibersihkan dan dijaga keheningannya.',
        characterName: 'Made',
        characterEmoji: '👦🏻',
        question: 'Bagaimana warga yang berbeda agama dapat ikut membantu?',
        options: [
          {
            text: 'Ikut membantu membersihkan jalan dan bersama-sama menjaga keamanan lingkungan.',
            correct: true,
            feedback: 'Luar biasa! Gotong royong lintas agama membuktikan indahnya toleransi di Indonesia.'
          },
          {
            text: 'Tidak peduli karena itu bukan hari raya agamanya sendiri.',
            correct: false,
            feedback: 'Sebagai tetangga yang baik, kita senantiasa saling peduli dan mendukung.'
          },
          {
            text: 'Menyetel musik keras-keras saat malam hari.',
            correct: false,
            feedback: 'Hari raya Nyepi membutuhkan keheningan. Menyetel musik keras sangat tidak menghargai.'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Kota Empati',
    silaNumber: 2,
    silaTitle: 'Kemanusiaan yang Adil dan Beradab',
    locationTitle: 'Kota Empati yang Ramah',
    description: 'Di Kota Empati, setiap orang saling peduli dan saling menyayangi. Bantu warga kota menyelesaikan masalah dengan kebaikan hati, adab sopan santun, dan menolong sesama!',
    badgeReward: {
      id: 'badge-2',
      name: 'Pahlawan Kemanusiaan',
      description: 'Lencana bagi pelindung kebaikan, penolong sesama tanpa pamrih, dan pembela teman.',
      icon: '🤝'
    },
    islandName: 'Pulau Jawa & Madura',
    coords: { x: 34, y: 55 },
    challenges: [
      {
        id: 'c2-1',
        title: 'Tantangan 1: Kakek di Halte Bus',
        narrative: 'Di halte bus Kota Empati, seorang kakek tua tampak kesulitan membawa keranjang belanjaan yang berat.',
        characterName: 'Kakek Joyo',
        characterEmoji: '👴🏽',
        question: 'Kamu dan temanmu sedang menunggu bus yang sama. Apa yang kalian lakukan?',
        options: [
          {
            text: 'Hanya melihat saja dan bermain ponsel karena bukan keluarga kita.',
            correct: false,
            feedback: 'Kemanusiaan mengajarkan kita peduli kepada siapa pun manusia yang butuh pertolongan.'
          },
          {
            text: 'Menghampiri kakek dan dengan sopan menawarkan bantuan membawakan keranjang.',
            correct: true,
            feedback: 'Sangat terpuji! Menghormati dan membantu lansia adalah pengamalan adab kemanusiaan.'
          },
          {
            text: 'Berebut tempat duduk bus terlebih dahulu agar kakek berdiri.',
            correct: false,
            feedback: 'Orang muda yang beradab mendahulukan kursi bagi orang tua dan yang membutuhkan.'
          }
        ]
      },
      {
        id: 'c2-2',
        title: 'Tantangan 2: Menghadapi Perundungan (Bullying)',
        narrative: 'Di sudut taman kota, ada dua anak yang menertawakan sepatu teman lain yang tampak sudah usang.',
        characterName: 'Doni',
        characterEmoji: '👦🏽',
        question: 'Melihat kejadian tersebut, tindakan apa yang paling berani dan beradab?',
        options: [
          {
            text: 'Ikut menertawakan agar dianggap gaul oleh anak-anak itu.',
            correct: false,
            feedback: 'Ikut mengejek membuat kita menjadi pelaku perundungan yang menyakiti orang lain.'
          },
          {
            text: 'Merekam kejadian itu untuk diunggah di internet.',
            correct: false,
            feedback: 'Merekam tanpa menolong justru mempermalukan korban dan bukan tindakan yang beradab.'
          },
          {
            text: 'Menegur mereka dengan baik untuk berhenti mengejek, lalu mengajak teman tersebut bermain bersama.',
            correct: true,
            feedback: 'Hebat! Menolak perundungan dan merangkul teman yang sedih adalah sikap pahlawan sejati.'
          }
        ]
      },
      {
        id: 'c2-3',
        title: 'Tantangan 3: Bantuan Korban Bencana',
        narrative: 'Kota tetangga terkena musibah banjir bandang. Banyak warga kehilangan seragam dan buku sekolah.',
        characterName: 'Bu Guru Maya',
        characterEmoji: '👩🏽‍🏫',
        question: 'Sekolah membuka posko donasi. Benda apa yang paling tepat disumbangkan?',
        options: [
          {
            text: 'Buku pelajaran, pakaian layak pakai, alat tulis, dan doa tulus.',
            correct: true,
            feedback: 'Bagus sekali! Memberikan barang layak pakai dengan ikhlas sangat meringankan beban sesama.'
          },
          {
            text: 'Baju robek dan buku yang sudah basah rusak agar rumah bersih.',
            correct: false,
            feedback: 'Menyumbang harus dengan barang yang masih layak dan bermanfaat, bukan membuang sampah.'
          },
          {
            text: 'Tidak mau menyumbang karena takut barang kita berkurang.',
            correct: false,
            feedback: 'Berbagi tidak akan membuat kita kekurangan, justru menumbuhkan rasa syukur.'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Pulau Persatuan',
    silaNumber: 3,
    silaTitle: 'Persatuan Indonesia',
    locationTitle: 'Pulau Persatuan Nusantara',
    description: 'Selamat datang di Pulau Persatuan! Pulau ini dihuni oleh anak-anak dari Sabang sampai Merauke dengan aneka pakaian adat, lagu daerah, dan tarian nusantara. Satukan kekuatan dalam keberagaman!',
    badgeReward: {
      id: 'badge-3',
      name: 'Penjaga Persatuan',
      description: 'Lencana persaudaraan sebangsa yang menjunjung tinggi semboyan Bhinneka Tunggal Ika.',
      icon: '🌳'
    },
    islandName: 'Kepulauan Kalimantan & Sulawesi',
    coords: { x: 50, y: 30 },
    challenges: [
      {
        id: 'c3-1',
        title: 'Tantangan 1: Festival Pentas Seni Nusantara',
        narrative: 'Sekolah akan mengadakan pertunjukan seni budaya. Setiap kelas menampilkan kesenian dari daerah berbeda.',
        characterName: 'Bona',
        characterEmoji: '👦🏾',
        question: 'Kelasmu mendapatkan tugas mementaskan Tarian Sajojo dari Papua. Padahal kamu berasal dari Jawa. Sikapmu?',
        options: [
          {
            text: 'Menolak latihan karena merasa bukan tarian dari daerah asalnya sendiri.',
            correct: false,
            feedback: 'Semua budaya di nusantara adalah kekayaan milik kita bersama bangsa Indonesia.'
          },
          {
            text: 'Belajar tarian dengan gembira dan bangga menampilkan kekayaan budaya bangsa.',
            correct: true,
            feedback: 'Luar biasa! Bangga terhadap budaya daerah lain membuktikan jiwa Persatuan Indonesia.'
          },
          {
            text: 'Mengubah gerakannya menjadi tarian asal-asalan.',
            correct: false,
            feedback: 'Kita harus menghargai dan melestarikan pakem seni budaya tradisional dengan baik.'
          }
        ]
      },
      {
        id: 'c3-2',
        title: 'Tantangan 2: Piket Akbar Lingkungan Sekolah',
        narrative: 'Halaman sekolah kotor setelah angin kencang kemarin malam. Daun kering berserakan di mana-mana.',
        characterName: 'Tiur',
        characterEmoji: '👧🏽',
        question: 'Bagaimana cara terbaik agar halaman cepat bersih dan hubungan antarteman makin akrab?',
        options: [
          {
            text: 'Menyuruh siswa yang paling pendiam untuk mengerjakan semuanya sendirian.',
            correct: false,
            feedback: 'Membebankan pekerjaan pada satu orang tidak adil dan merusak kerja sama.'
          },
          {
            text: 'Pulang ke rumah diam-diam saat teman lain sedang menyapu.',
            correct: false,
            feedback: 'Melarikan diri dari tanggung jawab bersama mencerminkan sikap egois.'
          },
          {
            text: 'Bekerja sama gotong royong, membagi tugas menyapu, mengumpulkan sampah, dan membuang ke komposter.',
            correct: true,
            feedback: 'Tepat sekali! Berat sama dipikul, ringan sama dijinjing lewat gotong royong.'
          }
        ]
      },
      {
        id: 'c3-3',
        title: 'Tantangan 3: Bahasa Persatuan',
        narrative: 'Di perpustakaan, murid baru yang baru pindah dari Flores belum fasih bahasa daerah setempat.',
        characterName: 'Yosep',
        characterEmoji: '👦🏾',
        question: 'Bagaimana kamu berkomunikasi dengannya agar ia merasa nyaman dan diterima?',
        options: [
          {
            text: 'Menggunakan Bahasa Indonesia dengan ramah, santun, dan jelas.',
            correct: true,
            feedback: 'Pintar! Bahasa Indonesia adalah bahasa persatuan yang menyatukan seluruh suku di Indonesia.'
          },
          {
            text: 'Tetap berbicara bahasa daerah yang tidak dipahaminya sambil berbisik-bisik.',
            correct: false,
            feedback: 'Berbisik dalam bahasa yang tidak dipahami teman dapat membuatnya merasa terasingkan.'
          },
          {
            text: 'Menghindarinya karena merasa susah diajak mengobrol.',
            correct: false,
            feedback: 'Kita harus merangkul semua saudara sebangsa dari berbagai daerah.'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'Balai Musyawarah',
    silaNumber: 4,
    silaTitle: 'Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan',
    locationTitle: 'Balai Musyawarah Rakyat',
    description: 'Di Balai Musyawarah, semua keputusan penting diambil melalui musyawarah mufakat. Belajarlah menjadi pemimpin yang bijak: dengarkan ide orang lain dan hargai hasil mufakat!',
    badgeReward: {
      id: 'badge-4',
      name: 'Pemimpin Bijaksana',
      description: 'Lencana kedewasaan berdemokrasi, mendengarkan kritik dan saran demi kemaslahatan bersama.',
      icon: '🐃'
    },
    islandName: 'Kepulauan Nusa Tenggara & Bali',
    coords: { x: 68, y: 65 },
    challenges: [
      {
        id: 'c4-1',
        title: 'Tantangan 1: Memilih Tujuan Karyawisata',
        narrative: 'Kelas sedang berdiskusi untuk menentukan tujuan karya wisata akhir tahun. Ada yang ingin ke Museum Sejarah, ada pula yang ingin ke Taman Margasatwa.',
        characterName: 'Pak Guru Binsar',
        characterEmoji: '👨🏽‍🏫',
        question: 'Bagaimana cara terbaik agar keputusan disepakati bersama secara adil?',
        options: [
          {
            text: 'Ketua kelas langsung memutuskan sepihak tanpa meminta pendapat siswa lain.',
            correct: false,
            feedback: 'Keputusan sepihak tanpa musyawarah merupakan bentuk pemaksaan kehendak.'
          },
          {
            text: 'Mengadakan musyawarah, mendengarkan manfaat masing-masing tempat, lalu voting bersama.',
            correct: true,
            feedback: 'Tepat sekali! Musyawarah dan voting terbuka adalah jalan terbaik menyelesaikan perbedaan pendapat.'
          },
          {
            text: 'Saling berteriak siapa yang suaranya paling keras itu yang menang.',
            correct: false,
            feedback: 'Berteriak-teriak tidak mencerminkan musyawarah yang dipimpin hikmat kebijaksanaan.'
          }
        ]
      },
      {
        id: 'c4-2',
        title: 'Tantangan 2: Sikap Saat Pendapat Tidak Diterima',
        narrative: 'Usulan Rani untuk tema pentas drama tidak terpilih karena suara terbanyak memilih tema dongeng rakyat.',
        characterName: 'Rani',
        characterEmoji: '👧🏽',
        question: 'Bagaimana seharusnya Rani bersikap setelah keputusan musyawarah disahkan?',
        options: [
          {
            text: 'Merajuk, tidak mau ikut drama, dan menjelek-jelekkan ide teman lain.',
            correct: false,
            feedback: 'Merajuk karena pendapat tidak terpilih merusak keharmonisan kelompok.'
          },
          {
            text: 'Menghasut sebagian teman untuk membuat drama tandingan sendiri.',
            correct: false,
            feedback: 'Memecah belah kelompok bertentangan dengan semangat kekeluargaan.'
          },
          {
            text: 'Menerima hasil keputusan dengan lapang dada dan tetap berperan aktif dalam pementasan.',
            correct: true,
            feedback: 'Hebat! Sikap sportif dan berjiwa besar menerima hasil mufakat adalah ciri murid berbudi pekerti.'
          }
        ]
      },
      {
        id: 'c4-3',
        title: 'Tantangan 3: Memberi Kesempatan Bicara',
        narrative: 'Dalam musyawarah kelas, ada teman yang pemalu bernama Surya yang ingin menyampaikan pendapatnya tetapi ragu-ragu.',
        characterName: 'Surya',
        characterEmoji: '👦🏻',
        question: 'Sebagai pemimpin musyawarah yang baik, apa yang sebaiknya kamu lakukan?',
        options: [
          {
            text: 'Mengajak suasana tenang dan dengan ramah mempersilakan Surya berbicara tanpa memotongnya.',
            correct: true,
            feedback: 'Bagus sekali! Setiap anggota musyawarah memiliki hak yang sama untuk didengar pendapatnya.'
          },
          {
            text: 'Melewatkannya karena Surya bicaranya pelan dan membuang waktu.',
            correct: false,
            feedback: 'Menyepelekan teman yang pemalu adalah tindakan yang tidak bijaksana.'
          },
          {
            text: 'Menertawakan kegugupan Surya di depan seluruh anggota rapat.',
            correct: false,
            feedback: 'Menertawakan orang yang bicara membuat orang lain takut mengemukakan pendapat.'
          }
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'Negeri Keadilan',
    silaNumber: 5,
    silaTitle: 'Keadilan Sosial bagi Seluruh Rakyat Indonesia',
    locationTitle: 'Negeri Keadilan dan Kemakmuran',
    description: 'Di Negeri Keadilan, semua orang mendapatkan haknya secara seimbang setelah menunaikan kewajiban. Belajarlah berbagi secara adil, tidak pilih kasih, dan menjaga fasilitas umum!',
    badgeReward: {
      id: 'badge-5',
      name: 'Pembawa Keadilan',
      description: 'Lencana penegak keadilan sosial, tidak serakah, dan peduli hak orang lain.',
      icon: '🌾'
    },
    islandName: 'Kepulauan Maluku & Papua',
    coords: { x: 84, y: 40 },
    challenges: [
      {
        id: 'c5-1',
        title: 'Tantangan 1: Pembagian Tugas Mandiri',
        narrative: 'Kelompok sains mendapatkan tugas membuat model tata surya. Ada 4 anggota dalam satu kelompok.',
        characterName: 'Tomi',
        characterEmoji: '👦🏽',
        question: 'Bagaimana pembagian tugas yang mencerminkan keadilan sosial?',
        options: [
          {
            text: 'Menyerahkan seluruh pengerjaan kepada satu siswa terpintar, sementara anggota lain santai.',
            correct: false,
            feedback: 'Memanfaatkan satu teman sementara yang lain tidak bekerja adalah tindakan yang sangat tidak adil.'
          },
          {
            text: 'Membagi tugas sesuai kemampuan masing-masing anggota secara merata dan bertanggung jawab bersama.',
            correct: true,
            feedback: 'Tepat sekali! Adil bukan berarti harus identik, tetapi seimbang dan tidak memberatkan salah satu pihak.'
          },
          {
            text: 'Hanya yang membayar uang kas yang tidak perlu mengerjakan tugas.',
            correct: false,
            feedback: 'Tugas belajar adalah kewajiban setiap murid untuk mengembangkan potensi dirinya.'
          }
        ]
      },
      {
        id: 'c5-2',
        title: 'Tantangan 2: Menjaga Fasilitas Taman Kota',
        narrative: 'Di taman kota tersedia ayunan dan perosotan untuk anak-anak. Banyak anak yang sedang mengantre.',
        characterName: 'Salma',
        characterEmoji: '👧🏽',
        question: 'Kamu sudah bermain ayunan cukup lama. Anak di belakangmu sudah menunggu 10 menit. Sikapmu?',
        options: [
          {
            text: 'Terus bermain sampai sore dan tidak mempedulikan anak yang mengantre.',
            correct: false,
            feedback: 'Menguasai fasilitas umum sendirian melanggar hak orang lain.'
          },
          {
            text: 'Menyuruh teman tersebut pergi mencari taman lain saja.',
            correct: false,
            feedback: 'Fasilitas umum adalah milik bersama yang harus dinikmati secara bergantian dan tertib.'
          },
          {
            text: 'Turun dari ayunan dengan senang hati dan bergantian memberikan giliran kepada teman yang mengantre.',
            correct: true,
            feedback: 'Luar biasa! Menghormati hak orang lain memakai fasilitas umum adalah bukti kesadaran keadilan sosial.'
          }
        ]
      },
      {
        id: 'c5-3',
        title: 'Tantangan 3: Hidup Sederhana dan Gemar Menabung',
        narrative: 'Ayah memberikan uang saku lebih untuk bekal di sekolah. Teman-temanmu mengajak membeli mainan mahal yang sedang viral.',
        characterName: 'Rizki',
        characterEmoji: '👦🏽',
        question: 'Sesuai nilai Sila ke-5 yang melarang sifat boros dan bergaya hidup mewah, apa yang sebaiknya kamu lakukan?',
        options: [
          {
            text: 'Membeli kebutuhan secukupnya dan menyisihkan sisa uang saku ke dalam celengan tabungan.',
            correct: true,
            feedback: 'Hebat! Hemat dan tidak boros adalah salah satu butir penting pengamalan Sila ke-5.'
          },
          {
            text: 'Menghabiskan seluruh uang saku sekaligus meminjam uang teman demi membeli mainan viral.',
            correct: false,
            feedback: 'Gaya hidup konsumtif dan boros merugikan diri sendiri serta keluarga.'
          },
          {
            text: 'Memamerkan jumlah uang sakumu kepada teman yang uang sakunya lebih sedikit.',
            correct: false,
            feedback: 'Pamer kekayaan menyakiti perasaan sesama dan bertentangan dengan keadilan sosial.'
          }
        ]
      }
    ]
  },
  {
    id: 6,
    name: 'Pulau Pancasila',
    silaNumber: 0,
    silaTitle: 'Puncak Petualangan Duta Pancasila',
    locationTitle: 'Pulau Emas Garuda Pancasila',
    description: 'Level Akhir! Kamu telah membuktikan kebaikanmu di lima level sebelumnya. Di Pulau Pancasila, buktikan pemahaman utuhmu atas kelima sila untuk dinobatkan sebagai Duta Pancasila Resmi!',
    badgeReward: {
      id: 'badge-duta',
      name: 'Duta Pancasila Sejati',
      description: 'Gelar kehormatan tertinggi atas penguasaan dan penerapan nilai-nilai luhur Pancasila.',
      icon: '🏆'
    },
    islandName: 'Pusat Kepulauan Indonesia',
    coords: { x: 50, y: 50 },
    challenges: [
      {
        id: 'c6-1',
        title: 'Ujian Final: Kejadian di Balai Warga',
        narrative: 'Sebuah bencana gempa melanda desa. Warga dari berbagai suku dan agama berkumpul di tenda darurat.',
        characterName: 'Kepala Desa',
        characterEmoji: '👳🏽',
        question: 'Bagaimana penerapan lengkap sila 1 sampai 5 dalam situasi darurat ini?',
        options: [
          {
            text: 'Mementingkan diri sendiri dan menyelamatkan barang berharga pribadi saja.',
            correct: false,
            feedback: 'Sikap egois bertentangan dengan seluruh nilai kemanusiaan dan persatuan bangsa.'
          },
          {
            text: 'Berdoa bersama (Sila 1), merawat yang luka (Sila 2), bersatu bahu-membahu (Sila 3), bermusyawarah bagi bantuan (Sila 4), dan membagi logistik adil merata (Sila 5).',
            correct: true,
            feedback: 'SEMPURNA! Kamu benar-benar memahami keterkaitan utuh seluruh sila Pancasila dalam kehidupan nyata!'
          },
          {
            text: 'Hanya mau menolong warga yang satu suku dan satu agama dengan kita.',
            correct: false,
            feedback: 'Pancasila menyatukan seluruh rakyat tanpa membedakan suku, agama, dan latar belakang.'
          }
        ]
      }
    ]
  }
];

export const SIKAP_GAMES: SikapGameItem[] = [
  {
    id: 1,
    situasi: 'Teman sekelasmu yang berbeda agama sedang khusyuk membaca doa sebelum jam pelajaran dimulai. Apa yang sebaiknya kamu lakukan?',
    silaTerkait: 1,
    pilihan: [
      { teks: 'Mengajaknya bercanda dan melempar kertas', benar: false, alasan: 'Mengganggu orang berdoa melanggar etika toleransi.' },
      { teks: 'Menghormatinya dan menjaga ketenangan kelas', benar: true, alasan: 'Sikap saling menghormati saat beribadah adalah pengamalan Sila 1.' },
      { teks: 'Menertawakan cara berdoanya', benar: false, alasan: 'Setiap agama memiliki tata cara ibadah yang wajib dihormati.' },
      { teks: 'Menyuruhnya berhenti berdoa', benar: false, alasan: 'Berdoa adalah hak asasi yang dilindungi undang-undang.' }
    ]
  },
  {
    id: 2,
    situasi: 'Seorang teman tidak sengaja menumpahkan air minum ke buku tugasmu dan langsung meminta maaf dengan gemetar ketakutan. Tindakanmu?',
    silaTerkait: 2,
    pilihan: [
      { teks: 'Membentaknya di depan kelas sampai dia menangis', benar: false, alasan: 'Membentak teman yang sudah minta maaf adalah perilaku kasar.' },
      { teks: 'Membalas menumpahkan air ke buku tugasnya', benar: false, alasan: 'Balas dendam tidak menyelesaikan masalah dan merusak pertemanan.' },
      { teks: 'Memaafkannya dengan lapang dada dan bersama-sama mengeringkannya', benar: true, alasan: 'Sopan santun dan memaafkan kesalahan sesama mencerminkan kemanusiaan beradab (Sila 2).' },
      { teks: 'Meminta uang ganti rugi yang sangat mahal', benar: false, alasan: 'Memanfaatkan musibah teman untuk keuntungan pribadi tidak bermoral.' }
    ]
  },
  {
    id: 3,
    situasi: 'Dalam pertandingan tarik tambang antarkelas 17 Agustus, tim kelasmu terdiri dari siswa suku Sunda, Batak, Minang, Jawa, dan Papua. Bagaimana strategi tim?',
    silaTerkait: 3,
    pilihan: [
      { teks: 'Kompak bekerja sama menarik tambang dengan aba-aba yang sama demi kelas tercinta', benar: true, alasan: 'Persatuan dan gotong royong membuat kelompok menjadi tangguh dan kuat (Sila 3).' },
      { teks: 'Menyalahkan suku teman tertentu jika tambang bergeser', benar: false, alasan: 'Menyalahkan suku merusak kerukunan dan persaudaraan bangsa.' },
      { teks: 'Hanya mau bekerja sama jika sekelompok dengan teman satu suku', benar: false, alasan: 'Sikap diskriminatif bertentangan dengan semboyan Bhinneka Tunggal Ika.' },
      { teks: 'Lepas tangan dan membiarkan teman lain yang bersusah payah', benar: false, alasan: 'Meninggalkan tugas bersama adalah sikap tidak bertanggung jawab.' }
    ]
  },
  {
    id: 4,
    situasi: 'Saat musyawarah menentukan jadwal piket kebersihan kelas, beberapa anak mengusulkan jadwal yang berbeda dengan ide kamu. Sikapmu?',
    silaTerkait: 4,
    pilihan: [
      { teks: 'Keluar dari ruangan sambil membanting pintu', benar: false, alasan: 'Marah-marah merusak musyawarah dan kekompakan kelas.' },
      { teks: 'Memaksa ketua kelas agar hanya usulanmu yang dipakai', benar: false, alasan: 'Memaksakan kehendak bertentangan dengan prinsip demokrasi Pancasila.' },
      { teks: 'Mengejek pendapat teman sebagai pendapat yang bodoh', benar: false, alasan: 'Menghina pendapat orang lain adalah tindakan tidak terpuji.' },
      { teks: 'Mendengarkan alasan mereka dengan sabar dan mencari jadwal terbaik yang disepakati bersama', benar: true, alasan: 'Musyawarah mufakat menghargai setiap pendapat demi kebaikan bersama (Sila 4).' }
    ]
  },
  {
    id: 5,
    situasi: 'Di kantin kejujuran sekolah, tidak ada penjaga yang mengawasi. Kamu melihat ada sisa uang kembalian lebih yang bukan hakmu di meja kasir. Tindakanmu?',
    silaTerkait: 5,
    pilihan: [
      { teks: 'Mengambil uang tersebut untuk jajan karena tidak ada yang melihat', benar: false, alasan: 'Mengambil barang yang bukan hak kita adalah perbuatan tercela.' },
      { teks: 'Memasukkannya kembali ke kotak kasir atau menyerahkannya ke guru piket', benar: true, alasan: 'Jujur dan tidak mengambil hak orang lain mencerminkan keadilan sosial (Sila 5).' },
      { teks: 'Membagikan uang itu kepada teman agar dianggap dermawan', benar: false, alasan: 'Berbagi dari uang hasil tidak halal tetaplah perbuatan salah.' },
      { teks: 'Membiarkan orang lain mengambilnya sembarangan', benar: false, alasan: 'Kita harus peduli menjaga ketertiban dan kejujuran fasilitas bersama.' }
    ]
  }
];

export const PAIR_MATCH_DATA: PairMatchPair[] = [
  {
    id: 'p1',
    silaNumber: 1,
    silaTitle: 'Sila ke-1: Bintang',
    symbol: '⭐',
    perilaku: 'Mendoakan kesembuhan teman dan tidak berisik saat waktu ibadah tiba'
  },
  {
    id: 'p2',
    silaNumber: 2,
    silaTitle: 'Sila ke-2: Rantai',
    symbol: '⛓️',
    perilaku: 'Menolong korban bencana alam dan tidak membeda-bedakan derajat sesama manusia'
  },
  {
    id: 'p3',
    silaNumber: 3,
    silaTitle: 'Sila ke-3: Pohon Beringin',
    symbol: '🌳',
    perilaku: 'Cinta produk Indonesia dan bangga melestarikan tarian serta lagu daerah nusantara'
  },
  {
    id: 'p4',
    silaNumber: 4,
    silaTitle: 'Sila ke-4: Kepala Banteng',
    symbol: '🐃',
    perilaku: 'Bermusyawarah memilih ketua kelas dan menghargai keputusan suara terbanyak'
  },
  {
    id: 'p5',
    silaNumber: 5,
    silaTitle: 'Sila ke-5: Padi dan Kapas',
    symbol: '🌾',
    perilaku: 'Membagi tugas kelompok sama rata dan tidak memboroskan uang jajan'
  }
];

export const PUZZLE_DATA: PuzzleSymbol[] = [
  {
    silaNumber: 1,
    name: 'Bintang Emas',
    bunyi: 'Ketuhanan Yang Maha Esa',
    symbol: '⭐',
    color: 'bg-amber-400',
    clue: 'Lambang Sila ke-1 yang melambangkan cahaya kerohanian dari Tuhan.'
  },
  {
    silaNumber: 2,
    name: 'Rantai Emas',
    bunyi: 'Kemanusiaan yang Adil dan Beradab',
    symbol: '⛓️',
    color: 'bg-rose-500',
    clue: 'Lambang Sila ke-2 dengan mata rantai bulat dan persegi yang saling mengait.'
  },
  {
    silaNumber: 3,
    name: 'Pohon Beringin',
    bunyi: 'Persatuan Indonesia',
    symbol: '🌳',
    color: 'bg-emerald-500',
    clue: 'Lambang Sila ke-3 pohon rindang yang menaungi seluruh rakyat Indonesia.'
  },
  {
    silaNumber: 4,
    name: 'Kepala Banteng',
    bunyi: 'Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan',
    symbol: '🐃',
    color: 'bg-red-600',
    clue: 'Lambang Sila ke-4 hewan sosial yang gemar berkumpul untuk bermusyawarah.'
  },
  {
    silaNumber: 5,
    name: 'Padi dan Kapas',
    bunyi: 'Keadilan Sosial bagi Seluruh Rakyat Indonesia',
    symbol: '🌾',
    color: 'bg-blue-600',
    clue: 'Lambang Sila ke-5 kebutuhan pangan dan sandang seluruh rakyat adil merata.'
  }
];

export const MISI_KEBAIKAN_DATA: MisiKebaikan[] = [
  {
    id: 'misi-1',
    judul: 'Sahabat di Bawah Hujan',
    lokasi: 'Gerbang Sekolah Dasar Pelangi',
    silaNumber: 2,
    kisah: 'Bel pulang sekolah berbunyi kencang bersamaan dengan hujan lebat turun mendadak. Di dekat gerbang, kamu melihat Aldo, adik kelas 1 yang tidak membawa payung, sedang menangis kedinginan karena takut pulang sendirian.',
    karakter: 'Aldo (Adik Kelas)',
    masalah: 'Aldo kedinginan dan tidak memiliki payung untuk berjalan ke pos satpam.',
    solusi: [
      {
        opsi: 'Membuka payungmu yang cukup lebar dan mengajak Aldo berjalan bersama ke pos satpam dengan aman.',
        poin: 50,
        dampak: 'Aldo berhenti menangis, merasa aman, dan orang tuanya sangat berterima kasih atas kepedulianmu.',
        rekomendasi: true
      },
      {
        opsi: 'Menyuruh Aldo lari menerobos hujan lebat sendirian.',
        poin: 10,
        dampak: 'Aldo bisa jatuh terpeleset dan demam karena basah kuyup.',
        rekomendasi: false
      },
      {
        opsi: 'Pura-pura tidak melihat dan langsung pulang dengan payung sendiri.',
        poin: 0,
        dampak: 'Kamu melewatkan kesempatan emas mengamalkan empati kepada adik kelas.',
        rekomendasi: false
      }
    ]
  },
  {
    id: 'misi-2',
    judul: 'Gelas Minum Plastik di Taman',
    lokasi: 'Taman Bermain Kota Sejahtera',
    silaNumber: 5,
    kisah: 'Setelah pesta festival anak, ada banyak sampah gelas plastik berserakan di sekitar bangku taman yang baru dibangun untuk warga lansia.',
    karakter: 'Petugas Taman Pak Joko',
    masalah: 'Taman kota menjadi kotor dan bangku warga lansia tertutup tumpukan sampah.',
    solusi: [
      {
        opsi: 'Mengajak teman-teman mengambil kantong sampah dan bersama-sama memungut sampah plastik lalu membuang ke tempat daur ulang.',
        poin: 50,
        dampak: 'Taman kota kembali bersih asri, dan warga lansia dapat duduk menikmati udara segar dengan nyaman.',
        rekomendasi: true
      },
      {
        opsi: 'Menendang gelas plastik ke dalam selokan agar hilang dari pandangan.',
        poin: 5,
        dampak: 'Selokan tersumbat dan dapat menyebabkan banjir saat musim hujan tiba.',
        rekomendasi: false
      },
      {
        opsi: 'Menyalahkan pengunjung lain tanpa mau berbuat apa-apa.',
        poin: 0,
        dampak: 'Hanya mengeluh tidak menyelesaikan masalah lingkungan.',
        rekomendasi: false
      }
    ]
  },
  {
    id: 'misi-3',
    judul: 'Lagu Daerah di Hari Merdeka',
    lokasi: 'Panggung Kemerdekaan Desa',
    silaNumber: 3,
    kisah: 'Dalam lomba paduan suara antardusun, kelompokmu bingung memilih lagu. Ada yang ingin lagu pop luar negeri, ada yang ingin lagu daerah Nusantara.',
    karakter: 'Ketua Karang Taruna',
    masalah: 'Perbedaan keinginan dalam perayaan HUT Kemerdekaan Republik Indonesia.',
    solusi: [
      {
        opsi: 'Mengusulkan medley lagu daerah Nusantara (seperti Yamko Rambe Yamko, Ampar-Ampar Pisang, dan Gundul Pacul) yang ceria.',
        poin: 50,
        dampak: 'Penonton bersorak riang, bangga pada kekayaan budaya Indonesia, dan kelompokmu meraih juara kebersamaan.',
        rekomendasi: true
      },
      {
        opsi: 'Memaksa membawakan lagu luar negeri walau dalam acara hari kemerdekaan bangsa.',
        poin: 15,
        dampak: 'Peringatan kemerdekaan kehilangan nuansa cinta tanah air dan warisan nusantara.',
        rekomendasi: false
      },
      {
        opsi: 'Membatalkan keikutsertaan kelompok karena malas berlatih.',
        poin: 0,
        dampak: 'Dusun kehilangan wakil dan kekompakan pemuda menjadi pudar.',
        rekomendasi: false
      }
    ]
  }
];

export const BENAR_SALAH_DATA: BenarSalahItem[] = [
  {
    id: 1,
    pernyataan: 'Kita boleh memaksakan orang lain untuk memeluk agama yang sama dengan keyakinan kita.',
    silaNumber: 1,
    jawabanBenar: false,
    penjelasan: 'Salah! Sila ke-1 melarang pemaksaan agama. Setiap orang memiliki kemerdekaan beribadah sesuai agamanya.'
  },
  {
    id: 2,
    pernyataan: 'Menolong teman yang terjatuh dari sepeda tanpa memandang latar belakang agamanya adalah wujud Sila ke-2.',
    silaNumber: 2,
    jawabanBenar: true,
    penjelasan: 'Benar! Menolong sesama manusia atas dasar cinta kasih dan kemanusiaan adalah butir luhur Sila ke-2.'
  },
  {
    id: 3,
    pernyataan: 'Bangga memakai sepatu dan tas buatan pengrajin Indonesia merupakan pengamalan Sila ke-3.',
    silaNumber: 3,
    jawabanBenar: true,
    penjelasan: 'Benar! Cinta produk dalam negeri adalah bentuk cinta tanah air demi kemakmuran persatuan bangsa.'
  },
  {
    id: 4,
    pernyataan: 'Dalam musyawarah, jika pendapat kita tidak terpilih, kita berhak merusak hasil keputusan bersama.',
    silaNumber: 4,
    jawabanBenar: false,
    penjelasan: 'Salah! Kita wajib menghormati dan melaksanakan keputusan musyawarah dengan itikad baik dan tanggung jawab.'
  },
  {
    id: 5,
    pernyataan: 'Menuntut hak mendapatkan nilai bagus tetapi malas belajar dan tidak mengerjakan PR adalah sikap yang adil.',
    silaNumber: 5,
    jawabanBenar: false,
    penjelasan: 'Salah! Sila ke-5 mengajarkan keseimbangan antara hak dan kewajiban. Kita wajib berusaha sebelum menuntut hak.'
  },
  {
    id: 6,
    pernyataan: 'Gotong royong membersihkan selokan desa bersama tetangga mencerminkan persatuan dan kesatuan bangsa.',
    silaNumber: 3,
    jawabanBenar: true,
    penjelasan: 'Benar! Gotong royong adalah warisan luhur nenek moyang Indonesia yang mempererat persatuan.'
  },
  {
    id: 7,
    pernyataan: 'Mengejek kekurangan fisik teman sekelas termasuk perbuatan yang beradab dan terpuji.',
    silaNumber: 2,
    jawabanBenar: false,
    penjelasan: 'Salah! Mengejek teman adalah perundungan yang melanggar nilai kemanusiaan yang beradab.'
  },
  {
    id: 8,
    pernyataan: 'Pemilihan ketua kelas melalui pemungutan suara (voting) yang tertib merupakan pengamalan Sila ke-4.',
    silaNumber: 4,
    jawabanBenar: true,
    penjelasan: 'Benar! Demokrasi di sekolah dipraktikkan melalui pemilihan ketua kelas secara musyawarah atau voting jujur.'
  }
];

export const RODA_TANTANGAN_DATA: RodaTantanganItem[] = [
  {
    silaNumber: 1,
    title: 'Sila 1: Bintang',
    color: '#F59E0B',
    tantangan: 'Misi Toleransi Ibadah',
    pertanyaan: 'Apa yang sebaiknya dilakukan jika teman di sebelahmu sedang membaca kitab suci agamanya?',
    pilihan: ['Mendiamkan diri dan tidak mengganggunya', 'Mengambil bukunya untuk dibaca sendiri', 'Menyanyi dengan suara sangat keras'],
    kunci: 0,
    penjelasan: 'Menghormati kekhusyukan teman yang beribadah adalah wujud takwa dan toleransi.'
  },
  {
    silaNumber: 2,
    title: 'Sila 2: Rantai',
    color: '#EF4444',
    tantangan: 'Misi Kasih Sayang',
    pertanyaan: 'Kata sopan apa yang harus diucapkan saat kita membutuhkan bantuan orang lain?',
    pilihan: ['"Cepat kerjakan!"', '"Tolong bantu saya, ya"', '"Hei kamu ke sini!"'],
    kunci: 1,
    penjelasan: 'Kata "Tolong", "Maaf", dan "Terima Kasih" adalah pilar adab kesopanan sehari-hari.'
  },
  {
    silaNumber: 3,
    title: 'Sila 3: Pohon Beringin',
    color: '#10B981',
    tantangan: 'Misi Bhinneka Tunggal Ika',
    pertanyaan: 'Semboyan bangsa Indonesia yang artinya berbeda-beda tetapi tetap satu jua adalah...?',
    pilihan: ['Tut Wuri Handayani', 'Bhinneka Tunggal Ika', 'Ing Ngarso Sung Tulodo'],
    kunci: 1,
    penjelasan: 'Bhinneka Tunggal Ika adalah semboyan pemersatu keberagaman suku, bahasa, dan adat Indonesia.'
  },
  {
    silaNumber: 4,
    title: 'Sila 4: Kepala Banteng',
    color: '#EA580C',
    tantangan: 'Misi Musyawarah Mufakat',
    pertanyaan: 'Apa tujuan utama diadakannya musyawarah dalam mengambil keputusan?',
    pilihan: ['Mencapai mufakat dan kesepakatan bersama', 'Mencari siapa yang paling kaya', 'Mengadu kekuatan fisik siswa'],
    kunci: 0,
    penjelasan: 'Musyawarah bertujuan menghasilkan mufakat demi kemaslahatan dan kebaikan bersama.'
  },
  {
    silaNumber: 5,
    title: 'Sila 5: Padi dan Kapas',
    color: '#3B82F6',
    tantangan: 'Misi Keadilan Sosial',
    pertanyaan: 'Manakah contoh perilaku adil yang benar saat membagi buah jeruk kepada 2 teman?',
    pilihan: ['Membelah jeruk sama banyak untuk keduanya', 'Memberi kulitnya saja kepada satu teman', 'Menghabiskan sendiri tanpa membagi'],
    kunci: 0,
    penjelasan: 'Berbagi secara seimbang dan tulus adalah pengamalan keadilan sosial.'
  },
  {
    silaNumber: 0,
    title: 'Garuda Emas: Kejutan',
    color: '#8B5CF6',
    tantangan: 'Misi Duta Pancasila',
    pertanyaan: 'Berapa jumlah sila yang tercantum dalam dasar negara kita, Pancasila?',
    pilihan: ['3 Sila', '5 Sila', '7 Sila'],
    kunci: 1,
    penjelasan: 'Pancasila terdiri dari 5 dasar luhur pedoman berbangsa dan bernegara.'
  }
];

export const EVALUASI_QUESTIONS: EvaluasiQuestion[] = [
  {
    id: 1,
    tipe: 'pilihan-ganda',
    silaTerkait: 1,
    pertanyaan: 'Lambang sila pertama Pancasila, "Ketuhanan Yang Maha Esa", digambarkan dengan simbol...',
    opsi: ['Pohon Beringin', 'Bintang Emas', 'Kepala Banteng', 'Rantai Emas'],
    kunciIndex: 1,
    pembahasan: 'Bintang emas bersudut lima adalah lambang Sila ke-1, yang bermakna cahaya rohani dari Tuhan untuk segenap manusia.'
  },
  {
    id: 2,
    tipe: 'pilihan-ganda',
    silaTerkait: 2,
    pertanyaan: 'Saat melihat teman sekelas terjatuh di halaman sekolah dan lututnya terluka, tindakan yang mencerminkan Sila ke-2 adalah...',
    opsi: [
      'Menertawakannya bersama teman-teman lain',
      'Membantunya berdiri dan mengantarkannya ke ruang UKS',
      'Pura-pura tidak melihat dan terus bermain',
      'Menyalahkannya karena berlari terburu-buru'
    ],
    kunciIndex: 1,
    pembahasan: 'Menolong sesama yang terluka adalah wujud kasih sayang dan kemanusiaan yang adil dan beradab.'
  },
  {
    id: 3,
    tipe: 'benar-salah',
    silaTerkait: 1,
    pertanyaan: 'Menghargai teman yang sedang menjalankan ibadah puasa atau ibadah minggu merupakan wujud pengamalan Sila pertama.',
    opsi: ['Benar', 'Salah'],
    kunciIndex: 0,
    pembahasan: 'Benar! Menghormati ibadah sesama adalah bentuk nyata kerukunan dan toleransi beragama.'
  },
  {
    id: 4,
    tipe: 'pilihan-ganda',
    silaTerkait: 3,
    pertanyaan: 'Bekerja sama dalam piket kebersihan kelas tanpa membeda-bedakan suku teman merupakan pengamalan Sila...',
    opsi: ['Pertama', 'Kedua', 'Ketiga', 'Kelima'],
    kunciIndex: 2,
    pembahasan: 'Persatuan Indonesia (Sila ke-3) mengajarkan kerja sama, gotong royong, dan kerukunan lintas suku bangsa.'
  },
  {
    id: 5,
    tipe: 'pilihan-ganda',
    silaTerkait: 4,
    pertanyaan: 'Lambang Sila keempat, "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan", adalah...',
    opsi: ['Padi dan Kapas', 'Bintang Emas', 'Kepala Banteng', 'Pohon Beringin'],
    kunciIndex: 2,
    pembahasan: 'Kepala Banteng melambangkan musyawarah rakyat yang berkumpul untuk mengambil mufakat bersama.'
  },
  {
    id: 6,
    tipe: 'benar-salah',
    silaTerkait: 4,
    pertanyaan: 'Dalam musyawarah, kita diperbolehkan memaksakan kehendak kita kepada orang lain asalkan suara kita paling keras.',
    opsi: ['Benar', 'Salah'],
    kunciIndex: 1,
    pembahasan: 'Salah! Sila ke-4 melarang pemaksaan kehendak. Musyawarah harus dilandasi hikmat kebijaksanaan dan saling mendengarkan.'
  },
  {
    id: 7,
    tipe: 'pilihan-ganda',
    silaTerkait: 5,
    pertanyaan: 'Sila kelima, "Keadilan Sosial bagi Seluruh Rakyat Indonesia", dilambangkan dengan...',
    opsi: ['Rantai Emas', 'Padi dan Kapas', 'Pohon Beringin', 'Bintang Emas'],
    kunciIndex: 1,
    pembahasan: 'Padi melambangkan pangan (makanan) dan kapas melambangkan sandang (pakaian) sebagai kebutuhan pokok seluruh rakyat.'
  },
  {
    id: 8,
    tipe: 'pilihan-ganda',
    silaTerkait: 5,
    pertanyaan: 'Berikut ini adalah contoh perilaku yang mencerminkan Sila kelima di sekolah, yaitu...',
    opsi: [
      'Menuntut hak bermain tetapi tidak mau melaksanakan tugas piket',
      'Mengantre dengan tertib saat mencuci tangan di wastafel sekolah',
      'Membuang makanan sisa sembarangan di laci meja',
      'Menyerobot antrean teman saat membeli jajan di kantin'
    ],
    kunciIndex: 1,
    pembahasan: 'Mengantre dengan tertib menghormati hak orang lain dan menciptakan ketertiban yang adil bagi semua.'
  },
  {
    id: 9,
    tipe: 'benar-salah',
    silaTerkait: 3,
    pertanyaan: 'Menggunakan Bahasa Indonesia yang baik dan benar saat berbicara dengan teman dari berbagai daerah dapat mempererat persatuan bangsa.',
    opsi: ['Benar', 'Salah'],
    kunciIndex: 0,
    pembahasan: 'Benar! Bahasa Indonesia berfungsi sebagai bahasa persatuan yang menjembatani keberagaman antardaerah.'
  },
  {
    id: 10,
    tipe: 'pilihan-ganda',
    silaTerkait: 2,
    pertanyaan: 'Perilaku yang TIDAK sesuai dengan nilai kemanusiaan yang beradab adalah...',
    opsi: [
      'Membantu kakek menyeberang jalan',
      'Melakukan perundungan (bullying) dan mengejek kekurangan teman',
      'Berbicara dengan santun kepada bapak dan ibu guru',
      'Menyayangi adik dan kakak di rumah'
    ],
    kunciIndex: 1,
    pembahasan: 'Perundungan (bullying) menyakiti sesama dan melanggar prinsip kemanusiaan yang adil dan beradab.'
  },
  {
    id: 11,
    tipe: 'benar-salah',
    silaTerkait: 5,
    pertanyaan: 'Suka menabung dan tidak memboroskan uang saku untuk hal yang tidak penting adalah salah satu contoh pengamalan Sila kelima.',
    opsi: ['Benar', 'Salah'],
    kunciIndex: 0,
    pembahasan: 'Benar! Sila ke-5 membiasakan hidup hemat, sederhana, dan tidak bergaya hidup mewah.'
  },
  {
    id: 12,
    tipe: 'pilihan-ganda',
    silaTerkait: 4,
    pertanyaan: 'Sikap yang bijaksana ketika hasil musyawarah berbeda dengan usulan kita adalah...',
    opsi: [
      'Mogok tidak mau ikut kegiatan kelompok lagi',
      'Menerima dan melaksanakan keputusan bersama dengan ikhlas dan penuh tanggung jawab',
      'Menjelek-jelekkan usulan teman yang disepakati',
      'Membuat keributan di dalam kelas'
    ],
    kunciIndex: 1,
    pembahasan: 'Berjiwa besar menerima keputusan musyawarah adalah wujud kedewasaan dan kebijaksanaan Sila ke-4.'
  }
];

export interface RegionalLevelCultureData {
  rumahAdat: string;
  icon: string;
  highlight: string;
  greeting: string;
  island: string;
  alatMusik: string;
}

export const REGIONAL_LEVEL_CULTURE: Record<number, RegionalLevelCultureData> = {
  1: {
    rumahAdat: 'Rumah Gadang Minangkabau',
    icon: '🏛️',
    highlight: 'Sumatra: Kerukunan antarumat beragama di Ranah Minang yang teduh dan toleran.',
    greeting: 'Horas! Tarimo Kasih!',
    island: 'Sumatra',
    alatMusik: 'Talempong & Saluang'
  },
  2: {
    rumahAdat: 'Rumah Joglo & Candi Borobudur',
    icon: '🛕',
    highlight: 'Jawa: Tradisi gotong royong Gugur Gunung dan empati menolong sesama teman.',
    greeting: 'Sugeng Rawuh! Rahayu!',
    island: 'Jawa',
    alatMusik: 'Gamelan & Angklung'
  },
  3: {
    rumahAdat: 'Rumah Betang Panjang Dayak',
    icon: '🏕️',
    highlight: 'Kalimantan: Hidup damai puluhan keluarga di rumah panjang dan persaudaraan rimba.',
    greeting: 'Adil Ka\' Talino, Bacuramin Ka\' Saruga!',
    island: 'Kalimantan',
    alatMusik: 'Sampe Dayak'
  },
  4: {
    rumahAdat: 'Bale Banjar & Sasando Rote',
    icon: '⛩️',
    highlight: 'Bali & Nusa Tenggara: Musyawarah mufakat di Bale Banjar dan kearifan musyawarah.',
    greeting: 'Om Swastiastu! Tabe!',
    island: 'Bali & Nusa Tenggara',
    alatMusik: 'Sasando & Rindik'
  },
  5: {
    rumahAdat: 'Tongkonan Toraja & Rumah Souraja',
    icon: '🏘️',
    highlight: 'Sulawesi: Keadilan sosial, gotong royong Mapalus, dan berbagi merata dengan sesama.',
    greeting: 'Kurru Sumanga! Salama!',
    island: 'Sulawesi',
    alatMusik: 'Kolintang Minahasa'
  },
  6: {
    rumahAdat: 'Honai Pegunungan & Baileo Maluku',
    icon: '🛖',
    highlight: 'Maluku & Papua: Puncak persatuan Nusantara, tradisi Bakar Batu, dan Pela Gandong.',
    greeting: 'Amolongo! Kinaonak! Lawamena Haulala!',
    island: 'Maluku & Papua',
    alatMusik: 'Tifa Papua & Totobuang'
  }
};
