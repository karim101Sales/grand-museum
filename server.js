const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database Setup
const dbPath = '/tmp/museum.db';
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initializeDatabase();
    }
});

// Initialize Database and Seed Data
function initializeDatabase() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS monuments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            era TEXT,
            location TEXT,
            discovered TEXT,
            shortDescription TEXT,
            description TEXT,
            image TEXT,
            features TEXT,
            status TEXT DEFAULT 'published',
            views INTEGER DEFAULT 0,
            favorites INTEGER DEFAULT 0
        )`);

        db.get("SELECT count(*) as count FROM monuments", (err, row) => {
            if (err) {
                console.error(err.message);
                return;
            }
            if (row.count === 0) {
                console.log('Seeding database...');
                seedData();
            }
        });
    });
}

function seedData() {
    const monuments = [
        {
            name: "Statue of Ramses II",
            era: "13th century BC",
            location: "Memphis",
            discovered: "1820",
            shortDescription: "A colossal statue of one of Egypt's most powerful pharaohs.",
            description: "This magnificent statue depicts Ramses II, one of ancient Egypt's most powerful and celebrated pharaohs. Standing at over 10 meters tall, the statue was originally located at the Great Temple of Ptah in Memphis. It showcases the exceptional craftsmanship of New Kingdom sculptors and provides valuable insights into royal portraiture of the period.",
            image: "images/146991_1.jpg",
            features: ["Over 10 meters tall", "Made of red granite", "Detailed hieroglyphic inscriptions", "Well-preserved facial features"],
            status: "published",
            views: 1542,
            favorites: 87
        },
        {
            name: "Golden Mask of Tutankhamun",
            era: "New Kingdom",
            location: "Valley of the Kings",
            discovered: "1922",
            shortDescription: "The iconic golden funeral mask of the boy pharaoh.",
            description: "The Golden Mask of Tutankhamun is perhaps the most famous artifact from ancient Egypt. Discovered by Howard Carter in 1922, this exquisite mask covered the head of the mummified king. Made of solid gold and inlaid with semi-precious stones and colored glass, it represents the pinnacle of ancient Egyptian goldsmithing.",
            image: "images/i.jpg",
            features: ["Made of solid gold", "Inlaid with lapis lazuli", "Weighs 10.23 kg", "Height: 54 cm"],
            status: "published",
            views: 2895,
            favorites: 203
        },
        {
            name: "Rosetta Stone",
            era: "Ptolemaic Period",
            location: "Rashid (Rosetta)",
            discovered: "1799",
            shortDescription: "The key that unlocked the mystery of Egyptian hieroglyphs.",
            description: "The Rosetta Stone is a granodiorite stele inscribed with three versions of a decree issued in Memphis, Egypt, in 196 BC. The top and middle texts are in Ancient Egyptian using hieroglyphic and Demotic scripts respectively, while the bottom is in Ancient Greek. The discovery of the stone was crucial to the modern understanding of Egyptian hieroglyphs.",
            image: "images/rosettastone.jpg",
            features: ["Three scripts: Hieroglyphs, Demotic, Greek", "Key to deciphering hieroglyphs", "Dated to 196 BC", "Height: 112 cm"],
            status: "published",
            views: 5421,
            favorites: 421
        },
        {
            name: "Narmer Palette",
            era: "Early Dynastic Period",
            location: "Hierakonpolis",
            discovered: "1897-1898",
            shortDescription: "One of the earliest historical records from ancient Egypt.",
            description: "The Narmer Palette is a significant Egyptian archaeological find, dating from about the 31st century BC. It contains some of the earliest hieroglyphic inscriptions ever found. The tablet is thought by some to depict the unification of Upper and Lower Egypt under King Narmer, who is shown wearing both the white crown of Upper Egypt and the red crown of Lower Egypt.",
            image: "images/250px-Narmer_Palette_smiting_side.jpg",
            features: ["Carved from siltstone", "Dated to c. 3100 BC", "Early hieroglyphic inscriptions", "Depicts unification of Egypt"],
            status: "draft",
            views: 876,
            favorites: 54
        },
        {
            name: "Bust of Nefertiti",
            era: "New Kingdom",
            location: "Amarna",
            discovered: "1912",
            shortDescription: "The iconic bust of the Great Royal Wife of Akhenaten.",
            description: "The Bust of Nefertiti is one of the most famous works of art from ancient Egypt. Nefertiti was the Great Royal Wife of the Egyptian Pharaoh Akhenaten. The bust is notable for exemplifying the understanding ancient Egyptians had regarding realistic facial proportions. It remains an icon of feminine beauty and power from the ancient world.",
            image: "images/Nefertiti-Bust.jpg",
            features: ["Painted limestone bust", "Height: 48 cm", "Well-preserved colors", "Symmetric features"],
            status: "published",
            views: 3210,
            favorites: 298
        },
        {
            name: "Sphinx of Hatshepsut",
            era: "New Kingdom",
            location: "Deir el-Bahari",
            discovered: "1920s",
            shortDescription: "A sphinx depicting the female pharaoh Hatshepsut.",
            description: "This sphinx represents the female pharaoh Hatshepsut, who ruled Egypt during the 18th Dynasty. Unlike traditional sphinxes that have a lion's body with a king's head, this one combines a lion's body with Hatshepsut's head, complete with the royal false beard and nemes headdress. The statue was part of her extensive building program at Deir el-Bahari.",
            image: "images/DP-24216-003.jpg",
            features: ["Made of granite", "Female pharaoh depiction", "False beard symbolizing power", "From Deir el-Bahari temple"],
            status: "published",
            views: 1876,
            favorites: 132
        },
        {
            name: "Pharaoh Akhenaten",
            era: "New Kingdom",
            location: "modern-day Amarna, Middle Egypt.",
            discovered: "late 19th century",
            shortDescription: "Akhenaten was a revolutionary pharaoh known for introducing monotheism in Egypt, worshiping one god — the Aten (the Sun Disk) — and changing art, religion, and culture dramatically during his reign.",
            description: "Pharaoh Akhenaten, originally named Amenhotep IV, was a ruler of Egypt’s 18th Dynasty who broke centuries of traditional Egyptian religion. He shifted worship from the many gods of Egypt to focus solely on Aten",
            image: "images/Akhenaten-903362574-3b329d6-e1708959199110.jpg",
            features: ["Made of granite", "Female pharaoh depiction", "False beard symbolizing power", "From Deir el-Bahari temple"],
            status: "published",
            views: 1876,
            favorites: 132
        },
        {
            name: "Senwosret I",
            era: "Middle Kingdom of Ancient Egypt",
            location: "Located in Lisht, Karnak, and Heliopolis",
            discovered: "In the early 20th century.",
            shortDescription: "Senusret I was one of the most powerful kings of the 12th Dynasty, known for strengthening Egypt’s unity",
            description: "Senusret I, son of Amenemhat I, ruled during Egypt’s Middle Kingdom and played a key role in restoring stability after his father’s assassination. He expanded Egypt’s influence into Nubia and Libya.",
            image: "images/Senwosret_I_(ca._1878-1839_BCE)_wearing_the_red_crown_of_Lower_Egypt,_Lisht.jpg",
            features: ["Made of granite", "Female pharaoh depiction", "False beard symbolizing power", "From Deir el-Bahari temple"],
            status: "published",
            views: 1876,
            favorites: 132
        },
        {
            name: "Mummy mask man cartonnage gold",
            era: "Late Period to Ptolemaic Period of Ancient Egypt",
            location: "Egypt, often found in burial sites such as Thebes, Saqqara, or Faiyum",
            discovered: "19th and early 20th centuries",
            shortDescription: "A funerary mask made of cartonnage (layers of linen and plaster), covered with gold leaf",
            description: "This type of mummy mask was placed over the face of the wrapped mummy. The cartonnage—a material made from layers of linen or papyrus soaked in plaster—was molded to fit the face and upper chest",
            image: "images/Mummy_mask_man_cartonnage_gold_Manchester_Museum_Ptolemaic_Lahun_AN_2121.jpg",
            features: ["Made of granite", "Female pharaoh depiction", "False beard symbolizing power", "From Deir el-Bahari temple"],
            status: "published",
            views: 1876,
            favorites: 132
        }
    ];

    const stmt = db.prepare("INSERT INTO monuments (name, era, location, discovered, shortDescription, description, image, features, status, views, favorites) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    monuments.forEach(monument => {
        stmt.run(
            monument.name,
            monument.era,
            monument.location,
            monument.discovered,
            monument.shortDescription,
            monument.description,
            monument.image,
            JSON.stringify(monument.features),
            monument.status,
            monument.views,
            monument.favorites
        );
    });

    stmt.finalize();
    console.log("Database seeded successfully.");
}

// API Routes

// GET /api/monuments - Get all monuments
app.get('/api/monuments', (req, res) => {
    db.all("SELECT * FROM monuments", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // Parse features JSON string back to array
        const monuments = rows.map(row => ({
            ...row,
            features: JSON.parse(row.features)
        }));
        res.json(monuments);
    });
});

// POST /api/monuments - Add a new monument
app.post('/api/monuments', (req, res) => {
    const { name, era, location, discovered, shortDescription, description, image, features, status, views, favorites } = req.body;

    const sql = "INSERT INTO monuments (name, era, location, discovered, shortDescription, description, image, features, status, views, favorites) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const params = [
        name,
        era,
        location,
        discovered,
        shortDescription,
        description,
        image,
        JSON.stringify(features || []),
        status || 'published',
        views || 0,
        favorites || 0
    ];

    db.run(sql, params, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "Monument added successfully",
            data: { id: this.lastID, ...req.body }
        });
    });
});

// PUT /api/monuments/:id - Update a monument
app.put('/api/monuments/:id', (req, res) => {
    const { name, era, location, discovered, shortDescription, description, image, features, status, views, favorites } = req.body;
    const id = req.params.id;

    const sql = `UPDATE monuments SET
        name = ?,
        era = ?,
        location = ?,
        discovered = ?,
        shortDescription = ?,
        description = ?,
        image = ?,
        features = ?,
        status = ?,
        views = ?,
        favorites = ?
        WHERE id = ?`;

    const params = [
        name,
        era,
        location,
        discovered,
        shortDescription,
        description,
        image,
        JSON.stringify(features || []),
        status,
        views,
        favorites,
        id
    ];

    db.run(sql, params, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "Monument updated successfully",
            changes: this.changes
        });
    });
});

// DELETE /api/monuments/:id - Delete a monument
app.delete('/api/monuments/:id', (req, res) => {
    const sql = "DELETE FROM monuments WHERE id = ?";
    db.run(sql, req.params.id, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: "Monument deleted successfully", changes: this.changes });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
