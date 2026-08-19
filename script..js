// === BIẾN TOÀN CỤC ===
let currentId = null;
let notes = [];
let isViewOnly = false;

// === LẤY PHẦN TỬ DOM ===
const titleInput = document.getElementById('note-title');
const contentInput = document.getElementById('note-content');
const contentDisplay = document.getElementById('note-content-display');
const statusText = document.getElementById('status-text');
const charCount = document.getElementById('char-count');
const notesList = document.getElementById('notes-list');
const shareModal = document.getElementById('shareModal');
const shareLinkInput = document.getElementById('shareLinkInput');
const shareNoteTitle = document.getElementById('shareNoteTitle');
const shareNoteExcerpt = document.getElementById('shareNoteExcerpt');
const viewOnlyBadge = document.getElementById('viewOnlyBadge');
const mainNote = document.getElementById('main-note');
const toast = document.getElementById('toast');

// === TIỆN ÍCH ===
function encodeId(id) { return btoa(encodeURIComponent(id)).replace(/[+/=]/g, c => ({'+':'-', '/':'_', '=':''}[c])); }
function decodeId(encoded) { try { return decodeURIComponent(atob(encoded.replace(/[-_]/g, c => ({'-':'+', '_':'/'}[c])))); } catch { return null; } }
function getBaseUrl() { return window.location.origin + window.location.pathname; }
function showToast(msg, duration=2500) { toast.textContent=msg; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'), duration); }

// === TỰ ĐỘNG CHUYỂN LINK TRONG NỘI DUNG ===
function autoLink(text) {
    if (!text) return '';
    const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|]|\bwww\.[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
    return escapeHtml(text).replace(urlPattern, function(url) {
        let fullUrl = url.toLowerCase().startsWith('www.') ? 'https://' + url : url;
        return `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// === QUẢN LÝ DỮ LIỆU ===
function saveToLocal() {
    try { localStorage.setItem('my-notes', JSON.stringify(notes)); }
    catch (e) { updateStatus('Lỗi lưu dữ liệu!', 'var(--danger)'); }
}

function loadNotes() {
    try {
        const stored = localStorage.getItem('my-notes');
        if (stored) notes = JSON.parse(stored);
    } catch (e) { notes = []; }

    // Kiểm tra chế độ xem từ URL
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    const branch = params.get('branch');
    
    if (view === 'readonly' && branch) {
        const decoded = decodeId(branch);
        if (decoded) activateViewMode(parseInt(decoded));
    } else {
        renderNotes();
        newNote();
    }
}

// === CHẾ ĐỘ XEM CHỈ ĐỌC ===
function activateViewMode(id) {
    const note = notes.find(n => n.id === id);
    if (!note) { showToast('Không tìm thấy ghi chú!'); return; }

    isViewOnly = true;
    currentId = id;
    
    // Hiển thị nội dung đã xử lý link
    titleInput.value = note.title;
    contentDisplay.innerHTML = autoLink(note.content);
    
    // Áp dụng giao diện chỉ đọc
    mainNote.classList.add('view-only');
    viewOnlyBadge.style.display = 'inline-flex';
    document.querySelector('.page-header').style.display = 'none';
    document.querySelector('.notes-list-container').style.display = 'none';
    
    updateCharCount();
    updateStatus('Chế độ xem chỉ đọc', 'var(--purple)');
}

function exitViewMode() {
    isViewOnly = false;
    mainNote.classList.remove('view-only');
    viewOnlyBadge.style.display = 'none';
    document.querySelector('.page-header').style.display = 'block';
    document.querySelector('.notes-list-container').style.display = 'block';
    
    history.replaceState(null, '', window.location.pathname);
    renderNotes();
    newNote();
}

// === TÁC VỤ CHÍNH ===
function newNote() {
    if (isViewOnly) return;
    currentId = null;
    titleInput.value = '';
    contentInput.value = '';
    contentDisplay.innerHTML = '';
    updateStatus('Sẵn sàng tạo mới', 'var(--success)');
    updateCharCount();
    titleInput.focus();
    history.replaceState(null, '', window.location.pathname);
}

function saveNote() {
    if (isViewOnly) return;
    const title = titleInput.value.trim() || 'Ghi chú không tên';
    const content = contentInput.value;
    const now = new Date().toISOString();

    if (currentId) {
        const idx = notes.findIndex(n => n.id === currentId);
        if (idx !== -1) { notes[idx].title = title; notes[idx].content = content; notes[idx].updatedAt = now; }
        updateStatus('Đã cập nhật!', 'var(--success)');
    } else {
        const note = { id: Date.now(), title, content, createdAt: now, updatedAt: now };
        notes.unshift(note); currentId = note.id;
        updateStatus('Đã tạo mới!', 'var(--success)');
    }
    saveToLocal(); renderNotes();
    setTimeout(()=>updateStatus('Sẵn sàng', 'var(--success)'), 2000);
}

function deleteNote() {
    if (isViewOnly) return;
    if (!currentId) { if (!confirm('Xóa nội dung chưa lưu?')) return; newNote(); return; }
    if (!confirm('Chắc chắn xóa? Hành động không hoàn tác!')) return;
    notes = notes.filter(n => n.id !== currentId); saveToLocal(); renderNotes(); newNote();
    updateStatus('Đã xóa nhánh', 'var(--danger)');
}

// === XUẤT / NHẬP ===
function exportNote() {
    if (isViewOnly) return;
    const title = titleInput.value.trim() || 'ghi-chu';
    const blob = new Blob([contentInput.value], {type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download=title.replace(/[^\w\s]/gi,'')+'.txt';
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    showToast('Đã xuất file thành công!');
}

function importNote(e) {
    if (isViewOnly) return;
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
        try {
            const imported = JSON.parse(ev.target.result);
            if (Array.isArray(imported)) {
                imported.forEach(n=>notes.push({id:n.id||Date.now()+Math.random(), title:n.title||'Ghi chú nhập', content:n.content||'', createdAt:n.createdAt||new Date().toISOString(), updatedAt:n.updatedAt||new Date().toISOString()}));
                saveToLocal(); renderNotes(); showToast(`Nhập thành công ${imported.length} nhánh!`);
            } else throw 'Lỗi';
        } catch {
            titleInput.value = file.name.replace(/\.[^/.]+$/,''); contentInput.value = ev.target.result;
            showToast('Đã tải nội dung file! Nhấn Lưu để giữ lại');
        }
        e.target.value='';
    };
    reader.readAsText(file);
}

// === CHIA SẺ ===
function openShareModalFor(note) {
    const encoded = encodeId(note.id.toString());
    const viewLink = `${getBaseUrl()}?view=readonly&branch=${encoded}`;
    
    shareNoteTitle.textContent = note.title;
    shareNoteExcerpt.textContent = note.content.substring(0,120)+(note.content.length>120?'...':'');
    shareLinkInput.value = viewLink;
    shareModal.style.display = 'flex';
}

function shareCurrentNote() {
    if (isViewOnly) return;
    if (!currentId) { alert('Lưu nhánh trước khi chia sẻ!'); return; }
    openShareModalFor(notes.find(n=>n.id===currentId));
}

function closeShareModal() { shareModal.style.display='none'; }
function copyShareLink() { shareLinkInput.select(); document.execCommand('copy'); showToast('Đã sao chép link chia sẻ!'); }

// === RENDER ===
function renderNotes() {
    if (isViewOnly) return;
    const sortBy = document.getElementById('sort-select').value;
    let sorted = [...notes];
    sorted.sort((a,b)=>sortBy==='title'?a.title.localeCompare(b.title,'vi'):new Date(b.updatedAt)-new Date(a.updatedAt));

    document.getElementById('note-count').textContent = sorted.length+' nhánh';
    notesList.innerHTML = '';
    if (sorted.length===0) { notesList.innerHTML = `<p style="color:#94a3b8;text-align:center;padding:30px;"><i class="fas fa-code-branch fa-2x mb-2"></i><br>Chưa có nhánh nào</p>`; return; }

    sorted.forEach(note=>{
        const item = document.createElement('div');
        item.className = 'note-item' + (note.id===currentId?' active':'');
        item.innerHTML = `
            <div class="note-main" onclick="loadNote(${note.id})">
                <h3><i class="fas fa-code-branch fa-sm"></i> ${escapeHtml(note.title)}</h3>
                <p>${escapeHtml(note.content.substring(0,80))}...</p>
            </div>
            <div class="note-meta">
                <span><i class="far fa-clock"></i> ${formatDate(note.updatedAt)}</span>
                <span><i class="far fa-file-alt"></i> ${note.content.length} ký tự</span>
                <div class="note-actions">
                    <button onclick="event.stopPropagation();openShareModalFor(notes.find(n=>n.id===${note.id}))"><i class="fas fa-link"></i> Chia sẻ</button>
                </div>
            </div>
        `;
        notesList.appendChild(item);
    });
}

function loadNote(id) {
    if (isViewOnly) return;
    const note = notes.find(n=>n.id===id); if (!note) return;
    currentId = id; titleInput.value=note.title; contentInput.value=note.content;
    contentDisplay.innerHTML = autoLink(note.content);
    updateCharCount(); renderNotes(); window.scrollTo({top:0,behavior:'smooth'});
    history.replaceState(null, '', `${window.location.pathname}?branch=${encodeId(id.toString())}`);
}

// === TRỢ GIÚP ===
function updateStatus(text, color) { statusText.textContent=text; document.querySelector('.status-dot').style.background=color; }
function updateCharCount() { charCount.textContent = (isViewOnly?contentDisplay.textContent.length:contentInput.value.length)+' ký tự'; }
function formatDate(iso) { return new Date(iso).toLocaleDateString('vi-VN',{year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}); }

// === TỰ ĐỘNG LƯU & CẬP NHẬT HIỂN THỊ ===
let saveTimer;
contentInput.addEventListener('input', ()=>{
    updateCharCount();
    contentDisplay.innerHTML = autoLink(contentInput.value);
    if (currentId && !isViewOnly) { clearTimeout(saveTimer); updateStatus('Đang lưu...','#f59e0b'); saveTimer=setTimeout(saveNote,800); }
});
titleInput.addEventListener('input', ()=>{ if(currentId&&!isViewOnly){clearTimeout(saveTimer);saveTimer=setTimeout(saveNote,800);} });

window.addEventListener('click', e=>{ if(e.target===shareModal) closeShareModal(); });
document.addEventListener('DOMContentLoaded', loadNotes);
