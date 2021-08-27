const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = 4000;

const BOARD = [
    {
        id: 1,
        title: "김치나라 지언공주❤️",
        content: "나는 김치가 좋아! 너는 어때?",
        author: "김지언",
        createdAt: "2021-8-25",
    },
    {
        id: 2,
        title: "나는 잘생겼어. 누가 내 여친 할 사람?",
        content: "01029191010로 연락행 ㅋㅋㅋ 내가 잘해주께",
        author: "이지섭",
        createdAt: "2021-8-26",
    },
    {
        id: 3,
        title: "자전거 타고 세종 갈 사람? ㅋㅋ",
        content: "8월29일, 금학지구대로 모여랏! 오후 3시! ㅋㅋ 느리면 두고감 ㅋㅋ 시민자전거 비켜",
        author: "오동건",
        createdAt: "2021-8-26",
    },
    {
        id: 4,
        title: "아니, 내말좀 들어바바",
        content: "내가 그랬거든? 근뎈ㅋㅋㅋ아닠ㅋㅋㅋㅋ 민수가 그랬다?",
        author: "지소영",
        createdAt: "2021-8-26",
    }
]

app.use(morgan("dev"));
app.use(cors({
    origin: ["*"]
}));

/// 1.게시판 목록 가져오기
app.get("/board/list", (req, res, next) => {
    try {
        const boards = BOARD;

        return res.status(200).json(boards);
    } catch (error) {
        console.error(error);
        return res.status(401).send("게시글 목록을 가져올 수 없습니다.");
    }
})

//  2. 게시글 상세정보 가져오기
// 정적 라우팅 -> 정적이다.움직이지 않는다. 
//동적라우팅 -> 동적이다. 값이 움직인다.
app.get("/board/:boardId", (req, res, next) => {
    const boardId = req.params.boardId;

    const board = BOARD.filter(data => data.id === parseInt(boardId));

    if (board.length === 0) {
        return res.status(401).send("존재하지 않는 게시글 입니다.");
    }

    return res.status(200).json(board);
});

app.listen(PORT, () => {
    console.log(`${PORT} SERVER START`)
})