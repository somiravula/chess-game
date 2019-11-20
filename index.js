const white = "white";
const black = "black";
const selection_highlight = "highlight";
const possible_highlight = "possible_highlight";
const south = "south";
const north = "north";
const forward = "forward";
const normal = "normal";
const attacking = "attacking";

class Piece {
    constructor(_color) {
        this.color = _color;
        this.firstMoveDone = false;
    }

    getColor() {
        return this.color;
    }

    getCode() {
        return "";
    }

    setIndexes(_rowIndex, _colIndex) {
        this.rowIndex = _rowIndex;
        this.colIndex = _colIndex;
    }

    moved() {
        this.firstMoveDone = true;
    }

    getRowIndex() {
        return this.rowIndex;
    }
    getColIndex() {
        return this.colIndex;
    }
}

class Pawn extends Piece {

    getCode() {
        return this.color === black ? "&#9823;" : "&#9817;";
    }

    getPossibleMovePositions() {
        const cells = [];
        const flag = this.color === white ? 1 : -1;
        let rowIndex = this.rowIndex - 1 * flag;
        let colIndex = this.colIndex;
        let tempPiece;
        if (!checkPieceExist(rowIndex, colIndex)) {
            cells.push([this.rowIndex - 1 * flag, this.colIndex]);

            if (!this.firstMoveDone) {
                cells.push([this.rowIndex - 2 * flag, this.colIndex]);
            }
        }
        tempPiece = getPieceByIndexes(this.rowIndex - 1 * flag, this.colIndex + 1 * flag);
        if (tempPiece && tempPiece.getColor() !== this.color) {
            cells.push([this.rowIndex - 1 * flag, this.colIndex + 1 * flag]);
        }
        tempPiece = getPieceByIndexes(this.rowIndex - 1 * flag, this.colIndex - 1 * flag);
        if (tempPiece && tempPiece.getColor() !== this.color) {
            cells.push([this.rowIndex - 1 * flag, this.colIndex - 1 * flag]);
        }


        cells.forEach(cell => {
            possibleHighlight(cell[0], cell[1]);
        })
    }

}

class Rook extends Piece {

    getCode() {
        return this.color === black ? "&#9820;" : "&#9814;";
    }
    getPossibleMovePositions() {
        const cells = [];
        const flag = this.color === white ? 1 : -1;

        const strightDirections = getStrightDirectionCells(this.rowIndex, this.colIndex);
        const directions = [...strightDirections];

        for (let cells2 of directions) {
            let skip = false
            for (let i of cells2) {
                if (!skip) {
                    let rowIndex = i[0];
                    let colIndex = i[1];
                    if (isValidCell(rowIndex, colIndex)) {
                        if (isFree(rowIndex, colIndex)) {
                            cells.push([rowIndex, colIndex]);
                        } else {
                            const tempPiece = getPieceByIndexes(rowIndex, colIndex);
                            if (tempPiece.getColor() !== this.color) {
                                cells.push([rowIndex, colIndex]);
                            }
                            skip = true;
                        }
                    }
                }
            }

        }



        cells.forEach(cell => {
            possibleHighlight(cell[0], cell[1]);
        })
    }

}

class Bishop extends Piece {

    getCode() {
        return this.color === black ? "&#9821;" : "&#9815;";
    }
    getPossibleMovePositions() {
        const cells = [];
        const flag = this.color === white ? 1 : -1;

        const cornerDirections = getCornerDirectionCells(this.rowIndex, this.colIndex);
        const directions = [...cornerDirections];

        for (let cells2 of directions) {
            let skip = false
            for (let i of cells2) {
                if (!skip) {
                    let rowIndex = i[0];
                    let colIndex = i[1];
                    if (isValidCell(rowIndex, colIndex)) {
                        if (isFree(rowIndex, colIndex)) {
                            cells.push([rowIndex, colIndex]);
                        } else {
                            const tempPiece = getPieceByIndexes(rowIndex, colIndex);
                            if (tempPiece.getColor() !== this.color) {
                                cells.push([rowIndex, colIndex]);
                            }
                            skip = true;
                        }
                    }
                }
            }

        }



        cells.forEach(cell => {
            possibleHighlight(cell[0], cell[1]);
        })
    }

}

class Knight extends Piece {

    getCode() {
        return this.color === black ? "&#9822;" : "&#9816;";;
    }



    getPossibleMovePositions() {
        const cells = [];
        const flag = this.color === white ? 1 : -1;
        [
            [this.rowIndex - 2 * flag, this.colIndex + 1 * flag],
            [this.rowIndex - 2 * flag, this.colIndex - 1 * flag],
            [this.rowIndex - 1 * flag, this.colIndex + 2 * flag],
            [this.rowIndex - 1 * flag, this.colIndex - 2 * flag],
            [this.rowIndex + 2 * flag, this.colIndex + 1 * flag],
            [this.rowIndex + 2 * flag, this.colIndex - 1 * flag],
            [this.rowIndex + 1 * flag, this.colIndex + 2 * flag],
            [this.rowIndex + 1 * flag, this.colIndex - 2 * flag],
        ].forEach(i => {
            let rowIndex = i[0];
            let colIndex = i[1];
            if (isValidCell(rowIndex, colIndex)) {
                if (isFree(rowIndex, colIndex)) {
                    cells.push([rowIndex, colIndex]);
                } else {
                    const tempPiece = getPieceByIndexes(rowIndex, colIndex);
                    if (tempPiece && tempPiece.getColor() !== this.color) {
                        cells.push([rowIndex, colIndex]);
                    }

                }
            }
        });



        cells.forEach(cell => {
            possibleHighlight(cell[0], cell[1]);
        })
    }

}

