const questions = [
    {
        question: "遇到老师拖堂你会怎么办",
        options: [
            { text: "上桌当老师面尿尿", type: "鸦鸦" },
            { text: "忍气吞声", type: "田小草" },
            { text: "妈的，骂他丫的", type: "英格猫" }
        ]
    },
    {
        question: "女神当面走过来你会？",
        options: [
            { text: "偶买那，咱们结婚吧", type: "田小草" },
            { text: "女神我要追随你", type: "屑鱼" },
            { text: "360°旋转", type: "英格猫" }
        ]
    },
    {
        question: "看到喜欢的人，你会？",
        options: [
            { text: "当面抽烟", type: "鸦鸦" },
            { text: "阴暗扭曲爬行", type: "英格猫" },
            { text: "装高冷", type: "屑鱼" }
        ]
    }
];

// 完全匹配你 img 文件夹里的图片名，100% 对应
const resultConfig = {
    屑鱼: {
        title: "屑鱼",
        english: "屑鱼",
        img: "img/屑鱼.jpg",
        desc: "姐就是女王。"
    },
    田小草: {
        title: "田小草",
        english: "田小草",
        img: "img/田小草.jpg",
        desc: "我是一个农村人？"
    },
    英格猫: {
        title: "英格猫",
        english: "英格猫",
        img: "img/英格猫.jpg",
        desc: "就这个爽"
    },
    鸦鸦: {
        title: "鸦鸦",
        english: "鸦鸦",
        img: "img/鸦鸦.jpg",
        desc: "随时随地抽大烟！"
    }
};

// ====================== 逻辑代码区（无需修改） ======================
let currentQuestionIndex = 0;
let userAnswers = [];

window.onload = function() {
    renderQuestion();
};

function renderQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("questionText").innerText = currentQuestion.question;
    const optionsBox = document.getElementById("optionsBox");
    optionsBox.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = option.text;
        btn.onclick = () => {
            userAnswers.push(option.type);
            nextQuestion();
        };
        optionsBox.appendChild(btn);
    });
    updateProgress();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        showResult();
    } else {
        renderQuestion();
    }
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById("progressFill").style.width = `${progress}%`;
}

function showResult() {
    const countMap = {};
    userAnswers.forEach(type => {
        countMap[type] = (countMap[type] || 0) + 1;
    });

    let maxCount = 0;
    let resultType = "";
    for (const type in countMap) {
        if (countMap[type] > maxCount) {
            maxCount = countMap[type];
            resultType = type;
        }
    }

    const result = resultConfig[resultType];
    document.getElementById("testPage").classList.remove("active");
    document.getElementById("resultPage").classList.add("active");
    document.getElementById("resultTitle").innerText = result.title;
    document.getElementById("resultEnglish").innerText = result.english;
    document.getElementById("resultImg").src = result.img;
    document.getElementById("resultDesc").innerText = result.desc;
}

function restartTest() {
    currentQuestionIndex = 0;
    userAnswers = [];
    document.getElementById("resultPage").classList.remove("active");
    document.getElementById("testPage").classList.add("active");
    renderQuestion();
}

function shareResult() {
    const title = document.getElementById("resultTitle").innerText;
    const desc = document.getElementById("resultDesc").innerText;
    const shareText = `我的人格类型是：${title} ${desc} 快来测测你的！`;
    navigator.clipboard.writeText(shareText).then(() => {
        alert("结果已复制，快去分享吧！");
    });
}