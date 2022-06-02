// CONSTANTS

//constants for determining classes
const X_CLASS = 'x'
const O_CLASS = 'o'

// An array of all possible winning sets
const WINNING_SET = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//cell element for game-board-cell
const cellElements = document.querySelectorAll('[data-cell]')

const displayMsg = document.querySelector('[dis-text]')
const board = document.getElementById('board')
const btn = document.getElementById('btn')
const bCover = document.getElementById('bcover')
const bCoverText = document.querySelector('[bcover-text]')
let pXturn

// Button to start the game
btn.addEventListener('click', startG)

// function for starting game
function startG() {
    showBcov(false)
    showGboard(true)
    btn.innerHTML = '<b>Restart</b>'
    pXturn = true
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once : true}) // once method for preventing multiple click
    })
    SetBoardHoverEffect()
}

// event-handling funcion
function handleClick(e) {
    const cell = e.target
    const giveClass = currentClass()
    putMark(cell, giveClass)
    if (hasWon(giveClass)) {
        endG(false)
    } else if (isDraw()) {
        endG(true)
    } else {
        changeTurn()
        SetBoardHoverEffect()
    }
}

// game-board function (hide or show)
function showGboard(val){
    if (val) {
        board.classList.add('show')
    } else {
        board.classList.remove('show')
    }
}

// winning-msg panel function (hide or show)
function showBcov(val) {
    if (val) {
        bCover.classList.add('show')
    } else {
        bCover.classList.remove('show')
    }
}

//function to end game
function endG(val) {
    if (val) {
        showGboard(false)
        showBcov(true)
        bCoverText.innerHTML = 'Draw!'
    } else {
        showGboard(false)
        showBcov(true)
        bCoverText.innerHTML = `Player ${pXturn ? 'X' : 'O'} won!`
    }
}

//function for putting marks ('x' or 'o')
function putMark(cell, giveClass) {
    cell.classList.add(giveClass)
}

//function for obtaining currentClass
function currentClass() {
    cClass = pXturn ? X_CLASS : O_CLASS
    return cClass
}

//function for swapping player turns
function changeTurn() {
    pXturn = !pXturn
}

//function to check if game is won
function hasWon(currentClass) {
    return WINNING_SET.some(set => {
        return set.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

//function to check if game is draw 
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(O_CLASS) || cell.classList.contains(X_CLASS)
    })
}

//function for hover effects on game-board
function SetBoardHoverEffect() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (pXturn) {
        board.classList.add(X_CLASS)
    } else {
        board.classList.add(O_CLASS)
    }
}