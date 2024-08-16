/*Coding Steps:

    Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
        Create a Tic-Tac-Toe game grid using your HTML element of choice.
        When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
        A heading should say whether it is X's or O's turn and change with each move made.
        A button should be available to clear the grid and restart the game.
        When a player has won, or the board is full and the game results in a draw, a Bootstrap alert 
        or similar Bootstrap component should appear across the screen announcing the winner.*/


//I wasn't able to select the game spaces by class and only alter the contents of the one clicked.
//However, that gave me the idea for the clear function.
// $('.game-space').on('click', () => {
//     $('.game-space').text($('b').text())
// })

$('button').on('click', () => {
    $('.game-space').text('')
})

//I could not work out how to select only the clicked element in a class.
//I added ids to all of my game spaces, which seems incredibly inefficient but I couldn't see another way.
//Since there would have to be 9 click events now, I instead have them reference outside functions that I only type once.
const drawSymbol = (clickedSpace) => clickedSpace.text($('b').text())
//I made one to do a quick test, and it worked! Still seemed far too inefficient, though, so I went to
//our instructor's repository and found he'd done something different.
//When I attempted it, it didn't work, maybe because my game board is an id, maybe because my spaces are in rows.
//I'll be working on a fix later.
$('#top-left').on('click', () => {
    drawSymbol($('#top-left'))
})