const DisplayManager = (() => {
    const noticeList = document.getElementById('notice-list');
    const modal = document.getElementById('noticeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');
    const modalBody = document.getElementById('modalBody');

    function renderNoticeBoard(posts) {
        noticeList.innerHTML = ''; // 기존 목록 초기화
        posts.forEach(post => {
            const noticeItem = document.createElement('div');
            noticeItem.classList.add('notice-item');
            noticeItem.innerHTML = `
                <div>${post.id}</div>
                <a class="title-link" data-id="${post.id}">${post.title}<span class="new-badge">NEW</span></a>
                <div class="date">${post.date}</div>
            `;
            noticeList.appendChild(noticeItem);
        });
    }

    function showModal(post) {
        modalTitle.textContent = post.title;
        modalDate.textContent = post.date;
        modalBody.textContent = post.content;
        modal.classList.add('active');
        document.body.classList.add('nav-open'); // 모달 열릴 때 스크롤 방지
    }

    function hideModal() {
        modal.classList.remove('active');
        // 모바일 메뉴가 열려있지 않을 때만 스크롤 허용
        if (!document.getElementById('nav-menu').classList.contains('is-open')) {
            document.body.classList.remove('nav-open');
        }
    }

    return { renderNoticeBoard, showModal, hideModal };
})();