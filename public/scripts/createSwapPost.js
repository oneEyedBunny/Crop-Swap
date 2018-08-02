"use strict"


//renderUserSwaps() render results of server response

//loadUserSwaps() loading of page > submits get request for all swaps by user
//& passses response to renderUserSwaps

//submitSwap()  submit button > submits post request to server, clears form,
//and recalls loadUserSwaps()

//renderEditSwap() takes response from server and renders it to a pop up box
//fields are editable and there is a submit button

//editSwap() edit button > get request by id > calls renderEditSwap()

//editSwapButton() submits a put request to the server with the changes
//closes the pop up box, and calls loadUserSwaps() so the updated data is shown

//deleteSwap() delete button submits a delete request to the server, and
//removes the swap card from the page
