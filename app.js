// 1. Despot some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. check if the user won
// 6. give the user their winnings
// 7. play again

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




function spinSlot() {

  const slotLetters = [
    ['X', 'Y', 'Z'],
    ['X', 'Y', 'Z'],
    ['X', 'Y', 'Z']
  ]

  const outputArr = []

  const max = 3
  
  const slotReveal = slotLetters.map(x => {
    const random = Math.random() * max | 0
    outputArr.push(x[random])
    
  })
  
  console.log(outputArr)
  
  
  if (outputArr[0] === outputArr[1] && outputArr[1] === outputArr[2]) {
    const winnings = stake * lineAmount
    depositAmount = depositAmount + winnings
    console.log('Winner!')
    console.log('Your winnings are $' + winnings)
  } else {
    console.log('You lose :(')
  }
  console.log('Your current balance is $' + depositAmount)
  
  

}

let playAgain = true

while (depositAmount > 0 && playAgain) {
  const startGame = prompt('Press enter to spin the slot: ')
  spinSlot()
  
  if (depositAmount > 0) {
    const playAgainInput = prompt('Would you like to play again? (Y/N): ')
    playAgain = (playAgainInput.toUpperCase() === 'Y')
    betAmount()
    numberOfLines()
  } else {
    console.log('Sorry, you do not have enough money to play again.')
  }
}
