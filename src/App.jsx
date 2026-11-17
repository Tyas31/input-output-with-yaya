import React, { useEffect, useState } from "react";
import pptxgen from "pptxgenjs";
import {
  Home,
  Laptop,
  Workflow,
  Wrench,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Menu,
  X,
  Heart,
  Lightbulb
} from "lucide-react";

const devices = [
  {
    name: "Keyboard",
    icon: "⌨️",
    type: "Input",
    desc: "Memasukkan huruf, angka, simbol, dan perintah ke komputer."
  },
  {
    name: "Mouse",
    icon: "🖱️",
    type: "Input",
    desc: "Memberikan perintah melalui gerakan, klik, dan gulir."
  },
  {
    name: "Scanner",
    icon: "📠",
    type: "Input",
    desc: "Mengubah dokumen atau gambar fisik menjadi data digital."
  },
  {
    name: "Microphone",
    icon: "🎙️",
    type: "Input",
    desc: "Memasukkan suara ke dalam komputer."
  },
  {
    name: "Monitor",
    icon: "🖥️",
    type: "Output",
    desc: "Menampilkan teks, gambar, video, dan informasi visual."
  },
  {
    name: "Printer",
    icon: "🖨️",
    type: "Output",
    desc: "Menghasilkan keluaran berupa cetakan di kertas."
  },
  {
    name: "Speaker",
    icon: "🔊",
    type: "Output",
    desc: "Menghasilkan keluaran berupa suara."
  },
  {
    name: "Projector",
    icon: "📽️",
    type: "Output",
    desc: "Menampilkan tampilan komputer ke bidang yang lebih besar."
  }
];

const flowInput = [
  [
    "Keyboard",
    "Pengguna menekan tombol. Keyboard menangkap masukan berupa karakter atau perintah.",
    "⌨️"
  ],
  [
    "Sistem Operasi",
    "Sistem operasi mengatur komunikasi perangkat dan meneruskan masukan ke aplikasi yang aktif.",
    "⚙️"
  ],
  [
    "Aplikasi",
    "Aplikasi pengolah kata menerima masukan sehingga karakter dapat diproses dan ditampilkan.",
    "📝"
  ]
];

const flowOutput = [
  [
    "Aplikasi",
    "Aplikasi meminta hasil ditampilkan, misalnya huruf yang baru saja diketik.",
    "📝"
  ],
  [
    "Sistem Operasi",
    "Sistem operasi mengatur permintaan keluaran dan komunikasi dengan perangkat monitor.",
    "⚙️"
  ],
  [
    "Monitor",
    "Monitor menampilkan hasil kepada pengguna.",
    "🖥️"
  ]
];

const navItems = [
  {
    id: "devices",
    label: "Kenali Perangkat I/O",
    icon: <Laptop />
  },
  {
    id: "roles",
    label: "Mengenal Fungsi I/O",
    icon: <BookOpen />
  },
  {
    id: "flow",
    label: "Alur Kerja I/O",
    icon: <Workflow />
  },
  {
    id: "trouble",
    label: "Pecahkan Masalah",
    icon: <Wrench />
  }
];

function Mascot() {
  return (
    <div className="mascot-photo-wrapper">
      <img
        src="/g1.png"
        alt="Karakter Petualangan I/O"
        className="mascot-photo"
      />
    </div>
  );
}

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="section-title">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("devices");
  const [mobileOpen, setMobileOpen] = useState(false);

  const [selected, setSelected] = useState({});
  const [showDeviceAnswer, setShowDeviceAnswer] = useState(false);

  const [roleOpen, setRoleOpen] = useState(-1);

  const [flowType, setFlowType] = useState("input");
  const [flowStep, setFlowStep] = useState(0);

  const [order, setOrder] = useState([]);
  const [orderChecked, setOrderChecked] = useState(false);

  const [cause, setCause] = useState("");
  const [solution, setSolution] = useState("");
  const [troubleChecked, setTroubleChecked] = useState(false);
  const [clues, setClues] = useState([]);
  const [challengeAnswer, setChallengeAnswer] = useState("");
  const [challengeChecked, setChallengeChecked] = useState(false);

  const [done, setDone] = useState({});

  // Identitas kelompok dan jawaban LKPD disimpan otomatis di browser.
  const STORAGE_KEY = "petualangan-io-lkpd-v1";
  const [lkpd, setLkpd] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {
        groupName: "",
        className: "",
        members: "",
        keyboardCause1: "",
        keyboardCause2: "",
        keyboardAction1: "",
        keyboardAction2: "",
        keyboardEvidence: "",
        keyboardConclusion: "",
        printerCause1: "",
        printerCause2: "",
        printerAction1: "",
        printerAction2: "",
        printerEvidence: "",
        printerConclusion: ""
      };
    } catch {
      return {
        groupName: "", className: "", members: "",
        keyboardCause1: "", keyboardCause2: "", keyboardAction1: "",
        keyboardAction2: "", keyboardEvidence: "", keyboardConclusion: "",
        printerCause1: "", printerCause2: "", printerAction1: "",
        printerAction2: "", printerEvidence: "", printerConclusion: ""
      };
    }
  });

  const [savedAt, setSavedAt] = useState("");
  const [pptGenerating, setPptGenerating] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lkpd));
      setSavedAt(new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit", minute: "2-digit"
      }));
    } catch (error) {
      console.error("Jawaban belum dapat disimpan di browser:", error);
    }
  }, [lkpd]);

  const updateLkpd = (field, value) => {
    setLkpd((current) => ({ ...current, [field]: value }));
  };

  const requiredLkpdFields = [
    "groupName", "className", "members",
    "keyboardCause1", "keyboardCause2", "keyboardAction1",
    "keyboardAction2", "keyboardEvidence", "keyboardConclusion",
    "printerCause1", "printerCause2", "printerAction1",
    "printerAction2", "printerEvidence", "printerConclusion"
  ];

  const isLkpdComplete = requiredLkpdFields.every(
    (field) => String(lkpd[field] || "").trim().length > 0
  );

  
const feedbackItems = [
  {
    field: "keyboardCause1",
    label: "Aktivitas 1 — Penyebab pertama",
    keywords: ["keyboard", "koneksi", "kabel", "usb", "perangkat"]
  },
  {
    field: "keyboardCause2",
    label: "Aktivitas 1 — Penyebab kedua",
    keywords: ["driver", "sistem operasi", "pengaturan", "aplikasi"]
  },
  {
    field: "keyboardAction1",
    label: "Aktivitas 1 — Langkah penanganan pertama",
    keywords: ["keyboard", "eksternal", "kabel", "koneksi", "usb"]
  },
  {
    field: "keyboardAction2",
    label: "Aktivitas 1 — Langkah penanganan kedua",
    keywords: ["driver", "pengaturan", "sistem operasi", "aplikasi"]
  },
  {
    field: "keyboardEvidence",
    label: "Aktivitas 1 — Bukti analisis",
    keywords: ["keyboard", "tidak muncul", "tidak merespons", "monitor", "tulisan"]
  },
  {
    field: "keyboardConclusion",
    label: "Aktivitas 1 — Kesimpulan",
    keywords: ["keyboard", "sistem operasi", "aplikasi", "input", "masukan"]
  },
  {
    field: "printerCause1",
    label: "Aktivitas 2 — Penyebab pertama",
    keywords: ["tinta", "kartrid", "cartridge", "habis", "menipis"]
  },
  {
    field: "printerCause2",
    label: "Aktivitas 2 — Penyebab kedua",
    keywords: ["print head", "head cleaning", "tersumbat", "kering", "saluran tinta"]
  },
  {
    field: "printerAction1",
    label: "Aktivitas 2 — Langkah penanganan pertama",
    keywords: ["periksa tinta", "cek tinta", "kartrid", "cartridge", "isi tinta"]
  },
  {
    field: "printerAction2",
    label: "Aktivitas 2 — Langkah penanganan kedua",
    keywords: ["head cleaning", "print head", "bersihkan", "pembersihan"]
  },
  {
    field: "printerEvidence",
    label: "Aktivitas 2 — Bukti analisis",
    keywords: ["pucat", "tinta", "kertas keluar", "printer menarik kertas", "tidak tersangkut"]
  },
  {
    field: "printerConclusion",
    label: "Aktivitas 2 — Kesimpulan",
    keywords: ["tinta", "printer", "pucat", "print head", "head cleaning"]
  }
];

const evaluateAnswer = (field) => {
  const item = feedbackItems.find((question) => question.field === field);
  const answer = String(lkpd[field] || "").toLowerCase();

  if (!item || !answer.trim()) return "Perlu diperbaiki";

  const matched = item.keywords.filter((keyword) =>
    answer.includes(keyword)
  );

  if (matched.length >= 2) return "Benar";
  if (matched.length === 1) return "Kurang tepat";

  return "Perlu diperbaiki";
};

const saveLkpdAnswers = () => {
  if (!isLkpdComplete) return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lkpd));
  setPage("feedback");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

 
