import axios from 'axios';

const BOARD_API_BASE_URL = "http://localhost:8080/api/board";

class BoardService {
    getBoards(page) {
        return axios.get(BOARD_API_BASE_URL + "?page="+ page);
    }


    createBoard(board) {
        return axios.post(BOARD_API_BASE_URL, board);
    }
    getOneBoard(bno) {
        return axios.get(BOARD_API_BASE_URL + "/" + bno);
    }

    deleteBoard(bno) {
        return axios.delete(BOARD_API_BASE_URL + "/" + bno);
    }



}
export default new BoardService();