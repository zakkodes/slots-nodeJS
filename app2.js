// 1. Despot some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. check if the user won
// 6. give the user their winnings
// 7. play again

// THIS APP OUTPUTS THE SLOTS AS 3X3 LIKE IN REAL LIFE

const prompt = require("prompt-sync")();

function depositMoney() {
  while (true) {
    const depositAmount = prompt('Enter a deposit amount: ')
    const depositAmountNumber = parseFloat(depositAmount)
    
    if (isNaN(depositAmountNumber) || depositAmountNumber <= 0) {
      console.log('Please enter a valid deposit amount')
    } else {
      return depositAmountNumber
    }
  }
}

let depositAmount = depositMoney()
console.log('You have deposited $' + depositAmount)



function numberOfLines() {
  while (true) {
    const lines = prompt('Enter the number of lines you would like to bet (1-3): ')
    const linesNumber = parseFloat(lines)
    
    if (isNaN(linesNumber) || linesNumber <= 0 || linesNumber > 3) {
      console.log('Please enter a valid number of lines (1-3): ')
    } else {
      return linesNumber
    }
  }
}

const lineAmount = numberOfLines()
console.log('You have chosen to bet ' + lineAmount + ' lines.')

function newDeposit() {
  while (true) {
    const newDepositAmount = prompt('Enter a deposit amount: ')
    const newDepositAmountNumber = parseFloat(newDepositAmount)
    
    if (isNaN(newDepositAmountNumber) || newDepositAmountNumber <= 0) {
      console.log('Please enter a valid deposit amount: ')
    } else {
      const newBalance = newDepositAmountNumber + depositAmount
      console.log('You have deposited $' + newDepositAmountNumber + '. Your new balance is $' + newBalance)
      depositAmount = newBalance
      return newDepositAmountNumber
    }

  }
}


let stake = 0

function betAmount() {
  while (true) {
    const bet = prompt('Enter how much money you would like to bet: ')
    const betNumber = parseFloat(bet)
    
    if (isNaN(betNumber) || betNumber <= 0) {
      console.log('Please enter a valid bet amount: ')
    } else if (betNumber > depositAmount) {
      console.log('Bet amount cannot exceed deposits, you have a balance of $' + depositAmount)
      newDeposit()
    } else {
      depositAmount = depositAmount - betNumber
      stake = betNumber
      return betNumber
    }
  }
}





betAmount()

let playAgain = true


function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  //return arr
}

function spinSlot() {

  const slotLetters = [
    ['X', 'Y', 'Z'],
    ['X', 'Y', 'Z'],
    ['X', 'Y', 'Z']
  ]

  const outputArr = []

  const max = 3
  
  const slotReveal = slotLetters.map(x => {
    // const random = Math.random() * max | 0
    const randomisedArr = shuffleArray(x)
    outputArr.push(x)
    
  })
  
  console.log(outputArr[0])
  console.log(outputArr[1])
  console.log(outputArr[2])
  
  let isWinner = false
  
  const allEqual = outputArr.every(x => {
    for (let i = 0; i < x.length; i++) {
      if (x[0] === x[1] && x[1] === x[2]) {
        isWinner = true
      }
    }

    if (isWinner) {
      console.log("Congratulations, you win!")
      const winnings = stake * lineAmount
      console.log('Your winnings are $ ' + winnings)
      depositAmount = depositAmount + winnings
    } else {
      console.log('You lose :(')
    }
  })

  console.log('Your current balance is $' + depositAmount)
  
}



while (depositAmount > 0 && playAgain) {
  const startGame = prompt('Press enter to spin the slot: ')
  spinSlot()
  
  if (depositAmount > 0) {
    const playAgainInput = prompt('Would you like to play again? (Y/N): ')
    playAgain = (playAgainInput.toUpperCase() === 'Y')
    if (playAgainInput.toUpperCase() === 'N') {
      playAgain = false
      console.log("Thanks for playing!")
      console.log('Your final balance is $' + depositAmount)
      console.log('Until next time!')
      break
    }
    betAmount()
    numberOfLines()
  } else {
    console.log('Sorry, you do not have enough money to play again.')
  }
}
