let currentLang = "id";

const translations = {
    id: {
        title: "PawLove",
        subtitle: "Shelter Anjing & Kucing",
        "nav-home": "Beranda",
        "nav-adopt": "Adopsi",
        "nav-donate": "Donasi",
        "nav-about": "Tentang Kami",
        admin: "Admin",
        "donate-btn": "DONASI",
        "hero-title": "Setiap Hewan\nBerhak Bahagia",
        "hero-desc": "PawLove Shelter — memberikan rumah aman dan kasih sayang bagi anjing dan kucing yang membutuhkan.",
        "adopt-button": "Lihat Hewan Siap Adopsi",
        "help-button": "Bantu Kami",
        "adopt-section": "Hewan Siap Adopsi",
        all: "Semua",
        dogs: "🐶 Anjing",
        cats: "🐱 Kucing",
        "donate-title": "Bantu Kami Memberi Mereka Kehidupan yang Lebih Baik",
        "donate-desc": "Setiap donasi Anda sangat berarti untuk makanan, pengobatan, dan perawatan hewan-hewan kami.",
        "donate-now": "DONASI SEKARANG",
        "about-title": "Kami Menyelamatkan dan Memberi Harapan Baru",
        "about-desc": "PawLove Shelter didirikan untuk melindungi anjing dan kucing jalanan yang terlantar, terluka, atau membutuhkan rumah baru yang penuh kasih sayang.",
        "add-pet": "Tambah Hewan Baru",
        close: "Tutup"
    },
    en: {
        title: "PawLove",
        subtitle: "Dog & Cat Shelter",
        "nav-home": "Home",
        "nav-adopt": "Adopt",
        "nav-donate": "Donate",
        "nav-about": "About Us",
        admin: "Admin",
        "donate-btn": "DONATE",
        "hero-title": "Every Animal\nDeserves Happiness",
        "hero-desc": "PawLove Shelter — providing a safe home and love for dogs and cats in need.",
        "adopt-button": "See Animals Ready for Adoption",
        "help-button": "Help Us",
        "adopt-section": "Animals Ready for Adoption",
        all: "All",
        dogs: "🐶 Dogs",
        cats: "🐱 Cats",
        "donate-title": "Help Us Give Them a Better Life",
        "donate-desc": "Every donation helps provide food, medicine, and care for our animals.",
        "donate-now": "DONATE NOW",
        "about-title": "We Rescue and Give New Hope",
        "about-desc": "PawLove Shelter was founded to protect stray, injured, or abandoned dogs and cats who need a loving forever home.",
        "add-pet": "Add New Animal",
        close: "Close"
    }
};

let pets = [
    { id:1, name:"Milo", type:"dog", age:{id:"2 tahun", en:"2 years"}, breed:{id:"Golden Retriever Mix", en:"Golden Retriever Mix"}, image:"golden.jpg", gender:{id:"Jantan", en:"Male"}, desc:{id:"Sangat ramah, suka bermain, dan cocok untuk keluarga.", en:"Very friendly, loves to play, great with families."} },
    { id:2, name:"Luna", type:"cat", age:{id:"1 tahun", en:"1 year"}, breed:{id:"Persia Putih", en:"White Persian"}, image:"persia putih.jpg", gender:{id:"Betina", en:"Female"}, desc:{id:"Tenang, suka dipeluk, dan sangat manja.", en:"Calm, loves cuddles, and very affectionate."} },
    { id:3, name:"Rocky", type:"dog", age:{id:"3 tahun", en:"3 years"}, breed:{id:"Husky Sibir", en:"Siberian Husky"}, image:"husky.jpg", gender:{id:"Jantan", en:"Male"}, desc:{id:"Energik dan butuh ruang untuk berlari.", en:"Energetic and needs space to run."} },
    { id:4, name:"Nala", type:"cat", age:{id:"8 bulan", en:"8 months"}, breed:{id:"Calico", en:"Calico"}, image:"calico cat.jpg", gender:{id:"Betina", en:"Female"}, desc:{id:"Penuh rasa ingin tahu dan aktif.", en:"Curious and very playful."} }
];

