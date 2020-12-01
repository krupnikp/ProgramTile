const MINUTE = 60 * 1000;
const TIME_NOW = Date.now();

const SELECTORS = {
    OVER_BOTTOM_TARGET: 'over-bottom-target',
    OVER_TOP_TARGET: 'over-top-target',
}

const imageSource = 'http://lorempixel.com/250/150/abstract/';

const channelsList = [{
        title: 'Megalotnisko w Dubaju',
        category: 'Serial dokumentalny',
        imgURL: `${imageSource}1`,
        startTime: TIME_NOW - (11 * MINUTE),
        endTime: TIME_NOW + (1 * MINUTE),
        id: 1,
    },
    {
        title: 'Mega schronisko w Dubaju',
        category: 'Sport',
        imgURL: `${imageSource}2`,
        startTime: TIME_NOW + (1 * MINUTE),
        endTime: TIME_NOW + (3 * MINUTE),
        id: 2,
    },
    {
        title: 'Megalotnisko w Dubaju',
        category: 'Serial dokumentalny',
        imgURL: `${imageSource}3`,
        startTime: TIME_NOW + (11 * MINUTE),
        endTime: TIME_NOW + (35 * MINUTE),
        id: 3,
    },
    {
        title: 'Mega schronisko w Dubaju',
        category: 'Sport',
        imgURL: `${imageSource}4`,
        startTime: TIME_NOW - (20 * MINUTE),
        endTime: TIME_NOW + (12 * MINUTE),
        id: 4,
    }
];