class Queen extends Piece {

    getCode() {
        return this.color === black ? "&#9819;" : "&#9813;";
    }
    getPossibleMovePositions() {
        const cells = [];
        const flag = this.color === white ? 1 : -1;

        const cornerDirections = getCornerDirectionCells(this.rowIndex, this.colIndex);
        const strightDirections = getStrightDirectionCells(this.rowIndex, this.colIndex);
        const directions = [...cornerDirections, ...strightDirections];

        for (let cells2 of directions) {
            let skip = false
            for (let i of cells2) {
                if (!skip) {
                    let rowIndex = i[0];
                    let colIndex = i[1];
                    if (isValidCell(rowIndex, colIndex)) {
                        if (isFree(rowIndex, colIndex)) {
                            cells.push([rowIndex, colIndex]);
                        } else {
                            const tempPiece = getPieceByIndexes(rowIndex, colIndex);
                            if (tempPiece.getColor() !== this.color) {
                                cells.push([rowIndex, colIndex]);
                            }
                            skip = true;
                        }
                    }
                }
            }

        }



        cells.forEach(cell => {
            possibleHighlight(cell[0], cell[1]);
        })
    }

}


class King extends Piece {

    getCode() {
        return this.color === black ? "&#9818;" : "&#9812;";
    }
    getPossibleMovePositions() {
        const cells = [];
        const flag = this.color === white ? 1 : -1;
        [
            [this.rowIndex - 1 * flag, this.colIndex + 1 * flag],
            [this.rowIndex - 1 * flag, this.colIndex - 1 * flag],
            [this.rowIndex + 1 * flag, this.colIndex + 1 * flag],
            [this.rowIndex + 1 * flag, this.colIndex - 1 * flag],
            [this.rowIndex, this.colIndex + 1 * flag],
            [this.rowIndex, this.colIndex - 1 * flag],
            [this.rowIndex + 1 * flag, this.colIndex],
            [this.rowIndex - 1 * flag, this.colIndex],
        ].forEach(i => {
            let rowIndex = i[0];
            let colIndex = i[1];
            if (isValidCell(rowIndex, colIndex)) {
                if (isFree(rowIndex, colIndex)) {
                    cells.push([rowIndex, colIndex]);
                } else {
                    const tempPiece = getPieceByIndexes(rowIndex, colIndex);
                    if (tempPiece && tempPiece.getColor() !== this.color) {
                        cells.push([rowIndex, colIndex]);
                    }

                }
            }
        });



        cells.forEach(cell => {
            possibleHighlight(cell[0], cell[1]);
        })
    }

}

const pieces = [
    ["1", "A", new Rook(black)],
    ["1", "B", new Knight(black)],
    ["1", "C", new Bishop(black)],
    ["1", "D", new Queen(black)],
    ["1", "E", new King(black)],
    ["1", "F", new Bishop(black)],
    ["1", "G", new Knight(black)],
    ["1", "H", new Rook(black)],
    ["2", "A", new Pawn(black)],
    ["2", "B", new Pawn(black)],
    ["2", "C", new Pawn(black)],
    ["2", "D", new Pawn(black)],
    ["2", "E", new Pawn(black)],
    ["2", "F", new Pawn(black)],
    ["2", "G", new Pawn(black)],
    ["2", "H", new Pawn(black)],
    ["7", "A", new Pawn(white)],
    ["7", "B", new Pawn(white)],
    ["7", "C", new Pawn(white)],
    ["7", "D", new Pawn(white)],
    ["7", "E", new Pawn(white)],
    ["7", "F", new Pawn(white)],
    ["7", "G", new Pawn(white)],
    ["7", "H", new Pawn(white)],
    ["8", "A", new Rook(white)],
    ["8", "B", new Knight(white)],
    ["8", "C", new Bishop(white)],
    ["8", "D", new Queen(white)],
    ["8", "E", new King(white)],
    ["8", "F", new Bishop(white)],
    ["8", "G", new Knight(white)],
    ["8", "H", new Rook(white)],
];

function getPieceByPosition(rowId, colId) {
    const matchedItem = pieces.find((item) => item[0] === rowId && item[1] === colId);
    if (matchedItem) {
        return matchedItem[2];
    }
    return null;
}

function isValidCell(rowIndex, colIndex) {
    return rowIndex > -1 && rowIndex < 8 && colIndex > -1 && colIndex < 8;
}

function isFree(rowIndex, colIndex) {
    const el = getElementByIndexes(rowIndex, colIndex);
    if (el) {
        return el.innerHTML === "";
    }
    return false;
}

