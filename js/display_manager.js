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

        // URL을 찾아 <a> 태그로 변환하는 정규식
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        let processedContent = post.content.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');

        // 줄 바꿈 문자를 <br> 태그로 변환
        processedContent = processedContent.replace(/\n/g, '<br>');

        // textContent 대신 innerHTML을 사용하여 HTML 태그를 렌더링
        modalBody.innerHTML = processedContent;
        
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