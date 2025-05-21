// Soul TV - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize global components
    initializeNavigation();
    initializeSliders(); // Üfüqi sürüşdürmə və potensial hero banner üçün
    initializeProfileDropdown();
    initializeModals(); // Ümumi modal bağlama düymələri üçün
    initializeLogoutButton(); 

    // Initialize page-specific components
    // Bu funksiyalar içəridə hansı səhifədə olduqlarını yoxlayacaqlar
    initializeVideoPlayers();     // index.html və dinamik yüklənən məzmun üçün
    initializeLiveTV();           // index.html və dinamik yüklənən məzmun üçün
    initializeSearch();           // Axtarış funksionallığını işə salır (əsasən header-dədir)
    initializeCategoryFilters();  // Kateqoriya filterlərini işə salır (index.html-dəki kateqoriyalar üçün)
    
    initializeMoviesPage();       // movies.html üçün
    initializeSeriesPage();       // series.html üçün
    initializeNewReleasesPage();  // new_releases.html üçün
    initializeLiveTvPage();       // live_tv.html üçün
    initializeProfilePage();      // profile.html üçün
    initializeListsPage();        // lists.html üçün
    initializeSettingsPage();     // settings.html üçün
});

// --- Mock Data (Nümunə Məlumatlar) ---
const MOCK_MOVIES_DATA = [
    { videoId: "movie001", title: "Qaranlıq Dəhlizlər", description: "Sirli bir malikanədə baş verən hadisələr və ailə sirləri açılır.", year: 2024, genre: "Triller", imageUrl: "https://via.placeholder.com/300x169/8B0000/FFFFFF?text=Qaranlıq+Dəhlizlər" },
    { videoId: "movie002", title: "Son Səyahət", description: "Fərqli bir planetə məcburi eniş edən kosmonavtların sağ qalma mübarizəsi.", year: 2023, genre: "Fantastika", imageUrl: "https://via.placeholder.com/300x169/2E8B57/FFFFFF?text=Son+Səyahət" },
    { videoId: "movie003", title: "Gülüş Ustası", description: "Məşhur bir komediyaçının səhnə arxası həyatı və çətinlikləri.", year: 2024, genre: "Komediya", imageUrl: "https://via.placeholder.com/300x169/FFD700/000000?text=Gülüş+Ustası" },
    { videoId: "movie004", title: "Unudulmuş Xəzinə", description: "Macəraçı bir arxeoloqun qədim sivilizasiyaya aid xəzinəni axtarışı.", year: 2022, genre: "Macəra", imageUrl: "https://via.placeholder.com/300x169/DAA520/FFFFFF?text=Unudulmuş+Xəzinə" },
    { videoId: "movie005", title: "Dağların Səsi", description: "Ucqar bir dağ kəndində yaşayan insanların təbiətlə harmoniyası və müasir dünyanın təzyiqləri.", year: 2023, genre: "Dram", imageUrl: "https://via.placeholder.com/300x169/4682B4/FFFFFF?text=Dağların+Səsi" },
    { videoId: "movie006", title: "Kosmik Odisseya", description: "Bəşəriyyətin gələcəyini dəyişəcək bir kəşf üçün ulduzlararası səyahət.", year: 2024, genre: "Fantastika", imageUrl: "https://via.placeholder.com/300x169/4B0082/FFFFFF?text=Kosmik+Odisseya" }
];
const MOCK_SERIES_DATA = [
    { videoId: "series001", title: "Taxt Oyunları Klonu", description: "Krallıqlar arası epik mübarizə və intriqalar.", year: 2023, genre: "Fantastika", seasons: 3, imageUrl: "https://via.placeholder.com/300x169/6A0DAD/FFFFFF?text=Serial+1" },
    { videoId: "series002", title: "Ofis Həyatı", description: "Bir ofisdə çalışan qəribə personajların gündəlik macəraları.", year: 2024, genre: "Komediya", seasons: 2, imageUrl: "https://via.placeholder.com/300x169/FF8C00/FFFFFF?text=Serial+2" },
    { videoId: "series003", title: "Cinayət Laboratoriyası", description: "Mürəkkəb cinayət işlərini araşdıran dahi bir detektiv qrupu.", year: 2022, genre: "Triller", seasons: 4, imageUrl: "https://via.placeholder.com/300x169/2F4F4F/FFFFFF?text=Serial+3" }
];
const MOCK_NEW_RELEASES_DATA = [
    { videoId: "new001", type: "movie", title: "Yeni Çıxan Film: Üfüq", description: "Gələcəkdə insanlığın yeni bir ümid axtarışı.", year: 2025, genre: "Fantastika", imageUrl: "https://via.placeholder.com/300x169/FF6347/FFFFFF?text=Yeni+Film+Üfüq" },
    { videoId: "new002", type: "series", title: "Yeni Serial: Bağlı Qapılar", description: "Kiçik bir qəsəbədəki böyük sirlər.", year: 2025, genre: "Triller", seasons: 1, imageUrl: "https://via.placeholder.com/300x169/4682B4/FFFFFF?text=Yeni+Serial+Bağlı+Qapılar" },
    MOCK_MOVIES_DATA[0], MOCK_SERIES_DATA[1]
].filter((value, index, self) => index === self.findIndex((t) => (t.videoId === value.videoId)));

