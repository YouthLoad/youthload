const UIManager = (() => {
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu.querySelectorAll('a');
    const closeModalBtn = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('noticeModal');

    let postData = []; // 공지사항 데이터를 저장할 변수

    function init(data) {
        postData = data.youth_posts; // main.js에서 로드된 데이터 받기

        // 모바일 네비게이션 토글
        if (mobileNavToggle) {
            mobileNavToggle.addEventListener('click', toggleMobileMenu);
        }
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('is-open')) {
                    toggleMobileMenu();
                }
            });
        });

        // 공지사항 링크 클릭 이벤트
        document.getElementById('notice-list').addEventListener('click', (e) => {
            if (e.target.classList.contains('title-link')) {
                const postId = parseInt(e.target.dataset.id, 10);
                const post = postData.find(p => p.id === postId);
                if (post) {
                    DisplayManager.showModal(post);
                }
            }
        });

        // 모달 닫기 이벤트
        closeModalBtn.addEventListener('click', DisplayManager.hideModal);
        modalOverlay.addEventListener('click', (e) => { 
            if (e.target === modalOverlay) DisplayManager.hideModal(); 
        });

        // 초기 공지사항 렌더링
        DisplayManager.renderNoticeBoard(postData);
    }

    function toggleMobileMenu() {
        navMenu.classList.toggle('is-open');
        mobileNavToggle.classList.toggle('is-open');
        document.body.classList.toggle('nav-open');
    }

    return { init };
})();