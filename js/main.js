document.addEventListener('DOMContentLoaded', async () => {
    // Scrollytelling 애니메이션 (모바일 제외)
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
        const homeSection = document.querySelector('#home');
        const line = document.querySelector('#animated-line');
        if (homeSection && line) {
            const pathLength = line.getTotalLength();
            line.style.strokeDasharray = pathLength;
            line.style.strokeDashoffset = pathLength;
            const handleLineDrawScroll = () => {
                const rect = homeSection.getBoundingClientRect();
                const animationScrollHeight = homeSection.offsetHeight - window.innerHeight;
                const scrollFraction = Math.max(0, Math.min(1, -rect.top / animationScrollHeight));
                if (scrollFraction >= 0) {
                    const drawLength = pathLength * scrollFraction;
                    line.style.strokeDashoffset = pathLength - drawLength;
                }
            };
            window.addEventListener('scroll', handleLineDrawScroll);
        }
    }

    // 데이터 로드
    const appData = await DataProcessor.loadData();

    // UI 초기화 및 데이터 전달
    UIManager.init(appData);
});