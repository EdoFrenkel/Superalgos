
function newCircularMenu () {
  const MODULE_NAME = 'Circular Menu'

  let thisObject = {
    container: undefined,
    isDeployed: undefined,
    physics: physics,
    drawBackground: drawBackground,
    drawForeground: drawForeground,
    getContainer: getContainer,
    initialize: initialize
  }

  thisObject.container = newContainer()
  thisObject.container.initialize(MODULE_NAME, 'Circle')
  thisObject.container.isClickeable = false
  thisObject.container.isDraggeable = false
  thisObject.container.frame.radius = 0
  thisObject.container.frame.position.x = 0
  thisObject.container.frame.position.y = 0

  let menuItemsInitialValues = []
  let menuItems = []
  let payload

  return thisObject

  function initialize (menuItemsInitialValues, pPayload) {
    payload = pPayload
/* Create the array of Menu Items */

    for (let i = 0; i < menuItemsInitialValues.length; i++) {
      let menuItem = newCircularMenuItem()
      let menuItemInitialValue = menuItemsInitialValues[i]

      menuItem.label = menuItemInitialValue.label
      menuItem.visible = menuItemInitialValue.visible
      menuItem.imagePathOn = menuItemInitialValue.imagePathOn
      menuItem.imagePathOff = menuItemInitialValue.imagePathOff
      menuItem.rawRadius = menuItemInitialValue.rawRadius
      menuItem.targetRadius = menuItemInitialValue.label
      menuItem.currentRadius = menuItemInitialValue.currentRadius
      menuItem.angle = menuItemInitialValue.angle

      menuItem.initialize(payload)
      menuItem.container.connectToParent(thisObject.container, false, false, true, true, false, false, true, true)
      menuItems.push(menuItem)
    }

    thisObject.container.eventHandler.listenToEvent('onFocus', onFocus)
    thisObject.container.eventHandler.listenToEvent('onNotFocus', onNotFocus)
  }

  function getContainer (point) {
    let container

    if (thisObject.isDeployed === true) {
      for (let i = 0; i < menuItems.length; i++) {
        let menutItem = menuItems[i]
        container = menutItem.getContainer(point)
        if (container !== undefined) { return container }
      }
    }
  }

  function physics () {
    for (let i = 0; i < menuItems.length; i++) {
      let menutItem = menuItems[i]
      menutItem.physics()
    }
  }

  function onFocus () {
    for (let i = 0; i < menuItems.length; i++) {
      let menutItem = menuItems[i]
      menutItem.targetRadius = menutItem.rawRadius * 1.5
      menutItem.isDeployed = true
    }
    thisObject.isDeployed = true
  }

  function onNotFocus () {
    for (let i = 0; i < menuItems.length; i++) {
      let menutItem = menuItems[i]
      menutItem.targetRadius = menutItem.rawRadius * 0 - i * 5
      menutItem.isDeployed = false
    }
    thisObject.isDeployed = false
  }

  function drawBackground (pFloatingObject) {
    for (let i = 0; i < menuItems.length; i++) {
      let menutItem = menuItems[i]
      menutItem.drawBackground()
    }
  }

  function drawForeground (pFloatingObject) {
    for (let i = 0; i < menuItems.length; i++) {
      let menutItem = menuItems[i]
      menutItem.drawForeground()
    }
  }
}

