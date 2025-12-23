document.addEventListener('DOMContentLoaded', () => {
    
    // --- Login Logic ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = loginForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Signing In...';
            btn.style.opacity = '0.7';
            
            // Simulate API call
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }

    // --- Timer Logic ---
    const timerDisplay = {
        min: document.getElementById('minutes'),
        sec: document.getElementById('seconds')
    };
    
    if (timerDisplay.min) {
        let timerInterval;
        let timeLeft = 25 * 60; // Default 25 mins
        let isRunning = false;

        const startBtn = document.getElementById('startTimer');
        const resetBtn = document.getElementById('resetTimer');
        const modeBtns = document.querySelectorAll('.mode-btn');

        function updateDisplay() {
            const m = Math.floor(timeLeft / 60);
            const s = timeLeft % 60;
            timerDisplay.min.innerText = m.toString().padStart(2, '0');
            timerDisplay.sec.innerText = s.toString().padStart(2, '0');
        }

        function startTimer() {
            if (isRunning) return;
            isRunning = true;
            startBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
            startBtn.classList.replace('btn-primary', 'btn-secondary');
            
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timerInterval);
                    isRunning = false;
                    startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
                    alert('Time is up! Take a break.');
                }
            }, 1000);
        }

        function pauseTimer() {
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
            startBtn.classList.replace('btn-secondary', 'btn-primary');
        }

        startBtn.addEventListener('click', () => {
            if (isRunning) {
                pauseTimer();
            } else {
                startTimer();
            }
        });

        resetBtn.addEventListener('click', () => {
            pauseTimer();
            const activeMode = document.querySelector('.mode-btn.active');
            timeLeft = parseInt(activeMode.dataset.time) * 60;
            updateDisplay();
            startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
        });

        modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                pauseTimer();
                timeLeft = parseInt(btn.dataset.time) * 60;
                updateDisplay();
                startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
            });
        });
    }



    // --- New Task Button ---
    const newTaskBtn = document.querySelector('.btn-primary.small');
    if (newTaskBtn && newTaskBtn.textContent.includes('New Task')) {
        newTaskBtn.addEventListener('click', () => {
            alert('New Task feature coming soon! You can add tasks directly to your schedule.');
        });
    }

    // --- Notification Bell ---
    const notificationBtn = document.querySelector('.icon-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            alert('No new notifications at this time.');
        });
    }

    // --- Sidebar Navigation ---
    const sidebarLinks = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    sidebarLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Hide all content sections
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Show corresponding section based on link text
            const linkText = link.textContent.trim();
            let targetSection;
            
            if (linkText === 'Overview') {
                targetSection = document.getElementById('overview-section');
            } else if (linkText === 'My Files') {
                targetSection = document.getElementById('files-section');
            } else if (linkText === 'Schedule') {
                targetSection = document.getElementById('schedule-section');
            } else if (linkText === 'Smart Timer') {
                targetSection = document.getElementById('timer-section');
                // Initialize the large timer when switching to timer section
                initializeLargeTimer();
            } else if (linkText === 'Settings') {
                targetSection = document.getElementById('settings-section');
            }
            
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Initialize the large timer for the dedicated timer section
    function initializeLargeTimer() {
        const timerDisplayLarge = {
            min: document.getElementById('minutes-large'),
            sec: document.getElementById('seconds-large')
        };
        
        if (!timerDisplayLarge.min || !timerDisplayLarge.min.dataset.initialized) {
            return; // Already initialized or doesn't exist
        }
        
        let timerInterval2;
        let timeLeft2 = 25 * 60;
        let isRunning2 = false;

        const startBtn2 = document.getElementById('startTimer2');
        const resetBtn2 = document.getElementById('resetTimer2');
        const modeBtns2 = document.querySelectorAll('#timer-section .mode-btn');

        function updateDisplay2() {
            const m = Math.floor(timeLeft2 / 60);
            const s = timeLeft2 % 60;
            timerDisplayLarge.min.innerText = m.toString().padStart(2, '0');
            timerDisplayLarge.sec.innerText = s.toString().padStart(2, '0');
        }

        function startTimer2() {
            if (isRunning2) return;
            isRunning2 = true;
            startBtn2.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
            startBtn2.classList.replace('btn-primary', 'btn-secondary');
            
            timerInterval2 = setInterval(() => {
                if (timeLeft2 > 0) {
                    timeLeft2--;
                    updateDisplay2();
                } else {
                    clearInterval(timerInterval2);
                    isRunning2 = false;
                    startBtn2.innerHTML = '<i class="fa-solid fa-play"></i> Start';
                    alert('Time is up! Take a break.');
                }
            }, 1000);
        }

        function pauseTimer2() {
            clearInterval(timerInterval2);
            isRunning2 = false;
            startBtn2.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
            startBtn2.classList.replace('btn-secondary', 'btn-primary');
        }

        if (startBtn2) {
            startBtn2.addEventListener('click', () => {
                if (isRunning2) {
                    pauseTimer2();
                } else {
                    startTimer2();
                }
            });
        }

        if (resetBtn2) {
            resetBtn2.addEventListener('click', () => {
                pauseTimer2();
                const activeMode = document.querySelector('#timer-section .mode-btn.active');
                timeLeft2 = parseInt(activeMode.dataset.time) * 60;
                updateDisplay2();
                startBtn2.innerHTML = '<i class="fa-solid fa-play"></i> Start';
            });
        }

        modeBtns2.forEach(btn => {
            btn.addEventListener('click', () => {
                modeBtns2.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                pauseTimer2();
                timeLeft2 = parseInt(btn.dataset.time) * 60;
                updateDisplay2();
                startBtn2.innerHTML = '<i class="fa-solid fa-play"></i> Start';
            });
        });

        // Mark as initialized
        timerDisplayLarge.min.dataset.initialized = 'true';
    }

    // --- FileManager Class ---
    class FileManager {
        constructor() {
            const stored = localStorage.getItem('apc_files');
            console.log('Loading files from storage:', stored);
            this.files = JSON.parse(stored) || [
                { id: '1', name: 'Software_Eng_Notes.pdf', type: 'pdf', size: '2.4 MB', date: 'Just now' },
                { id: '2', name: 'Project_Proposal.docx', type: 'doc', size: '1.1 MB', date: '2 hours ago' },
                { id: '3', name: 'Algorithms_Slides.pdf', type: 'pdf', size: '5.8 MB', date: '1 day ago' }
            ];
            this.render();
        }

        save() {
            console.log('Saving files:', this.files);
            localStorage.setItem('apc_files', JSON.stringify(this.files));
            this.render();
        }

        addFile(file) {
            const newFile = {
                id: Date.now().toString(),
                name: file.name,
                type: this.getFileType(file.name),
                size: this.formatSize(file.size),
                date: 'Just now'
            };
            this.files.unshift(newFile);
            this.save();
            showToast('File uploaded successfully!', 'success');
        }

        deleteFile(id) {
            console.log('Deleting file with ID:', id);
            const initialLength = this.files.length;
            this.files = this.files.filter(f => f.id !== id);
            
            if (this.files.length < initialLength) {
                this.save();
                showToast('File deleted successfully!', 'success');
            } else {
                console.error('File not found for deletion:', id);
            }
        }

        renameFile(id, newName) {
            console.log('Renaming file:', id, 'to', newName);
            const file = this.files.find(f => f.id === id);
            if (file) {
                file.name = newName;
                this.save();
                showToast('File renamed successfully!', 'success');
            } else {
                console.error('File not found for renaming:', id);
            }
        }

        getFileType(filename) {
            const ext = filename.split('.').pop().toLowerCase();
            if (['pdf'].includes(ext)) return 'pdf';
            if (['doc', 'docx'].includes(ext)) return 'doc';
            if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'image';
            return 'file';
        }

        formatSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
        }

        getIconClass(type) {
            switch (type) {
                case 'pdf': return 'fa-file-pdf';
                case 'doc': return 'fa-file-word';
                case 'image': return 'fa-file-image';
                default: return 'fa-file';
            }
        }

        render() {
            const overviewList = document.getElementById('fileList');
            const allFilesList = document.getElementById('allFilesList');
            
            const generateHTML = (file) => `
                <div class="file-item" data-id="${file.id}">
                    <div class="file-icon ${file.type}"><i class="fa-solid ${this.getIconClass(file.type)}"></i></div>
                    <div class="file-info">
                        <h4>${file.name}</h4>
                        <p>${file.size} • ${file.date}</p>
                    </div>
                    <button class="action-btn"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                </div>
            `;

            if (overviewList) {
                overviewList.innerHTML = this.files.slice(0, 3).map(generateHTML).join('');
            }
            
            if (allFilesList) {
                allFilesList.innerHTML = this.files.map(generateHTML).join('');
            }
        }
    }

    const fileManager = new FileManager();

    // --- File Upload Logic ---
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');

    if (dropZone && fileInput) {
        dropZone.addEventListener('click', () => fileInput.click());

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--primary-color)';
            dropZone.style.background = 'rgba(59, 130, 246, 0.1)';
        });

        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--glass-border)';
            dropZone.style.background = 'transparent';
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--glass-border)';
            dropZone.style.background = 'transparent';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileManager.addFile(files[0]);
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                fileManager.addFile(e.target.files[0]);
            }
        });
    }

    // --- File Action Buttons ---
    document.addEventListener('click', (e) => {
        // Close any open file menus when clicking outside
        if (!e.target.closest('.action-btn') && !e.target.closest('.file-menu')) {
            document.querySelectorAll('.file-menu').forEach(menu => menu.remove());
        }

        if (e.target.closest('.action-btn')) {
            e.stopPropagation();
            const actionBtn = e.target.closest('.action-btn');
            const fileItem = actionBtn.closest('.file-item');
            const fileId = fileItem.dataset.id;
            
            console.log('Clicked action button for file ID:', fileId);

            // Remove any existing menus
            document.querySelectorAll('.file-menu').forEach(menu => menu.remove());
            
            if (fileItem && fileId) {
                // Create popup menu
                const menu = document.createElement('div');
                menu.className = 'file-menu';
                menu.innerHTML = `
                    <button class="menu-item rename-btn">
                        <i class="fa-solid fa-pen"></i> Rename
                    </button>
                    <button class="menu-item delete-btn">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                `;
                
                // Position the menu
                const rect = actionBtn.getBoundingClientRect();
                menu.style.position = 'fixed';
                menu.style.top = `${rect.bottom + 5}px`;
                menu.style.left = `${rect.left - 150}px`;
                
                document.body.appendChild(menu);
                
                // Handle rename
                menu.querySelector('.rename-btn').addEventListener('click', () => {
                    const fileNameElement = fileItem.querySelector('h4');
                    const currentName = fileNameElement.textContent;
                    const newName = prompt('Enter new file name:', currentName);
                    
                    if (newName && newName.trim() !== '' && newName !== currentName) {
                        fileManager.renameFile(fileId, newName);
                    }
                    menu.remove();
                });
                
                // Handle delete
                menu.querySelector('.delete-btn').addEventListener('click', () => {
                    const fileName = fileItem.querySelector('h4').textContent;
                    const confirmed = confirm(`Are you sure you want to delete "${fileName}"?`);
                    
                    if (confirmed) {
                        fileItem.style.animation = 'fadeOut 0.3s ease';
                        setTimeout(() => {
                            fileManager.deleteFile(fileId);
                        }, 300);
                    }
                    menu.remove();
                });
            } else {
                console.error('File item or ID missing!');
            }
        }
    });

    // Toast notification function
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fa-solid fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // --- Sound Manager ---
    class SoundManager {
        constructor() {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            this.enabled = true;
        }

        playClick() {
            if (!this.enabled) return;
            
            // Resume context if suspended (browser policy)
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }

            const osc = this.audioCtx.createOscillator();
            const gainNode = this.audioCtx.createGain();

            osc.connect(gainNode);
            gainNode.connect(this.audioCtx.destination);

            // "Pop" sound synthesis
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, this.audioCtx.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.1);

            osc.start();
            osc.stop(this.audioCtx.currentTime + 0.1);
        }
    }

    const soundManager = new SoundManager();

    // Global Click Listener for Sounds
    document.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.nav-item') || e.target.closest('.action-btn')) {
            soundManager.playClick();
        }
    });

    // --- Music Player Logic ---
    const musicPlayer = {
        audio: new Audio(),
        isPlaying: false,
        playlist: [
            { title: "Lofi Study Beat", src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3" },
            { title: "Ambient Focus", src: "https://cdn.pixabay.com/download/audio/2022/02/07/audio_1808fbf07a.mp3?filename=ambient-piano-112191.mp3" } // Placeholder URL
        ],
        currentTrackIndex: 0,
        
        init() {
            this.audio.src = this.playlist[0].src;
            this.audio.volume = 0.5;
            
            const playBtn = document.getElementById('musicPlayBtn');
            const volSlider = document.getElementById('musicVolume');
            const trackName = document.getElementById('musicTrackName');
            
            if (playBtn && volSlider) {
                playBtn.addEventListener('click', () => this.togglePlay());
                volSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
                
                this.audio.addEventListener('ended', () => {
                    this.isPlaying = false;
                    this.updateUI();
                });
            }
        },

        togglePlay() {
            if (this.isPlaying) {
                this.audio.pause();
            } else {
                this.audio.play().catch(e => console.log("Audio play failed:", e));
            }
            this.isPlaying = !this.isPlaying;
            this.updateUI();
        },

        setVolume(val) {
            this.audio.volume = val / 100;
        },

        updateUI() {
            const playBtn = document.getElementById('musicPlayBtn');
            if (playBtn) {
                playBtn.innerHTML = this.isPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
            }
        }
    };

    // Initialize Music Player if elements exist
    setTimeout(() => musicPlayer.init(), 1000); // Delay to ensure DOM elements are ready
});
