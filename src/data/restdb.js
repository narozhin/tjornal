
const MAX_IN_PAGE = 15

const checkError = (data) => {
        if (!data) throw new Error('Unknown error. Response is empty')
        if (data.message) throw new Error(data.message)
        return data
}

const objectToQuery = (obj) => Object.keys(obj).map((key, index) => {
    return `${index === 0 ? '?' : ''}${key}=${obj[key]}`
}).join('&')

const pagination = (options) => {
    const query = { max: MAX_IN_PAGE, skip: 0, sort: '_created&dir=-1' }
    query.skip = options ? MAX_IN_PAGE * options.page : 0
    return objectToQuery(query)
}

export class RestDB {

    constructor(apikey, db, collection) {
        this.headers = {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'x-apikey': apikey
        }
        this.url = `https://${db}.restdb.io/rest/${collection}`
    }

    request(url, method, body) {
        return fetch(url, { method, body, cache: 'no-cache', headers: this.headers })
            .then(res => res.json()).then(checkError)
    }

    count() {
        return this.request(`${this.url}?h={"$aggregate":["COUNT:"]}`, 'GET')
            .then(res => res['COUNT '])
    }

    list(options) {
        const query = pagination(options)
        return this.request(`${this.url}${query}`, 'GET')
    }

    push(data, validator) {
        return validator && validator(data)
            ? this.request(this.url, 'POST', JSON.stringify(data))
            : Promise.reject('No valid data')
    }

    remove(id) {
        const url = `${this.url}/*?q={"_id":"${id}"}`
        return this.request(url, 'DELETE')
    }

    update(id, data) {
        return this.request(`${this.url}/${id}`, 'PATCH', JSON.stringify(data))
    }

}