const MOCK_LIVE_CHANNELS_DATA = [
    { channelId: "live_ch_01", name: "Soul Xəbər HD", logoUrl: "https://via.placeholder.com/400x225/DC143C/FFFFFF?text=SOUL+Xəbər", currentProgram: "Günün İcmalı", streamUrl: "#placeholder_stream_1" },
    { channelId: "live_ch_02", name: "Soul Musiqi Plus", logoUrl: "https://via.placeholder.com/400x225/20B2AA/FFFFFF?text=SOUL+Musiqi", currentProgram: "Hit Parad", streamUrl: "#placeholder_stream_2" },
    { channelId: "live_ch_03", name: "Soul İdman 1", logoUrl: "https://via.placeholder.com/400x225/32CD32/000000?text=SOUL+İdman", currentProgram: "Futbol Turu: Canlı", streamUrl: "#placeholder_stream_3" }
];

// --- Global Initializers ---
function initializeNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    }
}

function initializeSliders() {
    const heroBanners = document.querySelectorAll('.hero-banner');
    let currentBanner = 0;
    if (heroBanners.length > 1) {
        heroBanners[currentBanner]?.classList.add('active');
        setInterval(() => {
            heroBanners[currentBanner]?.classList.remove('active');
            currentBanner = (currentBanner + 1) % heroBanners.length;
            heroBanners[currentBanner]?.classList.add('active');
        }, 5000);
    }
    const scrollContainers = document.querySelectorAll('.categories, .row-items-scroll');
    scrollContainers.forEach(container => {
        const parent = container.parentNode;
        let scrollWrapper = parent.classList.contains('categories-wrapper') || parent.classList.contains('row-items-wrapper') ? parent : null;
        if (!scrollWrapper) {
            scrollWrapper = document.createElement('div');
            if (container.classList.contains('categories')) scrollWrapper.className = 'categories-wrapper';
            else if (container.classList.contains('row-items-scroll')) scrollWrapper.className = 'row-items-wrapper';
            parent.insertBefore(scrollWrapper, container);
            scrollWrapper.appendChild(container);
        }
        if (scrollWrapper.querySelector('.scroll-btn.scroll-left')) return;
        if (container.scrollWidth <= container.clientWidth) return; // Sürüşdürməyə ehtiyac yoxdursa düymə əlavə etmə

        const scrollLeftBtn = document.createElement('button');
        scrollLeftBtn.className = 'scroll-btn scroll-left';
        scrollLeftBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        const scrollRightBtn = document.createElement('button');
        scrollRightBtn.className = 'scroll-btn scroll-right';
        scrollRightBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        scrollWrapper.appendChild(scrollLeftBtn);
        scrollWrapper.appendChild(scrollRightBtn);
        scrollLeftBtn.addEventListener('click', () => container.scrollBy({ left: -container.clientWidth * 0.7, behavior: 'smooth' }));
        scrollRightBtn.addEventListener('click', () => container.scrollBy({ left: container.clientWidth * 0.7, behavior: 'smooth' }));
    });
}

function initializeProfileDropdown() {
    const profileMenu = document.querySelector('.profile-menu');
    const profileDropdown = document.querySelector('.profile-dropdown');
    if (profileMenu && profileDropdown) {
        profileMenu.addEventListener('click', function(event) {
            event.stopPropagation();
            profileDropdown.classList.toggle('active');
        });
        document.addEventListener('click', function(event) {
            if (!profileMenu.contains(event.target) && !profileDropdown.contains(event.target)) {
                if (profileDropdown.classList.contains('active')) {
                    profileDropdown.classList.remove('active');
                }
            }
        });
    }
}

function initializeModals() {
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                const videoPlayer = modal.querySelector('#video-player, #live-player');
                if (videoPlayer) videoPlayer.innerHTML = '';
            }
        });
    });
    // Modalların fonuna kliklədikdə bağlanması üçün open...Modal funksiyalarında listenerlər əlavə edilib
}

function initializeLogoutButton() {
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', async function(event) {
            event.preventDefault();
            console.log("Çıxış prosesi başlayır...");
            alert("Siz sistemdən çıxış etdiniz! (Backend inteqrasiyası tələb olunur)");
            window.location.href = "index.html";
        });
    }
}

// --- Modal Opening Functions ---
function openVideoModal(videoId, title, description) {
    const modal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('video-player');
    const videoTitleElem = document.getElementById('video-title');
    const videoDescriptionElem = document.getElementById('video-description');

    if (videoTitleElem) videoTitleElem.textContent = title;
    if (videoDescriptionElem) videoDescriptionElem.textContent = description;
    if (videoPlayer) {
        videoPlayer.innerHTML = `<div class="video-placeholder"><div class="loading-spinner"></div><p>Video ID: ${videoId}</p><p>Yüklənir...</p></div>`;
    }
    if (modal) {
        modal.classList.add('active');
        if (!modal.hasAttribute('data-outside-click-listener')) {
            modal.addEventListener('click', function(event) {
                if (event.target === modal) closeVideoModal();
            });
            modal.setAttribute('data-outside-click-listener', 'true');
        }
    }
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('video-player');
    if (modal) modal.classList.remove('active');
    if (videoPlayer) videoPlayer.innerHTML = '';
}

