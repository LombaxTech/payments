import React from 'react';

const Test = () => {

    async function testTime() {
        console.log('start');

        await setTimeout(() => {
            console.log('running')
        }, 3000)

        console.log('finish');
    }

    testTime();

    return (
        <h1>Test</h1>
    )
}

export default Test;