const createPresentation = async () => {
  if (!isLkpdComplete) return;

  setPptGenerating(true);

  try {
    const pptx = new pptxgen();

    pptx.layout = "LAYOUT_WIDE";
    pptx.author = "Petualangan I/O";
    pptx.subject = "Hasil diskusi LKPD Manajemen Sistem Input/Output";
    pptx.title = `Detektif I/O - ${lkpd.groupName}`;
    pptx.company = "Petualangan I/O";
    pptx.lang = "id-ID";

    pptx.theme = {
      headFontFace: "Aptos Display",
      bodyFontFace: "Aptos",
      lang: "id-ID"
    };

    // PALET WARNA RETRO-TECH
    const C = {
      dark: "211B3C",
      dark2: "30264F",
      purple: "7966B5",
      lavender: "B9A8E5",
      lavenderLight: "E5DDF7",
      coral: "F28C83",
      coralLight: "F9C5BD",
      mint: "A9D8C5",
      mintLight: "D9EEE5",
      pink: "F4DCE8",
      cream: "FFF8EF",
      white: "FFFFFF",
      ink: "30264F",
      muted: "776E89",
      line: "D9CEE9"
    };

    const W = 13.333;
    const H = 7.5;

    // MASTER SLIDE
    pptx.defineSlideMaster({
      title: "RETRO_MASTER",
      background: { color: C.cream },
      objects: [
        {
          rect: {
            x: 0, y: 0, w: W, h: 0.12,
            line: { color: C.coral, transparency: 100 },
            fill: { color: C.coral }
          }
        },
        {
          text: {
            text: "PETUALANGAN I/O  /  INFORMATIKA KELAS X",
            options: {
              x: 0.55, y: 7.12, w: 7, h: 0.18,
              fontFace: "Aptos",
              fontSize: 8,
              bold: true,
              charSpacing: 1.5,
              color: C.muted,
              margin: 0
            }
          }
        }
      ],
      slideNumber: {
        x: 12.35, y: 7.1,
        color: C.muted,
        fontFace: "Aptos",
        fontSize: 9
      }
    });

    // DEKORASI TITIK
    const addDots = (slide, x, y, cols = 5, rows = 4, color = C.lavender) => {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          slide.addShape(pptx.ShapeType.ellipse, {
            x: x + c * 0.16,
            y: y + r * 0.16,
            w: 0.045,
            h: 0.045,
            line: { color, transparency: 100 },
            fill: { color }
          });
        }
      }
    };

    // LABEL KECIL
    const addLabel = (slide, text, x, y, color = C.coral) => {
      slide.addText(text.toUpperCase(), {
        x, y, w: 5.5, h: 0.25,
        fontSize: 9,
        bold: true,
        charSpacing: 2,
        color,
        margin: 0
      });
    };

    // JUDUL SLIDE
    const addHeading = (slide, label, title, subtitle) => {
      addLabel(slide, label, 0.7, 0.48);

      slide.addText(title, {
        x: 0.7, y: 0.9, w: 11.9, h: 0.65,
        fontFace: "Aptos Display",
        fontSize: 27,
        bold: true,
        color: C.dark,
        margin: 0,
        fit: "shrink"
      });

      if (subtitle) {
        slide.addText(subtitle, {
          x: 0.72, y: 1.62, w: 11.8, h: 0.5,
          fontSize: 11,
          color: C.muted,
          margin: 0,
          fit: "shrink",
          valign: "mid"
        });
      }
    };

    // KARTU INFORMASI
    const addInfoCard = (slide, x, y, w, h, title, body, accent = C.lavender) => {
      slide.addShape(pptx.ShapeType.roundRect, {
        x, y, w, h,
        rectRadius: 0.12,
        line: { color: C.line, width: 0.8 },
        fill: { color: C.white }
      });

      slide.addShape(pptx.ShapeType.rect, {
        x, y, w: 0.09, h,
        line: { color: accent, transparency: 100 },
        fill: { color: accent }
      });

      slide.addText(title, {
        x: x + 0.25, y: y + 0.18,
        w: w - 0.45, h: 0.35,
        fontSize: 12,
        bold: true,
        color: C.dark,
        margin: 0,
        fit: "shrink"
      });

      slide.addText(body || "-", {
        x: x + 0.25, y: y + 0.65,
        w: w - 0.48, h: h - 0.82,
        fontSize: 11,
        color: C.muted,
        valign: "top",
        margin: 0.03,
        breakLine: false,
        fit: "shrink",
        paraSpaceAfterPt: 4
      });
    };

    // ILUSTRASI MONITOR
    const drawMonitor = (slide, x, y, scale = 1) => {
      const w = 2.8 * scale;
      const h = 1.9 * scale;

      slide.addShape(pptx.ShapeType.roundRect, {
        x, y, w, h,
        rectRadius: 0.12,
        line: { color: C.dark, width: 2 },
        fill: { color: C.dark2 }
      });

      slide.addShape(pptx.ShapeType.rect, {
        x: x + 0.15 * scale,
        y: y + 0.15 * scale,
        w: w - 0.3 * scale,
        h: h - 0.35 * scale,
        line: { color: C.lavender, transparency: 100 },
        fill: { color: C.lavender }
      });

      slide.addShape(pptx.ShapeType.ellipse, {
        x: x + w / 2 - 0.08 * scale,
        y: y + h - 0.27 * scale,
        w: 0.16 * scale,
        h: 0.1 * scale,
        line: { color: C.dark, transparency: 100 },
        fill: { color: C.dark }
      });

      slide.addShape(pptx.ShapeType.rect, {
        x: x + w / 2 - 0.12 * scale,
        y: y + h,
        w: 0.24 * scale,
        h: 0.42 * scale,
        line: { color: C.dark, transparency: 100 },
        fill: { color: C.dark }
      });

      slide.addShape(pptx.ShapeType.rect, {
        x: x + w / 2 - 0.55 * scale,
        y: y + h + 0.38 * scale,
        w: 1.1 * scale,
        h: 0.1 * scale,
        line: { color: C.dark, transparency: 100 },
        fill: { color: C.dark }
      });

      // Garis pada layar
      slide.addShape(pptx.ShapeType.rect, {
        x: x + 0.42 * scale,
        y: y + 0.48 * scale,
        w: 0.8 * scale,
        h: 0.09 * scale,
        line: { color: C.coral, transparency: 100 },
        fill: { color: C.coral }
      });

      slide.addShape(pptx.ShapeType.rect, {
        x: x + 0.42 * scale,
        y: y + 0.72 * scale,
        w: 1.35 * scale,
        h: 0.08 * scale,
        line: { color: C.mint, transparency: 100 },
        fill: { color: C.mint }
      });
    };

    // ILUSTRASI KEYBOARD
    const drawKeyboard = (slide, x, y, scale = 1) => {
      const w = 3.4 * scale;
      const h = 1.15 * scale;

      slide.addShape(pptx.ShapeType.roundRect, {
        x, y, w, h,
        rectRadius: 0.12,
        line: { color: C.dark, width: 1.5 },
        fill: { color: C.dark2 }
      });

      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 11; c++) {
          slide.addShape(pptx.ShapeType.roundRect, {
            x: x + (0.16 + c * 0.28) * scale,
            y: y + (0.15 + r * 0.27) * scale,
            w: 0.2 * scale,
            h: 0.16 * scale,
            rectRadius: 0.025,
            line: { color: C.lavender, transparency: 100 },
            fill: {
              color: (r + c) % 5 === 0 ? C.coral : C.lavender
            }
          });
        }
      }

      slide.addShape(pptx.ShapeType.roundRect, {
        x: x + 1.05 * scale,
        y: y + 0.91 * scale,
        w: 1.25 * scale,
        h: 0.1 * scale,
        rectRadius: 0.03,
        line: { color: C.mint, transparency: 100 },
        fill: { color: C.mint }
      });
    };

    // ILUSTRASI PRINTER
    const drawPrinter = (slide, x, y, scale = 1) => {
      slide.addShape(pptx.ShapeType.rect, {
        x: x + 0.35 * scale,
        y,
        w: 1.8 * scale,
        h: 0.65 * scale,
        line: { color: C.dark, width: 1.2 },
        fill: { color: C.white }
      });

      slide.addShape(pptx.ShapeType.roundRect, {
        x, y: y + 0.45 * scale,
        w: 2.5 * scale,
        h: 1.2 * scale,
        rectRadius: 0.12,
        line: { color: C.dark, width: 2 },
        fill: { color: C.lavender }
      });

      slide.addShape(pptx.ShapeType.rect, {
        x: x + 0.35 * scale,
        y: y + 1.05 * scale,
        w: 1.8 * scale,
        h: 0.42 * scale,
        line: { color: C.dark, width: 1 },
        fill: { color: C.cream }
      });

      slide.addShape(pptx.ShapeType.ellipse, {
        x: x + 2.08 * scale,
        y: y + 0.75 * scale,
        w: 0.13 * scale,
        h: 0.13 * scale,
        line: { color: C.mint, transparency: 100 },
        fill: { color: C.mint }
      });

      slide.addShape(pptx.ShapeType.rect, {
        x: x + 0.75 * scale,
        y: y + 1.18 * scale,
        w: 1.05 * scale,
        h: 0.06 * scale,
        line: { color: C.coral, transparency: 100 },
        fill: { color: C.coral }
      });
    };

    // PANEL ILUSTRASI
    const addIllustrationPanel = (slide, x, y, w, h, color = C.lavenderLight) => {
      slide.addShape(pptx.ShapeType.roundRect, {
        x, y, w, h,
        rectRadius: 0.16,
        line: { color, transparency: 100 },
        fill: { color }
      });

      addDots(slide, x + w - 0.9, y + 0.25, 4, 3, C.purple);
    };

    // =====================================
    // SLIDE 1 — COVER
    // =====================================
    let slide = pptx.addSlide("RETRO_MASTER");
    slide.background = { color: C.dark };

    // Dekorasi kanan atas
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 10.2, y: -1.5, w: 4.5, h: 4.5,
      line: { color: C.dark2, transparency: 100 },
      fill: { color: C.dark2 }
    });

    addDots(slide, 0.8, 0.8, 6, 4, C.coral);
    addDots(slide, 11.1, 5.7, 6, 4, C.mint);

    //judul
    addLabel(slide, "Presentasi hasil diskusi LKPD", 0.9, 1.2, C.coralLight);

    slide.addText("DETEKTIF", {
      x: 0.85, y: 2.0, w: 7.0, h: 0.8,
      fontFace: "Aptos Display",
      fontSize: 45,
      bold: true,
      color: C.white,
      margin: 0,
      fit: "shrink"
    });

    slide.addText("I/O!", {
      x: 0.85, y: 2.85, w: 5.0, h: 0.95,
      fontFace: "Aptos Display",
      fontSize: 62,
      bold: true,
      color: C.coral,
      margin: 0
    });

    slide.addText(
      "Menemukan masalah, membaca petunjuk,\ndan mencari solusi perangkat input/output.",
      {
        x: 0.92, y: 4.0, w: 6.5, h: 0.75,
        fontSize: 15,
        color: C.lavenderLight,
        margin: 0,
        breakLine: false,
        fit: "shrink"
      }
    );

    // Kartu identitas kelompok
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.9, y: 5.05, w: 6.6, h: 1.45,
      rectRadius: 0.12,
      line: { color: C.lavender, transparency: 100 },
      fill: { color: C.dark2 }
    });

    // Label identitas
    const identityRows = [
      { label: "KELOMPOK", value: lkpd.groupName },
      { label: "KELAS", value: lkpd.className },
      { label: "ANGGOTA", value: lkpd.members }
    ];

    identityRows.forEach((item, index) => {
      const y = 5.28 + index * 0.36;

      slide.addText(item.label, {
        x: 1.2, y, w: 1.2, h: 0.25,
        fontSize: 9,
        bold: true,
        charSpacing: 0.8,
        color: C.coralLight,
        margin: 0
      });
      slide.addText(item.value || "-", {
        x: 2.55, y, w: 4.6, h: 0.28,
        fontSize: 10,
        bold: true,
        color: C.white,
        margin: 0,
        fit: "shrink"
      });
    });

    // Perangkat di sisi kanan
    drawMonitor(slide, 9.05, 1.55, 0.95);
    drawKeyboard(slide, 8.8, 4.35, 0.95);

    // Keterangan ilustrasi
    slide.addText("INPUT  /  PROCESS  /  OUTPUT", {
      x: 8.1, y: 5.75, w: 4.4, h: 0.3,
      fontSize: 10,
      bold: true,
      charSpacing: 1.3,
      color: C.mint,
      align: "center",
      margin: 0
    });

    // =====================================
    // SLIDE 2 — MISI DISKUSI (REVISED)
    // =====================================
    slide = pptx.addSlide("RETRO_MASTER");

    addHeading(
      slide,
      "01 / Misi detektif",
      "Dua masalah, satu misi!",
      "Kelompok kami menganalisis dua kasus yang berkaitan dengan perangkat input dan output."
    );

    // PANEL KEYBOARD
    addIllustrationPanel(
      slide, 0.8, 2.45, 5.65, 3.35, C.lavenderLight
    );

    // Ilustrasi keyboard diperkecil dan diposisikan di tengah
    drawKeyboard(slide, 1.9, 3.05, 0.95);

    // Nomor kasus
    slide.addText("01", {
      x: 1.15, y: 4.5, w: 0.7, h: 0.45,
      fontSize: 23,
      bold: true,
      color: C.purple,
      margin: 0
    });

    // Nama perangkat
    slide.addText("KEYBOARD", {
      x: 2.0, y: 4.57, w: 3.5, h: 0.35,
      fontSize: 16,
      bold: true,
      color: C.dark,
      margin: 0
    });

    // Deskripsi
    slide.addText("Perangkat input tidak merespons", {
      x: 1.2, y: 5.2, w: 4.9, h: 0.3,
      fontSize: 11,
      color: C.muted,
      align: "center",
      margin: 0,
      fit: "shrink"
    });

    // PANEL PRINTER
    addIllustrationPanel(
      slide, 6.85, 2.45, 5.65, 3.35, C.mintLight
    );

    // Ilustrasi printer diperkecil agar tidak menabrak teks
    drawPrinter(slide, 8.62, 2.85, 0.85);

    // Nomor kasus
    slide.addText("02", {
      x: 7.2, y: 4.5, w: 0.7, h: 0.45,
      fontSize: 23,
      bold: true,
      color: C.purple,
      margin: 0
    });

    // Nama perangkat
    slide.addText("PRINTER", {
      x: 8.05, y: 4.57, w: 3.5, h: 0.35,
      fontSize: 16,
      bold: true,
      color: C.dark,
      margin: 0
    });

    // Deskripsi
    slide.addText("Perangkat output menghasilkan cetakan yang pucat", {
      x: 7.25, y: 5.2, w: 4.9, h: 0.3,
      fontSize: 11,
      color: C.muted,
      align: "center",
      margin: 0,
      fit: "shrink"
    });

    // Alur diskusi
    slide.addText("AMATI   →   ANALISIS   →   TENTUKAN SOLUSI", {
      x: 2.0, y: 6.2, w: 9.3, h: 0.35,
      fontSize: 12,
      bold: true,
      charSpacing: 1.5,
      color: C.purple,
      align: "center",
      margin: 0
    });

    // =====================================
    // SLIDE 3 — KASUS KEYBOARD
    // =====================================
    slide = pptx.addSlide("RETRO_MASTER");

    addHeading(
      slide,
      "02 / Case study · Input device",
      "Keyboard laptop tidak merespons",
      "Kasus Dina: keyboard fisik tidak menghasilkan huruf, tetapi On-Screen Keyboard masih dapat digunakan."
    );

    // Area ilustrasi
    addIllustrationPanel(slide, 0.8, 2.35, 4.0, 3.9, C.dark2);
    drawKeyboard(slide, 1.1, 3.15, 1.0);

    slide.addText("INPUT DEVICE", {
      x: 1.2, y: 4.85, w: 3.2, h: 0.35,
      fontSize: 14,
      bold: true,
      charSpacing: 1.5,
      color: C.mint,
      align: "center",
      margin: 0
    });

    slide.addText("Keyboard fisik tidak menghasilkan huruf.", {
      x: 1.2, y: 5.3, w: 3.2, h: 0.55,
      fontSize: 11,
      color: C.white,
      align: "center",
      margin: 0,
      fit: "shrink"
    });

    // Area analisis
    addInfoCard(
      slide, 5.2, 2.35, 3.35, 1.65,
      "Kemungkinan penyebab 01",
      lkpd.keyboardCause1,
      C.coral
    );

    addInfoCard(
      slide, 8.85, 2.35, 3.65, 1.65,
      "Kemungkinan penyebab 02",
      lkpd.keyboardCause2,
      C.lavender
    );

    addInfoCard(
      slide, 5.2, 4.25, 7.3, 1.95,
      "Langkah pemeriksaan kelompok",
      `${lkpd.keyboardAction1}\n${lkpd.keyboardAction2}`,
      C.mint
    );

    // =====================================
    // SLIDE 4 — HASIL ANALISIS KEYBOARD
    // =====================================
    slide = pptx.addSlide("RETRO_MASTER");

    addHeading(
      slide,
      "03 / Investigation result",
      "Membaca petunjuk keyboard",
      "Bukti yang ditemukan menjadi dasar kelompok dalam menarik kesimpulan."
    );

    // Ilustrasi kiri
    addIllustrationPanel(slide, 0.8, 2.4, 3.65, 3.7, C.dark);
    drawMonitor(slide, 1.2, 3.0, 0.9);

    slide.addText("KEYBOARD\nINVESTIGATION", {
      x: 1.1, y: 5.05, w: 3.0, h: 0.65,
      fontSize: 16,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0
    });

    addInfoCard(
      slide, 4.85, 2.4, 3.65, 3.7,
      "Bukti yang mendukung",
      lkpd.keyboardEvidence,
      C.coral
    );

    addInfoCard(
      slide, 8.85, 2.4, 3.65, 3.7,
      "Kesimpulan kelompok",
      lkpd.keyboardConclusion,
      C.mint
    );

    // =====================================
    // SLIDE 5 — KASUS PRINTER
    // =====================================
    slide = pptx.addSlide("RETRO_MASTER");

    addHeading(
      slide,
      "04 / Case study · Output device",
      "Hasil cetakan printer terlihat pucat",
      "Kasus Raka: kertas keluar seperti biasa, tetapi tulisan terlihat pucat dan beberapa bagian tidak tercetak jelas."
    );

    // Ilustrasi kiri
    addIllustrationPanel(slide, 0.8, 2.35, 4.0, 3.9, C.dark2);
    drawPrinter(slide, 1.45, 3.05, 1.05);

    slide.addText("OUTPUT DEVICE", {
      x: 1.2, y: 5.05, w: 3.2, h: 0.5,
      fontSize: 11,
      color: C.white,
      bold: true,
      charSpacing: 1.5,
      align: "center",
      margin: 0,
      fit: "shrink"
    });

    slide.addText("Kertas keluar tanpa tulisan atau gambar.", {
      x: 1.2, y: 5.5, w: 3.2, h: 0.5,
      fontSize: 11,
      color: C.white,
      align: "center",
      margin: 0,
      fit: "shrink"
    });

    addInfoCard(
      slide, 5.2, 2.35, 3.35, 1.65,
      "Kemungkinan penyebab 01",
      lkpd.printerCause1,
      C.coral
    );

    addInfoCard(
      slide, 8.85, 2.35, 3.65, 1.65,
      "Kemungkinan penyebab 02",
      lkpd.printerCause2,
      C.lavender
    );

    addInfoCard(
      slide, 5.2, 4.25, 7.3, 1.95,
      "Langkah pemeriksaan kelompok",
      `${lkpd.printerAction1}\n${lkpd.printerAction2}`,
      C.mint
    );

    // =====================================
    // SLIDE 6 — HASIL ANALISIS PRINTER
    // =====================================
    slide = pptx.addSlide("RETRO_MASTER");

    addHeading(
      slide,
      "05 / Investigation result",
      "Menemukan solusi masalah printer",
      "Bukti dan kesimpulan kelompok terhadap hasil cetakan yang pucat."
    );

    addIllustrationPanel(slide, 0.8, 2.4, 3.65, 3.7, C.dark);
    drawPrinter(slide, 1.35, 3.05, 1.05);

    slide.addText("PRINTER\nINVESTIGATION", {
      x: 1.1, y: 5.05, w: 3.0, h: 0.65,
      fontSize: 16,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0
    });

    addInfoCard(
      slide, 4.85, 2.4, 3.65, 3.7,
      "Bukti yang mendukung",
      lkpd.printerEvidence,
      C.coral
    );

    addInfoCard(
      slide, 8.85, 2.4, 3.65, 3.7,
      "Kesimpulan kelompok",
      lkpd.printerConclusion,
      C.mint
    );

    // =====================================
    // SLIDE 7 — PENUTUP
    // =====================================
    slide = pptx.addSlide("RETRO_MASTER");
    slide.background = { color: C.dark };

    slide.addShape(pptx.ShapeType.ellipse, {
      x: -1.0, y: -1.0, w: 4.2, h: 4.2,
      line: { color: C.dark2, transparency: 100 },
      fill: { color: C.dark2 }
    });

    slide.addShape(pptx.ShapeType.ellipse, {
      x: 10.5, y: 4.8, w: 4.0, h: 4.0,
      line: { color: C.purple, transparency: 100 },
      fill: { color: C.purple }
    });

    addDots(slide, 1.0, 5.8, 6, 4, C.coral);
    addDots(slide, 10.9, 0.7, 6, 4, C.mint);

    drawMonitor(slide, 5.15, 0.8, 1.0);

    slide.addText("CASE CLOSED!", {
      x: 1.0, y: 3.15, w: 11.3, h: 0.5,
      fontSize: 14,
      bold: true,
      charSpacing: 3,
      color: C.mint,
      align: "center",
      margin: 0
    });

    slide.addText("TERIMA KASIH!", {
      x: 1.0, y: 3.8, w: 11.3, h: 0.85,
      fontFace: "Aptos Display",
      fontSize: 38,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0
    });

    slide.addText(
      "Diskusi yang baik dimulai dari bukti,\nbukan dari tebakan.",
      {
        x: 2.0, y: 4.85, w: 9.3, h: 0.8,
        fontSize: 17,
        color: C.lavenderLight,
        align: "center",
        margin: 0,
        breakLine: false
      }
    );

    slide.addText(
      `${lkpd.groupName}  /  ${lkpd.className}`,
      {
        x: 2.0, y: 6.0, w: 9.3, h: 0.35,
        fontSize: 11,
        bold: true,
        charSpacing: 1.5,
        color: C.coralLight,
        align: "center",
        margin: 0
      }
    );

    // DOWNLOAD PPT
    await pptx.writeFile({
      fileName: `Presentasi_LKPD_IO_${lkpd.groupName.trim().replace(/[^a-z0-9-_]/gi, "_") || "Kelompok"}.pptx`
    });

    mark("trouble");

  } catch (error) {
    console.error(error);
    alert(
      "PPT belum berhasil dibuat. Pastikan paket pptxgenjs sudah terpasang, lalu coba lagi."
    );
  } finally {
    setPptGenerating(false);
  }
};
    
  const go = (id) => {
    setPage(id);
    setMobileOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const mark = (id) => {
    setDone((v) => ({
      ...v,
      [id]: true
    }));
  };

  const active = navItems.find((n) => n.id === page);

  const chooseDevice = (name, type) => {
    setSelected((v) => ({
      ...v,
      [name]: type
    }));
  };

  const correctDevices = devices.filter(
    (d) => selected[d.name] === d.type
  ).length;

  const correctOrder =
    order.join("|") === "Keyboard|Sistem Operasi|Aplikasi";

  const flow = flowType === "input" ? flowInput : flowOutput;
  const [flowPlaying, setFlowPlaying] = useState(false);

  // Simulasi berjalan otomatis dari satu komponen ke komponen berikutnya.
  useEffect(() => {
    if (!flowPlaying) return undefined;

    const timer = window.setInterval(() => {
      setFlowStep((current) => {
        if (current >= flow.length - 1) {
          setFlowPlaying(false);
          return current;
        }

        return current + 1;
      });
    }, 1800);

    return () => window.clearInterval(timer);
  }, [flowPlaying, flow.length]);

  const nextPage = () => {
    go(
      navItems[
        (navItems.findIndex((n) => n.id === page) + 1) %
          navItems.length
      ].id
    );
  };

  return (
    <div className="app-shell">

      <div className="petal petal-a">🌸</div>
      <div className="petal petal-b">🌸</div>

      <header className="topbar">

        <button
          className="brand"
          onClick={() => go("devices")}
        >
          <span className="brand-mark">✿</span>

          <span>
            Petualangan <b>I/O</b>
            <small>Belajar Sistem Operasi • Kelas X</small>
          </span>
        </button>

        <button
          className="mobile-menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>

        <nav className={mobileOpen ? "nav open" : "nav"}>
          {navItems.map((n) => (
            <button
              key={n.id}
              className={
                page === n.id
                  ? "nav-link active"
                  : "nav-link"
              }
              onClick={() => go(n.id)}
            >
              {n.icon}
              {n.label}
            </button>
          ))}
        </nav>

      </header>

      <main>

        <section className="hero">

          <div className="hero-copy">

            <span className="pill">
              <Sparkles size={14} />
              Yuk, belajar sambil bermain!
            </span>

            <h1>
              Kenali dunia <em>Input & Output</em> bersama Yaya!
            </h1>

            <p>
              Ikuti petualangan kecil untuk memahami bagaimana
              komputer menerima masukan, mengatur perangkat,
              dan menampilkan hasil.
            </p>

            <button
              className="primary"
              onClick={() => go("devices")}
            >
              Mulai belajar <ChevronRight size={17} />
            </button>

            <div className="hero-note">
              <Heart size={14} fill="currentColor" />
              Pelan-pelan saja, kamu pasti bisa!
            </div>

          </div>

          <div className="hero-art">

            <div className="sunflower">✿</div>

            <div className="hero-card">

              <span className="mini-label">
                WELCOME, LITTLE EXPLORER!
              </span>

              <Mascot />

              <h3>Hai, teman!</h3>

              <p>Ayo selesaikan misi I/O hari ini.</p>

              <div className="progress">
                <span
                  style={{
                    width: `${
                      Object.values(done).filter(Boolean).length * 25
                    }%`
                  }}
                />
              </div>

              <small>
                {Object.values(done).filter(Boolean).length} dari 4 misi selesai
              </small>

            </div>

            <span className="spark s1">✧</span>
            <span className="spark s2">✿</span>

          </div>

        </section>

        <div className="content-layout">

          <aside className="sidebar">

            <div className="side-heading">
              PETA PETUALANGAN <span>🌷</span>
            </div>

            {navItems.map((n, i) => (
              <button
                key={n.id}
                className={
                  page === n.id
                    ? "side-item selected"
                    : "side-item"
                }
                onClick={() => go(n.id)}
              >
                <span>{n.label}</span>

                {done[n.id] && (
                  <CheckCircle2
                    className="side-check"
                    size={16}
                  />
                )}
              </button>
            ))}

            <div className="side-tip">
              <Lightbulb size={17} />
              <p>
                <b>Tips belajar</b>
                <br />
                Baca petunjuk, coba aktivitasnya, lalu gunakan
                informasi di sini untuk membantu mengisi LKPD.
              </p>
            </div>

          </aside>

          <section className="lesson">

            {/* ==================================
                MISI 1 - KENALI PERANGKAT I/O
            ================================== */}

            {page === "devices" && (
              <>
                <SectionTitle
                  eyebrow="MISI 01 · KENALI PERANGKAT"
                  title="Perangkat I/O di sekitar kita"
                  desc="Komputer membutuhkan perangkat untuk menerima data dan menyampaikan hasil. Yuk, kenali satu per satu!"
                />

                <div className="info-banner">
                  <span>🌼</span>
                  <p>
                    <b>Ingat!</b> Input berarti data masuk ke komputer,
                    sedangkan output adalah hasil yang diberikan
                    komputer kepada pengguna.
                  </p>
                </div>

                <div className="device-grid">

                  {devices.map((d) => (
                    <article
                      className="device-card"
                      key={d.name}
                    >
                      <div className="device-emoji">
                        {d.icon}
                      </div>

                      <div className="device-name">
                        {d.name}
                      </div>

                      <p>{d.desc}</p>

                      <div className="device-actions">

                        <button
                          className={
                            selected[d.name] === "Input"
                              ? "choice chosen"
                              : "choice"
                          }
                          onClick={() =>
                            chooseDevice(d.name, "Input")
                          }
                        >
                          Input
                        </button>

                        <button
                          className={
                            selected[d.name] === "Output"
                              ? "choice chosen"
                              : "choice"
                          }
                          onClick={() =>
                            chooseDevice(d.name, "Output")
                          }
                        >
                          Output
                        </button>

                      </div>

                      {selected[d.name] && (
                        <small
                          className={
                            selected[d.name] === d.type
                              ? "feedback good"
                              : "feedback bad"
                          }
                        >
                          {selected[d.name] === d.type
                            ? "✓ Tepat!"
                            : "Coba pikirkan lagi, ya."}
                        </small>
                      )}

                    </article>
                  ))}

                </div>

                <div className="activity-box">

                  <div>
                    <span className="eyebrow">MINI GAME</span>

                    <h3>Kelompokkan perangkat!</h3>

                    <p>
                      Pilih Input atau Output pada setiap kartu.
                      Setelah selesai, periksa jawabanmu.
                    </p>
                  </div>

                  <button
                    className="primary"
                    onClick={() => {
                      setShowDeviceAnswer(true);

                      if (correctDevices === devices.length) {
                        mark("devices");
                      }
                    }}
                  >
                    Periksa jawaban
                  </button>

                  {showDeviceAnswer && (
                    <div className="result-line">
                      <b>
                        {correctDevices} dari {devices.length} jawaban benar.
                      </b>

                      {correctDevices === devices.length ? (
                        <p>🎉 Hebat! Semua jawabanmu tepat!</p>
                      ) : (
                        <>
                          <p>
                            Masih ada jawaban yang kurang tepat.
                            Periksa kembali perangkat yang belum benar, ya!
                          </p>

                          <button
                            className="secondary retry-button"
                            onClick={() => {
                              setSelected({});
                              setShowDeviceAnswer(false);
                            }}
                          >
                            <RotateCcw size={15} />
                            Coba Lagi
                          </button>
                        </>
                      )}
                    </div>
                  )}

                </div>

                <div className="everyday-box">
                  <div>
                    <span className="eyebrow">CONTOH DALAM KEHIDUPAN SEHARI-HARI</span>
                    <h3>Bedakan dari arah datanya</h3>
                    <p>
                      Bayangkan kamu sedang mengikuti kelas daring.
                      Mikrofon mengirim suara kamu ke komputer (input),
                      sedangkan speaker mengeluarkan suara guru (output).
                    </p>
                  </div>

                  <div className="everyday-pair">
                    <div>
                      <span>🎙️</span>
                      <b>Mikrofon</b>
                      <small>Suara masuk → Input</small>
                    </div>

                    <div>
                      <span>🔊</span>
                      <b>Speaker</b>
                      <small>Suara keluar → Output</small>
                    </div>
                  </div>
                </div>

                <div className="lkpd-hint">
                  <b>📝 Bantuan untuk LKPD Aktivitas 1</b>

                  <p>
                    Gunakan nama dan fungsi perangkat di atas
                    untuk mengisi tabel perangkat input dan
                    perangkat output. Pilih tiga contoh dari
                    masing-masing kategori.
                  </p>
                </div>

              </>
            )}

            {/* ==================================
                MISI 2 - MENGENAL FUNGSI I/O
            ================================== */}

            {page === "roles" && (
              <>
                <SectionTitle
                  eyebrow="MISI 02 · PAHAMI FUNGSINYA"
                  title="Apa tugas sistem operasi?"
                  desc="Perangkat I/O tidak bekerja sendiri. Sistem operasi mengatur komunikasi antara aplikasi dan perangkat keras. Klik setiap kartu untuk melihat contoh penerapannya."
                />

                <div className="concept-hero">

                  <div className="concept-icon">🧑‍🍳</div>

                  <div>
                    <h3>Bayangkan seperti restoran!</h3>

                    <p>
                      Aplikasi adalah pengunjung yang memesan.
                      Sistem operasi seperti pelayan yang
                      menghubungkan pesanan dengan bagian dapur.
                      Perangkat keras menjalankan tugas sesuai
                      permintaan.
                    </p>
                  </div>

                </div>

                <h3 className="subheading">
                  Peran sistem operasi dalam manajemen I/O
                </h3>

                <div className="role-grid">

                  {[
                    {
                      icon: "🔗",
                      t: "Mengatur komunikasi",
                      d: "Membantu aplikasi berkomunikasi dengan perangkat I/O.",
                      example: "Saat kamu mengetik, sistem operasi membantu meneruskan masukan dari keyboard ke aplikasi pengolah kata.",
                      why: "Tanpa pengaturan komunikasi, aplikasi akan kesulitan menerima data dari perangkat."
                    },
                    {
                      icon: "🧰",
                      t: "Menyediakan layanan I/O",
                      d: "Menyediakan cara bagi aplikasi untuk meminta operasi input atau output.",
                      example: "Aplikasi pemutar musik meminta sistem operasi mengeluarkan suara melalui speaker.",
                      why: "Aplikasi dapat menggunakan perangkat melalui layanan yang disediakan sistem operasi."
                    },
                    {
                      icon: "🎛️",
                      t: "Mengendalikan perangkat",
                      d: "Mengatur bagaimana operasi I/O dilakukan pada perangkat tertentu.",
                      example: "Ketika mencetak dokumen, sistem operasi membantu mengirim pekerjaan cetak ke printer.",
                      why: "Perangkat dapat menjalankan perintah dengan cara yang sesuai."
                    },
                    {
                      icon: "🚦",
                      t: "Mengatur penggunaan",
                      d: "Mengatur penggunaan perangkat ketika beberapa proses membutuhkannya.",
                      example: "Dua aplikasi yang ingin menggunakan printer perlu diatur agar pekerjaan cetak tidak saling bertabrakan.",
                      why: "Penggunaan perangkat menjadi lebih tertib dan terkoordinasi."
                    },
                    {
                      icon: "🪄",
                      t: "Menyederhanakan akses",
                      d: "Aplikasi tidak perlu memahami seluruh detail teknis perangkat keras.",
                      example: "Kamu cukup memilih tombol Print di aplikasi. Kamu tidak perlu mengatur cara kerja komponen printer secara manual.",
                      why: "Pengguna dan pengembang aplikasi tidak harus mengurus semua detail perangkat."
                    },
                    {
                      icon: "🧩",
                      t: "Menggunakan driver",
                      d: "Driver membantu sistem operasi mengenali dan berkomunikasi dengan perangkat tertentu.",
                      example: "Komputer menggunakan driver agar dapat mengenali printer yang baru dihubungkan.",
                      why: "Driver menjadi penghubung agar perangkat dapat dikenali dan digunakan."
                    }
                  ].map((r) => (
                    <button
                      type="button"
                      className={roleOpen === r.t ? "role-card expanded" : "role-card"}
                      key={r.t}
                      onClick={() => setRoleOpen(roleOpen === r.t ? -1 : r.t)}
                    >
                      <span>{r.icon}</span>
                      <b>{r.t}</b>
                      <p>{r.d}</p>
                      <small>
                        {roleOpen === r.t ? "Tutup contoh" : "Klik untuk melihat contoh"}
                      </small>

                      {roleOpen === r.t && (
                        <div className="role-extra">
                          <strong>Contoh sehari-hari</strong>
                          <p>{r.example}</p>
                          <strong>Mengapa penting?</strong>
                          <p>{r.why}</p>
                        </div>
                      )}
                    </button>
                  ))}

                </div>

                <div className="lkpd-hint">
                  <b>📝 Bantuan untuk LKPD Aktivitas 2</b>

                  <p>
                    Sistem operasi menjadi perantara antara
                    aplikasi dan perangkat keras. Sistem operasi
                    mengatur komunikasi agar aplikasi dapat
                    menggunakan perangkat tanpa mengendalikan
                    perangkat keras secara langsung.
                  </p>
                </div>

                <button
                  className="primary"
                  onClick={() => {
                    mark("roles");
                    go("flow");
                  }}
                >
                  Lanjut ke alur I/O <ChevronRight size={17} />
                </button>

              </>
            )}

            {/* ==================================
                MISI 3 - ALUR KERJA I/O
            ================================== */}

            {page === "flow" && (
              <>
                <SectionTitle
                  eyebrow="MISI 03 · IKUTI PERJALANAN DATA"
                  title="Bagaimana data bergerak?"
                  desc="Pilih alur Input atau Output, lalu klik Putar simulasi. Amati komponen yang dilalui data dan baca penjelasan pada setiap tahap."
                />

                <div className="flow-tabs">

                  <button
                    className={
                      flowType === "input"
                        ? "tab active"
                        : "tab"
                    }
                    onClick={() => {
                      setFlowType("input");
                      setFlowStep(0);
                      setFlowPlaying(false);
                    }}
                  >
                    ⬇ Alur Input
                  </button>

                  <button
                    className={
                      flowType === "output"
                        ? "tab active"
                        : "tab"
                    }
                    onClick={() => {
                      setFlowType("output");
                      setFlowStep(0);
                      setFlowPlaying(false);
                    }}
                  >
                    ⬆ Alur Output
                  </button>

                </div>

                <div className="flow-2d">

                  <div className="flow-scene-label">
                    {flowType === "input"
                      ? "DATA MASUK KE KOMPUTER"
                      : "HASIL DIKIRIM KE PENGGUNA"}
                  </div>

                  <div className="flow-lane">

                    {flow.map((f, i) => (
                      <React.Fragment key={f[0]}>

                        <button
                          className={
                            flowStep === i
                              ? "flow-node-2d current"
                              : "flow-node-2d"
                          }
                          onClick={() => setFlowStep(i)}
                        >
                          <span className="node-emoji">
                            {f[2]}
                          </span>

                          <b>{f[0]}</b>

                          <small>
                            {i === 0
                              ? flowType === "input"
                                ? "Perangkat input"
                                : "Aplikasi"
                              : i === 1
                                ? "Perantara"
                                : flowType === "input"
                                  ? "Aplikasi"
                                  : "Perangkat output"}
                          </small>
                        </button>

                        {i < 2 && (
                          <div className="flow-connector">
                            <span className="data-packet">●</span>
                            <span className="connector-arrow">➜</span>
                          </div>
                        )}

                      </React.Fragment>
                    ))}

                  </div>

                  <div className="flow-explain">

                    <span className="step-bubble">
                      {flowStep + 1}
                    </span>

                    <div>
                      <b>{flow[flowStep][0]}</b>
                      <p>{flow[flowStep][1]}</p>
                    </div>

                  </div>

                  <div className="simulation-toolbar">
                    <span>🎬 Simulasi perjalanan data</span>

                    <div>
                      <button
                        className="secondary"
                        onClick={() => {
                          if (flowStep === flow.length - 1) setFlowStep(0);
                          setFlowPlaying((v) => !v);
                        }}
                      >
                        {flowPlaying ? "⏸ Jeda" : "▶ Putar simulasi"}
                      </button>

                      <button
                        className="secondary"
                        onClick={() => {
                          setFlowPlaying(false);
                          setFlowStep(0);
                        }}
                      >
                        <RotateCcw size={14} /> Ulangi dari awal
                      </button>
                    </div>
                  </div>

                  <div className="flow-controls">

                    <button
                      className="secondary"
                      disabled={flowStep === 0}
                      onClick={() =>
                        setFlowStep((v) => v - 1)
                      }
                    >
                      <ChevronLeft size={16} />
                      Tahap sebelumnya
                    </button>

                    <button
                      className="primary"
                      disabled={flowStep === 2}
                      onClick={() => setFlowStep((v) => v + 1)}
                    >
                      Tahap berikutnya
                      <ChevronRight size={16} />
                    </button>

                  </div>

                </div>

                <div className="simulation-caption">
                  <span>💡</span>
                  <p>
                    <b>Coba hubungkan dengan kegiatan mengetik.</b>
                    {" "}Ketika tombol keyboard ditekan, data masuk
                    melalui perangkat input. Sistem operasi mengatur
                    komunikasi, aplikasi mengolah karakter, lalu hasilnya
                    dapat diteruskan ke proses output agar tampil di monitor.
                  </p>
                </div>

                <div className="note-box">
                  <b>Perlu diingat</b>

                  <p>
                    Alur input: Perangkat input → Sistem Operasi → Aplikasi.
                  </p>

                  <p>
                    Alur output: Aplikasi → Sistem Operasi → Perangkat output.
                  </p>
                </div>

                <div className="activity-box vertical">

                  <div>
                    <span className="eyebrow">
                      MINI GAME · SUSUN URUTAN
                    </span>

                    <h3>Susun alur input!</h3>

                    <p>
                      Pilih komponen sesuai urutan. Jika salah,
                      kamu boleh mencoba lagi.
                    </p>
                  </div>

                  <div className="order-options">

                    {[
                      "Aplikasi",
                      "Keyboard",
                      "Sistem Operasi"
                    ].map((x) => (
                      <button
                        key={x}
                        className={
                          order.includes(x)
                            ? "choice chosen"
                            : "choice"
                        }
                        disabled={order.includes(x)}
                        onClick={() => {
                          setOrder((v) => [...v, x]);
                          setOrderChecked(false);
                        }}
                      >
                        {x}
                      </button>
                    ))}

                  </div>

                  <div className="order-answer">
                    {order.length
                      ? order.map((x, i) => (
                          <span key={i}>
                            {x}
                            {i < order.length - 1 ? " → " : ""}
                          </span>
                        ))
                      : "Belum ada urutan dipilih"}
                  </div>

                  <div className="inline-actions">

                    <button
                      className="secondary"
                      onClick={() => {
                        setOrder([]);
                        setOrderChecked(false);
                      }}
                    >
                      <RotateCcw size={15} />
                      Ulangi
                    </button>

                    <button
                      className="primary"
                      disabled={order.length !== 3}
                      onClick={() => {
                        setOrderChecked(true);

                        if (correctOrder) {
                          mark("flow");
                        }
                      }}
                    >
                      Periksa urutan
                    </button>

                  </div>

                  {orderChecked && (
                    <p
                      className={
                        correctOrder
                          ? "feedback good"
                          : "feedback bad"
                      }
                    >
                      {correctOrder
                        ? "Benar! Alur input sudah tepat."
                        : "Belum tepat. Petunjuk: data berasal dari keyboard, lalu diatur sistem operasi sebelum diterima aplikasi."}
                    </p>
                  )}

                </div>

                <div className="lkpd-hint">
                  <b>📝 Bantuan untuk LKPD Aktivitas 2</b>

                  <p>
                    Gunakan alur Input dan Output di atas
                    untuk melengkapi bagian yang kosong dan
                    menjelaskan urutan komunikasi I/O.
                  </p>
                </div>

              </>
            )}

            {/* ==================================
                MISI 4 - TROUBLESHOOTING
            ================================== */}

            {page === "trouble" && (
              <>
                <SectionTitle
                  eyebrow="MISI 04 · JADI DETEKTIF KOMPUTER"
                  title="Ayo pecahkan masalahnya!"
                  desc="Amati petunjuk, analisis kemungkinan gangguan, dan tentukan langkah pemeriksaan yang tepat."
                />

                <div className="case-intro">
                  <p>
                    Setiap kasus memiliki petunjuk yang berbeda.
                    Selesaikan analisis dengan menghubungkan gejala,
                    komponen I/O, dan langkah pemeriksaan.
                  </p>

                  <div className="case-levels">
                    <span className="case-level active">Kasus 1 · Keyboard</span>
                    <span className="case-level locked">
                      Kasus tantangan · tersedia setelah diskusi
                    </span>
                  </div>
                </div>

                <div className="case-card">

                  <span className="case-label">
                    MISI DETEKTIF · KASUS 01
                  </span>

                  <div className="case-illustration">
                    💻 <span>⌨️</span> 🔍
                  </div>

                  <h3>Keyboard laptop tidak merespons</h3>

                  <p>
                    Dina sedang mengerjakan tugas. Keyboard
                    bawaan laptop tidak menghasilkan huruf.
                    Lampu indikator keyboard menyala dan
                    touchpad masih bisa digunakan. Dina mencoba
                    mengetik di aplikasi lain, tetapi tetap tidak
                    berhasil. Saat memakai On-Screen Keyboard,
                    huruf justru muncul di dokumen.
                  </p>

                </div>

                <div className="detective-box">

                  <h3>1. Kumpulkan petunjuk terlebih dahulu</h3>

                  <p>
                    Klik setiap kartu petunjuk. Baca informasi
                    yang ditemukan sebelum menentukan penyebab.
                  </p>

                  <div className="clue-grid">

                    {[
                      {
                        id: "a",
                        icon: "🖱️",
                        t: "Touchpad masih berfungsi",
                        d: "Laptop masih menerima input dari perangkat lain."
                      },
                      {
                        id: "b",
                        icon: "📝",
                        t: "Terjadi di beberapa aplikasi",
                        d: "Gangguan tidak hanya terjadi pada satu aplikasi tertentu."
                      },
                      {
                        id: "c",
                        icon: "⌨️",
                        t: "On-Screen Keyboard berhasil",
                        d: "Aplikasi dan tampilan monitor masih dapat menerima serta menampilkan teks."
                      }
                    ].map((c) => (
                      <button
                        key={c.id}
                        className={
                          clues.includes(c.id)
                            ? "clue-card revealed"
                            : "clue-card"
                        }
                        onClick={() =>
                          setClues((v) =>
                            v.includes(c.id)
                              ? v.filter((id) => id !== c.id)
                              : [...v, c.id]
                          )
                        }
                      >
                        <span>{c.icon}</span>
                        <b>{c.t}</b>

                        <small>
                          {clues.includes(c.id)
                            ? c.d
                            : "Klik untuk membuka petunjuk"}
                        </small>
                      </button>
                    ))}

                  </div>

                  <div className="clue-progress">
                    Petunjuk ditemukan: {clues.length}/3
                  </div>

                  <h3>
                    2. Di bagian mana kemungkinan gangguan terjadi?
                  </h3>

                  <p>
                    Gunakan semua petunjuk untuk memilih dugaan
                    yang paling kuat.
                  </p>

                  <div className="radio-list">

                    {[
                      {
                        v: "hardware",
                        t: "Keyboard bawaan atau koneksinya bermasalah",
                        d: "Input dari keyboard fisik tidak sampai ke sistem."
                      },
                      {
                        v: "os",
                        t: "Sistem operasi mengalami gangguan pada pengelolaan input",
                        d: "Sistem gagal menangani masukan dari perangkat."
                      },
                      {
                        v: "app",
                        t: "Aplikasi pengolah kata mengalami gangguan",
                        d: "Aplikasi tidak menerima atau menampilkan teks."
                      }
                    ].map((o) => (
                      <button
                        key={o.v}
                        className={
                          cause === o.v
                            ? "radio-option selected"
                            : "radio-option"
                        }
                        onClick={() => {
                          setCause(o.v);
                          setTroubleChecked(false);
                        }}
                      >
                        <span className="radio-dot" />

                        <span>
                          <b>{o.t}</b>
                          <small>{o.d}</small>
                        </span>
                      </button>
                    ))}

                  </div>

                  <h3>
                    3. Tentukan langkah pemeriksaan yang paling tepat
                  </h3>

                  <div className="radio-list">

                    {[
                      {
                        v: "hardwarecheck",
                        t: "Coba keyboard eksternal atau periksa kondisi keyboard bawaan."
                      },
                      {
                        v: "oscheck",
                        t: "Periksa pengaturan dan driver keyboard di sistem operasi."
                      },
                      {
                        v: "appcheck",
                        t: "Tutup aplikasi pengolah kata lalu buka kembali."
                      }
                    ].map((o) => (
                      <button
                        key={o.v}
                        className={
                          solution === o.v
                            ? "radio-option selected"
                            : "radio-option"
                        }
                        onClick={() => {
                          setSolution(o.v);
                          setTroubleChecked(false);
                        }}
                      >
                        <span className="radio-dot" />
                        <b>{o.t}</b>
                      </button>
                    ))}

                  </div>
                  
                  <button
                    type="button"
                    className="secondary retry-button"
                    onClick={() => {
                      setCause("");
                      setSolution("");
                      setTroubleChecked(false);
                    }}
                  >
                    <RotateCcw size={15} />
                    Batalkan Pilihan
                  </button>

                  <button
                    className="primary"
                    disabled={
                      !cause ||
                      !solution ||
                      clues.length !== 3
                    }
                    onClick={() => {
                      setTroubleChecked(true);

                      if (
                        cause === "hardware" &&
                        solution === "hardwarecheck"
                      ) {
                        mark("trouble");
                      }
                    }}
                  >
                    Periksa hasil analisis
                  </button>

                  {troubleChecked && (
                    <>
                      <div className="explanation">
                        <CheckCircle2 />

                        <div>
                          <b>
                            {cause === "hardware" &&
                            solution === "hardwarecheck"
                              ? "Analisis kamu tepat!"
                              : "Belum sepenuhnya tepat. Coba evaluasi petunjuknya lagi."}
                          </b>

                          <p>
                            Petunjuk menunjukkan bahwa aplikasi dan monitor
                            masih dapat digunakan karena On-Screen Keyboard
                            berhasil menampilkan teks.

                            Gangguan paling kuat mengarah pada keyboard fisik
                            atau koneksinya. Langkah awal yang masuk akal
                            adalah mencoba keyboard eksternal dan memeriksa
                            kondisi keyboard bawaan.

                            Jika belum berhasil, pemeriksaan driver juga
                            dapat dilakukan.
                          </p>
                        </div>
                      </div>

                      {!(cause === "hardware" && solution === "hardwarecheck") && (
                        <button
                          className="secondary retry-button"
                          onClick={() => {
                            setCause("");
                            setSolution("");
                            setTroubleChecked(false);
                          }}
                        >
                          <RotateCcw size={15} />
                          Coba Lagi
                        </button>
                      )}
                    </>
                  )}

                </div>

                <div className="challenge-case">
                  <div className="challenge-heading">
                    <span className="eyebrow">
                      AKTIVITAS · KASUS TANTANGAN LEVEL 2
                    </span>
                    <h3>
                      Hasil cetakan printer pucat dan kurang jelas
                    </h3>
                    <p>
                      Raka sedang mencetak tugas sekolah. Komputer menunjukkan
                      bahwa dokumen berhasil dikirim dan printer menarik
                      kertas seperti biasa. Namun, hasil cetakan terlihat
                      sangat pucat dan beberapa bagian tulisan tidak
                      tercetak dengan jelas. Raka mencoba mencetak dokumen
                      yang sama sebanyak dua kali, tetapi hasilnya tetap
                      sama. Padahal, kertas sudah terpasang dengan benar
                      dan printer tidak menunjukkan pesan kesalahan.
                    </p>
                  </div>
                  
                  <div className="challenge-clues">
                    <div>
                      <span>🖨️</span>
                      <b>Printer merespons</b>
                      <small>Perintah cetak diterima dan kertas keluar.</small>
                    </div>

                    <div>
                      <span>📄</span>
                      <b>Kertas normal</b>
                      <small>Kertas terpasang dan tidak tersangkut.</small>
                    </div>

                    <div>
                      <span>🔍</span>
                      <b>Hasil cetak pucat</b>
                      <small>Tulisan terlihat pucat dan beberapa bagian tidak tercetak jelas.</small>
                    </div>
                  </div>

                  <h4>
                    Menurutmu, pemeriksaan awal yang paling tepat adalah ...
                  </h4>

                  <div className="radio-list">
                    {[
                      {
                        v: "ink",
                        t: "Memeriksa jumlah tinta printer",
                        d: "Tinta yang hampir habis dapat membuat hasil cetakan terlihat pucat dan kurang jelas."
                      },
                      {
                        v: "keyboard",
                        t: "Mengganti keyboard komputer",
                        d: "Keyboard tidak berhubungan langsung dengan hasil cetakan printer."
                      },
                      {
                        v: "monitor",
                        t: "Mengatur kecerahan monitor",
                        d: "Kecerahan monitor tidak menentukan hasil cetak pada kertas."
                      }
                    ].map((o) => (
                      <button
                        type="button"
                        key={o.v}
                        className={
                          challengeAnswer === o.v
                            ? "radio-option selected"
                            : "radio-option"
                        }
                        onClick={() => {
                          setChallengeAnswer(o.v);
                          setChallengeChecked(false);
                        }}
                      >
                        <span className="radio-dot" />

                        <span>
                          <b>{o.t}</b>
                          <small>{o.d}</small>
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    className="primary"
                    disabled={!challengeAnswer}
                    onClick={() => setChallengeChecked(true)}
                  >
                    Periksa jawaban tantangan
                  </button>

                  {challengeChecked && (
                    <div
                      className={
                        challengeAnswer === "ink"
                          ? "explanation"
                          : "challenge-feedback"
                      }
                    >
                      <CheckCircle2 />

                      <p>
                        <b>
                          {challengeAnswer === "ink"
                            ? "Tepat! Kamu menemukan dugaan yang paling relevan."
                            : "Belum tepat. Coba hubungkan gejala dengan fungsi perangkat output."}
                        </b>

                        <br />

                        Hasil cetakan yang pucat dapat terjadi ketika tinta
                        hampir habis atau print head tersumbat sehingga tinta
                        tidak keluar dengan lancar. Pemeriksaan awal yang
                        sesuai adalah memeriksa jumlah tinta terlebih dahulu.
                        Jika tinta masih cukup, jalankan fitur Head Cleaning
                        melalui pengaturan printer.
                      </p>

                      <button
                        className="secondary retry-button"
                        onClick={() => {
                          setChallengeAnswer("");
                          setChallengeChecked(false);
                        }}
                      >
                        <RotateCcw size={15} />
                        Ulangi Tantangan
                      </button>
                    </div>
                  )}
                </div>

                <div className="reasoning-guide">
                  <b>🕵️ Cara berpikir seorang detektif komputer</b>

                  <ol>
                    <li>Perhatikan gejala yang benar-benar terjadi.</li>
                    <li>Bandingkan perangkat mana yang masih berfungsi dan mana yang bermasalah.</li>
                    <li>Singkirkan dugaan yang tidak sesuai dengan petunjuk.</li>
                    <li>Pilih pemeriksaan awal yang paling relevan sebelum menyimpulkan kerusakan.</li>
                  </ol>
                </div>

                <section className="lkpd-workspace">

                  <div className="lkpd-heading">
                    <div>
                      <span className="eyebrow">LEMBAR KERJA DIGITAL</span>
                      <h3>Isi LKPD bersama kelompokmu</h3>
                      <p>
                        Masukkan identitas kelompok dan hasil diskusi
                        pada setiap kolom. Jawaban tersimpan otomatis
                        di browser ini.
                      </p>
                    </div>

                    <div className="save-indicator">
                      <span className="save-dot" />
                      {savedAt
                        ? `Tersimpan otomatis · ${savedAt}`
                        : "Menyiapkan penyimpanan..."}
                    </div>
                  </div>

                  <div className="lkpd-identity">

                    <label>
                      Nama kelompok
                      <input
                        value={lkpd.groupName}
                        onChange={(e) => updateLkpd("groupName", e.target.value)}
                        placeholder="Contoh: Kelompok 3"
                      />
                    </label>

                    <label>
                      Kelas
                      <input
                        value={lkpd.className}
                        onChange={(e) => updateLkpd("className", e.target.value)}
                        placeholder="Contoh: X-2"
                      />
                    </label>

                    <label className="members-field">
                      Nama anggota kelompok
                      <textarea
                        value={lkpd.members}
                        onChange={(e) => updateLkpd("members", e.target.value)}
                        rows={2}
                        placeholder="Tuliskan nama anggota, pisahkan dengan koma atau baris baru..."
                      />
                    </label>

                  </div>

                  <div className="lkpd-case-form">

                    <div className="lkpd-case-title">
                      <span>⌨️</span>
                      <div>
                        <b>Aktivitas 1 · Kasus keyboard</b>
                        <small>Keyboard laptop Dina tidak merespons.</small>
                      </div>
                    </div>

                    <div className="lkpd-question">
                      <label>Kemungkinan penyebab pertama</label>
                      <textarea
                        rows={2}
                        value={lkpd.keyboardCause1}
                        onChange={(e) => updateLkpd("keyboardCause1", e.target.value)}
                        placeholder="Menurut kelompok kami, penyebab pertama adalah..."
                      />
                    </div>

                    <div className="lkpd-question">
                      <label>Kemungkinan penyebab kedua</label>
                      <textarea
                        rows={2}
                        value={lkpd.keyboardCause2}
                        onChange={(e) => updateLkpd("keyboardCause2", e.target.value)}
                        placeholder="Kemungkinan lainnya adalah..."
                      />
                    </div>

                    <div className="lkpd-question-grid">

                      <div className="lkpd-question">
                        <label>Langkah penanganan pertama</label>
                        <textarea
                          rows={3}
                          value={lkpd.keyboardAction1}
                          onChange={(e) => updateLkpd("keyboardAction1", e.target.value)}
                          placeholder="Pemeriksaan atau tindakan yang dapat dilakukan..."
                        />
                      </div>

                      <div className="lkpd-question">
                        <label>Langkah penanganan kedua</label>
                        <textarea
                          rows={3}
                          value={lkpd.keyboardAction2}
                          onChange={(e) => updateLkpd("keyboardAction2", e.target.value)}
                          placeholder="Langkah alternatif..."
                        />
                      </div>

                    </div>

                    <div className="lkpd-question">
                      <label>Petunjuk yang menjadi dasar analisis</label>
                      <textarea
                        rows={3}
                        value={lkpd.keyboardEvidence}
                        onChange={(e) => updateLkpd("keyboardEvidence", e.target.value)}
                        placeholder="Tuliskan bukti dari skenario yang mendukung dugaan kelompok..."
                      />
                    </div>

                    <div className="lkpd-question">
                      <label>Kesimpulan kelompok</label>
                      <textarea
                        rows={3}
                        value={lkpd.keyboardConclusion}
                        onChange={(e) => updateLkpd("keyboardConclusion", e.target.value)}
                        placeholder="Jelaskan penyebab yang paling mungkin dan alasan kelompok..."
                      />
                    </div>

                  </div>

                  <div className="lkpd-case-form">

                    <div className="lkpd-case-title">
                      <span>🖨️</span>
                      <div>
                        <b>Aktivitas 2 · Kasus printer</b>
                        <small>Hasil cetakan Raka terlihat pucat dan kurang jelas.</small>
                      </div>
                    </div>

                    <div className="lkpd-question">
                      <label>Kemungkinan penyebab pertama</label>
                      <textarea
                        rows={2}
                        value={lkpd.printerCause1}
                        onChange={(e) => updateLkpd("printerCause1", e.target.value)}
                        placeholder="Menurut kelompok kami, penyebab pertama adalah..."
                      />
                    </div>

                    <div className="lkpd-question">
                      <label>Kemungkinan penyebab kedua</label>
                      <textarea
                        rows={2}
                        value={lkpd.printerCause2}
                        onChange={(e) => updateLkpd("printerCause2", e.target.value)}
                        placeholder="Kemungkinan lainnya adalah..."
                      />
                    </div>

                    <div className="lkpd-question-grid">

                      <div className="lkpd-question">
                        <label>Langkah penanganan pertama</label>
                        <textarea
                          rows={3}
                          value={lkpd.printerAction1}
                          onChange={(e) => updateLkpd("printerAction1", e.target.value)}
                          placeholder="Pemeriksaan atau tindakan yang dapat dilakukan..."
                        />
                      </div>

                      <div className="lkpd-question">
                        <label>Langkah penanganan kedua</label>
                        <textarea
                          rows={3}
                          value={lkpd.printerAction2}
                          onChange={(e) => updateLkpd("printerAction2", e.target.value)}
                          placeholder="Langkah alternatif..."
                        />
                      </div>

                    </div>

                    <div className="lkpd-question">
                      <label>Petunjuk yang menjadi dasar analisis</label>
                      <textarea
                        rows={3}
                        value={lkpd.printerEvidence}
                        onChange={(e) => updateLkpd("printerEvidence", e.target.value)}
                        placeholder="Tuliskan bukti dari skenario yang mendukung dugaan kelompok..."
                      />
                    </div>

                    <div className="lkpd-question">
                      <label>Kesimpulan kelompok</label>
                      <textarea
                        rows={3}
                        value={lkpd.printerConclusion}
                        onChange={(e) => updateLkpd("printerConclusion", e.target.value)}
                        placeholder="Jelaskan penyebab yang paling mungkin dan alasan kelompok..."
                      />
                    </div>

                  </div>

                  <div className="lkpd-export">

                    <div className="export-copy">
                      <span className="eyebrow">HASIL DISKUSI</span>
                      <h3>Ubah jawaban menjadi presentasi</h3>
                      <p>
                        Setelah seluruh identitas dan jawaban terisi,
                        buat PPT otomatis berisi sampul, ringkasan,
                        analisis kedua kasus, bukti, kesimpulan,
                        dan slide penutup.
                      </p>

                      <div className="completion-count">
                        {requiredLkpdFields.filter(
                          (field) => String(lkpd[field] || "").trim()
                        ).length} dari {requiredLkpdFields.length} bagian terisi
                      </div>
                    </div>

                    <button
                      className="primary export-button"
                      disabled={!isLkpdComplete || pptGenerating}
                      onClick={createPresentation}
                    >
                      {pptGenerating
                        ? "Sedang membuat PPT..."
                        : "✨ Buat PPT dari jawaban LKPD"}
                    </button>

                    {!isLkpdComplete && (
                      <small className="export-note">
                        Lengkapi identitas dan semua kolom jawaban
                        untuk mengaktifkan tombol PPT.
                      </small>
                    )}

                    {isLkpdComplete && (
                      <small className="export-note">
                        Jawaban lengkap. PPT siap dibuat dan akan
                        diunduh dalam format .pptx.
                      </small>
                    )}

                  </div>
                </section>
              </>
            )}
            {/* halaman umpan balik */}
            {page === "feedback" && (
              <section className="feedback-page">

                <SectionTitle
                  eyebrow="HASIL PEMBELAJARAN · PETUALANGAN I/O"
                  title="Yuk, lihat hasil diskusimu!"
                  desc="Berikut umpan balik untuk jawaban kelompokmu. Perhatikan bagian yang sudah tepat dan bagian yang masih perlu diperbaiki."
                />

                <div className="feedback-summary">
                  <div className="feedback-icon">🌸</div>
                  <h3>Terima kasih sudah menyelesaikan LKPD!</h3>
                  <p>
                    Jawaban kelompokmu sudah tersimpan.
                    Yuk, perhatikan umpan balik berikut untuk
                    memahami materi lebih baik.
                  </p>

                  <div className="feedback-counts">
                    <span>
                      ✓ {feedbackItems.filter(
                        item => evaluateAnswer(item.field) === "Benar"
                      ).length} Benar
                    </span>

                    <span>
                      ! {feedbackItems.filter(
                        item => evaluateAnswer(item.field) === "Kurang tepat"
                      ).length} Kurang tepat
                    </span>

                    <span>
                      ↻ {feedbackItems.filter(
                        item => evaluateAnswer(item.field) === "Perlu diperbaiki"
                      ).length} Perlu diperbaiki
                    </span>
                  </div>
                </div>

                <div className="feedback-list">
                  {feedbackItems.map((item, index) => {
                    const status = evaluateAnswer(item.field);

                    return (
                      <div className="feedback-item" key={item.field}>

                        <div className="feedback-item-heading">
                          <b>{index + 1}. {item.label}</b>

                          <span className={`feedback-status ${
                            status === "Benar"
                              ? "status-correct"
                              : status === "Kurang tepat"
                              ? "status-partial"
                              : "status-wrong"
                          }`}>
                            {status}
                          </span>
                        </div>

                        <p className="feedback-answer">
                          <b>Jawaban kelompok:</b><br />
                          {lkpd[item.field]}
                        </p>

                        <p className="feedback-message">
                          {status === "Benar"
                            ? "Bagus! Jawabanmu sudah memuat konsep penting yang sesuai dengan permasalahan."
                            : status === "Kurang tepat"
                            ? "Jawabanmu sudah mengarah ke konsep yang benar. Coba lengkapi penjelasan dan hubungkan dengan petunjuk pada kasus."
                            : "Jawabanmu masih perlu diperbaiki. Pelajari kembali materi dan perhatikan gejala yang muncul pada kasus."}
                        </p>

                      </div>
                    );
                  })}
                </div>

                <div className="feedback-footer">
                  <button
                    className="secondary"
                    onClick={() => {
                      setPage("trouble");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <ChevronLeft size={16} />
                    Perbaiki Jawaban
                  </button>

                  <button
                    className="primary"
                    onClick={() => {
                      setPage("trouble");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Kembali ke LKPD
                    <ChevronRight size={16} />
                  </button>
                </div>

              </section>
            )}

            {/* ==================================
                NAVIGASI BAWAH
            ================================== */}

            <div className="bottom-nav">

              <button
                className="secondary"
                onClick={() => {
                  if (page === "feedback") {
                    setPage("trouble");
                  } else {
                    go(
                      navItems[
                        Math.max(
                          0,
                          navItems.findIndex((n) => n.id === page) - 1
                        )
                      ].id
                    );
                  }
                }}
              >
                <ChevronLeft size={16} />
                Bagian sebelumnya
              </button>
              
              {page === "trouble" ? (
                <button
                  className="primary"
                  onClick={saveLkpdAnswers}
                  disabled={!isLkpdComplete}
                >
                  Simpan Jawaban
                  <ChevronRight size={16} />
                </button>
              ) : page !== "feedback" ? (
                <button
                  className="primary"
                  onClick={nextPage}
                >
                  Bagian berikutnya
                  <ChevronRight size={16} />
                </button>
              ) : null}


            </div>

          </section>
        </div>

      </main>

      <footer>
        <span>✿ Petualangan I/O</span>
        <span>Dibuat untuk belajar dengan ceria ♡</span>
      </footer>

    </div>
  );
}

export default App;