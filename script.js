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
//After getting the end of game alert working, I added a section to this to hide it when clearing the board.
$('button').on('click', () => {
    $('.game-space').text('')
    $('.alert-success').text('')
    $('.alert-success').css('visibility', 'hidden')
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
    if ($('top-left').text == '') {
        drawSymbol($('#top-left'))
    }
})

//I think this switch player function using a ternary operator will work, however I have to test it to find out.
//First attempt: It only works if the text is X, and won't move on to the second part of the statement even if the text is O.
//Second attempt: Even moving the function into the text parentheses as I saw on a forum post didn't make this work.
//Final function: However, moving the initial declaration into separate parentheses did, and now it works!
const switchPlayer = () => ($('b').text() == 'X') ? $('b').text('O') : $('b').text('X')
//Testing the switchPlayer function by clicking the header:
$('h3').on('click', () => {
    switchPlayer()
})

//When checking for a win, I can't just check if all elements in a class have an equal value, as the empty spaces would all be equal.
//I temporarily set some values on the board in the HTML for testing purposes.
//Unfortunately, neither classes nor ids seem to work for selecting and checking the text values. Maybe I should be using val instead?
const checkForEndGame = () => {
    if ($('#top-middle').text() == $('b').text() && $('#center-middle').text() == $('b').text() && $('#bottom-middle').text() == $('b').text()) {
        $('.alert-success').text(`${$('b').text()} is the winner!`)
        $('.alert-success').css('visibility', 'visible')
    }
}
//When I put the internal part of the if loop in checkForEndGame into this click event, it works.
//So there's an issue with how I'm selecting things, again.
$('h1').on('click', () => {
    $('.alert-success').text(`${$('b').text()} is the winner!`)
    $('.alert-success').css('visibility', 'visible')
})