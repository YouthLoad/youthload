const DataProcessor = (() => {
    const DATA_PATH = 'data/';
    const allData = {};

    async function loadData() {
        const files = ['youth_posts.csv']; // 필요한 CSV 파일 목록
        const promises = files.map(file => 
            new Promise((resolve, reject) => {
                Papa.parse(DATA_PATH + file, {
                    download: true,
                    header: true,
                    skipEmptyLines: true,
                    complete: results => {
                        const key = file.replace('.csv', '');
                        allData[key] = results.data;
                        resolve();
                    },
                    error: err => reject(err)
                });
            })
        );
        await Promise.all(promises);
        processRawData();
        return allData;
    }

    function processRawData() {
        // CSV에서 로드된 데이터를 필요에 따라 가공합니다.
        // 예: id를 숫자로 변환
        if (allData.youth_posts) {
            allData.youth_posts.forEach(post => {
                post.id = parseInt(post.id, 10);
            });
        }
    }

    return { loadData };
})();