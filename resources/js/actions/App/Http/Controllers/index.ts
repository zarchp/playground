import ChatController from './ChatController'
import DiceController from './DiceController'
import FourEightController from './FourEightController'
import TicTacToeController from './TicTacToeController'
import SudokuController from './SudokuController'
import CodenamesController from './CodenamesController'
import Settings from './Settings'
import Auth from './Auth'
const Controllers = {
    ChatController: Object.assign(ChatController, ChatController),
DiceController: Object.assign(DiceController, DiceController),
FourEightController: Object.assign(FourEightController, FourEightController),
TicTacToeController: Object.assign(TicTacToeController, TicTacToeController),
SudokuController: Object.assign(SudokuController, SudokuController),
CodenamesController: Object.assign(CodenamesController, CodenamesController),
Settings: Object.assign(Settings, Settings),
Auth: Object.assign(Auth, Auth),
}

export default Controllers