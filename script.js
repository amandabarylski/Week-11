/*Coding Steps:

    Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
        Create a Tic-Tac-Toe game grid using your HTML element of choice.
        When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
        A heading should say whether it is X's or O's turn and change with each move made.
        A button should be available to clear the grid and restart the game.
        When a player has won, or the board is full and the game results in a draw, a Bootstrap alert 
        or similar Bootstrap component should appear across the screen announcing the winner.*/



//A discussion with my mentor led me to store the winning combinations in an array,
//and push each clicked square into an array as well.
let winConditions = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]
let xSquares = []
let oSquares = []

//I wasn't able to select the game spaces by class and only alter the contents of the one clicked.
//However, that gave me the idea for the clear function.
// $('.game-space').on('click', () => {
//     $('.game-space').text($('b').text())
// })
//After getting the end of game alert working, I added a section to this to hide it when clearing the board.
//I also emptied the two player arrays.
//I want X to always go first, so I also reset the current player to X.
$('button').on('click', () => {
    $('.game-space').text('')
    $('.alert-success').text('')
    $('.alert-success').css('visibility', 'hidden')
    $('#current-player').text('X')
    xSquares = []
    oSquares = []
})


//I could not work out how to select only the clicked element in a class.
//I added ids to all of my game spaces, which seems incredibly inefficient but I couldn't see another way.
//Since there would have to be 9 click events now, I instead have them reference outside functions that I only type once.
// const drawSymbol = (clickedSpace) => clickedSpace.text($('b').text())
//I made one to do a quick test, and it worked! Still seemed far too inefficient, though, so I went to
//our instructor's repository and found he'd done something different.
//When I attempted it, it didn't work, maybe because my game board is an id, maybe because my spaces are in rows
//instead of directly being children of the game board.
//I'll be working on a fix later.

//My mentor walked me through a for loop using id numbers for the game spaces and getElementById.
//I had an if to check that the clicked space was empty before adding a symbol to it.
//A second if determines which array the number is added to.
//Finally I call the two functions I worked on below.

for (let i = 1; i < 10; i++) {
    let square = document.getElementById(i)
    square.addEventListener('click', () => {
        if (square.innerHTML == '') {
            square.innerHTML = $('#current-player').text()
            if ($('#current-player').text() == 'X') {
                xSquares.push(i)
            } else if ($('#current-player').text() == 'O') {
                oSquares.push(i)
            }
            checkForGameEnd()
            switchPlayer()
        }
    })
}

// $('#top-left').on('click', () => {
//     if ($('#top-left').text() == '') {
//         drawSymbol($('#top-left'))
//     }
// })

//I think this switch player function using a ternary operator will work, however I have to test it to find out.
//First attempt: It only works if the text is X, and won't move on to the second part of the statement even if the text is O.
//Second attempt: Even moving the function into the text parentheses as I saw on a forum post didn't make this work.
//Final function: However, moving the initial declaration into separate parentheses did, and now it works!
const switchPlayer = () => ($('#current-player').text() == 'X') ? $('#current-player').text('O') : $('#current-player').text('X')
//Testing the switchPlayer function by clicking the header:
// $('h3').on('click', () => {
//     switchPlayer()
// })

//When checking for a win, I can't just check if all elements in a class have an equal value, as the empty spaces would all be equal.
//I temporarily set some values on the board in the HTML for testing purposes.
//Unfortunately, neither classes nor ids seem to work for selecting and checking the text values.
//Even adding a variable for currentPlayer to reduce the jquery selectors didn't work.
//In fact, using currentPlayer in the string alert stopped it from changing when the player changed, so I removed it entirely.
//I also forewent the equal signs to put the current symbol in the text parentheses to see if that worked (it did not).
//It was a syntax error on my part (forgot the parentheses on the function call in the click event).
//However, I can't select a whole class like this and doing things by id would be far too long and tedious.

//After discussing with my mentor, I decided to work on a for loop using the winConditions array.

const checkForGameEnd = () => {
    let player
    let noVictory = true
    if ($('#current-player').text() == 'X') {
        player = xSquares
    } else player = oSquares
    for (let i = 0; i < winConditions.length; i++) {
        //Since all of the win conditions are three squares, I skipped the inner for loop and simply used index numbers.
        if (player.includes(winConditions[i][0]) && player.includes(winConditions[i][1]) && player.includes(winConditions[i][2])) {
            $('.alert-success').text(`${$('#current-player').text()} is the winner!`)
            $('.alert-success').css('visibility', 'visible')
            //Even after the game was over, users could trigger the click event on the empty spaces.
            //A single space means the game space isn't empty, even with no visible content.
            $('.game-space:empty').text(' ')
            return noVictory = false
        }
    }
    //I had a problem with my checkForTie where it would trigger when the board was full, even if a player should have won.
    //By tying it to a Boolean within the full checkForGameEnd function, it only runs if no player has won.
    if (noVictory === true) {
        if ($('.game-space:empty').length == 0) {
            $('.alert-success').text(`The game is a tie!`)
            $('.alert-success').css('visibility', 'visible')
        }
    }
}

//To keep things simpler, I initially separated out a check for a tie.
//I researched it and decided to use :empty based on a forum post: https://stackoverflow.com/questions/56676130/check-if-all-inputs-of-class-have-value

// const checkForTie = () => {
//     if ($('.game-space:empty').length == 0) {
//         $('.alert-success').text(`The game is a tie!`)
//         $('.alert-success').css('visibility', 'visible')
//         console.log(xSquares)
//         console.log(oSquares)
//     }
// }

//Test for the checkForGameEnd function (which I later split into checkForWin and checkForTie):
// $('h1').on('click', () => {
//     $('.alert-success').text(`${$('#current-player').text()} is the winner!`)
//     $('.alert-success').css('visibility', 'visible')
// })