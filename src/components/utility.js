export function getFarewellText(person) {
    const options = [
        `Farewell, ${person}`,
        `Adios, ${person}`,
        `R.I.P., ${person}`,
        `We'll miss you, ${person}`,
        `Oh no, not ${person}!`,
        `${person} has fallen`,
        `Gone but not forgotten, ${person}`,
        `The end of ${person} as we know it`,
        `${person} was taken by the AI`,
        `${person}, your watch has ended`,
        `${person} has left the fight`,
        `${person} could not escape the AI`
    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}
