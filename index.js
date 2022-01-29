const arr = document.getElementById('array')
const sortBtn = document.getElementById('sort-btn')

// Function to generate the array of blocks
function generateArray() {
  for (let i = 0; i < 20; i++) {
    // Return a value from 1 to 100 (both inclusive)
    const value = Math.ceil(Math.random() * 100)

    // Creating element div
    const array_ele = document.createElement('div')

    // Adding class 'block' to div
    array_ele.classList.add('block')

    // Adding style to div
    array_ele.style.height = `${value * 3}px`
    array_ele.style.transform = `translate(${i * 30}px)`

    // Creating label element for displaying
    // size of particular block
    const array_ele_label = document.createElement('label')
    array_ele_label.classList.add('block_id')
    array_ele_label.innerText = value

    // Appending created elements to index.html
    array_ele.appendChild(array_ele_label)
    arr.appendChild(array_ele)
  }
}

// Promise to swap two blocks
function swap(el1, el2) {
  return new Promise((resolve) => {
    // For exchanging styles of two blocks
    const temp = el1.style.transform
    el1.style.transform = el2.style.transform
    el2.style.transform = temp

    window.requestAnimationFrame(function () {
      // For waiting for .25 sec
      setTimeout(() => {
        arr.insertBefore(el2, el1)
        resolve()
      }, 250)
    })
  })
}

// Asynchronous BubbleSort function
sortBtn.onclick = async (delay = 1) => {
  // handle styles when sorting
  sortBtn.innerHTML = 'SORTING...'
  sortBtn.style.cursor = 'progress'
  sortBtn.style.backgroundColor = '#1a91bd'
  // prevent the user from clicking sort again
  sortBtn.onclick = () => null
  let blocks = document.querySelectorAll('.block')

  // BubbleSort Algorithm
  for (var i = 0; i < blocks.length; i += 1) {
    for (var j = 0; j < blocks.length - i - 1; j += 1) {
      // To change background-color of the
      // blocks to be compared
      blocks[j].style.backgroundColor = '#FF4949'
      blocks[j + 1].style.backgroundColor = '#FF4949'

      // To wait for .1 sec
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve()
        }, delay)
      )
      const value1 = Number(blocks[j].childNodes[0].innerHTML)
      const value2 = Number(blocks[j + 1].childNodes[0].innerHTML)

      // To compare value of two blocks
      if (value1 > value2) {
        await swap(blocks[j], blocks[j + 1])
        blocks = document.querySelectorAll('.block')
      }

      // Changing the color to the previous one
      blocks[j].style.backgroundColor = '#ffa3a3'
      blocks[j + 1].style.backgroundColor = '#ffa3a3'
    }

    //changing the style of greatest element
    //found in the above traversal
    blocks[blocks.length - i - 1].style.backgroundColor = '#13CE66'
    blocks[blocks.length - 1].style.borderBottomRightRadius = '10px'
  }
  //changing the style of lowest element
  //found in the traversal
  blocks[0].style.borderBottomLeftRadius = '10px'
  // change sort button style and text when complete
  // and reload the page after 3 seconds
  sortBtn.innerHTML = 'SORTED ✓'
  sortBtn.style.cursor = 'default'
  sortBtn.style.backgroundColor = '#14a8de'
  setTimeout(() => {
    window.location.reload()
  }, 3000)
}

generateArray()