function translatePage(lang) {
    currentLang = lang;
    document.getElementById("current-lang").textContent = lang.toUpperCase();

    document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });

    renderPets(pets);
}

function toggleLanguage() {
    const newLang = currentLang === "id" ? "en" : "id";
    translatePage(newLang);
}

// Render Pets
function renderPets(filteredPets) {
    const container = document.getElementById('pet-grid');
    container.innerHTML = '';

    filteredPets.forEach(pet => {
        const card = document.createElement('div');
        card.className = `pet-card bg-white rounded-3xl overflow-hidden shadow-lg card-hover cursor-pointer`;
        card.innerHTML = `
            <div class="relative">
                <img src="${pet.image}" class="w-full h-64 object-cover">
                <div class="absolute top-4 right-4 bg-white px-3 py-1 rounded-2xl text-sm font-medium shadow">${pet.gender[currentLang]}</div>
            </div>
            <div class="p-6">
                <div class="flex justify-between">
                    <div>
                        <h3 class="text-2xl font-bold">${pet.name}</h3>
                        <p class="text-orange-500">${pet.breed[currentLang]} • ${pet.age[currentLang]}</p>
                    </div>
                    <span class="text-4xl">${pet.type === 'dog' ? '🐶' : '🐱'}</span>
                </div>
                <p class="mt-4 text-zinc-600 text-sm clamp-2">${pet.desc[currentLang]}</p>
                <button onclick="adoptPet(${pet.id}); event.stopImmediatePropagation()" class="mt-6 w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-2xl">
                    ${currentLang === 'id' ? 'ADOPSI SEKARANG' : 'ADOPT NOW'}
                </button>
            </div>
        `;
        card.onclick = () => showPetDetail(pet);
        container.appendChild(card);
    });
}

function filterPets(type) {
    document.querySelectorAll('#filter-all, #filter-dog, #filter-cat').forEach(b => b.classList.remove('border-orange-500', 'bg-orange-50'));
    
    if (type === 'all') document.getElementById('filter-all').classList.add('border-orange-500', 'bg-orange-50');
    else if (type === 'dog') document.getElementById('filter-dog').classList.add('border-orange-500', 'bg-orange-50');
    else document.getElementById('filter-cat').classList.add('border-orange-500', 'bg-orange-50');

    renderPets(type === 'all' ? pets : pets.filter(p => p.type === type));
}

function showPetDetail(pet) {
    alert(`🐾 ${pet.name}\n${pet.breed[currentLang]} • ${pet.age[currentLang]}\n${pet.gender[currentLang]}\n\n${pet.desc[currentLang]}`);
}

function adoptPet(id) {
    const pet = pets.find(p => p.id === id);
    if (pet) alert(`Terima kasih! Tim kami akan menghubungi Anda untuk adopsi ${pet.name}.`);
}

function addNewPet() {
    const name = document.getElementById('new-pet-name').value || "Hewan Baru";
    const type = document.getElementById('new-pet-type').value;
    const age = document.getElementById('new-pet-age').value || "1 tahun";

    pets.unshift({
        id: Date.now(),
        name: name,
        type: type,
        age: {id: age, en: age + " old"},
        breed: {id: "Mix Breed", en: "Mix Breed"},
        image: `https://www.pexels.com/id-id/pencarian/anjing%20dan%20kucing/${Math.floor(Math.random()*900)}/600/400`,
        gender: {id: "Belum diketahui", en: "Unknown"},
        desc: {id: "Baru ditambahkan", en: "Recently added"}
    });
    renderPets(pets);
    alert(name + " berhasil ditambahkan!");
}

function selectAmount(n) { document.getElementById('custom-amount').value = n; }
function donateNow() {
    const val = document.getElementById('custom-amount').value;
    if (val) alert("Terima kasih atas donasi Rp" + parseInt(val).toLocaleString('id-ID') + " ❤️");
}

function toggleAdmin() {
    document.getElementById('admin-modal').classList.toggle('hidden');
}

// Initialize
window.onload = () => {
    renderPets(pets);
    translatePage("id");
    console.log('%cPawLove Shelter Ready with Translation 🐾', 'color:#f97316;font-weight:bold');
};