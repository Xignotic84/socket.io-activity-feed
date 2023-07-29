import {faker} from "@faker-js/faker";

const actions = [
    'liked',
    'listening',
    'posted'
]

export default class ActionService {
    static fetchRandomAction() {
        return actions[Math.floor(Math.random() * actions.length)]
    }

    static fetchActionValues(action) {
        switch (action) {
            case 'listening':
                return {
                    preposition: 'to',
                    value: faker.music.songName(),
                }
            case 'liked':
                return {
                    preposition: 'a post from',
                    value: faker.internet.userName()
                }
            case 'posted':
                return {
                    preposition: 'from',
                    value: faker.location.city()
                }
        }
    }

    static generateUserObject() {
        return {
            username: faker.internet.userName(),
            avatar: faker.internet.avatar(),
        }
    }

    static fetchAction() {
        const fetchedAction = this.fetchRandomAction()
        return {
            user: this.generateUserObject(),
            action: fetchedAction,
            values: this.fetchActionValues(fetchedAction)
        }
    }
}