function openLiveModal(channelId, channelName, currentProgram) {
    const modal = document.getElementById('live-modal');
    const livePlayer = document.getElementById('live-player');
    const liveTitleElem = document.getElementById('live-title');
    const liveProgramElem = document.getElementById('live-program');

    if (liveTitleElem) liveTitleElem.textContent = channelName;
    if (liveProgramElem) liveProgramElem.textContent = `Hal-hazırda: ${currentProgram}`;
    if (livePlayer) {
        livePlayer.innerHTML = `<div class="video-placeholder"><div class="loading-spinner"></div><p>Canlı Kanal ID: ${channelId}</p><p>Yayım: ${currentProgram}</p><p>Yüklənir...</p></div>`;
    }
    if (modal) {
        modal.classList.add('active');
        if (!modal.hasAttribute('data-outside-click-listener')) {
            modal.addEventListener('click', function(event) {
                if (event.target === modal) closeLiveModal();
            });
            modal.setAttribute('data-outside-click-listener', 'true');
        }
    }
}

function closeLiveModal() {
    const modal = document.getElementById('live-modal');
    const livePlayer = document.getElementById('live-player');
    if (modal) modal.classList.remove('active');
    if (livePlayer) livePlayer.innerHTML = '';
}

// --- Content Item and Live Channel Click Initializers (GLOBAL) ---
// Bu funksiyalar həm ilkin yüklənən, həm də dinamik əlavə edilən elementlər üçün işləməlidir.
// initializeVideoPlayers() və initializeLiveTV() funksiyaları dinamik məzmun göstərildikdən sonra çağırılacaq.
function initializeVideoPlayers() { // .content-item elementləri üçün
    const videoItems = document.querySelectorAll('.content-item');
    videoItems.forEach(item => {
        if (!item.hasAttribute('data-listener-attached')) {
            item.addEventListener('click', function() {
                const videoId = this.dataset.videoId;
                const videoTitle = this.querySelector('.content-title')?.textContent || 'Video Başlığı';
                const videoDescription = this.dataset.description || 'Video təsviri burada olacaq.';
                openVideoModal(videoId, videoTitle, videoDescription);
            });
            item.setAttribute('data-listener-attached', 'true');
        }
    });
}

function initializeLiveTV() { // .live-channel elementləri üçün
    const liveChannels = document.querySelectorAll('.live-channel');
    liveChannels.forEach(channel => {
        if (!channel.hasAttribute('data-listener-attached')) {
            channel.addEventListener('click', function() {
                const channelId = this.dataset.channelId;
                // `openLiveModal` üçün məlumatları HTML-dən və ya data atributlarından götürmək
                const channelName = this.querySelector('.channel-name')?.textContent || this.dataset.channelName || 'Kanal Adı';
                const currentProgram = this.querySelector('.channel-program')?.textContent?.replace('Hal-hazırda: ','') || this.dataset.currentProgram || 'Cari Proqram';
                // const streamUrl = this.dataset.streamUrl; // Gələcəkdə istifadə üçün
                openLiveModal(channelId, channelName, currentProgram);
            });
            channel.setAttribute('data-listener-attached', 'true');
        }
    });
}


// --- Search Functionality ---
function initializeSearch() {
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) performSearch(searchTerm);
                else console.log("Axtarış üçün bir söz daxil edin.");
            }
        });
    }
}