function getPieceByIndexes(rowIndex, colIndex) {
    if (rowIndex ===3 && colIndex === 3)
    console.log(pieces.map(i => i[2]).filter(i => i.getRowIndex() === rowIndex && i.getColIndex() === colIndex));
    return pieces.map(i => i[2]).find(i => i.getRowIndex() === rowIndex && i.getColIndex() === colIndex);
}

const colIds = ["A", "B", "C", "D", "E", "F", "G", "H"];
const rowIds = ["1", "2", "3", "4", "5", "6", "7", "8"];
let turn = white; // white = true, black = false
let selectedCell = null;
function switchTurn() {
    turn = turn === white ? black : white;
}
const table = document.createElement("table");
document.body.appendChild(table);
let isWhiteCell = true; // white = true, black = false
for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
    const tr = document.createElement("tr");
    table.appendChild(tr);
    for (let colIndex = 0; colIndex < 8; colIndex++) {
        const td = document.createElement("td");
        const tdId = `td_${rowIndex}_${colIndex}`;
        td.id = tdId;
        tr.appendChild(td);
        td.setAttribute("data-cell-color", isWhiteCell ? white : black);
        isWhiteCell = !isWhiteCell;

        const cell = {
            rowIndex,
            colIndex,
            tdId,
        };
        const piece = getPieceByPosition(rowIds[rowIndex], colIds[colIndex]);
        addPieceToCell(cell, piece);
        td.onclick = touchPiece(cell);
    }

    isWhiteCell = !isWhiteCell;
}

function addPieceToCell(cell, piece) {
    document.getElementById(cell.tdId).innerHTML = "";
    if (cell.piece) {
        cell.piece.setIndexes(-1, -1);
    }
    cell.piece = piece;
    if (piece) {
        piece.setIndexes(cell.rowIndex, cell.colIndex);
        document.getElementById(cell.tdId).innerHTML = piece.getCode();
    }
}

function turnCheck(piece) {
    return piece && piece.getColor() === turn;
}

function resetHighlighting() {
    selectedCell = null;
    const elements = document.querySelectorAll(`.${selection_highlight}, .${possible_highlight}`);
    elements.forEach((e) => {
        e.className = "";
    });
}

function possibleHighlight(rowIndex, colIndex) {
    const el = getElementByIndexes(rowIndex, colIndex);
    if (el) {
        el.classList.add(possible_highlight);
    }
}

function highlightPiece(cell) {
    document.getElementById(cell.tdId).classList.add(selection_highlight);
}

function highlightMovablePositions(cell) {

}

function isPossibleMove(cell) {
    return document.getElementById(cell.tdId).classList.contains(possible_highlight);
}

function getElementByIndexes(rowIndex, colIndex) {
    return document.getElementById(`td_${rowIndex}_${colIndex}`);
}

function selectCell(cell) {
    selectedCell = cell;
}

function clearCell(cell) {
    document.getElementById(cell.tdId).innerHTML = "";
    cell.piece = null;
}

function checkPieceExist(rowIndex, colIndex) {
    return getElementByIndexes(rowIndex, colIndex).innerHTML !== "";
}

function touchPiece(cell) {
    return function () {
        if (selectedCell) {
            if (selectedCell === cell) {
                resetHighlighting();
                return;
            }
            if (isPossibleMove(cell)) {
                addPieceToCell(cell, selectedCell.piece);
                clearCell(selectedCell);
                resetHighlighting();
                cell.piece.moved();
                switchTurn();
                return;
            }
        }


        if (!turnCheck(cell.piece)) {
            return;
        }

        resetHighlighting();
        highlightPiece(cell);
        selectCell(cell);
        cell.piece.getPossibleMovePositions();
    };
}


document.body.onclick = function (event) {
    if (event.target.tagName === "BODY") {
        resetHighlighting();
    }
}




function getCornerDirectionCells(ri, ci) {
    const directions = [[], [], [], []];
    for (let r = ri + 1, c = ci + 1; isValidCell(r, c);) {
        directions[0].push([r, c]);
        r++;
        c++;
    }
    for (let r = ri + 1, c = ci - 1; isValidCell(r, c);) {
        directions[1].push([r, c]);
        r++;
        c--;
    }
    for (let r = ri - 1, c = ci + 1; isValidCell(r, c);) {
        directions[2].push([r, c]);
        r--;
        c++;
    }
    for (let r = ri - 1, c = ci - 1; isValidCell(r, c);) {
        directions[3].push([r, c]);
        r--;
        c--;
    }

    return directions;
}



function getStrightDirectionCells(ri, ci) {
    const directions = [[], [], [], []];
    for (let r = ri - 1, c = ci; isValidCell(r, c);) {
        directions[0].push([r, c]);
        r--;
    }
    for (let r = ri + 1, c = ci; isValidCell(r, c);) {
        directions[1].push([r, c]);
        r++;
    }
    for (let r = ri, c = ci - 1; isValidCell(r, c);) {
        directions[2].push([r, c]);
        c--;
    }
    for (let r = ri, c = ci + 1; isValidCell(r, c);) {
        directions[3].push([r, c]);
        c++;
    }

    return directions;
}


