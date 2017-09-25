const fs = require('fs')
const path = require('path')

let db = {
    list: [],
    total: 0,
    last: 0
}

const readFile = (filename) => {
    const filepatch = path.join(__dirname, filename)
    const file = fs.readFileSync(filepatch)
    db = JSON.parse(file.toString())
}

const saveFile = (filename) => {
    const filepatch = path.join(__dirname, filename)
    const string = JSON.stringify(db)
    fs.writeFileSync(filepatch, string)
}

const checkRequredFields = (order, list) => {
    const keys = Object.keys(order)
    return list.every((key) => {
        return keys.indexOf(key) > -1
    })
}

const validOrder = (order) => {
    if (!order) return false
    if (typeof order !== 'object') return false
    return checkRequredFields(order, ['start'])
}

const getID = (data) => {
    return typeof data === 'object' ? data.id : data
}

const Controller = (filename) => {

    readFile(filename)

    const add = (order) => {
        if (!validOrder(order)) return 0
        const exists = get(order)
        if (exists) return 0
        order.id = ++db.last
        db.list.unshift(order)
        db.total = db.list.length
        saveFile(filename)
        return db.last
    }

    const remove = (order) => {
        if (!order) return false
        const id = getID(order)
        const newList = db.list.filter((o) => o.id !== id)
        db.list = newList
        db.total = newList.length
        saveFile(filename)
        return true
    }

    const update = (order) => {
        const index = get(order, true)
        if (index < 0) return false
        if (!validOrder(order)) return false
        db.list[index] = order
        saveFile(filename)
        return true
    }

    const get = (order, byIndex) => {
        if (!order) return null
        const id = getID(order)
        const findFuncName = byIndex ? 'findIndex' : 'find'
        return db.list[findFuncName]((o) => o.id == id)
    }

    const pagination = (_props) => {
        const props = _props || {}
        const page = props.page || 0
        const inPage = props.inPage || 15
        const index = page * inPage
        if (index >= db.list.length) return {
            orders: [],
            total: db.total,
            page: page
        }
        return {
            orders: db.list.slice(index, index + inPage),
            total: db.total,
            page: page
        }
    }

    return { add, remove, update, get: pagination }
}

module.exports = Controller('db.json')