async function performSearch(term) {
    const mainContainer = document.querySelector('.main-container');
    if (!mainContainer) return console.error("Əsas konteyner tapılmadı!");
    mainContainer.innerHTML = `<div class="search-results-container"><h2 class="section-title">"${term}" üçün axtarış nəticələri</h2><div class="loading"><div class="loading-spinner"></div></div></div>`;
    try {
        // const response = await fetch(`/api/search?query=${encodeURIComponent(term)}`);
        // if (!response.ok) throw new Error(`Server xətası (${response.status})`);
        // const data = await response.json();
        console.log(`API sorğusu (simulyasiya): /api/search?query=${encodeURIComponent(term)}`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulyasiya
        const MOCK_SEARCH_RESULTS = {
            results: MOCK_MOVIES_DATA.filter(m => m.title.toLowerCase().includes(term.toLowerCase()))
                       .concat(MOCK_SERIES_DATA.filter(s => s.title.toLowerCase().includes(term.toLowerCase()))),
            totalResults: 0 // Bunu hesablamaq olar
        };
        MOCK_SEARCH_RESULTS.totalResults = MOCK_SEARCH_RESULTS.results.length;
        displaySearchResults(MOCK_SEARCH_RESULTS, term, mainContainer);
    } catch (error) {
        console.error('Axtarış zamanı xəta:', error);
        mainContainer.innerHTML = `<div class="search-results-container"><h2 class="section-title">"${term}" üçün axtarış nəticələri</h2><p class="error-message">Axtarış zamanı xəta baş verdi. (${error.message})</p></div>`;
    }
}

function displaySearchResults(data, term, mainContainer) {
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results-container';
    let resultsHTML = `<h2 class="section-title">"${term}" üçün axtarış nəticələri</h2>`;
    if (data && data.results && data.results.length > 0) {
        resultsHTML += '<div class="row-items">';
        data.results.forEach(item => {
            let metaInfo = `${item.year || ''} • ${item.genre || 'Digər'}`;
            if (item.seasons) metaInfo += ` • ${item.seasons} Mövsüm`;
            resultsHTML += `
                <div class="content-item" data-video-id="${item.videoId || 'unknown'}" data-description="${item.description || ''}">
                    <img src="${item.imageUrl || `https://via.placeholder.com/300x169/4a4a4a/FFFFFF?text=${encodeURIComponent(item.title || 'No Image')}`}" alt="${item.title || 'Başlıqsız'}">
                    <div class="content-info">
                        <h3 class="content-title">${item.title || 'Başlıqsız'}</h3>
                        <p class="content-meta">${metaInfo}</p>
                    </div>
                </div>`;
        });
        resultsHTML += '</div>';
        if (data.totalResults && data.results.length < data.totalResults) {
            resultsHTML += `<p class="results-summary">Cəmi ${data.totalResults} nəticədən ${data.results.length} göstərilir.</p>`;
        }
    } else {
        resultsHTML += `<p class="no-results-message">Təəssüf ki, "${term}" üçün heç bir nəticə tapılmadı.</p>`;
    }
    resultsContainer.innerHTML = resultsHTML;
    mainContainer.innerHTML = '';
    mainContainer.appendChild(resultsContainer);
    initializeVideoPlayers(); // Axtarış nəticələri üçün video pleyerləri aktivləşdir
}

// --- Category Filter Functionality (index.html-dəki kateqoriyalar üçün) ---
function initializeCategoryFilters() {
    const categoryItems = document.querySelectorAll('.categories .category-item'); // Ana səhifədəki kateqoriyalara hədəflənir
    categoryItems.forEach(item => {
        if (!item.hasAttribute('data-category-listener-attached')) {
            item.addEventListener('click', function() {
                const category = this.dataset.category;
                // Ana səhifədə kateqoriyaya kliklədikdə, ya ayrıca bir səhifəyə yönləndirməli,
                // ya da ana səhifədəki məzmunu filterləməliyik.
                // Hazırda biz ayrıca səhifələr (movies.html, series.html) yaratdığımız üçün,
                // bu kliklər həmin səhifələrə yönləndirə bilər.
                // Məsələn: if (category === "Filmlər") window.location.href = "movies.html";
                // Ya da ana səhifədə nəticələri göstərən bir filterByCategory çağırıla bilər.
                // Mən əvvəlki kimi ana səhifədə filterləmə edən variantı saxlayıram:
                filterContentOnHomepageByCategory(category);
            });
            item.setAttribute('data-category-listener-attached', 'true');
        }
    });
}

async function filterContentOnHomepageByCategory(category) {
    console.log(`Ana səhifədə kateqoriya üzrə filterləmə (simulyasiya): ${category}`);
    const mainContainer = document.querySelector('.main-container');
    if (!mainContainer) return;

    document.querySelectorAll('.categories .category-item').forEach(item => {
        if (item.dataset.category === category) item.classList.add('active');
        else item.classList.remove('active');
    });
    
    // Ana səhifədəki bütün content-row-ları hədəfləyib yüklənmə göstərmək əvəzinə,
    // xüsusi bir nəticə sahəsi yaradaq və ya mövcud content-row-ları yeniləyək.
    // Sadəlik üçün, .main-container-i yeniləyəcəyik, amma bu, hero və digər bölmələri siləcək.
    // Daha yaxşı həll, nəticələr üçün xüsusi bir div olardı.
    // Biz search-ə bənzər şəkildə mainContainer-i yeniləyirik:
    mainContainer.innerHTML = `<div class="category-results-container"><h2 class="section-title">"${category}" kateqoriyası üzrə nəticələr</h2><div class="loading"><div class="loading-spinner"></div></div></div>`;

    try {
        // const response = await fetch(`/api/homepage/content?category=${encodeURIComponent(category)}`);
        // if (!response.ok) throw new Error(`Server xətası (${response.status})`);
        // const data = await response.json();
        console.log(`API sorğusu (simulyasiya): /api/homepage/content?category=${encodeURIComponent(category)}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        let MOCK_CATEGORY_RESULTS = { results: [], totalResults: 0 };
        if (category === "Filmlər") MOCK_CATEGORY_RESULTS.results = MOCK_MOVIES_DATA.slice(0,3);
        else if (category === "Seriallar") MOCK_CATEGORY_RESULTS.results = MOCK_SERIES_DATA.slice(0,3);
        else MOCK_CATEGORY_RESULTS.results = MOCK_NEW_RELEASES_DATA.filter(i => i.genre === category);
        MOCK_CATEGORY_RESULTS.totalResults = MOCK_CATEGORY_RESULTS.results.length;
        
        displayCategoryResults(MOCK_CATEGORY_RESULTS, category, mainContainer); // Eyni display funksiyasını istifadə edirik
    } catch (error) {
        console.error('Kateqoriya filterləmə xətası (ana səhifə):', error);
        if (mainContainer.querySelector('.category-results-container')) {
             mainContainer.querySelector('.category-results-container').innerHTML = `<h2 class="section-title">"${category}"</h2><p class="error-message">Məzmun yüklənərkən xəta baş verdi. (${error.message})</p>`;
        }
    }
}

// displayCategoryResults (əvvəlki addımda yazılıb, search/category filterləri üçün ümumidir)
// Əgər yoxdursa və ya fərqlidirsə, buraya əlavə edin. Mən fərz edirəm ki, var.
// Əgər yoxdursa:
function displayCategoryResults(data, category, mainContainer) { // Bu funksiya həm category.html, həm də ana səhifədəki filter üçün istifadə edilə bilər
    const resultsContainer = mainContainer.querySelector('.category-results-container') || document.createElement('div');
    if (!mainContainer.querySelector('.category-results-container')) { // Əgər yoxdursa, yarat və əlavə et
        resultsContainer.className = 'category-results-container';
        mainContainer.innerHTML = ''; // Yalnız bu halda təmizlə
        mainContainer.appendChild(resultsContainer);
    }


    let resultsHTML = `<h2 class="section-title">"${category}" ${mainContainer === document.querySelector('.main-container') && document.querySelector('.series-page-container, .movies-page-container') ? 'kateqoriyası üzrə məzmun' : 'nəticələri'}</h2>`;

    if (data && data.results && data.results.length > 0) {
        resultsHTML += '<div class="row-items">';
        data.results.forEach(item => {
            let metaInfo = `${item.year || ''} • ${item.genre || category}`;
            if (item.type === 'series' && item.seasons) metaInfo += ` • ${item.seasons} Mövsüm`;
            else if (item.seasons && !item.type) metaInfo += ` • ${item.seasons} Mövsüm`; // Əgər type yoxdursa amma mövsüm varsa

            resultsHTML += `
                <div class="content-item" data-video-id="${item.videoId || 'unknown'}" data-description="${item.description || ''}">
                    <img src="${item.imageUrl || `https://via.placeholder.com/300x169/4a4a4a/FFFFFF?text=${encodeURIComponent(item.title || 'No Image')}`}" alt="${item.title || 'Başlıqsız'}">
                    <div class="content-info">
                        <h3 class="content-title">${item.title || 'Başlıqsız'}</h3>
                        <p class="content-meta">${metaInfo}</p>
                    </div>
                </div>`;
        });
        resultsHTML += '</div>';
        if (data.totalResults && data.results.length < data.totalResults) {
            resultsHTML += `<p class="results-summary">Cəmi ${data.totalResults} məzmundan ${data.results.length} göstərilir.</p>`;
        }
    } else {
        resultsHTML += `<p class="no-results-message">Təəssüf ki, "${category}" üçün heç bir məzmun tapılmadı.</p>`;
    }
    resultsContainer.innerHTML = resultsHTML;
    initializeVideoPlayers();
}


// --- Movies Page Functionality ---
function initializeMoviesPage() {
    if (!document.querySelector('.movies-page-container')) return;
    console.log("Filmlər səhifəsi JS aktivdir.");
    const genreFilter = document.getElementById('genre-filter');
    const yearFilter = document.getElementById('year-filter');
    const moviesLoading = document.getElementById('movies-loading');

    function displayMovies(moviesToDisplay) {
        const moviesGrid = document.getElementById('movies-grid');
        const noMoviesMessage = document.getElementById('no-movies-message');
        if (!moviesGrid || !noMoviesMessage) return;
        moviesGrid.innerHTML = '';
        if (moviesToDisplay.length === 0) {
            noMoviesMessage.style.display = 'block';
            moviesGrid.style.display = 'none';
        } else {
            noMoviesMessage.style.display = 'none';
            moviesGrid.style.display = 'grid';
            moviesToDisplay.forEach(movie => {
                const movieItemHTML = `<div class="content-item" data-video-id="${movie.videoId}" data-description="${movie.description || ''}"><img src="${movie.imageUrl}" alt="${movie.title}"><div class="content-info"><h3 class="content-title">${movie.title}</h3><p class="content-meta">${movie.year} • ${movie.genre}</p></div></div>`;
                moviesGrid.insertAdjacentHTML('beforeend', movieItemHTML);
            });
            initializeVideoPlayers();
        }
    }
    function applyMovieFilters() {
        const selectedGenre = genreFilter.value;
        const selectedYear = yearFilter.value;
        if(moviesLoading) moviesLoading.style.display = 'flex';
        setTimeout(() => {
            let filteredMovies = MOCK_MOVIES_DATA;
            if (selectedGenre !== 'all') filteredMovies = filteredMovies.filter(m => m.genre === selectedGenre);
            if (selectedYear !== 'all') filteredMovies = filteredMovies.filter(m => m.year.toString() === selectedYear);
            displayMovies(filteredMovies);
            if(moviesLoading) moviesLoading.style.display = 'none';
        }, 500);
    }
    function populateMovieFilterOptions() {
        const genres = [...new Set(MOCK_MOVIES_DATA.map(m => m.genre))].sort();
        const years = [...new Set(MOCK_MOVIES_DATA.map(m => m.year))].sort((a, b) => b - a);
        if (genreFilter) genres.forEach(g => { if (!genreFilter.querySelector(`option[value="${g}"]`)) genreFilter.add(new Option(g, g)); });
        if (yearFilter) years.forEach(y => { if (!yearFilter.querySelector(`option[value="${y}"]`)) yearFilter.add(new Option(y, y)); });
    }
    populateMovieFilterOptions();
    if (genreFilter) genreFilter.addEventListener('change', applyMovieFilters);
    if (yearFilter) yearFilter.addEventListener('change', applyMovieFilters);
    if(moviesLoading) moviesLoading.style.display = 'flex';
    setTimeout(() => { displayMovies(MOCK_MOVIES_DATA); if(moviesLoading) moviesLoading.style.display = 'none'; }, 200);
}

// --- Series Page Functionality ---
function initializeSeriesPage() {
    if (!document.querySelector('.series-page-container')) return;
    console.log("Seriallar səhifəsi JS aktivdir.");
    const genreFilter = document.getElementById('series-genre-filter');
    const yearFilter = document.getElementById('series-year-filter');
    const seriesLoading = document.getElementById('series-loading');

    function displaySeries(seriesToDisplay) {
        const seriesGrid = document.getElementById('series-grid');
        const noSeriesMessage = document.getElementById('no-series-message');
        if (!seriesGrid || !noSeriesMessage) return;
        seriesGrid.innerHTML = '';
        if (seriesToDisplay.length === 0) {
            noSeriesMessage.style.display = 'block';
            seriesGrid.style.display = 'none';
        } else {
            noSeriesMessage.style.display = 'none';
            seriesGrid.style.display = 'grid';
            seriesToDisplay.forEach(s => {
                let meta = `${s.year} • ${s.genre}`;
                if (s.seasons) meta += ` • ${s.seasons} Mövsüm`;
                const seriesItemHTML = `<div class="content-item" data-video-id="${s.videoId}" data-description="${s.description || ''}"><img src="${s.imageUrl}" alt="${s.title}"><div class="content-info"><h3 class="content-title">${s.title}</h3><p class="content-meta">${meta}</p></div></div>`;
                seriesGrid.insertAdjacentHTML('beforeend', seriesItemHTML);
            });
            initializeVideoPlayers();
        }
    }
    function applySeriesFilters() {
        const selectedGenre = genreFilter.value;
        const selectedYear = yearFilter.value;
        if(seriesLoading) seriesLoading.style.display = 'flex';
        setTimeout(() => {
            let filteredSeries = MOCK_SERIES_DATA;
            if (selectedGenre !== 'all') filteredSeries = filteredSeries.filter(s => s.genre === selectedGenre);
            if (selectedYear !== 'all') filteredSeries = filteredSeries.filter(s => s.year.toString() === selectedYear);
            displaySeries(filteredSeries);
            if(seriesLoading) seriesLoading.style.display = 'none';
        }, 500);
    }
    function populateSeriesFilterOptions() {
        const genres = [...new Set(MOCK_SERIES_DATA.map(s => s.genre))].sort();
        const years = [...new Set(MOCK_SERIES_DATA.map(s => s.year))].sort((a, b) => b - a);
        if (genreFilter) genres.forEach(g => { if (!genreFilter.querySelector(`option[value="${g}"]`)) genreFilter.add(new Option(g, g)); });
        if (yearFilter) years.forEach(y => { if (!yearFilter.querySelector(`option[value="${y}"]`)) yearFilter.add(new Option(y, y)); });
    }
    populateSeriesFilterOptions();
    if (genreFilter) genreFilter.addEventListener('change', applySeriesFilters);
    if (yearFilter) yearFilter.addEventListener('change', applySeriesFilters);
    if(seriesLoading) seriesLoading.style.display = 'flex';
    setTimeout(() => { displaySeries(MOCK_SERIES_DATA); if(seriesLoading) seriesLoading.style.display = 'none'; }, 200);
}

// --- New Releases Page Functionality ---
function initializeNewReleasesPage() {
    if (!document.querySelector('.new-releases-page-container')) return;
    console.log("Yeni Əlavə Edilənlər səhifəsi JS aktivdir.");
    const newReleasesLoading = document.getElementById('new-releases-loading');

    function displayNewReleases(itemsToDisplay) {
        const newReleasesGrid = document.getElementById('new-releases-grid');
        const noNewReleasesMessage = document.getElementById('no-new-releases-message');
        if (!newReleasesGrid || !noNewReleasesMessage) return;
        newReleasesGrid.innerHTML = '';
        if (itemsToDisplay.length === 0) {
            noNewReleasesMessage.style.display = 'block';
            newReleasesGrid.style.display = 'none';
        } else {
            noNewReleasesMessage.style.display = 'none';
            newReleasesGrid.style.display = 'grid';
            itemsToDisplay.forEach(item => {
                let meta = `${item.year} • ${item.genre}`;
                if (item.type === 'series' && item.seasons) meta += ` • ${item.seasons} Mövsüm`;
                else if (item.seasons && !item.type) meta += ` • ${item.seasons} Mövsüm`;
                const newItemHTML = `<div class="content-item" data-video-id="${item.videoId}" data-description="${item.description || ''}"><img src="${item.imageUrl}" alt="${item.title}"><div class="content-info"><h3 class="content-title">${item.title}</h3><p class="content-meta">${meta}</p></div></div>`;
                newReleasesGrid.insertAdjacentHTML('beforeend', newItemHTML);
            });
            initializeVideoPlayers();
        }
    }
    if(newReleasesLoading) newReleasesLoading.style.display = 'flex';
    setTimeout(() => {
        const sortedNewReleases = MOCK_NEW_RELEASES_DATA.sort((a, b) => (b.year || 0) - (a.year || 0));
        displayNewReleases(sortedNewReleases);
        if(newReleasesLoading) newReleasesLoading.style.display = 'none';
    }, 200);
}

// --- Live TV Page Functionality ---
function initializeLiveTvPage() {
    if (!document.querySelector('.live-tv-page-container')) return;
    console.log("Canlı TV səhifəsi JS aktivdir.");
    const liveTvLoading = document.getElementById('live-tv-loading');

    function displayLiveTvChannels(channelsToDisplay) {
        const liveTvGrid = document.getElementById('live-tv-grid');
        const noChannelsMessage = document.getElementById('no-live-channels-message');
        if (!liveTvGrid || !noChannelsMessage) return;
        liveTvGrid.innerHTML = '';
        if (channelsToDisplay.length === 0) {
            noChannelsMessage.style.display = 'block';
            liveTvGrid.style.display = 'none';
        } else {
            noChannelsMessage.style.display = 'none';
            liveTvGrid.style.display = 'grid';
            channelsToDisplay.forEach(channel => {
                const channelHTML = `
                    <div class="live-channel" data-channel-id="${channel.channelId}" 
                         data-channel-name="${channel.name}" 
                         data-current-program="${channel.currentProgram}" 
                         data-stream-url="${channel.streamUrl}">
                        <div class="channel-preview">
                            <img src="${channel.logoUrl}" alt="${channel.name}">
                            <div class="live-badge">CANLI</div>
                        </div>
                        <div class="channel-info">
                            <h3 class="channel-name">${channel.name}</h3>
                            <p class="channel-program">Hal-hazırda: ${channel.currentProgram}</p>
                            <p class="channel-time">İndi yayımlanır</p>
                        </div>
                    </div>`;
                liveTvGrid.insertAdjacentHTML('beforeend', channelHTML);
            });
            initializeLiveTV(); // Yeni kanallar üçün modalı aktivləşdir
        }
    }
    if(liveTvLoading) liveTvLoading.style.display = 'flex';
    setTimeout(() => {
        displayLiveTvChannels(MOCK_LIVE_CHANNELS_DATA);
        if(liveTvLoading) liveTvLoading.style.display = 'none';
    }, 200);
}

// --- Profile Page Functionality ---
function initializeProfilePage() {
    if (!document.querySelector('.profile-page-container')) return;
    console.log("Profil səhifəsi JS aktivdir.");
    const editBtn = document.getElementById('edit-profile-button');
    const saveBtn = document.getElementById('save-profile-button');
    const cancelBtn = document.getElementById('cancel-edit-button');
    const nameDisplay = document.getElementById('profile-name-display');
    const emailDisplay = document.getElementById('profile-email-display');
    const nameEdit = document.getElementById('profile-name-edit');
    const emailEdit = document.getElementById('profile-email-edit');
    
    // Nümunə məlumatlar (realda backend-dən gəlməlidir)
    const currentProfileData = {
        name: nameDisplay ? nameDisplay.textContent : "İstifadəçi Adı",
        email: emailDisplay ? emailDisplay.textContent : "istifadeci@example.com"
    };

    if(editBtn) editBtn.addEventListener('click', () => {
        nameDisplay.style.display = 'none'; nameEdit.style.display = 'block'; nameEdit.value = currentProfileData.name;
        emailDisplay.style.display = 'none'; emailEdit.style.display = 'block'; emailEdit.value = currentProfileData.email;
        editBtn.style.display = 'none'; saveBtn.style.display = 'inline-flex'; cancelBtn.style.display = 'inline-flex';
    });
    if(cancelBtn) cancelBtn.addEventListener('click', () => {
        nameDisplay.style.display = 'block'; nameEdit.style.display = 'none';
        emailDisplay.style.display = 'block'; emailEdit.style.display = 'none';
        editBtn.style.display = 'inline-flex'; saveBtn.style.display = 'none'; cancelBtn.style.display = 'none';
    });
    if(saveBtn) saveBtn.addEventListener('click', () => {
        currentProfileData.name = nameEdit.value.trim();
        currentProfileData.email = emailEdit.value.trim();
        // Realda backend-ə göndəriləcək
        console.log("Profil yadda saxlanılır (simulyasiya):", currentProfileData);
        alert("Profil məlumatları yadda saxlandı (simulyasiya).");
        nameDisplay.textContent = currentProfileData.name;
        emailDisplay.textContent = currentProfileData.email;
        // UI-ı redaktə olunmayan vəziyyətə qaytar
        nameDisplay.style.display = 'block'; nameEdit.style.display = 'none';
        emailDisplay.style.display = 'block'; emailEdit.style.display = 'none';
        editBtn.style.display = 'inline-flex'; saveBtn.style.display = 'none'; cancelBtn.style.display = 'none';
    });
    const changeAvatarBtn = document.getElementById('change-avatar-button');
    if(changeAvatarBtn) changeAvatarBtn.addEventListener('click', () => alert("Profil şəkli dəyişmə funksiyası üçün backend inteqrasiyası lazımdır."));
}

// --- Lists Page Functionality ---
function initializeListsPage() {
    if (!document.querySelector('.lists-page-container')) return;
    console.log("Siyahılarım səhifəsi JS aktivdir.");
    const listsContent = document.getElementById('my-lists-content');
    const emptyMsg = document.getElementById('empty-list-message');
    const tabs = document.querySelectorAll('.tabs-container .tab-button');
    let currentActiveListType = 'watchlist';

    let MOCK_USER_LISTS = {
        watchlist: [ MOCK_MOVIES_DATA[1], MOCK_SERIES_DATA[0] ],
        favorites: [ MOCK_MOVIES_DATA[2] ]
    };

    function displayUserListItems(listType) {
        if (!listsContent || !emptyMsg) return;
        listsContent.innerHTML = '<div class="loading"><div class="loading-spinner"></div></div>';
        emptyMsg.style.display = 'none';

        setTimeout(() => { // Simulyasiya
            const items = MOCK_USER_LISTS[listType] || [];
            listsContent.innerHTML = '';
            if (items.length === 0) {
                emptyMsg.style.display = 'block';
            } else {
                items.forEach(item => {
                    let meta = `${item.year} • ${item.genre}`;
                    if (item.seasons) meta += ` • ${item.seasons} Mövsüm`;
                    const itemHTML = `<div class="content-item" data-video-id="${item.videoId}" data-description="${item.description || ''}"><img src="${item.imageUrl}" alt="${item.title}"><div class="content-info"><h3 class="content-title">${item.title}</h3><p class="content-meta">${meta}</p><button class="btn-remove-from-list" data-id="${item.videoId}" data-list="${listType}"><i class="fas fa-trash-alt"></i> Sil</button></div></div>`;
                    listsContent.insertAdjacentHTML('beforeend', itemHTML);
                });
                initializeVideoPlayers();
                addRemoveButtonListeners();
            }
        }, 500);
    }
    function addRemoveButtonListeners() {
        listsContent.querySelectorAll('.btn-remove-from-list').forEach(btn => {
            if(btn.hasAttribute('data-remove-listener')) return;
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const videoId = this.dataset.id;
                const listType = this.dataset.list;
                if (confirm(`"${this.closest('.content-item').querySelector('.content-title').textContent}" adlı məzmunu siyahıdan silməyə əminsiniz?`)) {
                    MOCK_USER_LISTS[listType] = MOCK_USER_LISTS[listType].filter(item => item.videoId !== videoId);
                    console.log(`${videoId} siyahıdan silindi (simulyasiya). Yeni siyahı:`, MOCK_USER_LISTS[listType]);
                    displayUserListItems(listType); // Siyahını yenilə
                    alert("Məzmun siyahıdan silindi (simulyasiya).");
                }
            });
            btn.setAttribute('data-remove-listener', 'true');
        });
    }
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentActiveListType = this.dataset.listType;
            displayUserListItems(currentActiveListType);
        });
    });
    displayUserListItems(currentActiveListType); // İlkin siyahını göstər
}

// --- Settings Page Functionality ---
function initializeSettingsPage() {
    if (!document.querySelector('.settings-page-container')) return;
    console.log("Tənzimləmələr səhifəsi JS aktivdir.");

    const accountForm = document.getElementById('account-settings-form');
    const notificationForm = document.getElementById('notification-settings-form');
    const playbackForm = document.getElementById('playback-settings-form');

    // Nümunə: Mövcud ayarları yükləmək (backend-dən gəldiyini fərz edək)
    const MOCK_USER_SETTINGS = {
        email: "istifadeci@example.com", // Bu adətən dəyişdirilmir və ya xüsusi yolla dəyişdirilir
        notifications: { newReleases: true, promotions: false, newsletter: true },
        playback: { videoQuality: "auto", autoplayNext: true }
    };
    if(document.getElementById('setting-email')) document.getElementById('setting-email').value = MOCK_USER_SETTINGS.email;
    if(document.getElementById('notif-new-releases')) document.getElementById('notif-new-releases').checked = MOCK_USER_SETTINGS.notifications.newReleases;
    if(document.getElementById('notif-promotions')) document.getElementById('notif-promotions').checked = MOCK_USER_SETTINGS.notifications.promotions;
    if(document.getElementById('notif-newsletter')) document.getElementById('notif-newsletter').checked = MOCK_USER_SETTINGS.notifications.newsletter;
    if(document.getElementById('setting-video-quality')) document.getElementById('setting-video-quality').value = MOCK_USER_SETTINGS.playback.videoQuality;
    if(document.getElementById('setting-autoplay-next')) document.getElementById('setting-autoplay-next').checked = MOCK_USER_SETTINGS.playback.autoplayNext;


    if(accountForm) accountForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const currentPassword = this.elements.currentPassword.value;
        const newPassword = this.elements.newPassword.value;
        const confirmPassword = this.elements.confirmPassword.value;
        if (!currentPassword || !newPassword || !confirmPassword) return alert("Bütün parol sahələrini doldurun.");
        if (newPassword !== confirmPassword) return alert("Yeni parol və təsdiq parolu eyni deyil!");
        if (newPassword.length < 8) return alert("Yeni parol ən az 8 simvol olmalıdır.");
        console.log("Parol dəyişdirilir (simulyasiya)...", { currentPassword, newPassword });
        alert("Parol dəyişdirildi (simulyasiya).");
        this.reset();
    });
    if(notificationForm) notificationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const settings = {
            newReleases: this.elements.newReleases.checked,
            promotions: this.elements.promotions.checked,
            newsletter: this.elements.newsletter.checked
        };
        console.log("Bildiriş ayarları yadda saxlanılır (simulyasiya):", settings);
        alert("Bildiriş ayarları yadda saxlandı (simulyasiya).");
    });
    if(playbackForm) playbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const settings = {
            videoQuality: this.elements.videoQuality.value,
            autoplayNext: this.elements.autoplayNext.checked
        };
        console.log("Yayım ayarları yadda saxlanılır (simulyasiya):", settings);
        alert("Yayım ayarları yadda saxlandı (simulyasiya).");
    });
}