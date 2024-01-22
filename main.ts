namespace SpriteKind {
    export const Wire = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += -1
    if (cursorPos < 0) {
        cursorPos = wireCount - 1
    }
    UpdateCursor()
})
function UpdateCursor () {
    cursor.top = Math.floor(120 / Ratio) * (cursorPos + 1) - 2
}
function _5wire () {
    if (SerialNumber % 2 == 1) {
        serialNumberOdd = true
    }
    blackCount = 0
    redCount = 0
    yellowCount = 0
    for (let value of WireList) {
        if (value == 0) {
            redCount += 1
        }
    }
    for (let value of WireList) {
        if (value == 3) {
            yellowCount += 1
        }
    }
    for (let value of WireList) {
        if (value == 4) {
            blackCount += 1
        }
    }
    if (WireList[4] == 4 && serialNumberOdd == true) {
        game.splash("Cut the fourth wire")
    } else if (redCount == 1 && yellowCount > 1) {
        game.splash("Cut the first wire")
    } else if (blackCount == 0) {
        game.splash("Cut the second wire")
    } else {
        game.splash("Cut the first wire")
    }
}
function startPhase () {
    while (wireCount < 3 || wireCount > 6) {
        wireCount = game.askForNumber("# of wires? (3-6)", 1)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (wireCount == 3) {
        _3wire()
    }
    if (wireCount == 4) {
        _4wire()
    }
    if (wireCount == 5) {
        _5wire()
    }
    if (wireCount == 6) {
        _6wire()
    }
})
function InitSerial () {
    SerialNumber = game.askForNumber("Last Digit of Serial Number", 1)
}
function InitWirePhase () {
    InitColours()
    InitCursor()
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = WireList[cursorPos] - 1
    if (WireList[cursorPos] < 0) {
        WireList[cursorPos] = colourList.length - 1
    }
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
function InitCursor () {
    mySprite = img`
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        `
    mySprite.drawRect(0, 0, 160, 9, 10)
    mySprite.drawRect(0, 1, 160, 7, 10)
    cursor = sprites.create(mySprite, SpriteKind.Wire)
    cursor.top = Math.floor(120 / Ratio) - 2
    cursorPos = 0
}
function InitColours () {
    colourList = [
    2,
    1,
    8,
    5,
    15
    ]
    WireList = []
    Ratio = wireCount + 1
    WireSprites = []
    for (let index = 0; index <= wireCount - 1; index++) {
        WireList.push(0)
        mySprite = img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            `
        mySprite.fill(colourList[WireList[index]])
        mySprite.drawRect(0, 0, 160, 5, 15)
        WireSprites.push(mySprite)
        mySprite2 = sprites.create(mySprite, SpriteKind.Wire)
        mySprite2.top = Math.floor(120 / Ratio) * (index + 1)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = (WireList[cursorPos] + 1) % colourList.length
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
function _4wire () {
    if (SerialNumber % 2 == 1) {
        serialNumberOdd = true
    }
    yellowCount = 0
    redCount = 0
    blueCount = 0
    for (let value of WireList) {
        if (value == 0) {
            redCount += 1
        }
    }
    for (let value of WireList) {
        if (value == 2) {
            blueCount += 1
        }
    }
    for (let value of WireList) {
        if (value == 3) {
            yellowCount += 1
        }
    }
    if (redCount > 1 && serialNumberOdd == true) {
        game.splash("Cut the last red wire")
    } else if (WireList[3] == 3 && (WireList[0] != 0 && (WireList[1] != 0 && WireList[2] != 0))) {
        game.splash("Cut the first wire")
    } else if (blueCount == 1) {
        game.splash("Cut the first wire")
    } else if (yellowCount > 1) {
        game.splash("Cut the last wire")
    } else {
        game.splash("Cut the second wire")
    }
}
sprites.onCreated(SpriteKind.Wire, function (sprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += 1
    cursorPos = cursorPos % wireCount
    UpdateCursor()
})
function _6wire () {
    if (SerialNumber % 2 == 1) {
        serialNumberOdd = true
    }
    yellowCount = 0
    redCount = 0
    whiteCount = 0
    for (let value of WireList) {
        if (value == 3) {
            redCount += 1
        }
    }
    for (let value of WireList) {
        if (value == 0) {
            redCount += 1
        }
    }
    for (let value of WireList) {
        if (value == 1) {
            redCount += 1
        }
    }
    if (yellowCount == 0 && serialNumberOdd == true) {
        game.splash("Cut the third wire")
    } else if (yellowCount == 1 && whiteCount > 1) {
        game.splash("Cut the fourth wire")
    } else if (redCount == 0) {
        game.splash("Cut the last wire")
    } else {
        game.splash("Cut the fourth wire")
    }
}
function _3wire () {
    blueCount = 0
    for (let value of WireList) {
        if (value == 2) {
            blueCount += 1
        }
    }
    if (WireList[0] != 0 && (WireList[1] != 0 && WireList[2] != 0)) {
        game.splash("Cut the second wire")
    } else if (WireList[2] == 1) {
        game.splash("Cut the last wire")
    } else if (blueCount > 1) {
        game.splash("Cut the last blue wire")
    } else {
        game.splash("Cut the last wire")
    }
}
let whiteCount = 0
let blueCount = 0
let mySprite: Image = null
let mySprite2: Sprite = null
let sprite_list: Sprite[] = []
let WireSprites: Image[] = []
let colourList: number[] = []
let WireList: number[] = []
let yellowCount = 0
let redCount = 0
let blackCount = 0
let serialNumberOdd = false
let SerialNumber = 0
let Ratio = 0
let cursor: Sprite = null
let cursorPos = 0
let wireCount = 0
wireCount = 0
enum phase {start, wire, solve}
let state:phase=phase.start
startPhase()
if (wireCount > 3) {
    InitSerial()
}
state += 1
scene.setBackgroundColor(1)
InitWirePhase()
