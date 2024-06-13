// Firebase 초기화
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 각 팀의 점수
let manutdScore = 0;
let mancityScore = 0;

// HTML 요소 가져오기
const manutdScoreElement = document.getElementById('manutd-score');
const mancityScoreElement = document.getElementById('mancity-score');
const manutdElement = document.getElementById('manutd');
const mancityElement = document.getElementById('mancity');

// Firebase에서 초기 점수 불러오기
firebase.database().ref('votes/').on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        manutdScore = data.manutd || 0;
        mancityScore = data.mancity || 0;
        manutdScoreElement.textContent = manutdScore;
        mancityScoreElement.textContent = mancityScore;
    }
});

// 클릭 이벤트 핸들러 설정
manutdElement.addEventListener('click', () => {
    manutdScore++;
    manutdScoreElement.textContent = manutdScore;
    firebase.database().ref('votes/').update({ manutd: manutdScore });
});

mancityElement.addEventListener('click', () => {
    mancityScore++;
    mancityScoreElement.textContent = mancityScore;
    firebase.database().ref('votes/').update({ mancity: mancityScore });
});
